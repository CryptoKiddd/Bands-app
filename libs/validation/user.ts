import { z } from "zod";

// For user registration
export const sanitizeRegisterUser = z.object({
  username: z.string().min(3),
  email: z.email(),            
  password: z.string().min(6),
});

// For login
export const sanitizeLoginUser = z.object({
  email: z.email(),
  password: z.string().min(6),
});

// For updating user, all fields optional
export const sanitizeUpdateUser = z.object({
  username: z.string().min(3).optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
});
