import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { CurrencyRate } from "../types/dto";

export const getCurrencyExchange = (): Promise<CurrencyRate[]> => {
  return api.get("/currency-rate");
};

export const getCurrencyExchangeQueryOptions = () => {
  return queryOptions({
    queryKey: ["currencyExchange"],
    queryFn: getCurrencyExchange,
  });
};

type UseCurrencyExchangeOptions = {
  queryConfig?: QueryConfig<typeof getCurrencyExchangeQueryOptions>;
};

export const useCurrencyExchange = ({
  queryConfig,
}: UseCurrencyExchangeOptions = {}) => {
  return useQuery({
    ...getCurrencyExchangeQueryOptions(),
    ...queryConfig,
  });
};
