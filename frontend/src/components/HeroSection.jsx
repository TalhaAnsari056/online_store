import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
      <img
        src={heroImage}
        alt="Streetwear hero"
        className="absolute right-0 top-1/2 h-full -translate-y-1/2 object-contain opacity-40 sm:opacity-60"
      />

      <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          Minimal Luxury Streetwear
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="max-w-3xl text-4xl font-black leading-[1.05] sm:text-6xl"
        >
          New Season. Bold Silhouettes. Timeless Street Identity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mt-5 max-w-2xl text-sm text-slate-200 sm:text-base"
        >
          Built for the city, refined for statement looks. Discover premium pieces that move with your everyday rhythm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/collection/men"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-slate-200"
          >
            Shop Men
          </Link>
          <Link
            to="/collection/women"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-white"
          >
            Shop Women
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
