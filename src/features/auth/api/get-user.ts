import { api } from "@/lib/api-client";

import { AuthUser } from "../types/dto";

export const getUser = (): Promise<AuthUser> => {
  return api.get("/me");
};
