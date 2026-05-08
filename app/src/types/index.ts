/**
 * Pedigree Palace - Type Definitions
 * All type definitions for the application
 */

export interface Pet {
  id: string;
  name: string;
  breed: string;
  type: 'dog' | 'cat';
  size: 'small' | 'medium' | 'large';
  price: number;
  image: string;
  description: string;
  available: boolean;
  origin?: string;
  temperament?: string;
  age?: number;
  certifications?: string[];
}

export interface FilterState {
  petType: 'dog' | 'cat';
  selectedBreeds: string[];
  priceRange: [number, number];
  selectedSizes: ('small' | 'medium' | 'large')[];
  searchTerm: string;
}

export interface FilterConfig {
  breeds: string[];
  priceRange: { min: number; max: number };
  sizes: ('small' | 'medium' | 'large')[];
}

export interface Product {
  id: string;
  name: string;
  category: 'food' | 'accessories';
  price: number;
  image: string;
  description: string;
}

export interface OrderStatus {
  id: string;
  status: 'preparing' | 'shipping' | 'delivered';
  date: string;
  estimatedDelivery: string;
  items: string[];
}

export interface FavoriteItem {
  id: string;
  type: 'pet' | 'product';
  addedAt: string;
}
