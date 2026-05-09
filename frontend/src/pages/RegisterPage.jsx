import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <section className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h1 className="text-3xl font-black tracking-tight">Create Account</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Join TRENDORA and unlock exclusive drops.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
          />
          <button
            type="button"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
