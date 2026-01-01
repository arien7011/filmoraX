import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { searchService } from "../services";
import { QUERY_KEYS } from "@/shared/utils";
import { appConfig } from "@/config";

export function useSearch(query: string, enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH, query],
    queryFn: () => searchService.searchMovies(query),
    staleTime: appConfig.staleTime.search,
    enabled: enabled && query.length >= 2,
  });
}

export function useInfiniteSearch(query: string) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH, query, "infinite"],
    queryFn: ({ pageParam }) => searchService.searchMovies(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: appConfig.staleTime.search,
    enabled: query.length >= 2,
  });
}
