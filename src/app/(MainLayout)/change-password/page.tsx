"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { changePassword } from "@/services/Users";

// ✅ Zod Schema for Validation
const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { 
      oldPassword: "", 
      newPassword: "" 
    }, // ✅ Ensure fields are controlled from the start
  });

  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // ✅ Handle Password Change Submission
  const onSubmit = async (data: PasswordFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Updating password...");

    try {
      const res = await changePassword(data);

      if (res.success) {
        toast.success("Password updated successfully!", { id: toastId });
        reset(); // ✅ Reset form after success
      } else {
        toast.error(res.message || "Failed to change password", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Change Password</h2>
        <p className="text-center text-gray-600 mb-6">Secure your account with a new password.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Old Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Old Password</label>
            <div className="relative">
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""} // ✅ Ensures controlled state
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    className={`${errors.oldPassword ? "border-red-500" : ""}`}
                  />
                )}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.oldPassword && <p className="text-red-500 text-xs">{errors.oldPassword.message}</p>}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative">
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ""} // ✅ Ensures controlled state
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className={`${errors.newPassword ? "border-red-500" : ""}`}
                  />
                )}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
