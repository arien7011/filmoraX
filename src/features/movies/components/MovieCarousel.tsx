import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils';
import { MovieCard } from './MovieCard';
import { MovieRowSkeleton } from './MovieSkeleton';
import type { Movie } from '../types';

interface MovieCarouselProps {
  movies: Movie[];
  isLoading?: boolean;
  title?: string;
  className?: string;
  showFavoriteButton?: boolean;
  favoriteIds?: Set<number>;
  onFavoriteClick?: (movie: Movie) => void;
  onSeeAllClick?: () => void;
}

export function MovieCarousel({
  movies,
  isLoading = false,
  title,
  className,
  showFavoriteButton = true,
  favoriteIds = new Set(),
  onFavoriteClick,
  onSeeAllClick,
}: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <section className={cn('relative', className)}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
          </div>
        )}
        <MovieRowSkeleton />
      </section>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className={cn('relative group/carousel', className)}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
          {onSeeAllClick && (
            <button
              onClick={onSeeAllClick}
              className={cn(
                'text-sm text-[var(--color-text-secondary)]',
                'hover:text-[var(--color-primary)] transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]'
              )}
            >
              See All →
            </button>
          )}
        </div>
      )}

      {/* Carousel container */}
      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10',
            'w-10 h-10 flex items-center justify-center',
            'bg-black/70 backdrop-blur-sm rounded-full',
            'text-white hover:bg-[var(--color-primary)]',
            'opacity-0 group-hover/carousel:opacity-100',
            'transition-all duration-300',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
            '-translate-x-4 group-hover/carousel:translate-x-0'
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Movies row */}
        <div
          ref={scrollRef}
          className={cn(
            'flex gap-4 overflow-x-auto scrollbar-hide',
            'scroll-smooth snap-x snap-mandatory',
            'pb-4'
          )}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[160px] sm:w-[180px] snap-start"
            >
              <MovieCard
                movie={movie}
                showFavoriteButton={showFavoriteButton}
                isFavorite={favoriteIds.has(movie.id)}
                onFavoriteClick={onFavoriteClick}
              />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className={cn(
            'absolute right-0 top-1/2 -translate-y-1/2 z-10',
            'w-10 h-10 flex items-center justify-center',
            'bg-black/70 backdrop-blur-sm rounded-full',
            'text-white hover:bg-[var(--color-primary)]',
            'opacity-0 group-hover/carousel:opacity-100',
            'transition-all duration-300',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
            'translate-x-4 group-hover/carousel:translate-x-0'
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
