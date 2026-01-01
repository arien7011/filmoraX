import { cn } from '@/shared/utils';
import { FavoriteCard } from './FavoriteCard';
import { EmptyFavorites } from './EmptyFavorites';
import { MovieGridSkeleton } from '@/features/movies';
import type { StoredFavorite } from '@/lib';

interface FavoritesGridProps {
  favorites: StoredFavorite[];
  isLoading?: boolean;
  onRemove?: (movieId: number) => void;
  className?: string;
}

export function FavoritesGrid({
  favorites,
  isLoading = false,
  onRemove,
  className,
}: FavoritesGridProps) {
  if (isLoading) {
    return <MovieGridSkeleton className={className} />;
  }

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4',
        className
      )}
    >
      {favorites.map((favorite) => (
        <FavoriteCard
          key={favorite.movieId}
          favorite={favorite}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
