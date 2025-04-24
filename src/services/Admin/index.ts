"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

// 🔹 Helper function to get Auth Token
const getAuthToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  return accessToken?.value;
};

// ✅ Fetch all users (Admin only)
export const getAllUsers = async () => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/user`, {
      method: "GET",
      headers: { Authorization: token },
      next: { tags: ["users"] },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in getAllUsers:", error);
    return { success: false, message: error.message || "Failed to fetch users" };
  }
};

// ✅ Update user role (Admin only)
export const updateUserRole = async (userId: string, role: string) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ role }),
    });

    revalidateTag("users");
    return res.json();
  } catch (error: any) {
    console.error("Error in updateUserRole:", error);
    return { success: false, message: error.message || "Failed to update user role" };
  }
};

// ✅ Delete a user (Admin only)
export const deleteUser = async (userId: string) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    revalidateTag("users");
    return res.json();
  } catch (error: any) {
    console.error("Error in deleteUser:", error);
    return { success: false, message: error.message || "Failed to delete user" };
  }
};

// ✅ Admin updates a listing
export const adminUpdateListing = async (listingId: string, data: any) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/admin/listings/${listingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Error response:", errorBody);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    revalidateTag("rentalListings");
    return res.json();
  } catch (error) {
    console.error("Admin update listing error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
};

// ✅ Admin deletes a listing
export const adminDeleteListing = async (listingId: string) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/admin/listings/${listingId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    revalidateTag("rentalListings");
    return res.json();
  } catch (error: any) {
    console.error("Error in adminDeleteListing:", error);
    return { success: false, message: error.message || "Failed to delete listing" };
  }
};
