/**
 * useAdvancedFiltering Hook
 * Optimized filtering logic with useMemo for performance
 * Handles: Type, Breed, Price Range, Size, Search Term
 */
import { useMemo, useCallback } from 'react';
import type { Pet, FilterState, FilterConfig } from '@/types';

export function useAdvancedFiltering(
  pets: Pet[],
  filterState: FilterState
) {
  /**
   * Compute dynamic filter config based on active pet type
   */
  const filterConfig = useMemo<FilterConfig>(() => {
    const typedPets = pets.filter(p => p.type === filterState.petType);

    return {
      breeds: [...new Set(typedPets.map(p => p.breed))].sort(),
      priceRange: {
        min: Math.min(...typedPets.map(p => p.price)),
        max: Math.max(...typedPets.map(p => p.price)),
      },
      sizes: Array.from(
        new Set(typedPets.map(p => p.size))
      ) as ('small' | 'medium' | 'large')[],
    };
  }, [pets, filterState.petType]);

  /**
   * Apply all filters with memoization
   */
  const filteredPets = useMemo<Pet[]>(() => {
    let result = pets;

    // Filter by type
    result = result.filter(pet => pet.type === filterState.petType);

    // Filter by breeds
    if (filterState.selectedBreeds.length > 0) {
      result = result.filter(pet =>
        filterState.selectedBreeds.includes(pet.breed)
      );
    }

    // Filter by price range
    result = result.filter(
      pet =>
        pet.price >= filterState.priceRange[0] &&
        pet.price <= filterState.priceRange[1]
    );

    // Filter by sizes
    if (filterState.selectedSizes.length > 0) {
      result = result.filter(pet =>
        filterState.selectedSizes.includes(pet.size)
      );
    }

    // Filter by search term
    if (filterState.searchTerm.trim()) {
      const term = filterState.searchTerm.toLowerCase();
      result = result.filter(
        pet =>
          pet.name.toLowerCase().includes(term) ||
          pet.breed.toLowerCase().includes(term) ||
          pet.description.toLowerCase().includes(term)
      );
    }

    // Sort by availability and price
    return result.sort((a, b) => {
      if (a.available !== b.available) {
        return a.available ? -1 : 1;
      }
      return a.price - b.price;
    });
  }, [pets, filterState]);

  /**
   * Get count of results without search term
   */
  const totalCount = useMemo(() => {
    return pets.filter(p => p.type === filterState.petType).length;
  }, [pets, filterState.petType]);

  /**
   * Get count of results with filters applied
   */
  const filteredCount = filteredPets.length;

  /**
   * Check if any filters are active (beyond type)
   */
  const hasActiveFilters = useCallback(() => {
    return (
      filterState.selectedBreeds.length > 0 ||
      filterState.priceRange[0] > filterConfig.priceRange.min ||
      filterState.priceRange[1] < filterConfig.priceRange.max ||
      filterState.selectedSizes.length > 0 ||
      filterState.searchTerm.trim() !== ''
    );
  }, [filterState, filterConfig]);

  return {
    filteredPets,
    filterConfig,
    totalCount,
    filteredCount,
    hasActiveFilters: hasActiveFilters(),
  };
}
