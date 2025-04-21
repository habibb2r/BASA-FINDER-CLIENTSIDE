"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

// Helper function to get Auth Token
const getAuthToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  return accessToken?.value;
};

// Create a listing
// export const createListing = async (data: FormData) => {
//   try {
//     const res = await fetch(`${BASE_API}/landlords/listings`, {
//       method: "POST",
//       headers: {
//         Authorization: (await cookies()).get("accessToken")!.value,
//       },
//       body: data,
//     });

//     revalidateTag("rentalListings");

//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

export const createListing = async (listingData: any) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/landlords/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        rentalHouse: {
          location: listingData.location,
          description: listingData.description,
          rentAmount: Number(listingData.rentAmount),
          bedrooms: Number(listingData.bedrooms),
          images: listingData.images,
          amenities: listingData.amenities,
        },
      }),
    });

    revalidateTag("rentalListings");
    return res.json();
  } catch (error: any) {
    console.error("Error in createListing:", error);
    return { success: false, message: error.message || "Failed to create listing" };
  }
};

// Get landlord-specific listings
export const getLandlordListings = async () => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${BASE_API}/landlords/landlord/listings`, {
      headers: { Authorization: token },
      next: { tags: ["rentalListings"] },
    });

    return res.json();
  } catch (error: any) {
    console.error("Error in getLandlordListings:", error);
    return { success: false, message: error.message || "Failed to fetch landlord listings" };
  }
};

// Get all listings
export const getAllListings = async (params = "") => {
  try {
    const res = await fetch(`${BASE_API}/landlords/listings${params}`, {
      next: {
        tags: ["rentalListings"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get single listing
export const getSingleListing = async (listingId: string) => {
  try {
    const res = await fetch(`${BASE_API}/landlords/listings/${listingId}`, {
      next: {
        tags: ["rentalListings"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Update listing
// export const updateListing = async (listingId: string, data: FormData) => {
// export const updateListing = async (data: FormData, listingId: string) => {
export const updateListing = async (listingId: string, data: any) => {
  try {
    const res = await fetch(`${BASE_API}/landlords/listings/${listingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Explicitly set JSON content type
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (!res.ok) {
      // Handle non-200 responses
      const errorBody = await res.text();
      console.error('Error response:', errorBody);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    revalidateTag("rentalListings");

    return await res.json();
  } catch (error) {
    console.error('Update listing error:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Delete listing
export const deleteListing = async (listingId: string) => {
  try {
    const res = await fetch(`${BASE_API}/landlords/listings/${listingId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    revalidateTag("rentalListings");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
