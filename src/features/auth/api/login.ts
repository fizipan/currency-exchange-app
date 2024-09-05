import { api } from "@/lib/api-client";

import { AuthUserResponse } from "../types/dto";
import { LoginRequest } from "../types/schema";

export const loginWithEmailAndPassword = (
  data: LoginRequest
): Promise<AuthUserResponse> => {
  return api.post("/login", data);
};
