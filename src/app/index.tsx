import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  RouterProvider as RouterProviderReact,
  useHref,
} from "react-router-dom";

import { AppProvider } from "./main-provider";
import { createRouter } from "./routes";
import { RouterProvider } from "react-aria-components";

const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createRouter(queryClient), [queryClient]);

  return (
    <RouterProvider useHref={useHref} navigate={router.navigate}>
      <RouterProviderReact router={router} />
    </RouterProvider>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
