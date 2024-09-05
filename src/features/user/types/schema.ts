import { z } from "zod";

export const userCreateInputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
});

export type LoginRequest = z.infer<typeof userCreateInputSchema>;

export const userEditInputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().optional(),
  role: z.string().min(1).max(100),
});

export type UserEditInput = z.infer<typeof userEditInputSchema>;
