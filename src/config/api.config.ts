export const apiConfig = {
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  apiKey: import.meta.env.VITE_TMDB_API_KEY || "",
  accessToken: import.meta.env.VITE_TMDB_ACCESS_TOKEN || "",
  imageBaseUrl:
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p",

  // Image sizes
  imageSize: {
    poster: {
      small: "w185",
      medium: "w342",
      large: "w500",
      original: "original",
    },
    backdrop: {
      small: "w300",
      medium: "w780",
      large: "w1280",
      original: "original",
    },
    profile: {
      small: "w45",
      medium: "w185",
      large: "h632",
      original: "original",
    },
  },

  // Endpoints
  endpoints: {
    // Movies
    popularMovies: "/movie/popular",
    nowPlayingMovies: "/movie/now_playing",
    upcomingMovies: "/movie/upcoming",
    topRatedMovies: "/movie/top_rated",
    trendingMovies: "/trending/movie/week",
    movieDetail: (id: number) => `/movie/${id}`,
    movieCredits: (id: number) => `/movie/${id}/credits`,
    movieVideos: (id: number) => `/movie/${id}/videos`,
    movieReviews: (id: number) => `/movie/${id}/reviews`,
    movieSimilar: (id: number) => `/movie/${id}/similar`,
    movieRecommendations: (id: number) => `/movie/${id}/recommendations`,

    // Search
    searchMovies: "/search/movie",
    searchMulti: "/search/multi",

    // Genres
    movieGenres: "/genre/movie/list",

    // Discover
    discoverMovies: "/discover/movie",
  },

  // Request config
  timeout: 10000,
  retryCount: 3,
  retryDelay: 1000,
} as const;

export type ApiConfig = typeof apiConfig;

// Helper function to get full image URL
export const getImageUrl = (
  path: string | null | undefined,
  size: string = apiConfig.imageSize.poster.medium
): string => {
  if (!path) {
    return "/placeholder-poster.jpg";
  }
  return `${apiConfig.imageBaseUrl}/${size}${path}`;
};

// Helper function to get backdrop URL
export const getBackdropUrl = (
  path: string | null | undefined,
  size: string = apiConfig.imageSize.backdrop.large
): string => {
  if (!path) {
    return "/placeholder-backdrop.jpg";
  }
  return `${apiConfig.imageBaseUrl}/${size}${path}`;
};

// Helper function to get profile URL
export const getProfileUrl = (
  path: string | null | undefined,
  size: string = apiConfig.imageSize.profile.medium
): string => {
  if (!path) {
    return "/placeholder-avatar.jpg";
  }
  return `${apiConfig.imageBaseUrl}/${size}${path}`;
};
