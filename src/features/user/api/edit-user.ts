import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { User } from "../types/dto";
import { UserEditInput } from "../types/schema";
import { getUserQueryOptions } from "./get-user";
import { getUsersQueryOptions } from "./get-users";

export const editUser = ({
  data,
  userId,
}: {
  data: UserEditInput;
  userId: string;
}): Promise<User> => {
  return api.put(`/users/${userId}`, data);
};

type UseEditUserOptions = {
  mutationConfig?: MutationConfig<typeof editUser>;
};

export const useEditUser = ({ mutationConfig }: UseEditUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getUserQueryOptions(data.id).queryKey,
      });
      queryClient.refetchQueries({ queryKey: getUsersQueryOptions().queryKey });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: editUser,
  });
};
