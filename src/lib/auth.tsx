import { Navigate, useSearchParams } from "react-router-dom";

import { AuthUserResponse } from "@/features/auth/types/dto";
import { LoginRequest } from "@/features/auth/types/schema";
import { Cookie } from "@/utils/storage";
import { configureAuth } from "./react-query-auth";
import { loginWithEmailAndPassword } from "@/features/auth/api/login";
import { getUser } from "@/features/auth/api/get-user";
import { logout } from "@/features/auth/api/logout";
import { toast } from "sonner";
import { queryClient } from "./react-query";

async function handleUserResponse(data: AuthUserResponse) {
  const { token } = data;
  Cookie.setToken(token);
  return data;
}

async function userFn() {
  if (Cookie.getToken()) {
    try {
      const data = await getUser();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Cookie.clearTokens();
    }
  }
  return null;
}

async function loginFn(dataForm: LoginRequest) {
  const response = await loginWithEmailAndPassword(dataForm);
  const data = await handleUserResponse(response);
  return data.user;
}

async function logoutFn() {
  await logout();
  toast.success("Logged out successfully");
  Cookie.clearTokens();
  queryClient.clear();
}

const authConfig = {
  userFn,
  loginFn,
  logoutFn,
};

// eslint-disable-next-line react-refresh/only-export-components
export const { useUser, useLogin, useLogout, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(
          redirectTo ? redirectTo : "/dashboard"
        )}`}
        replace
      />
    );
  }

  return children;
};

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  if (user.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
