import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Heart, Star, Clock, Calendar, DollarSign, Users } from 'lucide-react';
import { useMovieDetail, useMovieCredits, useMovieVideos, useSimilarMovies, getMovieBackdropUrl, getMoviePosterUrl, formatMovieRating, MovieCarousel } from '@/features/movies';
import { useFavorites } from '@/features/favorites';
import { cn, formatRuntime, formatCurrency, formatDate } from '@/shared/utils';
import { getProfileUrl } from '@/config';
import { FullPageLoader } from '@/shared/components';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  
  const { data: movie, isLoading } = useMovieDetail(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: similar } = useSimilarMovies(movieId);
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  const trailer = videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const director = credits?.crew.find(c => c.job === 'Director');
  const cast = credits?.cast.slice(0, 10) ?? [];
  const isMovieFavorite = isFavorite(movieId);

  if (isLoading || !movie) {
    return <FullPageLoader />;
  }

  const { text: ratingText, color: ratingColor } = formatMovieRating(movie.vote_average);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={getMovieBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="hidden md:block flex-shrink-0 w-64">
              <img
                src={getMoviePosterUrl(movie.poster_path, 'large')}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <Link
                to="/home"
                className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xl text-[var(--color-text-secondary)] italic mb-4">
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={cn('flex items-center gap-1 font-semibold', ratingColor)}>
                  <Star className="w-5 h-5 fill-current" />
                  {ratingText}
                </span>
                {movie.runtime && (
                  <span className="flex items-center gap-1 text-[var(--color-text-secondary)]">
                    <Clock className="w-4 h-4" />
                    {formatRuntime(movie.runtime)}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[var(--color-text-secondary)]">
                  <Calendar className="w-4 h-4" />
                  {formatDate(movie.release_date)}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3',
                      'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
                      'text-white font-semibold rounded-lg transition-colors'
                    )}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    Watch Trailer
                  </a>
                )}
                <button
                  onClick={() => toggleFavorite({
                    ...movie,
                    genre_ids: movie.genres.map(g => g.id)
                  })}
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-3',
                    'bg-white/10 hover:bg-white/20',
                    'text-white font-semibold rounded-lg transition-colors',
                    isMovieFavorite && 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isMovieFavorite && 'fill-current')} />
                  {isMovieFavorite ? 'In Favorites' : 'Add to Favorites'}
                </button>
              </div>  
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </section>

            {/* Cast */}
            {cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="text-center">
                      <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-[var(--color-surface)]">
                        <img
                          src={getProfileUrl(person.profile_path)}
                          alt={person.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-avatar.jpg';
                          }}
                        />
                      </div>
                      <p className="text-sm font-medium text-white line-clamp-1">{person.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">{person.character}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[var(--color-surface)] rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Movie Info</h3>
              
              {director && (
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Director</p>
                  <p className="text-white">{director.name}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Status</p>
                <p className="text-white">{movie.status}</p>
              </div>
              
              {movie.budget > 0 && (
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Budget</p>
                  <p className="text-white flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {formatCurrency(movie.budget)}
                  </p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Revenue</p>
                  <p className="text-white flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {formatCurrency(movie.revenue)}
                  </p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Vote Count</p>
                <p className="text-white flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {movie.vote_count.toLocaleString()} votes
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Movies */}
        {similar && similar.results.length > 0 && (
          <section className="mt-16">
            <MovieCarousel
              title="Similar Movies"
              movies={similar.results}
              favoriteIds={favoriteIds}
              onFavoriteClick={toggleFavorite}
            />
          </section>
        )}
      </div>
    </div>
  );
}

// export default MovieDetailPage;