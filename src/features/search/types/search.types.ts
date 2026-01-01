export interface SearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  overview?: string;
  poster_path: string | null;
  profile_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  popularity: number;
}

export interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchFilters {
  year?: number;
  genre?: number;
  sortBy?: string;
}

export interface SearchHistoryItem {
  id: number;
  query: string;
  searchedAt: Date;
}
