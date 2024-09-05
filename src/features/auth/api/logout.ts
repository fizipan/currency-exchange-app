import { api } from "@/lib/api-client";

export const logout = (): Promise<string> => {
  return api.post("/logout");
};
