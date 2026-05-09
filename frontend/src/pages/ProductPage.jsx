import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-[380px] rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900" />
      </div>

      <div className="space-y-5">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Product Detail</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Product ID: {id}</p>
        <p className="text-slate-600 dark:text-slate-300">
          Premium oversized hoodie with heavyweight fabric, relaxed fit, and embroidered TRENDORA mark.
        </p>
        <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">$99.00</p>

        <div className="flex flex-wrap gap-3">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              type="button"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
            >
              {size}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductPage;
