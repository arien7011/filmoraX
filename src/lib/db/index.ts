import Dexie, { type Table } from "dexie";

// Types for stored data
export interface StoredFavorite {
  id: number;
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  overview: string;
  addedAt: Date;
}

export interface StoredSearchHistory {
  id?: number;
  query: string;
  searchedAt: Date;
}

export interface StoredUserPreferences {
  id?: number;
  theme: "light" | "dark" | "system";
  language: string;
  region: string;
  adultContent: boolean;
}

// Database class
export class FilmoraxDatabase extends Dexie {
  favorites!: Table<StoredFavorite, number>;
  searchHistory!: Table<StoredSearchHistory, number>;
  preferences!: Table<StoredUserPreferences, number>;

  constructor() {
    super("FilmoraxDB");

    // Define schema
    this.version(1).stores({
      favorites: "++id, movieId, title, addedAt",
      searchHistory: "++id, query, searchedAt",
      preferences: "++id",
    });
  }
}

// Create database instance
export const db = new FilmoraxDatabase();

// Helper functions for favorites
export const favoritesDB = {
  async getAll(): Promise<StoredFavorite[]> {
    return db.favorites.orderBy("addedAt").reverse().toArray();
  },

  async getById(movieId: number): Promise<StoredFavorite | undefined> {
    return db.favorites.where("movieId").equals(movieId).first();
  },

  async add(favorite: Omit<StoredFavorite, "id" | "addedAt">): Promise<number> {
    const existing = await this.getById(favorite.movieId);
    if (existing) {
      return existing.id;
    }
    return db.favorites.add({
      ...favorite,
      id: favorite.movieId,
      addedAt: new Date(),
    });
  },

  async remove(movieId: number): Promise<void> {
    await db.favorites.where("movieId").equals(movieId).delete();
  },

  async isFavorite(movieId: number): Promise<boolean> {
    const count = await db.favorites.where("movieId").equals(movieId).count();
    return count > 0;
  },

  async clear(): Promise<void> {
    await db.favorites.clear();
  },

  async count(): Promise<number> {
    return db.favorites.count();
  },
};

// Helper functions for search history
export const searchHistoryDB = {
  async getAll(limit = 10): Promise<StoredSearchHistory[]> {
    return db.searchHistory
      .orderBy("searchedAt")
      .reverse()
      .limit(limit)
      .toArray();
  },

  async add(query: string): Promise<number> {
    // Remove existing same query
    await db.searchHistory.where("query").equalsIgnoreCase(query).delete();

    // Add new entry
    const id = await db.searchHistory.add({
      query,
      searchedAt: new Date(),
    });

    // Keep only last 20 searches
    const count = await db.searchHistory.count();
    if (count > 20) {
      const oldest = await db.searchHistory.orderBy("searchedAt").first();
      if (oldest?.id) {
        await db.searchHistory.delete(oldest.id);
      }
    }

    return id;
  },

  async remove(id: number): Promise<void> {
    await db.searchHistory.delete(id);
  },

  async clear(): Promise<void> {
    await db.searchHistory.clear();
  },
};

// Helper functions for preferences
export const preferencesDB = {
  async get(): Promise<StoredUserPreferences | undefined> {
    return db.preferences.toCollection().first();
  },

  async save(preferences: Omit<StoredUserPreferences, "id">): Promise<void> {
    const existing = await this.get();
    if (existing?.id) {
      await db.preferences.update(existing.id, preferences);
    } else {
      await db.preferences.add(preferences);
    }
  },

  async reset(): Promise<void> {
    await db.preferences.clear();
    await db.preferences.add({
      theme: "dark",
      language: "en",
      region: "US",
      adultContent: false,
    });
  },
};
