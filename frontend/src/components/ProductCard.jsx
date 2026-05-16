import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import QuickViewModal from './QuickViewModal';

import { getProductImage, getStockMeta } from '../utils/productHelpers';

function ProductCard({ product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const primaryImage = getProductImage(product?.images?.[0] || product?.image);
  const secondaryImage = getProductImage(product?.images?.[1]);
  const stock = getStockMeta(product?.countInStock);
  const rating = Number(product?.rating || 0);
  const price = Number(product?.price || 0).toFixed(2);

  return (
    <>
      <motion.article
        layout
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <Link
            to={product?._id ? `/product/${product._id}` : '/shop'}
            className="relative z-0 block overflow-hidden"
            onClick={(e) => {
              if (quickViewOpen) e.preventDefault();
            }}
          >
            {primaryImage ? (
              <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={primaryImage}
                  alt={product?.name || 'Product image'}
                  className={`h-full w-full object-cover transition duration-700 ease-out ${
                    secondaryImage ? 'group-hover:scale-110 group-hover:opacity-0' : 'group-hover:scale-110'
                  }`}
                />
                {secondaryImage ? (
                  <img
                    src={secondaryImage}
                    alt={`${product?.name || 'Product'} alternate`}
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />
                ) : null}
              </div>
            ) : (
              <div className="flex h-72 items-center justify-center bg-slate-100 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                No image available
              </div>
            )}
          </Link>

          <span
            className={`absolute left-3 top-3 z-[3] rounded-full px-3 py-1 text-xs font-semibold ${stock.className}`}
          >
            {stock.label}
          </span>

          <button
            type="button"
            className="absolute right-3 top-3 z-[3] rounded-full bg-white/90 p-2 text-slate-800 shadow transition hover:scale-110 dark:bg-slate-900/90 dark:text-slate-100"
            aria-label="Add to wishlist"
            onClick={(e) => e.stopPropagation()}
          >
            <FiHeart size={16} />
          </button>

          <div className="absolute inset-x-3 bottom-3 z-[3]">
            <button
              type="button"
              className="w-full translate-y-4 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 opacity-0 shadow-lg transition duration-500 ease-out pointer-events-none group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
            >
              Select Options
            </button>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {product?.category || 'Streetwear'}
          </p>
          <h3 className="line-clamp-1 text-base font-semibold text-slate-900 dark:text-slate-100">
            {product?.name || 'Premium Essential Tee'}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">${price}</p>
            <div className="flex items-center gap-1 text-sm text-amber-500">
              <FiStar className="fill-current" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </motion.article>

      <QuickViewModal product={product} isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}

export default ProductCard;
