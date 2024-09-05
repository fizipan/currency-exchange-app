import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { CurrencyRate } from "../types/dto";
import { getCurrencyExchangeQueryOptions } from "./get-currency-exchange";

export const refreshExchange = ({
  data,
}: {
  data: object;
}): Promise<CurrencyRate> => {
  return api.post(`/currency-rate/refresh`, data);
};

type UseRefreshExchangeOptions = {
  mutationConfig?: MutationConfig<typeof refreshExchange>;
};

export const useRefreshExchange = ({
  mutationConfig,
}: UseRefreshExchangeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCurrencyExchangeQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: refreshExchange,
  });
};
