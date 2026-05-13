import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductById, getProducts, getProductsByCategory } from '../services/productService.js';

// TanStack Query v5: `useQuery` no longer supports `suspense`; suspense boundaries use `useSuspenseQuery`.

export const productKeys = {
  all: ['products'],
  detail: (id) => ['products', 'detail', id],
  byCategory: (category) => ['products', 'category', category ?? ''],
};

/**
 * Full product catalog (suspends until data is ready).
 */
export function useProducts() {
  return useSuspenseQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
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

/**
 * Products filtered by category slug/name (suspends until data is ready).
 */
export function useProductsByCategory(category) {
  return useSuspenseQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: () => getProductsByCategory(category),
  });
}
