import { Link } from 'react-router-dom';
import { Heart, Trash2, Star, Calendar } from 'lucide-react';
import { cn, getYear } from '@/shared/utils';
import { getMoviePosterUrl, formatMovieRating } from '@/features/movies';
import type { StoredFavorite } from '@/lib';

interface FavoriteCardProps {
  favorite: StoredFavorite;
  onRemove?: (movieId: number) => void;
  className?: string;
}

export function FavoriteCard({ favorite, onRemove, className }: FavoriteCardProps) {
  const posterUrl = getMoviePosterUrl(favorite.posterPath);
  const { text: ratingText, color: ratingColor } = formatMovieRating(favorite.voteAverage);
  const year = getYear(favorite.releaseDate);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(favorite.movieId);
  };

  return (
    <Link
      to={`/movie/${favorite.movieId}`}
      className={cn(
        'group relative block rounded-lg overflow-hidden',
        'transition-transform duration-300 ease-out',
        'hover:scale-105 hover:z-10',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
        className
      )}
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative overflow-hidden bg-[var(--color-surface)]">
        <img
          src={posterUrl}
          alt={favorite.title}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover',
            'transition-transform duration-300 ease-out',
            'group-hover:scale-110'
          )}
        />
        
        {/* Overlay gradient */}
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-t from-black/80 via-transparent to-transparent',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300'
        )} />

        {/* Favorite indicator */}
        <div className="absolute top-2 left-2">
          <Heart className="w-5 h-5 text-[var(--color-primary)] fill-current" />
        </div>

        {/* Rating badge */}
        <div className={cn(
          'absolute top-2 right-2',
          'flex items-center gap-1 px-2 py-1',
          'bg-black/70 backdrop-blur-sm rounded-md',
          'text-xs font-semibold',
          ratingColor
        )}>
          <Star className="w-3 h-3 fill-current" />
          {ratingText}
        </div>

        {/* Remove button */}
        <button
          onClick={handleRemove}
          className={cn(
            'absolute bottom-2 right-2',
            'p-2 rounded-full',
            'bg-black/70 backdrop-blur-sm',
            'opacity-0 group-hover:opacity-100',
            'transition-all duration-300',
            'hover:bg-[var(--color-error)] hover:scale-110',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
          )}
          aria-label="Remove from favorites"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>

        {/* Info overlay */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 p-3',
          'opacity-0 group-hover:opacity-100',
          'transform translate-y-2 group-hover:translate-y-0',
          'transition-all duration-300'
        )}>
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            {favorite.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <Calendar className="w-3 h-3" />
            {year}
          </div>
        </div>
      </div>

      {/* Title below */}
      <div className="p-2">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
          {favorite.title}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          {year}
        </p>
      </div>
    </Link>
  );
}
