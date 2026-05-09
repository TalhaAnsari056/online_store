import { useEffect, useState } from 'react';
import { HiBars3BottomRight, HiMagnifyingGlass, HiMoon, HiSun, HiXMark } from 'react-icons/hi2';
import { FiChevronDown, FiShoppingBag, FiUser } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=men', label: 'Men' },
  { to: '/shop?category=women', label: 'Women' },
  { to: '/shop?category=hoodies', label: 'Hoodies' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const nextThemeIsDark = !isDark;
    setIsDark(nextThemeIsDark);
    document.documentElement.classList.toggle('dark', nextThemeIsDark);
    localStorage.setItem('theme', nextThemeIsDark ? 'dark' : 'light');
  };

  const activeClass =
    'font-semibold text-slate-950 underline decoration-2 underline-offset-8 dark:text-slate-50';
  const baseClass =
    'text-sm font-medium text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 text-2xl font-black tracking-tight">
          TREN<span className="text-indigo-600 dark:text-indigo-400">DORA</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
          >
            Categories <FiChevronDown />
          </button>
        </nav>

        <div className="relative ml-auto hidden w-full max-w-xs lg:block">
          <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search streetwear..."
            className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-slate-300 p-2 text-slate-700 transition hover:scale-105 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
        </button>

        <Link
          to="/cart"
          className="relative rounded-full border border-slate-300 p-2 text-slate-700 transition hover:scale-105 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Cart"
        >
          <FiShoppingBag size={18} />
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-bold text-white">
            0
          </span>
        </Link>

        <Link
          to="/login"
          className="hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 sm:inline-flex"
        >
          <FiUser size={16} />
          Login
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-md border border-slate-300 p-2 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiXMark size={20} /> : <HiBars3BottomRight size={20} />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-slate-200 px-4 py-4 lg:hidden dark:border-slate-800">
          <div className="relative mb-4">
            <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `text-sm font-medium ${isActive ? activeClass : baseClass}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
