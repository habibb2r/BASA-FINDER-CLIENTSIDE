"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

// Helper function to get the auth token
export const getAuthToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  return accessToken?.value;
};

// Get all rental requests (Admin or Landlord)
export const getAllRequests = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/landlords/requests`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["rentalRequests"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in getAllRequests:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch requests",
    };
  }
};

// Get rental requests for tenants
export const getTenantRequests = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/tenants/requests`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["rentalRequests"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in getTenantRequests:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch tenant requests",
    };
  }
};

// Get rental requests for landlords
export const getLandlordRequests = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/rental-request/landlord/requests`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["rentalRequests"],
      },
    });
    const data = await res.json();
    console.log("✅ API Response:", data); // 🔴 DEBUG LOG

    return data;
  } catch (error: any) {
    console.error("Error in getLandlordRequests:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch landlord requests",
    };
  }
};

// Create a rental request (Tenant only)
export const createRentalRequest = async (requestData: any) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/tenants/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestData),
    });
// console.log('res-fRS:',res) ;
// console.log('requestData-fRS:',requestData) ;
    revalidateTag("rentalRequests");

    return res.json();
  } catch (error: any) {
    console.error("Error in createRentalRequest:", error);
    return {
      success: false,
      message: error.message || "Failed to create rental request",
    };
  }
};

// Update rental request status (Landlord/Admin only)
export const updateRequestStatus = async (requestId: string, status: string, landlordPhone?: string) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const body: any = { status };
    if (landlordPhone) {
      body.landlordPhone = landlordPhone;
    }

    const res = await fetch(`${BASE_API}/requests/${requestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    revalidateTag("rentalRequests");

    return res.json();
  } catch (error: any) {
    console.error("Error in updateRequestStatus:", error);
    return {
      success: false,
      message: error.message || "Failed to update request status",
    };
  }
};