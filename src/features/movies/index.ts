// Components
export {
  MovieCard,
  MovieGrid,
  MovieCarousel,
  MovieHero,
  MovieSkeleton,
  MovieGridSkeleton,
  MovieRowSkeleton,
} from "./components";

// Hooks
export {
  useMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
  useTrendingMovies,
  useGenres,
  useInfiniteMovies,
  useInfiniteDiscover,
  useMovieDetail,
  useMovieCredits,
  useMovieVideos,
  useMovieReviews,
  useSimilarMovies,
  useMovieRecommendations,
} from "./hooks";

// Services
export { movieService } from "./services";

// Utils
export {
  formatMovieRating,
  getMoviePosterUrl,
  getMovieBackdropUrl,
  getMovieYear,
  getRatingBadgeClasses,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
} from "./utils";

// Types
export type {
  Movie,
  MovieDetail,
  Genre,
  CastMember,
  CrewMember,
  MovieCredits,
  Video,
  MovieVideos,
  Review,
  MovieReviews,
  MoviesResponse,
  MovieCategory,
  MovieQueryParams,
  DiscoverQueryParams,
} from "./types";
