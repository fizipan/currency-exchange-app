import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { User } from "../types/dto";

export const getUser = ({ userId }: { userId: string }): Promise<User> => {
  return api.get(`/users/${userId}`);
};

export const getUserQueryOptions = (userId: string) => {
  return queryOptions({
    queryKey: ["users", userId],
    queryFn: () => getUser({ userId }),
  });
};

type UseDiscussionOptions = {
  userId: string;
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUserById = ({ userId, queryConfig }: UseDiscussionOptions) => {
  return useQuery({
    ...getUserQueryOptions(userId),
    ...queryConfig,
  });
};
