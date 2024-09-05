import { api } from "@/lib/api-client";

import { AuthUserResponse } from "../types/dto";

export const refreshToken = (): Promise<AuthUserResponse> => {
  return api.post("/refresh");
};
