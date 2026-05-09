import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Men', slug: 'men' },
  { name: 'Women', slug: 'women' },
  { name: 'Hoodies', slug: 'hoodies' },
  { name: 'Sneakers', slug: 'sneakers' },
  { name: 'Accessories', slug: 'accessories' },
];

function CategorySection() {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Featured Categories</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <motion.div key={category.slug} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
            <Link
              to={`/shop?category=${category.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-5 dark:border-slate-800"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_rgba(0,0,0,0.9)_60%)] transition duration-500 group-hover:scale-110" />
              <div className="relative z-10 min-h-28">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Category</p>
                <h3 className="mt-3 text-xl font-bold text-white">{category.name}</h3>
                <span className="mt-5 inline-flex text-sm font-medium text-slate-200 transition group-hover:translate-x-1">
                  Explore
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
