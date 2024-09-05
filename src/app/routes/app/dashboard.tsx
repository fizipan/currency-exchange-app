import { ContentLayout } from "@/components/layouts";
import { useUser } from "@/lib/auth";

export const DashboardRoute = () => {
  const user = useUser();

  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl">
        Welcome <b>{user.data && user.data?.name}</b>
      </h1>
      <p className="mt-4">
        This is a dashboard page. You can add your dashboard content here.
      </p>
    </ContentLayout>
  );
};
