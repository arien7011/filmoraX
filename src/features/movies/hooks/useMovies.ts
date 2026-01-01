import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services";
import { QUERY_KEYS } from "@/shared/utils";
import { appConfig } from "@/config";
import type { MovieQueryParams } from "../types";

export function useMovies(category: string, params: MovieQueryParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIES, category, params],
    queryFn: () => movieService.getByCategory(category, params),
    staleTime: appConfig.staleTime.movies,
  });
}

export function usePopularMovies(params: MovieQueryParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIES, "popular", params],
    queryFn: () => movieService.getPopular(params),
    staleTime: appConfig.staleTime.movies,
  });
}

export function useNowPlayingMovies(params: MovieQueryParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIES, "now_playing", params],
    queryFn: () => movieService.getNowPlaying(params),
    staleTime: appConfig.staleTime.movies,
  });
}

export function useUpcomingMovies(params: MovieQueryParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIES, "upcoming", params],
    queryFn: () => movieService.getUpcoming(params),
    staleTime: appConfig.staleTime.movies,
  });
}

export function useTopRatedMovies(params: MovieQueryParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIES, "top_rated", params],
    queryFn: () => movieService.getTopRated(params),
    staleTime: appConfig.staleTime.movies,
  });
}

export function useTrendingMovies(params: MovieQueryParams = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRENDING, params],
    queryFn: () => movieService.getTrending(params),
    staleTime: appConfig.staleTime.trending,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: [QUERY_KEYS.GENRES],
    queryFn: () => movieService.getGenres(),
    staleTime: Infinity, // Genres rarely change
  });
}
