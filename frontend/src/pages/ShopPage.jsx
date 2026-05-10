import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductGrid from '../components/ProductGrid';

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

function titleCase(slug) {
  if (!slug) return '';
  return String(slug)
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function ShopPage() {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const legacyCategory = searchParams.get('category');

  const activeFilter = categoryName || legacyCategory || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await api.get('/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || 'Unable to load products.';
        setError(message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    if (!normalizeCategory(activeFilter)) return products;
    return products.filter((p) => productMatchesCategory(p, activeFilter));
  }, [products, activeFilter]);

  const heading = normalizeCategory(activeFilter)
    ? `${titleCase(activeFilter)}`
    : 'Shop';

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            TRENDORA
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">{heading}</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
            {normalizeCategory(activeFilter)
              ? `Curated ${titleCase(activeFilter).toLowerCase()} pieces with a minimal luxury edge.`
              : 'Explore the full collection — premium streetwear for every move.'}
          </p>
        </div>
        {!loading && !error ? (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          {error}
        </p>
      ) : null}

      <ProductGrid products={filtered} loading={loading} />
    </section>
  );
}

export default ShopPage;
