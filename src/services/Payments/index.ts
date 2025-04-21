"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

// Helper function to get the auth token
const getAuthToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  return accessToken?.value;
};

// Process payment
export const makePayment = async (paymentData: any) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(paymentData),
    });

    revalidateTag("rentalRequests");

    return res.json();
  } catch (error: any) {
    console.error("Error in makePayment:", error);
    return {
      success: false,
      message: error.message || "Failed to process payment",
    };
  }
};

// Verify payment
export const verifyPayment = async (order_id: string) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/payment/verify?order_id=${order_id}`, {
      headers: {
        Authorization: token,
      },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in verifyPayment:", error);
    return {
      success: false,
      message: error.message || "Failed to verify payment",
    };
  }
};

// Get user's payment history
export const getMyPayments = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/payment/my-payments`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["payments"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in getMyPayments:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch payment history",
    };
  }
};

// Get all payments (admin only)
export const getAllPayments = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const res = await fetch(`${BASE_API}/payment/`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["payments"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in getAllPayments:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch all payments",
    };
  }
};