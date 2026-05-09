function CartPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Your Cart</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <article
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
              <div className="flex-1">
                <h2 className="font-semibold">Essential Hoodie #{index + 1}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Size M • Black</p>
              </div>
              <p className="font-bold text-indigo-600 dark:text-indigo-400">$99.00</p>
            </article>
          ))}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>$198.00</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </p>
          </div>
          <p className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-base font-bold dark:border-slate-800">
            <span>Total</span>
            <span>$208.00</span>
          </p>
          <button
            type="button"
            className="mt-5 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
