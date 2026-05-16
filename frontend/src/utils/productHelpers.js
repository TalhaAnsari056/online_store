export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getProductImage(image) {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE}${image}`;
}

export function normalizeSlug(value) {
  return String(value || '')
    .toLowerCase()
    .trim();
}

export function categoryToSlug(category) {
  return normalizeSlug(category).replace(/\s+/g, '-');
}

export function titleCaseFromSlug(slug) {
  if (!slug) return '';
  return String(slug)
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatGender(gender) {
  if (!gender) return '';
  const value = String(gender).toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatPrice(price) {
  return Number(price || 0).toFixed(2);
}

export function getStockMeta(countInStock = 0) {
  if (countInStock <= 0) {
    return {
      label: 'Out of Stock',
      className: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
      tone: 'text-rose-600 dark:text-rose-400',
      inStock: false,
    };
  }
  if (countInStock <= 5) {
    return {
      label: 'Low Stock',
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
      tone: 'text-amber-600 dark:text-amber-400',
      inStock: true,
    };
  }
  return {
    label: 'In Stock',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    tone: 'text-emerald-600 dark:text-emerald-400',
    inStock: true,
  };
}
