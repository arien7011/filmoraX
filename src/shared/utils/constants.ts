// Route paths
export const ROUTES = {
  // Public routes
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected routes
  HOME: "/home",
  MOVIES: "/movies",
  MOVIES_POPULAR: "/movies/popular",
  MOVIES_NOW_PLAYING: "/movies/now-playing",
  MOVIES_UPCOMING: "/movies/upcoming",
  MOVIES_TOP_RATED: "/movies/top-rated",
  MOVIE_DETAIL: "/movie/:id",
  SEARCH: "/search",
  FAVORITES: "/favorites",
  PROFILE: "/profile",

  // Error routes
  NOT_FOUND: "/404",
  ERROR: "/error",
} as const;

// Movie categories
export const MOVIE_CATEGORIES = {
  POPULAR: "popular",
  NOW_PLAYING: "now_playing",
  UPCOMING: "upcoming",
  TOP_RATED: "top_rated",
  TRENDING: "trending",
} as const;

export type MovieCategory =
  (typeof MOVIE_CATEGORIES)[keyof typeof MOVIE_CATEGORIES];

// Category labels for UI
export const CATEGORY_LABELS: Record<MovieCategory, string> = {
  [MOVIE_CATEGORIES.POPULAR]: "Popular",
  [MOVIE_CATEGORIES.NOW_PLAYING]: "Now Playing",
  [MOVIE_CATEGORIES.UPCOMING]: "Upcoming",
  [MOVIE_CATEGORIES.TOP_RATED]: "Top Rated",
  [MOVIE_CATEGORIES.TRENDING]: "Trending",
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "filmorax_auth_token",
  USER: "filmorax_user",
  THEME: "filmorax_theme",
  SEARCH_HISTORY: "filmorax_search_history",
  PREFERENCES: "filmorax_preferences",
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  MOVIES: "movies",
  MOVIE_DETAIL: "movie-detail",
  MOVIE_CREDITS: "movie-credits",
  MOVIE_VIDEOS: "movie-videos",
  MOVIE_REVIEWS: "movie-reviews",
  MOVIE_SIMILAR: "movie-similar",
  MOVIE_RECOMMENDATIONS: "movie-recommendations",
  SEARCH: "search",
  GENRES: "genres",
  TRENDING: "trending",
  FAVORITES: "favorites",
  USER: "user",
} as const;

// Sort options for movies
export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "vote_average.asc", label: "Lowest Rated" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "release_date.asc", label: "Oldest First" },
  { value: "original_title.asc", label: "Title A-Z" },
  { value: "original_title.desc", label: "Title Z-A" },
] as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;
