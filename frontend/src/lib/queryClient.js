import { QueryClient } from '@tanstack/react-query';

/**
 * Shared TanStack Query client for the app.
 * Tuned for catalog-style data: modest staleness, bounded retries, no focus refetch noise.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
