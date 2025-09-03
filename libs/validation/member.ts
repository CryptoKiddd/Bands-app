import { z } from "zod";

export const sanitizeMemberObject = z.object({
  name: z.string().min(1, "Member name is required").optional(), // optional for update
  role: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  band: z.string().optional(), // ObjectId as string
});

export type MemberRequestInput = z.infer<typeof sanitizeMemberObject>;