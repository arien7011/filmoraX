// Common API response types
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// API error response
export interface ApiError {
  status_code: number;
  status_message: string;
  success: boolean;
}

// Generic async state
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
