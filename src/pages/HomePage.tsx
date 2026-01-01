import { useNavigate } from 'react-router-dom';
import { MovieHero, MovieCarousel, useTrendingMovies, usePopularMovies, useNowPlayingMovies, useTopRatedMovies, useUpcomingMovies } from '@/features/movies';
import { useFavorites } from '@/features/favorites';
import { FullPageLoader } from '@/shared/components';

export function HomePage() {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useFavorites();
  
  const { data: trending, isLoading: trendingLoading } = useTrendingMovies();
  const { data: popular, isLoading: popularLoading } = usePopularMovies();
  const { data: nowPlaying, isLoading: nowPlayingLoading } = useNowPlayingMovies();
  const { data: topRated, isLoading: topRatedLoading } = useTopRatedMovies();
  const { data: upcoming, isLoading: upcomingLoading } = useUpcomingMovies();

  const heroMovie = trending?.results[0];
  const isLoading = trendingLoading && !trending;

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroMovie && <MovieHero movie={heroMovie} />}

      {/* Movie Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <MovieCarousel
          title="Trending This Week"
          movies={trending?.results.slice(1) ?? []}
          isLoading={trendingLoading}
          favoriteIds={favoriteIds}
          onFavoriteClick={toggleFavorite}
          onSeeAllClick={() => navigate('/movies/popular')}
        />

        <MovieCarousel
          title="Popular Movies"
          movies={popular?.results ?? []}
          isLoading={popularLoading}
          favoriteIds={favoriteIds}
          onFavoriteClick={toggleFavorite}
          onSeeAllClick={() => navigate('/movies/popular')}
        />

        <MovieCarousel
          title="Now Playing"
          movies={nowPlaying?.results ?? []}
          isLoading={nowPlayingLoading}
          favoriteIds={favoriteIds}
          onFavoriteClick={toggleFavorite}
          onSeeAllClick={() => navigate('/movies/now-playing')}
        />

        <MovieCarousel
          title="Top Rated"
          movies={topRated?.results ?? []}
          isLoading={topRatedLoading}
          favoriteIds={favoriteIds}
          onFavoriteClick={toggleFavorite}
          onSeeAllClick={() => navigate('/movies/top-rated')}
        />

        <MovieCarousel
          title="Upcoming"
          movies={upcoming?.results ?? []}
          isLoading={upcomingLoading}
          favoriteIds={favoriteIds}
          onFavoriteClick={toggleFavorite}
          onSeeAllClick={() => navigate('/movies/upcoming')}
        />
      </div>
    </div>
  );
}

export default HomePage;