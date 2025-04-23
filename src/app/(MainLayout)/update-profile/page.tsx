"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, Home, Phone, Mail, Loader2 } from "lucide-react";
import { updateUserProfile } from "@/services/Users";
import { useUser } from "@/context/UserContext";
// import { useUser } from "@/hooks/useUser";

// Validation Schema
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UpdateProfile = () => {
  const { user, isLoading: userLoading } = useUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Populate form with user data when available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "", // Fixed: using phone instead of phone_number
        address: user.address || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    const toastId = toast.loading("Updating Profile...");

    try {
      // Convert FormData to a plain object
      const profileData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };

      const res = await updateUserProfile(profileData);

      if (res.success) {
        toast.success("Profile updated successfully!", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(res.message || "Failed to update profile", {
          id: toastId,
          duration: 5000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
        duration: 5000,
      });
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse opacity-75"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <User className="w-full h-full text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
            Update Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Keep your profile information up-to-date
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block pl-1">
                  Full Name
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                    <User size={20} />
                  </span>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Your full name"
                        className="pl-11 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300 hover:border-blue-400"
                      />
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 pl-1 flex items-center">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                    <Mail size={20} />
                  </span>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Your email"
                        className="pl-11 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300 hover:border-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={user?.email ? true : false}
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 pl-1 flex items-center">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block pl-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                    <Phone size={20} />
                  </span>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Your phone number"
                        className="pl-11 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300 hover:border-blue-400"
                      />
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 pl-1 flex items-center">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block pl-1">
                  Address
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                    <Home size={20} />
                  </span>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Your complete address"
                        className="pl-11 min-h-[120px] bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-300 hover:border-blue-400 resize-none"
                      />
                    )}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 pl-1 flex items-center">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProfile;
