import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/shared/utils';
import { useSearchHistory } from '../hooks';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  initialQuery = '',
  placeholder = 'Search for movies...',
  autoFocus = false,
  className,
  onSearch,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();

  // Handle click outside to close history dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await addToHistory(query.trim());
      setShowHistory(false);
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleHistoryClick = async (historyQuery: string) => {
    setQuery(historyQuery);
    setShowHistory(false);
    await addToHistory(historyQuery);
    if (onSearch) {
      onSearch(historyQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(historyQuery)}`);
    }
  };

  const handleRemoveHistory = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await removeFromHistory(id);
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <form onSubmit={handleSubmit}>
        <div className={cn(
          'relative flex items-center',
          'bg-[var(--color-surface)] rounded-lg',
          'border border-[var(--color-border)]',
          'transition-all duration-200',
          isFocused && 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20'
        )}>
          <Search className={cn(
            'absolute left-4 w-5 h-5',
            'text-[var(--color-text-muted)]',
            'transition-colors duration-200',
            isFocused && 'text-[var(--color-primary)]'
          )} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowHistory(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              'w-full py-3 pl-12 pr-10',
              'bg-transparent',
              'text-[var(--color-text-primary)]',
              'placeholder:text-[var(--color-text-muted)]',
              'focus:outline-none',
              'text-base'
            )}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'absolute right-4',
                'p-1 rounded-full',
                'text-[var(--color-text-muted)]',
                'hover:text-[var(--color-text-primary)]',
                'hover:bg-[var(--color-surface-hover)]',
                'transition-colors duration-200'
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search history dropdown */}
      {showHistory && history.length > 0 && !query && (
        <div className={cn(
          'absolute top-full left-0 right-0 mt-2',
          'bg-[var(--color-surface)] rounded-lg',
          'border border-[var(--color-border)]',
          'shadow-lg overflow-hidden',
          'z-50 animate-slide-down'
        )}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)]">
            <span className="text-sm text-[var(--color-text-muted)]">Recent Searches</span>
            <button
              onClick={clearHistory}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
            >
              Clear All
            </button>
          </div>
          <ul>
            {history.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleHistoryClick(item.query)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3',
                    'hover:bg-[var(--color-surface-hover)]',
                    'transition-colors duration-150'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                    <span className="text-[var(--color-text-primary)]">{item.query}</span>
                  </div>
                  <button
                    onClick={(e) => item.id && handleRemoveHistory(e, item.id)}
                    className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-error)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
