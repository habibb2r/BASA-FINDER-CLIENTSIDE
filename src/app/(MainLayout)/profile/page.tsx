"use client";

import { useEffect, useState } from "react";
import NMContainer from "@/components/ui/core/NMContainer";
import { useUser } from "@/context/UserContext";
import { getSingleUser } from "@/services/Users";
import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const ProfilePage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
  
      try {
        const res = await getSingleUser(user.id);
        console.log("User Data:", res);
        if (res?.success) {
          setUserData(res.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [user?.id]);
  

  if (!userData) {
    return (
      <NMContainer>
        <Skeleton className="h-60 w-full rounded-lg" />
        <Skeleton className="h-8 w-1/2 my-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3" />
      </NMContainer>
    );
  }

  return (
    <NMContainer className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-r from-blue-300 to-cyan-200 shadow-lg rounded-3xl">
      <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-6 md:space-y-0">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-blue-500">
          {/* <AvatarImage src={userData.profileImg || "/user-placeholder.jpg"} /> */}
          <AvatarImage src={userData.photoURL || "https://i.postimg.cc/QxnWx7KH/user-placeholder.jpg"} />
          <AvatarFallback>{userData.name[0]}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-600 font-semibold">{userData.email}</p>
          <p className="text-sm text-blue-600 font-semibold capitalize">{userData.role}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-4 bg-white shadow-sm rounded-xl">
          <p className="text-sm text-gray-600">Phone Number:</p>
          <p className="text-lg font-medium text-gray-800">
            {userData.phone || "N/A"}
          </p>
        </div>

        <div className="p-4 bg-white shadow-sm rounded-xl">
          <p className="text-sm text-gray-600">Email:</p>
          <p className="text-lg font-medium text-gray-800">
            {userData.email || "N/A"}
          </p>
        </div>

        <div className="p-4 bg-white shadow-sm rounded-xl">
          <p className="text-sm text-gray-600">Address:</p>
          <p className="text-lg font-medium text-gray-800">
            {userData.address || "N/A"}
          </p>
        </div>

        <div className="p-4 bg-white shadow-sm rounded-xl">
          <p className="text-sm text-gray-600">Account Status:</p>
          <p
            className={`text-lg font-medium ${
              userData.isBlocked ? "text-red-500" : "text-green-500"
            }`}
          >
            {userData.isBlocked ? "Blocked" : "Active"}
          </p>
        </div>
      </div>

      {/* <div className="mt-8 flex justify-center md:justify-end gap-4"> */}
      <div className="mt-8 flex flex-col md:flex-row md:justify-end gap-4">
        <Link href="/update-profile">
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 hover:bg-blue-500 hover:text-white transition-all"
          >
            Update Profile
          </Button>
        </Link>
        <Link href="/change-password">
          <Button className="text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-all">
            Change Password
          </Button>
        </Link>
      </div>
    </NMContainer>
  );
};

export default ProfilePage;
