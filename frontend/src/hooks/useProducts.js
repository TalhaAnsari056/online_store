import { useMemo } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getProductById, getProducts } from '../services/productService.js';

export const productKeys = {
  all: ['products'],
  list: (filters = {}) => ['products', 'list', filters],
  detail: (id) => ['products', 'detail', id],
};

export function normalizeListFilters(filters = {}) {
  const normalized = {};

  if (filters.category) normalized.category = filters.category;
  if (filters.gender) normalized.gender = filters.gender;
  if (filters.keyword?.trim()) normalized.keyword = filters.keyword.trim();
  if (filters.featured) normalized.featured = filters.featured;
  if (filters.sort) normalized.sort = filters.sort;

  return normalized;
}

/**
 * Full product catalog (suspends until data is ready).
 */
export function useProducts() {
  return useSuspenseQuery({
    queryKey: productKeys.all,
    queryFn: () => getProducts(),
  });
}

/**
 * Filtered product list for shop, collections, categories, and search.
 */
export function useProductList(filters = {}, options = {}) {
  const normalizedFilters = useMemo(() => normalizeListFilters(filters), [filters]);

  return useQuery({
    queryKey: productKeys.list(normalizedFilters),
    queryFn: () => getProducts(normalizedFilters),
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
    ...options,
  });
}

/**
 * Single product by id (suspends until data is ready).
 */
export function useProduct(id) {
  return useSuspenseQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
  });
}
