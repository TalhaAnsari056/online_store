import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

function ProductSection({ title, subtitle, products = [], viewAllTo }) {
  return (
    <section className="space-y-5">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
          {subtitle ? (
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
          ) : null}
        </div>
        {viewAllTo ? (
          <Link
            to={viewAllTo}
            className="shrink-0 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
          >
            View all
          </Link>
        ) : null}
      </header>
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductSection;
