import { useState, useEffect, useCallback, useMemo } from "react";
import { favoritesDB, type StoredFavorite } from "@/lib";
import type { Movie } from "@/features/movies";
import { movieToFavoriteInput } from "../types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<StoredFavorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load favorites from IndexedDB
  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await favoritesDB.getAll();
      setFavorites(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load favorites")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites]);

  // Add favorite
  const addFavorite = useCallback(
    async (movie: Movie) => {
      try {
        const input = movieToFavoriteInput(movie);
        await favoritesDB.add(input);
        await loadFavorites();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to add favorite")
        );
        throw err;
      }
    },
    [loadFavorites]
  );

  // Remove favorite
  const removeFavorite = useCallback(
    async (movieId: number) => {
      try {
        await favoritesDB.remove(movieId);
        await loadFavorites();
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to remove favorite")
        );
        throw err;
      }
    },
    [loadFavorites]
  );

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (movie: Movie) => {
      const isFav = await favoritesDB.isFavorite(movie.id);
      if (isFav) {
        await removeFavorite(movie.id);
      } else {
        await addFavorite(movie);
      }
    },
    [addFavorite, removeFavorite]
  );

  // Check if movie is favorite
  const isFavorite = useCallback(
    (movieId: number): boolean => {
      return favorites.some((f) => f.movieId === movieId);
    },
    [favorites]
  );

  // Get set of favorite IDs for quick lookup
  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((f) => f.movieId));
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(async () => {
    try {
      await favoritesDB.clear();
      setFavorites([]);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to clear favorites")
      );
      throw err;
    }
  }, []);

  return {
    favorites,
    favoriteIds,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    refresh: loadFavorites,
  };
}
