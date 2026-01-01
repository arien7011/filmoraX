import { apiClient } from "@/lib/api";
import { apiConfig } from "@/config";
import type {
  MoviesResponse,
  MovieDetail,
  MovieCredits,
  MovieVideos,
  MovieReviews,
  GenresResponse,
  MovieQueryParams,
  DiscoverQueryParams,
} from "../types";

export const movieService = {
  // Get popular movies
  async getPopular(params: MovieQueryParams = {}): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.popularMovies,
      { params }
    );
    return data;
  },

  // Get now playing movies
  async getNowPlaying(params: MovieQueryParams = {}): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.nowPlayingMovies,
      { params }
    );
    return data;
  },

  // Get upcoming movies
  async getUpcoming(params: MovieQueryParams = {}): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.upcomingMovies,
      { params }
    );
    return data;
  },

  // Get top rated movies
  async getTopRated(params: MovieQueryParams = {}): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.topRatedMovies,
      { params }
    );
    return data;
  },

  // Get trending movies
  async getTrending(params: MovieQueryParams = {}): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.trendingMovies,
      { params }
    );
    return data;
  },

  // Get movie by category
  async getByCategory(
    category: string,
    params: MovieQueryParams = {}
  ): Promise<MoviesResponse> {
    switch (category) {
      case "popular":
        return this.getPopular(params);
      case "now_playing":
        return this.getNowPlaying(params);
      case "upcoming":
        return this.getUpcoming(params);
      case "top_rated":
        return this.getTopRated(params);
      case "trending":
        return this.getTrending(params);
      default:
        return this.getPopular(params);
    }
  },

  // Get movie details
  async getDetail(movieId: number): Promise<MovieDetail> {
    const { data } = await apiClient.get<MovieDetail>(
      apiConfig.endpoints.movieDetail(movieId)
    );
    return data;
  },

  // Get movie credits
  async getCredits(movieId: number): Promise<MovieCredits> {
    const { data } = await apiClient.get<MovieCredits>(
      apiConfig.endpoints.movieCredits(movieId)
    );
    return data;
  },

  // Get movie videos
  async getVideos(movieId: number): Promise<MovieVideos> {
    const { data } = await apiClient.get<MovieVideos>(
      apiConfig.endpoints.movieVideos(movieId)
    );
    return data;
  },

  // Get movie reviews
  async getReviews(movieId: number, page = 1): Promise<MovieReviews> {
    const { data } = await apiClient.get<MovieReviews>(
      apiConfig.endpoints.movieReviews(movieId),
      { params: { page } }
    );
    return data;
  },

  // Get similar movies
  async getSimilar(
    movieId: number,
    params: MovieQueryParams = {}
  ): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.movieSimilar(movieId),
      { params }
    );
    return data;
  },

  // Get movie recommendations
  async getRecommendations(
    movieId: number,
    params: MovieQueryParams = {}
  ): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.movieRecommendations(movieId),
      { params }
    );
    return data;
  },

  // Discover movies with filters
  async discover(params: DiscoverQueryParams = {}): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.discoverMovies,
      { params }
    );
    return data;
  },

  // Get all genres
  async getGenres(): Promise<GenresResponse> {
    const { data } = await apiClient.get<GenresResponse>(
      apiConfig.endpoints.movieGenres
    );
    return data;
  },

  // Search movies
  async search(
    query: string,
    params: MovieQueryParams = {}
  ): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.searchMovies,
      { params: { query, ...params } }
    );
    return data;
  },
};
