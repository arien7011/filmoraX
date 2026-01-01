import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Search, Heart, User, Menu, X, Home, TrendingUp, Clock, Star } from 'lucide-react';
import { cn } from '@/shared/utils';
import { SearchBar } from '@/features/search';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/movies/popular', label: 'Popular', icon: TrendingUp },
    { href: '/movies/now-playing', label: 'Now Playing', icon: Clock },
    { href: '/movies/top-rated', label: 'Top Rated', icon: Star },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50',
      'bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent',
      'backdrop-blur-sm',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2 text-[var(--color-primary)] hover:opacity-80 transition-opacity"
          >
            <Film className="w-8 h-8" />
            <span className="text-xl font-bold hidden sm:block">Filmorax</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium',
                  'transition-colors duration-200',
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {showSearch ? (
              <div className="w-64">
                <SearchBar
                  autoFocus
                  className="w-full"
                  onSearch={(query) => {
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                    setShowSearch(false);
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className={cn(
                  'p-2 rounded-lg',
                  'text-[var(--color-text-secondary)] hover:text-white',
                  'hover:bg-white/5',
                  'transition-colors duration-200'
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            <Link
              to="/favorites"
              className={cn(
                'p-2 rounded-lg',
                'transition-colors duration-200',
                isActive('/favorites')
                  ? 'text-[var(--color-primary)] bg-white/10'
                  : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
              )}
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
            </Link>
            
            <Link
              to="/profile"
              className={cn(
                'p-2 rounded-lg',
                'transition-colors duration-200',
                isActive('/profile')
                  ? 'text-[var(--color-primary)] bg-white/10'
                  : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
              )}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg',
              'text-[var(--color-text-secondary)] hover:text-white',
              'hover:bg-white/5',
              'transition-colors duration-200'
            )}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={cn(
          'md:hidden',
          'bg-[var(--color-background)]/95 backdrop-blur-lg',
          'border-t border-[var(--color-border)]',
          'animate-slide-down'
        )}>
          <div className="container mx-auto px-4 py-4">
            {/* Mobile search */}
            <SearchBar
              className="mb-4"
              onSearch={(query) => {
                navigate(`/search?q=${encodeURIComponent(query)}`);
                setIsMobileMenuOpen(false);
              }}
            />
            
            {/* Mobile navigation */}
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg',
                    'transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-white bg-white/10'
                      : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              
              <Link
                to="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg',
                  'transition-colors duration-200',
                  isActive('/favorites')
                    ? 'text-[var(--color-primary)] bg-white/10'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                )}
              >
                <Heart className="w-5 h-5" />
                Favorites
              </Link>
              
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg',
                  'transition-colors duration-200',
                  isActive('/profile')
                    ? 'text-[var(--color-primary)] bg-white/10'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                )}
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
