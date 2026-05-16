import { Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiStar } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductGrid from '../components/ProductGrid';
import ProductSkeleton from '../components/ProductSkeleton';
import {
  categoryToSlug,
  formatGender,
  formatPrice,
  getStockMeta,
} from '../utils/productHelpers';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useProduct, useProductList } from '../hooks/useProducts';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' },
};

function RelatedProducts({ productId, category }) {
  const categorySlug = categoryToSlug(category);
  const { data: products = [], isLoading } = useProductList(
    categorySlug ? { category: categorySlug } : {},
    { enabled: Boolean(categorySlug) }
  );

  const related = useMemo(
    () => products.filter((item) => item._id !== productId).slice(0, 4),
    [products, productId]
  );

  if (!related.length && !isLoading) return null;

  return (
    <section className="space-y-5 border-t border-slate-200 pt-12 dark:border-slate-800">
      <h2 className="text-2xl font-black tracking-tight sm:text-3xl">You May Also Like</h2>
      <ProductGrid products={related} loading={isLoading} />
    </section>
  );
}

function RecentlyViewedSection({ currentId, items }) {
  const viewed = items.filter((item) => item._id !== currentId).slice(0, 4);
  if (!viewed.length) return null;

  return (
    <section className="space-y-5 border-t border-slate-200 pt-12 dark:border-slate-800">
      <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Recently Viewed</h2>
      <ProductGrid products={viewed} />
    </section>
  );
}

function ProductDetailContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product } = useProduct(id);
  const { items: recentlyViewed, addProduct } = useRecentlyViewed();

  const sizes = product.sizes?.length ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = product.colors?.length ? product.colors : ['Black', 'White'];
  const tags = product.tags?.length ? product.tags : [];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const stock = getStockMeta(product.countInStock);
  const maxQty = Math.max(0, Number(product.countInStock) || 0);
  const rating = Number(product.rating || 0);

  useEffect(() => {
    addProduct(product);
  }, [product, addProduct]);

  useEffect(() => {
    const nextSizes = product.sizes?.length ? product.sizes : ['S', 'M', 'L', 'XL'];
    const nextColors = product.colors?.length ? product.colors : ['Black', 'White'];
    setSelectedSize(nextSizes[0]);
    setSelectedColor(nextColors[0]);
    setQuantity(1);
  }, [product._id, product.sizes, product.colors]);

  const handleBuyNow = () => {
    navigate('/cart');
  };

  return (
    <div className="space-y-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...fadeUp}>
          <ProductGallery images={product.images} name={product.name} />
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {product.category}
            </span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
              {formatGender(product.gender)}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stock.className}`}>
              {stock.label}
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                ${formatPrice(product.price)}
              </p>
              <div className="flex items-center gap-1 text-sm text-amber-500">
                <FiStar className="fill-current" />
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {rating.toFixed(1)}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  ({product.numReviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {product.description}
          </p>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  disabled={!stock.inStock}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedSize === size
                      ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-900'
                      : 'border-slate-300 hover:border-indigo-500 dark:border-slate-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  disabled={!stock.inStock}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedColor === color
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/40 dark:text-indigo-300'
                      : 'border-slate-300 hover:border-indigo-500 dark:border-slate-700'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quantity</p>
            <div className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                disabled={!stock.inStock || quantity <= 1}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="rounded-l-full p-3 transition hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
                aria-label="Decrease quantity"
              >
                <FiMinus />
              </button>
              <span className="min-w-12 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                disabled={!stock.inStock || quantity >= maxQty}
                onClick={() => setQuantity((value) => Math.min(maxQty, value + 1))}
                className="rounded-r-full p-3 transition hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
                aria-label="Increase quantity"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={!stock.inStock}
              className="flex-1 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold transition hover:border-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:border-white"
            >
              Add to Cart
            </button>
            <button
              type="button"
              disabled={!stock.inStock}
              onClick={handleBuyNow}
              className="flex-1 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Buy Now
            </button>
          </div>

          {tags.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/shop?keyword=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>

      <RelatedProducts productId={product._id} category={product.category} />
      <RecentlyViewedSection currentId={product._id} items={recentlyViewed} />
    </div>
  );
}

function ProductPage() {
  const { id } = useParams();

  return (
    <Suspense fallback={<ProductSkeleton count={1} />}>
      <ProductDetailContent key={id} />
    </Suspense>
  );
}

export default ProductPage;
