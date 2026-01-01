export const appConfig = {
  name: "Filmorax",
  description: "Your personalized gateway to the world of cinema",
  tagline: "Discover, explore, and curate your personal movie collection",
  version: "1.0.0",

  // Pagination
  defaultPageSize: 20,
  maxPageSize: 100,

  // Cache times (in milliseconds)
  staleTime: {
    movies: 5 * 60 * 1000, // 5 minutes
    movieDetail: 10 * 60 * 1000, // 10 minutes
    search: 2 * 60 * 1000, // 2 minutes
    trending: 15 * 60 * 1000, // 15 minutes
  },

  // UI settings
  ui: {
    toastDuration: 4000,
    debounceDelay: 300,
    animationDuration: 200,
  },

  // Feature flags
  features: {
    socialLogin: true,
    offlineMode: true,
    recommendations: true,
    reviews: true,
  },
} as const;

export type AppConfig = typeof appConfig;
