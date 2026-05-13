import api from '../api/axios.js';

function normalizeAxiosError(error) {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong while loading products.';
  const normalized = new Error(message);
  normalized.status = error?.response?.status;
  normalized.cause = error;
  return normalized;
}

function normalizeCategory(value) {
  return String(value || '')
    .toLowerCase()
    .trim();
}

function productMatchesCategory(product, filterSlug) {
  if (!filterSlug) return true;
  const cat = normalizeCategory(product?.category);
  const slug = normalizeCategory(filterSlug);
  if (!cat) return false;
  if (cat === slug) return true;
  if (cat.replace(/\s+/g, '-') === slug) return true;
  return false;
}

/**
 * @returns {Promise<Array>}
 */
export async function getProducts() {
  try {
    const { data } = await api.get('/products');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw normalizeAxiosError(error);
  }
}

/**
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getProductById(id) {
  if (!id) {
    throw new Error('A product id is required.');
  }
  try {
    const { data } = await api.get(`/products/${encodeURIComponent(id)}`);
    return data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
}

/**
 * Backend exposes a flat product list; category filtering is applied client-side
 * to match existing shop/category routing behavior.
 *
 * @param {string} [category]
 * @returns {Promise<Array>}
 */
export async function getProductsByCategory(category) {
  const slug = normalizeCategory(category);
  try {
    const products = await getProducts();
    if (!slug) return products;
    return products.filter((p) => productMatchesCategory(p, slug));
  } catch (error) {
    throw normalizeAxiosError(error);
  }
}
