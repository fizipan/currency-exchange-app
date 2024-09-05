import { ContentLayout } from "@/components/layouts";
import { Note } from "@/components/ui/note";
import { getUsersQueryOptions } from "@/features/user/api/get-users";
import { UserAdd } from "@/features/user/components/user-add";
import { UsersList } from "@/features/user/components/user-list";
import { Authorization } from "@/lib/authorization";
import { QueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const usersLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const UsersRoute = () => {
  return (
    <ContentLayout title="Users">
      <h1 className="text-xl">Users</h1>
      <p className="mt-4">
        This is a users page. You can add your users content here.
      </p>
      <Authorization
        allowedRoles="admin"
        forbiddenFallback={
          <Note intent="warning">You are not allowed to access this page.</Note>
        }
      >
        <UserAdd />
        <UsersList />
      </Authorization>
    </ContentLayout>
  );
};
