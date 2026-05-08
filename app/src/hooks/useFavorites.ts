/**
 * useFavorites Hook
 * Manages favorite items using localStorage
 * Structure ready for future MySQL API integration
 */
import { useState, useEffect, useCallback } from 'react';
import type { FavoriteItem } from '@/types';

const STORAGE_KEY = 'pedigree_palace_favorites';

/**
 * StorageManager class
 * Handles all storage operations with promise-based interface
 * ready for API migration
 */
export class StorageManager {
  /** Get all favorites */
  static async getFavorites(): Promise<FavoriteItem[]> {
    // TODO: Replace with API call when MySQL backend is ready
    // const response = await fetch('/api/favorites');
    // return response.json();
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /** Save all favorites */
  static async saveFavorites(favorites: FavoriteItem[]): Promise<void> {
    // TODO: Replace with API call when MySQL backend is ready
    // await fetch('/api/favorites', { method: 'PUT', body: JSON.stringify(favorites) });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }

  /** Add a favorite */
  static async addFavorite(id: string, type: 'pet' | 'product'): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.find(f => f.id === id)) {
      favorites.push({ id, type, addedAt: new Date().toISOString() });
      await this.saveFavorites(favorites);
    }
  }

  /** Remove a favorite */
  static async removeFavorite(id: string): Promise<void> {
    const favorites = await this.getFavorites();
    const filtered = favorites.filter(f => f.id !== id);
    await this.saveFavorites(filtered);
  }

  /** Check if item is favorite */
  static async isFavorite(id: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some(f => f.id === id);
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites on mount
  useEffect(() => {
    StorageManager.getFavorites().then(data => {
      setFavorites(data);
      setLoading(false);
    });
  }, []);

  /** Toggle favorite status */
  const toggleFavorite = useCallback(async (id: string, type: 'pet' | 'product') => {
    const isFav = favorites.some(f => f.id === id);
    if (isFav) {
      await StorageManager.removeFavorite(id);
      setFavorites(prev => prev.filter(f => f.id !== id));
    } else {
      await StorageManager.addFavorite(id, type);
      setFavorites(prev => [...prev, { id, type, addedAt: new Date().toISOString() }]);
    }
  }, [favorites]);

  /** Check if item is favorite */
  const isFav = useCallback((id: string) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  return { favorites, loading, toggleFavorite, isFav };
}
