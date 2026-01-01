import { Link } from 'react-router-dom';
import { Play, Info, Star } from 'lucide-react';
import { cn } from '@/shared/utils';
import { getMovieBackdropUrl, formatMovieRating, getMovieYear } from '../utils';
import type { Movie } from '../types';

interface MovieHeroProps {
  movie: Movie;
  className?: string;
}

export function MovieHero({ movie, className }: MovieHeroProps) {
  const backdropUrl = getMovieBackdropUrl(movie.backdrop_path);
  const { text: ratingText, color: ratingColor } = formatMovieRating(movie.vote_average);
  const year = getMovieYear(movie.release_date);

  return (
    <section
      className={cn(
        'relative w-full h-[70vh] min-h-[500px] max-h-[800px]',
        'overflow-hidden',
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-slide-up">
            {/* Rating badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className={cn(
                'flex items-center gap-1 px-3 py-1',
                'bg-black/50 backdrop-blur-sm rounded-full',
                'text-sm font-semibold',
                ratingColor
              )}>
                <Star className="w-4 h-4 fill-current" />
                {ratingText}
              </span>
              <span className="text-[var(--color-text-secondary)]">{year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            {/* Overview */}
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 line-clamp-3">
              {movie.overview}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                to={`/movie/${movie.id}`}
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3',
                  'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
                  'text-white font-semibold rounded-lg',
                  'transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                )}
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </Link>
              <Link
                to={`/movie/${movie.id}`}
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3',
                  'bg-white/20 hover:bg-white/30',
                  'text-white font-semibold rounded-lg',
                  'backdrop-blur-sm',
                  'transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                )}
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
