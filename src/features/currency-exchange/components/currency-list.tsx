import { Table } from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";
import { useCurrencyExchange } from "../api/get-currency-exchange";
import { Button } from "@/components/ui/button";
import { IconRefresh } from "justd-icons";
import { Card } from "@/components/ui/card";
import { useRefreshExchange } from "../api/refresh-exhange";

export const CurenncyList = () => {
  const currencyQuery = useCurrencyExchange();

  const curenncy = currencyQuery.data;

  const currencyRefreshMutation = useRefreshExchange();

  return (
    <>
      {/* Refresh button */}
      <Button
        className="mt-5"
        onPress={async () => {
          await currencyRefreshMutation.mutateAsync({ data: {} });
        }}
        isDisabled={
          currencyRefreshMutation.isPending || currencyQuery.isFetching
        }
      >
        <IconRefresh
          className={`mr-2 ${
            currencyRefreshMutation.isPending ? "animate-spin" : ""
          }`}
        />
        Refresh
      </Button>
      {currencyQuery.isLoading || currencyQuery.isFetching ? (
        <div className="flex h-48 w-full items-center justify-center">
          <Loader size="large" />
        </div>
      ) : (
        <Card className="mt-5">
          <Table aria-label="Currency">
            <Table.Header>
              <Table.Column isRowHeader>Currency</Table.Column>
              <Table.Column>Rate</Table.Column>
              <Table.Column>Updated At</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body
              items={curenncy}
              renderEmptyState={() => (
                <div className="flex my-10 w-full items-center justify-center">
                  No data
                </div>
              )}
            >
              {(item) => (
                <Table.Row id={item.id}>
                  <Table.Cell>{item.currency}</Table.Cell>
                  <Table.Cell>{item.rate}</Table.Cell>
                  <Table.Cell>{item.updated_at}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card>
      )}
    </>
  );
};
