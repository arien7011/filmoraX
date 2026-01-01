import { Link } from 'react-router-dom';
import { Film, Github, Twitter, Heart } from 'lucide-react';
import { cn } from '@/shared/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    discover: [
      { href: '/movies/popular', label: 'Popular Movies' },
      { href: '/movies/now-playing', label: 'Now Playing' },
      { href: '/movies/upcoming', label: 'Upcoming' },
      { href: '/movies/top-rated', label: 'Top Rated' },
    ],
    account: [
      { href: '/favorites', label: 'My Favorites' },
      { href: '/profile', label: 'Profile' },
    ],
    legal: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Contact' },
    ],
  };

  return (
    <footer className={cn(
      'bg-[var(--color-background-secondary)]',
      'border-t border-[var(--color-border)]',
      'mt-auto',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/home"
              className="flex items-center gap-2 text-[var(--color-primary)] mb-4"
            >
              <Film className="w-8 h-8" />
              <span className="text-xl font-bold">Filmorax</span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Your personalized gateway to the world of cinema. Discover, explore, and curate your personal movie collection.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Discover links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Discover</h3>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              © {currentYear} Filmorax. All rights reserved.
            </p>
            <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-[var(--color-primary)] fill-current" /> using TMDB API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
