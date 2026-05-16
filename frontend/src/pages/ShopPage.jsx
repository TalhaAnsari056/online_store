import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import ProductSearch from '../components/ProductSearch';
import { GENDER_COLLECTIONS, PRODUCT_CATEGORIES } from '../constants/catalog';
import { useProductSearchContext } from '../context/ProductSearchContext';
import { useProductList } from '../hooks/useProducts';
import { titleCaseFromSlug } from '../utils/productHelpers';

function resolvePageMeta({ categoryName, gender, keyword }) {
  if (keyword) {
    return {
      heading: 'Search Results',
      subtitle: `Showing matches for "${keyword}"`,
    };
  }

  if (gender) {
    const collection = GENDER_COLLECTIONS.find((item) => item.slug === gender);
    return {
      heading: collection ? `${collection.label}'s Collection` : titleCaseFromSlug(gender),
      subtitle: 'Curated streetwear essentials tailored for your style.',
    };
  }

  if (categoryName) {
    const category = PRODUCT_CATEGORIES.find((item) => item.slug === categoryName);
    return {
      heading: category?.label || titleCaseFromSlug(categoryName),
      subtitle: `Explore premium ${(category?.label || titleCaseFromSlug(categoryName)).toLowerCase()} built for everyday city wear.`,
    };
  }

  return {
    heading: 'Shop',
    subtitle: 'Explore the full collection — premium streetwear for every move.',
  };
}

function ShopPage() {
  const { categoryName, gender } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = (searchParams.get('keyword') || '').trim();
  const { isDebouncing } = useProductSearchContext();

  const filters = useMemo(() => {
    const next = {};
    if (categoryName) next.category = categoryName;
    if (gender) next.gender = gender;
    if (keyword) next.keyword = keyword;
    return next;
  }, [categoryName, gender, keyword]);

  const { heading, subtitle } = useMemo(
    () => resolvePageMeta({ categoryName, gender, keyword }),
    [categoryName, gender, keyword]
  );

  const { data: products = [], isLoading, isFetching, isError, error } = useProductList(filters);

  const showLoading = isLoading || isDebouncing || (isFetching && !isDebouncing);

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            TRENDORA
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">{heading}</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
        </div>
        {!showLoading && !isError ? (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        ) : null}
      </div>

      <ProductSearch
        className="relative mx-auto w-full max-w-xl"
        inputClassName="w-full rounded-full border border-slate-300 bg-white py-3 pl-10 pr-10 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        id="shop-product-search"
      />

      {isDebouncing ? (
        <p className="text-center text-xs font-medium text-indigo-600 dark:text-indigo-400">
          Searching...
        </p>
      ) : null}

      {isError ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          {error?.message || 'Unable to load products.'}
        </p>
      ) : null}

      <ProductGrid products={products} loading={showLoading} />
    </section>
  );
}

export default ShopPage;
