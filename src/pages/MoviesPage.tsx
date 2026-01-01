import { useParams } from 'react-router-dom';
import { MovieGrid, useMovies } from '@/features/movies';
import { useFavorites } from '@/features/favorites';
import { CATEGORY_LABELS, type MovieCategory } from '@/shared/utils';

export function MoviesPage() {
  const { category = 'popular' } = useParams<{ category: string }>();
  const categoryKey = category.replace('-', '_') as MovieCategory;
  const { favoriteIds, toggleFavorite } = useFavorites();
  
  const { data, isLoading } = useMovies(categoryKey);
  const title = CATEGORY_LABELS[categoryKey] || 'Movies';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
      <MovieGrid
        movies={data?.results ?? []}
        isLoading={isLoading}
        favoriteIds={favoriteIds}
        onFavoriteClick={toggleFavorite}
      />
    </div>
  );
}
export default MoviesPage;