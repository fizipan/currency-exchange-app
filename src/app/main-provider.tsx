import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

import { AuthLoader } from "@/lib/auth";
import { MainErrorFallback } from "@/components/errors/main";
import { ThemeProvider } from "@/components/theme-provider";
import { Toast } from "@/components/ui/toast";
import { Loader } from "@/components/ui/loader";
import { queryClient } from "@/lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader size="extra-large" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              <Toast />
              <AuthLoader
                renderLoading={() => (
                  <div className="flex h-screen w-screen items-center justify-center">
                    <Loader size="extra-large" />
                  </div>
                )}
              >
                {children}
              </AuthLoader>
            </ThemeProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
