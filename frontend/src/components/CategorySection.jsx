import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GENDER_COLLECTIONS, PRODUCT_CATEGORIES } from '../constants/catalog';

function CategorySection() {
  return (
    <section className="space-y-8">
      <motion.div>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Shop by Collection</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-2">
          {GENDER_COLLECTIONS.map((collection) => (
            <motion.div key={collection.slug} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <Link
                to={`/collection/${collection.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-6 dark:border-slate-800"
              >
                <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_rgba(0,0,0,0.9)_60%)] transition duration-500 group-hover:scale-110" />
                <div className="relative z-10 min-h-24">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Collection</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{collection.label}</h3>
                  <span className="mt-5 inline-flex text-sm font-medium text-slate-200 transition group-hover:translate-x-1">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Featured Categories</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCT_CATEGORIES.map((category) => (
            <motion.div key={category.slug} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
              <Link
                to={`/category/${category.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-5 dark:border-slate-800"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_rgba(0,0,0,0.9)_60%)] transition duration-500 group-hover:scale-110" />
                <div className="relative z-10 min-h-28">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Category</p>
                  <h3 className="mt-3 text-xl font-bold text-white">{category.label}</h3>
                  <span className="mt-5 inline-flex text-sm font-medium text-slate-200 transition group-hover:translate-x-1">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default CategorySection;
