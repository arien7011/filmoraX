import { Link } from 'react-router-dom';
import { Heart, Star, Calendar } from 'lucide-react';
import { cn } from '@/shared/utils';
import { getMoviePosterUrl, getMovieYear, formatMovieRating } from '../utils';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: (movie: Movie) => void;
}

export function MovieCard({
  movie,
  className,
  showFavoriteButton = true,
  isFavorite = false,
  onFavoriteClick,
}: MovieCardProps) {
  const { text: ratingText, color: ratingColor } = formatMovieRating(movie.vote_average);
  const year = getMovieYear(movie.release_date);
  const posterUrl = getMoviePosterUrl(movie.poster_path);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick?.(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
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
          alt={movie.title}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover',
            'transition-transform duration-300 ease-out',
            'group-hover:scale-110'
          )}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-poster.jpg';
          }}
        />
        
        {/* Overlay gradient */}
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-t from-black/80 via-transparent to-transparent',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300'
        )} />

        {/* Rating badge */}
        <div className={cn(
          'absolute top-2 left-2',
          'flex items-center gap-1 px-2 py-1',
          'bg-black/70 backdrop-blur-sm rounded-md',
          'text-xs font-semibold',
          ratingColor
        )}>
          <Star className="w-3 h-3 fill-current" />
          {ratingText}
        </div>

        {/* Favorite button */}
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className={cn(
              'absolute top-2 right-2',
              'p-2 rounded-full',
              'bg-black/70 backdrop-blur-sm',
              'opacity-0 group-hover:opacity-100',
              'transition-all duration-300',
              'hover:bg-[var(--color-primary)] hover:scale-110',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
              isFavorite && 'opacity-100 bg-[var(--color-primary)]'
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                'w-4 h-4 text-white',
                isFavorite && 'fill-current'
              )}
            />
          </button>
        )}

        {/* Info overlay on hover */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 p-3',
          'opacity-0 group-hover:opacity-100',
          'transform translate-y-2 group-hover:translate-y-0',
          'transition-all duration-300'
        )}>
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <Calendar className="w-3 h-3" />
            {year}
          </div>
        </div>
      </div>

      {/* Title below (visible always) */}
      <div className="p-2">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          {year}
        </p>
      </div>
    </Link>
  );
}
