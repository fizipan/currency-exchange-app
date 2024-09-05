import { ContentLayout } from "@/components/layouts";
import { CurenncyList } from "@/features/currency-exchange/components/currency-list";
import { getUsersQueryOptions } from "@/features/user/api/get-users";
import { QueryClient } from "@tanstack/react-query";

export const currencyExchangeLoader =
  (queryClient: QueryClient) => async () => {
    const query = getUsersQueryOptions();

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const currencyExchangeRoute = () => {
  return (
    <ContentLayout title="Currency Exchange">
      <h1 className="text-xl">Currency Exchange</h1>
      <p className="mt-4">
        This is a currency Exchange page. You can add your currency Exchange
        content here.
      </p>
      <CurenncyList />
    </ContentLayout>
  );
};
