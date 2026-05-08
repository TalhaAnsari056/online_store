import { useEffect, useState } from 'react';
import api from './api/axios';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || 'Failed to fetch products.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-black tracking-tight text-slate-900">
            Nova<span className="text-indigo-600">Store</span>
          </div>
          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Cart
          </button>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Premium Collection
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              Discover trending products for everyday life
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              Shop smart with curated picks, fast shipping, and quality you can trust.
              Explore our latest arrivals below.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-left text-white shadow-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-indigo-100">
              This Week
            </p>
            <h2 className="mt-2 text-3xl font-bold">Up to 35% off selected products</h2>
            <p className="mt-4 text-indigo-100">
              Limited-time deals on electronics, lifestyle, and more.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-sm text-slate-500">{products.length} items</p>
          </div>

          {loading ? (
            <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm">
              Loading products...
            </p>
          ) : null}

          {!loading && error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              Error: {error}
            </p>
          ) : null}

          {!loading && !error && products.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm">
              No products found.
            </p>
          ) : null}

          {!loading && !error && products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : null}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>NovaStore - modern shopping experience</p>
          <p>Built with React, Tailwind CSS, and Node.js</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
