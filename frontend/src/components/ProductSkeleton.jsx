const SHIMMER =
  'pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent dark:via-white/10';

function ProductCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      aria-hidden
    >
      <div className="relative h-72 w-full overflow-hidden bg-slate-200/90 dark:bg-slate-800/90">
        <div className={`${SHIMMER} animate-[shimmer_1.8s_ease-in-out_infinite]`} />
      </div>

      <div className="relative space-y-3 p-4">
        <div className="relative h-3 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className={`${SHIMMER} animate-[shimmer_1.8s_ease-in-out_infinite]`} />
        </div>
        <div className="relative h-4 w-[82%] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className={`${SHIMMER} animate-[shimmer_1.8s_ease-in-out_infinite] [animation-delay:120ms]`} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="relative h-5 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className={`${SHIMMER} animate-[shimmer_1.8s_ease-in-out_infinite] [animation-delay:200ms]`} />
          </div>
          <div className="relative h-5 w-14 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className={`${SHIMMER} animate-[shimmer_1.8s_ease-in-out_infinite] [animation-delay:260ms]`} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Grid of skeleton cards aligned with ProductCard / ProductGrid layout.
 * @param {{ count?: number }} props
 */
function ProductSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductSkeleton;
