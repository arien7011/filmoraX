import { useInfiniteQuery } from "@tanstack/react-query";
import { movieService } from "../services";
import { QUERY_KEYS } from "@/shared/utils";
import { appConfig } from "@/config";
import type { DiscoverQueryParams } from "../types";

export function useInfiniteMovies(category: string) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.MOVIES, category, "infinite"],
    queryFn: ({ pageParam }) =>
      movieService.getByCategory(category, { page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: appConfig.staleTime.movies,
  });
}

export function useInfiniteDiscover(params: Omit<DiscoverQueryParams, "page">) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.MOVIES, "discover", params],
    queryFn: ({ pageParam }) =>
      movieService.discover({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: appConfig.staleTime.movies,
  });
}
