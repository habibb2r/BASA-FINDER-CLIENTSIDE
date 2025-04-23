"use client";

import { useEffect, useState } from "react";
import NMContainer from "@/components/ui/core/NMContainer";
import { useUser } from "@/context/UserContext";
import { getSingleUser } from "@/services/Users";
import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, Edit, Lock } from "lucide-react";
import { ProfileSkeleton } from "@/components/modules/shared/ProfileSkeleton";

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
        <ProfileSkeleton />
      </NMContainer>
    );
  }

  return (
    <NMContainer>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="relative h-48 rounded-t-3xl bg-gradient-to-r from-blue-600 to-cyan-500 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/mesh-gradient.png')] opacity-50 mix-blend-overlay"></div>
        </div>

        {/* Profile Content */}
        <div className="relative -mt-24 px-6 pb-8 pt-2">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-8">
            <div className="relative group">
              <Avatar className="w-40 h-40 border-4 border-white shadow-xl ring-4 ring-blue-500/20 transition-transform duration-300 group-hover:scale-105">
                <AvatarImage
                  src={
                    userData.photoURL ||
                    "https://res.cloudinary.com/dairs3nkn/image/upload/v1745337495/habibb2r/b7jz4araesw7ori6otrg.png"
                  }
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl">
                  {userData.name[0]}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 md:mt-0 text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-gray-600 font-medium mt-1">{userData.email}</p>
              <div className="inline-flex items-center px-3 py-1 mt-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                {userData.role}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Phone Number", value: userData.phone },
              { label: "Email Address", value: userData.email },
              { label: "Location", value: userData.address },
              {
                label: "Account Status",
                value: userData.isBlocked ? "Blocked" : "Active",
                status: !userData.isBlocked,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-100 transition-colors duration-300"
              >
                <p className="text-sm text-gray-500 font-medium">
                  {item.label}
                </p>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    item.hasOwnProperty("status")
                      ? item.status
                        ? "text-green-600"
                        : "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
            <Link href="/update-profile">
              <Button
                variant="outline"
                className="w-full sm:w-auto group relative overflow-hidden rounded-xl px-6 py-2 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Update Profile
                </span>
              </Button>
            </Link>
            <Link href="/change-password">
              <Button className="w-full sm:w-auto group relative overflow-hidden rounded-xl px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Change Password
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </NMContainer>
  );
};

export default ProfilePage;
