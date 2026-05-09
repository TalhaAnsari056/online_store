import { motion } from 'framer-motion';
import { FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const getImage = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `http://localhost:5000${image}`;
};

const getStockLabel = (countInStock = 0) => {
  if (countInStock <= 0) return { label: 'Out of Stock', className: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' };
  if (countInStock <= 5) return { label: 'Low Stock', className: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' };
  return { label: 'In Stock', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' };
};

function ProductCard({ product }) {
  const primaryImage = getImage(product?.images?.[0] || product?.image);
  const secondaryImage = getImage(product?.images?.[1]);
  const stock = getStockLabel(product?.countInStock);
  const rating = Number(product?.rating || 0);
  const price = Number(product?.price || 0).toFixed(2);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product?._id || 'preview'}`} className="block">
          {primaryImage ? (
            <>
              <img
                src={primaryImage}
                alt={product?.name || 'Product image'}
                className={`h-72 w-full object-cover transition duration-500 ${secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
              />
              {secondaryImage ? (
                <img
                  src={secondaryImage}
                  alt={`${product?.name || 'Product'} alternate`}
                  className="absolute inset-0 h-72 w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                />
              ) : null}
            </>
          ) : (
            <div className="flex h-72 items-center justify-center bg-slate-100 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              No image available
            </div>
          )}
        </Link>

        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${stock.className}`}>
          {stock.label}
        </span>

        <button
          type="button"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-800 shadow transition hover:scale-110 dark:bg-slate-900/90 dark:text-slate-100"
          aria-label="Add to wishlist"
        >
          <FiHeart size={16} />
        </button>

        <div className="pointer-events-none absolute inset-x-3 bottom-3">
          <button
            type="button"
            className="w-full translate-y-3 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white dark:text-slate-900"
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
  );
}

export default ProductCard;
