import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .refine(
      (email) => {
        // Optional: Add domain restrictions if needed
        const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        return allowedDomains.some(domain => email.endsWith(domain));
      },
      { message: "Please use a valid email domain:('gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com')" }
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

});
