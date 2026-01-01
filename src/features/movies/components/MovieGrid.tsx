import { cn } from '@/shared/utils';
import { MovieCard } from './MovieCard';
import { MovieGridSkeleton } from './MovieSkeleton';
import type { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  className?: string;
  showFavoriteButton?: boolean;
  favoriteIds?: Set<number>;
  onFavoriteClick?: (movie: Movie) => void;
}

export function MovieGrid({
  movies,
  isLoading = false,
  className,
  showFavoriteButton = true,
  favoriteIds = new Set(),
  onFavoriteClick,
}: MovieGridProps) {
  if (isLoading) {
    return <MovieGridSkeleton className={className} />;
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          No movies found
        </h3>
        <p className="text-[var(--color-text-secondary)]">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4',
        className
      )}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          showFavoriteButton={showFavoriteButton}
          isFavorite={favoriteIds.has(movie.id)}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
}
