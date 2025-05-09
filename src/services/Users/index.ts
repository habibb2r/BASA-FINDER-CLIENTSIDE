"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


// ✅ Get all users
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      next: { tags: ["USERS"] },
    });

    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// ✅ Get single user
export const getSingleUser = async (userId: string) => {
  // console.log('triggered')
  // console.log("User ID:", userId);
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/my-profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: { tags: ["USERS"] },
    });
    // console.log(res)

    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateUserProfile = async (profileData: {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  photoURL?: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`, {
      method: "PATCH",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    console.log(`${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`);
    console.log("Profile Data:", profileData);

    const responseData = await res.json();
    // console.log("responseData:", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || 'Profile update failed');
    }

    revalidateTag("USERS");
    return responseData;
  } catch (error: any) {
    console.error('Profile Update Error:', error);
    return { success: false, message: error.message };
  }
};

// ✅ Block User
export const blockUser = async (userId: string) => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    revalidateTag("USERS");
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// ✅ Activate User
export const activateUser = async (userId: string) => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    revalidateTag("USERS");
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// ✅ Change Password
export const changePassword = async (passwordData: { oldPassword: string; newPassword: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/change-password`, {
      method: "POST",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    console.log('passwordData:', passwordData);
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// ✅ Calculate Revenue

export const calculateRevenue = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/revenue`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
