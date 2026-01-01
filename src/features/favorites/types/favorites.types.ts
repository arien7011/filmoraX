import type { Movie } from "@/features/movies";

export interface Favorite {
  id: number;
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  overview: string;
  addedAt: Date;
}

export interface FavoriteInput {
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  overview: string;
}

export function movieToFavoriteInput(movie: Movie): FavoriteInput {
  return {
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    overview: movie.overview,
  };
}
