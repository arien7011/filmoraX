import { Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyPageProps {
  children: React.ReactNode;
}

export function LazyPage({ children }: LazyPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}