function NewsletterSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Exclusive Access
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Join the TRENDORA Community
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Get early access to drops, style edits, and members-only offers.
        </p>

        <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full border border-slate-300 bg-white px-5 text-sm outline-none transition focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-300"
          />
          <button
            type="button"
            className="h-12 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsletterSection;
