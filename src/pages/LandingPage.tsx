import { Link } from 'react-router-dom';
import { Film, Play, Heart, Search, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/shared/utils';

export function LandingPage() {
  const features = [
    { icon: Search, title: 'Discover', description: 'Browse 500,000+ movies from around the world' },
    { icon: Heart, title: 'Curate', description: 'Save your favorites and build your personal collection' },
    { icon: Star, title: 'Rate', description: 'See ratings and reviews from millions of users' },
    { icon: TrendingUp, title: 'Trending', description: 'Stay updated with the latest releases' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Film className="w-16 h-16 text-[var(--color-primary)]" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">Filmorax</h1>
          </div>
          
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto">
            Your personalized gateway to the world of cinema
          </p>
          <p className="text-lg text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto">
            Discover, explore, and curate your personal movie collection
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/home"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4',
                'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
                'text-white font-semibold text-lg rounded-xl',
                'transition-all duration-200 hover:scale-105',
                'shadow-lg shadow-[var(--color-primary)]/30'
              )}
            >
              <Play className="w-5 h-5 fill-current" />
              Get Started
            </Link>
            <Link
              to="/login"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4',
                'bg-white/10 hover:bg-white/20',
                'text-white font-semibold text-lg rounded-xl',
                'backdrop-blur-sm transition-all duration-200'
              )}
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Everything you need to discover great movies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={cn(
                  'p-6 rounded-2xl',
                  'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]',
                  'border border-[var(--color-border)]',
                  'transition-all duration-300 hover:scale-105'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl mb-4',
                  'bg-[var(--color-primary)]/10 flex items-center justify-center'
                )}>
                  <feature.icon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text-muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-background-secondary)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your cinematic journey?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            Join millions of movie enthusiasts and never miss a great film again.
          </p>
          <Link
            to="/home"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4',
              'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]',
              'text-white font-semibold text-lg rounded-xl',
              'transition-all duration-200'
            )}
          >
            Browse Movies
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--color-border)]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {new Date().getFullYear()} Filmorax. Powered by TMDB API.
          </p>
        </div>
      </footer>
    </div>
  );
}
// export default LandingPage;