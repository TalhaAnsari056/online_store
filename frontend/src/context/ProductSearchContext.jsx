import { createContext, useContext } from 'react';
import { useProductSearch } from '../hooks/useProductSearch';

const ProductSearchContext = createContext(null);

export function ProductSearchProvider({ children }) {
  const search = useProductSearch();
  return (
    <ProductSearchContext.Provider value={search}>{children}</ProductSearchContext.Provider>
  );
}

export function useProductSearchContext() {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error('useProductSearchContext must be used within ProductSearchProvider');
  }
  return context;
}
