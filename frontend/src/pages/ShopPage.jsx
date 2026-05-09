function ShopPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Shop Streetwear</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Showing 24 curated items</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-44 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900" />
            <div className="p-4">
              <h2 className="font-semibold">Streetwear Drop #{index + 1}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Premium cotton blend</p>
              <p className="mt-3 text-lg font-bold text-indigo-600 dark:text-indigo-400">$79.00</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ShopPage;
