import { QueryClient } from "@tanstack/react-query";
import { appConfig } from "@/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: appConfig.staleTime.movies,
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
