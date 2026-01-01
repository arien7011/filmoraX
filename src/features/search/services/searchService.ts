import { apiClient } from "@/lib/api";
import { apiConfig } from "@/config";
import type { MoviesResponse } from "@/features/movies";

export const searchService = {
  async searchMovies(query: string, page = 1): Promise<MoviesResponse> {
    const { data } = await apiClient.get<MoviesResponse>(
      apiConfig.endpoints.searchMovies,
      { params: { query, page } }
    );
    return data;
  },
};
