import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(100),
});

export type LoginRequest = z.infer<typeof loginInputSchema>;
