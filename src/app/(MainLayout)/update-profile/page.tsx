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
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Theme colors
const blueColors = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#2563EB", // Vibrant Blue
  background: "#EFF6FF", // Light Blue
};

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
      phone_number: "",
      address: "",
    },
  });

  // Populate form with user data when available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  //   const onSubmit = async (data: ProfileFormValues) => {
  //     const toastId = toast.loading("Updating Profile...");

  //     try {
  //       const formData = new FormData();
  //       formData.append("name", data.name);
  //       if (data.email) formData.append("email", data.email);
  //       formData.append("phone_number", data.phone_number);
  //       formData.append("address", data.address);

  //       console.log('formData',formData);
  //       console.log('Data',data);
  //       const res = await updateUserProfile(formData);
  //       console.log('res',res);
  //       if (res.success) {
  //         toast.success("Profile updated successfully!", { id: toastId, duration: 2000 });
  //       } else {
  //         toast.error(res.message || "Failed to update profile", { id: toastId, duration: 5000 });
  //       }
  //     } catch (error: any) {
  //       toast.error(error.message || "Something went wrong", { id: toastId, duration: 5000 });
  //     }
  //   };
  const onSubmit = async (data: ProfileFormValues) => {
    const toastId = toast.loading("Updating Profile...");

    try {
      // Convert FormData to a plain object
      const profileData = {
        name: data.name,
        email: data.email,
        phone: data.phone_number,
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
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      // style={{
      //   background: `linear-gradient(135deg, ${blueColors.background} 0%, white 100%)`,
      // }}
    >
      <Card className="w-full max-w-md shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-blue-200">
        <CardContent className="pt-6 pb-8 px-6">
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="mx-auto mb-4 sm:mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-cyan-300"
              style={{
                // background: `linear-gradient(135deg, ${blueColors.primary} 0%, ${blueColors.secondary} 100%)`,
                // background: `bg-gradient-to-r from-blue-300 to-cyan-200`,
              }}
            >
              <User className="text-white w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <h2
              className="text-center mb-2 text-2xl sm:text-3xl font-semibold"
              style={{ color: blueColors.primary }}
            >
              Update Profile
            </h2>
            <p className="text-center block text-sm sm:text-base text-blue-600">
              Keep your profile information up-to-date
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                className="font-medium text-sm sm:text-base block"
                style={{ color: blueColors.primary }}
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </span>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Your full name"
                      className="pl-10 py-6 rounded-xl shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="font-medium text-sm sm:text-base block"
                style={{ color: blueColors.primary }}
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Your email"
                      className="pl-10 py-6 rounded-xl shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={user?.email ? true : false}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <label
                className="font-medium text-sm sm:text-base block"
                style={{ color: blueColors.primary }}
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Phone size={18} />
                </span>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Your phone number"
                      className="pl-10 py-6 rounded-xl shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label
                className="font-medium text-sm sm:text-base block"
                style={{ color: blueColors.primary }}
              >
                Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <Home size={18} />
                </span>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Your complete address"
                      className="pl-10 pt-2 min-h-24 rounded-xl shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 rounded-xl mt-4 sm:mt-6 transform transition-all hover:scale-105 font-medium text-white"
              style={{
                background: `bg-gradient-to-r from-blue-300 to-cyan-200`,
              }}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
