import { useNavigate, useSearchParams } from "react-router-dom";

import { AuthLayout } from "@/components/layouts";
import { LoginForm } from "@/features/auth/components/login-form";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="Login">
      <LoginForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : "/dashboard"}`, {
            replace: true,
          })
        }
      />
    </AuthLayout>
  );
};
