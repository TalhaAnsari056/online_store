import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/cart', label: 'Cart' },
  { to: '/login', label: 'Login' },
];

const categories = ['Men', 'Women', 'Hoodies', 'Sneakers', 'Accessories'];

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            TREN<span className="text-indigo-600 dark:text-indigo-400">DORA</span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Premium streetwear essentials crafted for modern style and everyday confidence.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Quick Links
          </h4>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block text-sm text-slate-600 transition hover:translate-x-1 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Categories
          </h4>
          <div className="space-y-2">
            {categories.map((item) => (
              <p key={item} className="text-sm text-slate-600 dark:text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Follow Us
          </h4>
          <div className="flex items-center gap-3">
            {[FaInstagram, FaXTwitter, FaTiktok, FaYoutube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="rounded-full border border-slate-300 p-2 text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} TRENDORA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
