import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiBars3BottomRight, HiMoon, HiSun, HiXMark } from 'react-icons/hi2';
import { FiChevronDown, FiShoppingBag, FiUser } from 'react-icons/fi';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ProductSearch from './ProductSearch';
import { GENDER_COLLECTIONS, PRODUCT_CATEGORIES } from '../constants/catalog';

const navLinkBase =
  'text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50';
const navLinkActive =
  'font-bold text-slate-950 underline decoration-2 underline-offset-8 decoration-slate-950 dark:text-slate-50 dark:decoration-slate-50';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsMenuOpen(false);
      setMobileCategoriesOpen(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  const categoryPathActive = PRODUCT_CATEGORIES.some(
    (category) => location.pathname === `/category/${category.slug}`
  );
  const toggleTheme = () => {
    const nextThemeIsDark = !isDark;
    setIsDark(nextThemeIsDark);
    document.documentElement.classList.toggle('dark', nextThemeIsDark);
    localStorage.setItem('theme', nextThemeIsDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 text-2xl font-black tracking-tight">
          TREN<span className="text-indigo-600 dark:text-indigo-400">DORA</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => `${navLinkBase} ${isActive && location.pathname === '/shop' ? navLinkActive : ''}`}
          >
            Shop
          </NavLink>

          <div className="flex items-center gap-4">
            {GENDER_COLLECTIONS.map((collection) => (
              <NavLink
                key={collection.slug}
                to={`/collection/${collection.slug}`}
                className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`}
              >
                {collection.label}
              </NavLink>
            ))}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setDesktopCategoriesOpen(true)}
            onMouseLeave={() => setDesktopCategoriesOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                categoryPathActive
                  ? navLinkActive
                  : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50'
              }`}
              aria-expanded={desktopCategoriesOpen}
              aria-haspopup="true"
            >
              Categories
              <FiChevronDown
                className={`transition-transform duration-200 ${desktopCategoriesOpen ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>

            <AnimatePresence>
              {desktopCategoriesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 top-full z-50 w-52 pt-2"
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 py-2 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95">
                    {PRODUCT_CATEGORIES.map((item) => (
                      <NavLink
                        key={item.slug}
                        to={`/category/${item.slug}`}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-sm transition-colors duration-150 ${
                            isActive
                              ? 'bg-slate-100 font-bold text-slate-950 underline decoration-2 underline-offset-4 dark:bg-slate-800 dark:text-slate-50'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>

        <ProductSearch
          className="relative ml-auto hidden w-full max-w-xs lg:block"
          inputClassName="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          id="navbar-product-search"
        />

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

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 sm:inline-flex ${
              isActive
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-900 text-white hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400'
            }`
          }
        >
          <FiUser size={16} />
          Login
        </NavLink>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-md border border-slate-300 p-2 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiXMark size={20} /> : <HiBars3BottomRight size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-200 lg:hidden dark:border-slate-800"
          >
            <div className="px-4 py-4">
              <ProductSearch
                className="relative mb-4"
                inputClassName="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                onNavigate={() => setIsMenuOpen(false)}
                id="mobile-product-search"
              />

              <nav className="flex flex-col gap-1">
                <NavLink
                  to="/"
                  end
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm ${isActive ? navLinkActive : navLinkBase}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm ${isActive ? navLinkActive : navLinkBase}`
                  }
                >
                  Shop
                </NavLink>

                <div className="mt-1 border-t border-slate-200 pt-2 dark:border-slate-800">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Collections
                  </p>
                  {GENDER_COLLECTIONS.map((collection) => (
                    <NavLink
                      key={collection.slug}
                      to={`/collection/${collection.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm ${
                          isActive
                            ? 'font-bold text-slate-950 underline decoration-2 underline-offset-4 dark:text-slate-50'
                            : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                        }`
                      }
                    >
                      {collection.label}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-1 border-t border-slate-200 pt-2 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setMobileCategoriesOpen((value) => !value)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Categories
                    <FiChevronDown
                      className={`transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileCategoriesOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-2"
                      >
                        <div className="flex flex-col border-l border-slate-200 py-1 dark:border-slate-700">
                          {PRODUCT_CATEGORIES.map((item) => (
                            <NavLink
                              key={item.slug}
                              to={`/category/${item.slug}`}
                              onClick={() => setIsMenuOpen(false)}
                              className={({ isActive }) =>
                                `px-3 py-2 text-sm ${
                                  isActive
                                    ? 'font-bold text-slate-950 underline decoration-2 underline-offset-4 dark:text-slate-50'
                                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
