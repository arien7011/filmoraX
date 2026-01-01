// Movie list item from TMDB API
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

// Movie detail from TMDB API
export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  budget: number;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  homepage: string | null;
  imdb_id: string | null;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: Collection | null;
}

// Genre
export interface Genre {
  id: number;
  name: string;
}

// Production company
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// Production country
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken language
export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

// Collection
export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Cast member
export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
  gender: number;
  known_for_department: string;
  popularity: number;
  credit_id: string;
  cast_id: number;
  adult: boolean;
}

// Crew member
export interface CrewMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  gender: number;
  known_for_department: string;
  department: string;
  job: string;
  popularity: number;
  credit_id: string;
  adult: boolean;
}

// Movie credits response
export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Video
export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

// Movie videos response
export interface MovieVideos {
  id: number;
  results: Video[];
}

// Review author details
export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

// Review
export interface Review {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

// Movie reviews response
export interface MovieReviews {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

// API response types
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

// Category type
export type MovieCategory =
  | "popular"
  | "now_playing"
  | "upcoming"
  | "top_rated"
  | "trending";

// Query params
export interface MovieQueryParams {
  page?: number;
  language?: string;
  region?: string;
}

export interface DiscoverQueryParams extends MovieQueryParams {
  sort_by?: string;
  with_genres?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "release_date.gte"?: string;
  "release_date.lte"?: string;
  year?: number;
}
