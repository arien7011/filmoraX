import { cn } from '@/shared/utils';

interface MovieSkeletonProps {
  className?: string;
}

export function MovieSkeleton({ className }: MovieSkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="aspect-[2/3] bg-[var(--color-surface)] rounded-lg mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-[var(--color-surface)] rounded w-3/4" />
        <div className="h-3 bg-[var(--color-surface)] rounded w-1/2" />
      </div>
    </div>
  );
}

interface MovieGridSkeletonProps {
  count?: number;
  className?: string;
}

export function MovieGridSkeleton({ count = 12, className }: MovieGridSkeletonProps) {
  return (
    <div className={cn(
      'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4',
      className
    )}>
      {Array.from({ length: count }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}

interface MovieRowSkeletonProps {
  count?: number;
  className?: string;
}

export function MovieRowSkeleton({ count = 6, className }: MovieRowSkeletonProps) {
  return (
    <div className={cn('flex gap-4 overflow-hidden', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-[180px]">
          <MovieSkeleton />
        </div>
      ))}
    </div>
  );
}
