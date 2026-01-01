import { Link } from 'react-router-dom';
import { Home, Search, Film } from 'lucide-react';
import { cn } from '@/shared/utils';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Film className="w-24 h-24 mx-auto text-[var(--color-text-muted)] mb-4" />
          <h1 className="text-8xl font-bold text-[var(--color-primary)]">404</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/home"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3',
              'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
              'text-white font-semibold rounded-lg transition-colors'
            )}
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            to="/search"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3',
              'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]',
              'text-white font-semibold rounded-lg transition-colors'
            )}
          >
            <Search className="w-5 h-5" />
            Search Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
// export default NotFoundPage;