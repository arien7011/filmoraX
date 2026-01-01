import { Heart, Search, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils';

interface EmptyFavoritesProps {
  className?: string;
}

export function EmptyFavorites({ className }: EmptyFavoritesProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 text-center',
      className
    )}>
      <div className="relative mb-6">
        <div className={cn(
          'w-24 h-24 rounded-full',
          'bg-[var(--color-surface)] flex items-center justify-center'
        )}>
          <Heart className="w-12 h-12 text-[var(--color-text-muted)]" />
        </div>
        <div className={cn(
          'absolute -bottom-1 -right-1',
          'w-8 h-8 rounded-full',
          'bg-[var(--color-primary)] flex items-center justify-center'
        )}>
          <Film className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
        No favorites yet
      </h3>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-md">
        Start building your personal movie collection. Browse movies and click the heart icon to add them to your favorites.
      </p>
      
      <div className="flex items-center gap-4">
        <Link
          to="/home"
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3',
            'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
            'text-white font-semibold rounded-lg',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
          )}
        >
          <Film className="w-5 h-5" />
          Browse Movies
        </Link>
        <Link
          to="/search"
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3',
            'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]',
            'text-white font-semibold rounded-lg',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]'
          )}
        >
          <Search className="w-5 h-5" />
          Search
        </Link>
      </div>
    </div>
  );
}
