import { QueryClient } from "@tanstack/react-query";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { ProtectedRoute, PublicRoute } from "@/lib/auth";

import { LoginRoute } from "./auth/login";
import { NotFoundRoute } from "./not-found";
import { AppRoot } from "./app/root";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/auth/login",
      element: (
        <PublicRoute>
          <LoginRoute />
        </PublicRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/dashboard",
          lazy: async () => {
            const { DashboardRoute } = await import("./app/dashboard");
            return { Component: DashboardRoute };
          },
        },
        {
          path: "users",
          lazy: async () => {
            const { UsersRoute } = await import("./app/user");
            return { Component: UsersRoute };
          },
          loader: async () => {
            const { usersLoader } = await import("./app/user");
            return usersLoader(queryClient);
          },
        },
        {
          path: "currency-exchange",
          lazy: async () => {
            const { currencyExchangeRoute } = await import(
              "./app/currency-exchange"
            );
            return { Component: currencyExchangeRoute };
          },
          loader: async () => {
            const { currencyExchangeLoader } = await import(
              "./app/currency-exchange"
            );
            return currencyExchangeLoader(queryClient);
          },
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundRoute />,
    },
  ]);
