import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'trendora_recently_viewed';
const MAX_ITEMS = 8;

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [items, setItems] = useState(readStored);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setItems(readStored());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addProduct = useCallback((product) => {
    if (!product?._id) return;

    setItems((prev) => {
      const snapshot = {
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        category: product.category,
        slug: product.slug,
      };

      const next = [snapshot, ...prev.filter((item) => item._id !== product._id)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { items, addProduct };
}
