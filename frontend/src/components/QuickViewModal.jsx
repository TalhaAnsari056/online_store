import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiStar, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const getImage = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `http://localhost:5000${image}`;
};

const getStockMeta = (countInStock = 0) => {
  if (countInStock <= 0) return { label: 'Out of Stock', tone: 'text-rose-600 dark:text-rose-400' };
  if (countInStock <= 5) return { label: 'Low Stock', tone: 'text-amber-600 dark:text-amber-400' };
  return { label: 'In Stock', tone: 'text-emerald-600 dark:text-emerald-400' };
};

function QuickViewModal({ product, isOpen, onClose }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const images = useMemo(() => {
    if (!product) return [];
    const list = Array.isArray(product.images) && product.images.length ? product.images : [];
    const legacy = product.image ? [product.image] : [];
    const merged = list.length ? list : legacy;
    return merged.map(getImage).filter(Boolean);
  }, [product]);

  const sizes = Array.isArray(product?.sizes) && product.sizes.length ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = Array.isArray(product?.colors) && product.colors.length ? product.colors : ['Black', 'White'];
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');

  useEffect(() => {
    if (!product || !isOpen) return;
    const id = window.setTimeout(() => {
      setQuantity(1);
      const s = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['S', 'M', 'L', 'XL'];
      const c = Array.isArray(product.colors) && product.colors.length ? product.colors : ['Black', 'White'];
      setSelectedSize(s[0] || '');
      setSelectedColor(c[0] || '');
    }, 0);
    return () => window.clearTimeout(id);
  }, [product, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!product) return null;

  const price = Number(product.price || 0).toFixed(2);
  const rating = Number(product.rating || 0);
  const stock = getStockMeta(product.countInStock);
  const maxQty = Math.max(1, Number(product.countInStock) || 1);
  const productId = product._id;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Quick view"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-h-[85vh] sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-800 shadow-sm transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>

            <div className="relative w-full shrink-0 bg-slate-100 dark:bg-slate-900 sm:w-1/2">
              {images.length ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="h-64 sm:h-full sm:min-h-[420px]"
                  spaceBetween={0}
                  slidesPerView={1}
                >
                  {images.map((src, i) => (
                    <SwiperSlide key={i} className="!flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                      <img src={src} alt="" className="h-full max-h-[420px] w-full object-cover sm:max-h-none sm:min-h-[420px]" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-slate-500 sm:h-full sm:min-h-[420px]">
                  No images
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {product.category || 'Streetwear'}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                {product.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">${price}</p>
                <div className="flex items-center gap-1 text-amber-500">
                  <FiStar className="fill-current" size={18} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{rating.toFixed(1)}</span>
                </div>
                <span className={`text-sm font-semibold ${stock.tone}`}>{stock.label}</span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                          selectedSize === s
                            ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                            : 'border-slate-300 text-slate-700 hover:border-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                          selectedColor === c
                            ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                            : 'border-slate-300 text-slate-700 hover:border-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="qv-qty">
                  Qty
                </label>
                <div className="flex items-center rounded-full border border-slate-300 dark:border-slate-600">
                  <button
                    type="button"
                    className="px-3 py-2 text-lg leading-none text-slate-600 hover:text-slate-900 dark:text-slate-300"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <input
                    id="qv-qty"
                    readOnly
                    value={quantity}
                    className="w-10 border-0 bg-transparent text-center text-sm font-semibold outline-none dark:text-white"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-lg leading-none text-slate-600 hover:text-slate-900 dark:text-slate-300"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  disabled={product.countInStock <= 0}
                  className="flex-1 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  disabled={product.countInStock <= 0}
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="flex-1 rounded-full border-2 border-slate-900 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
                >
                  Buy Now
                </button>
              </div>
              <Link
                to={`/product/${productId}`}
                onClick={onClose}
                className="mt-4 block text-center text-sm font-semibold text-slate-600 underline-offset-4 transition hover:text-slate-950 hover:underline dark:text-slate-400 dark:hover:text-white"
              >
                View full details
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default QuickViewModal;
