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

function buildQueryParams(filters = {}) {
  const params = {};

  if (filters.category) params.category = filters.category;
  if (filters.gender) params.gender = filters.gender;
  if (filters.keyword) params.keyword = filters.keyword;
  if (filters.featured) params.featured = 'true';
  if (filters.sort) params.sort = filters.sort;

  return params;
}

/**
 * @param {object} [filters]
 * @returns {Promise<Array>}
 */
export async function getProducts(filters = {}) {
  try {
    const { data } = await api.get('/products', { params: buildQueryParams(filters) });
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
