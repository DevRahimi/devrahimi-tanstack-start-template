import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const createRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
      },
    },
  });

  return routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      scrollRestoration: true,
      defaultStructuralSharing: true,
      defaultSsr: true,
      Wrap: (props: { children: React.ReactNode }) => {
        return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
      },
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
    }),
    queryClient
  );
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
