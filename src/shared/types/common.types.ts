// Common utility types

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ValueOf<T> = T[keyof T];

// Component props with children
export interface PropsWithClassName {
  className?: string;
}

export interface PropsWithChildren {
  children: React.ReactNode;
}

export interface PropsWithChildrenAndClassName
  extends PropsWithChildren,
    PropsWithClassName {}

// Status types
export type Status = "idle" | "loading" | "success" | "error";

// Theme types
export type Theme = "light" | "dark" | "system";

// Sort direction
export type SortDirection = "asc" | "desc";

// Pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Search params
export interface SearchParams extends PaginationParams {
  query: string;
}

// Filter params
export interface FilterParams {
  genres?: number[];
  year?: number;
  rating?: number;
  sortBy?: string;
}
