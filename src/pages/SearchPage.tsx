import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { SearchBar, useSearch, useDebounce } from '@/features/search';
import { MovieGrid } from '@/features/movies';
import { useFavorites } from '@/features/favorites';
import { useState, useEffect } from 'react';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const { favoriteIds, toggleFavorite } = useFavorites();
  
  const { data, isLoading } = useSearch(debouncedQuery);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Search Movies
        </h1>
        <SearchBar
          initialQuery={initialQuery}
          autoFocus
          onSearch={setQuery}
        />
      </div>

      {/* Results */}
      {debouncedQuery ? (
        <div>
          {data && (
            <p className="text-[var(--color-text-secondary)] mb-6">
              Found {data.total_results.toLocaleString()} results for "{debouncedQuery}"
            </p>
          )}
          <MovieGrid
            movies={data?.results ?? []}
            isLoading={isLoading}
            favoriteIds={favoriteIds}
            onFavoriteClick={toggleFavorite}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-[var(--color-surface)] flex items-center justify-center mb-6">
            <SearchIcon className="w-12 h-12 text-[var(--color-text-muted)]" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Start your search
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md">
            Type a movie title above to search through our extensive database of films.
          </p>
        </div>
      )}
    </div>
  );
}
export default SearchPage;