import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <section className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Login to continue shopping premium streetwear.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-medium">Password</label>
              <button
                type="button"
                className="text-xs font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEmail('')}
            className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
          >
            Reset Form
          </button>
          <button
            type="button"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          New here?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
