import { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import CategorySection from '../components/CategorySection';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import ProductGrid from '../components/ProductGrid';

function HomePage() {
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
          err?.response?.data?.message || err?.message || 'Unable to load products right now.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const trendingProducts = useMemo(() => products.slice(0, 8), [products]);
  const newArrivals = useMemo(() => [...products].reverse().slice(0, 8), [products]);

  return (
    <div className="space-y-14">
      <HeroSection />
      <CategorySection />

      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Trending Products</h2>
        </div>
        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300">
            {error}
          </p>
        ) : null}
        <ProductGrid products={trendingProducts} loading={loading} />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">New Arrivals</h2>
        </div>
        <ProductGrid products={newArrivals} loading={loading} />
      </section>

      <NewsletterSection />
    </div>
  );
}

export default HomePage;
