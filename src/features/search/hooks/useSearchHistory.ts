import { useState, useEffect, useCallback } from "react";
import { searchHistoryDB } from "@/lib";
import type { StoredSearchHistory } from "@/lib";

export function useSearchHistory() {
  const [history, setHistory] = useState<StoredSearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await searchHistoryDB.getAll();
      setHistory(data);
    } catch (error) {
      console.error("Failed to load search history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  const addToHistory = useCallback(
    async (query: string) => {
      try {
        await searchHistoryDB.add(query);
        await loadHistory();
      } catch (error) {
        console.error("Failed to add to search history:", error);
      }
    },
    [loadHistory]
  );

  const removeFromHistory = useCallback(
    async (id: number) => {
      try {
        await searchHistoryDB.remove(id);
        await loadHistory();
      } catch (error) {
        console.error("Failed to remove from search history:", error);
      }
    },
    [loadHistory]
  );

  const clearHistory = useCallback(async () => {
    try {
      await searchHistoryDB.clear();
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  }, []);

  return {
    history,
    isLoading,
    addToHistory,
    removeFromHistory,
    clearHistory,
    refresh: loadHistory,
  };
}
