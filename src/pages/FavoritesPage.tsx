import { Heart, Trash2 } from 'lucide-react';
import { FavoritesGrid, useFavorites } from '@/features/favorites';
import { cn } from '@/shared/utils';

export function FavoritesPage() {
  const { favorites, isLoading, removeFavorite, clearFavorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-[var(--color-primary)]" />
          <div>
            <h1 className="text-3xl font-bold text-white">My Favorites</h1>
            <p className="text-[var(--color-text-muted)]">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
            </p>
          </div>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className={cn(
              'flex items-center gap-2 px-4 py-2',
              'text-[var(--color-text-muted)] hover:text-[var(--color-error)]',
              'transition-colors'
            )}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Grid */}
      <FavoritesGrid
        favorites={favorites}
        isLoading={isLoading}
        onRemove={removeFavorite}
      />
    </div>
  );
}
export default FavoritesPage;