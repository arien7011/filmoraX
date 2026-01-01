import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services";
import { QUERY_KEYS } from "@/shared/utils";
import { appConfig } from "@/config";

export function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_DETAIL, movieId],
    queryFn: () => movieService.getDetail(movieId),
    staleTime: appConfig.staleTime.movieDetail,
    enabled: movieId > 0,
  });
}

export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_CREDITS, movieId],
    queryFn: () => movieService.getCredits(movieId),
    staleTime: appConfig.staleTime.movieDetail,
    enabled: movieId > 0,
  });
}

export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_VIDEOS, movieId],
    queryFn: () => movieService.getVideos(movieId),
    staleTime: appConfig.staleTime.movieDetail,
    enabled: movieId > 0,
  });
}

export function useMovieReviews(movieId: number, page = 1) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_REVIEWS, movieId, page],
    queryFn: () => movieService.getReviews(movieId, page),
    staleTime: appConfig.staleTime.movies,
    enabled: movieId > 0,
  });
}

export function useSimilarMovies(movieId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_SIMILAR, movieId],
    queryFn: () => movieService.getSimilar(movieId),
    staleTime: appConfig.staleTime.movies,
    enabled: movieId > 0,
  });
}

export function useMovieRecommendations(movieId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_RECOMMENDATIONS, movieId],
    queryFn: () => movieService.getRecommendations(movieId),
    staleTime: appConfig.staleTime.movies,
    enabled: movieId > 0,
  });
}
