import { Component, Suspense, useMemo } from 'react';
import CategorySection from '../components/CategorySection';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import ProductGrid from '../components/ProductGrid';
import ProductSkeleton from '../components/ProductSkeleton';
import { useProducts } from '../hooks/useProducts';

class ProductSectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'Unable to load products right now.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300">
          {this.state.message}
        </p>
      );
    }
    return this.props.children;
  }
}

function TrendingProductsSection() {
  const { data: products } = useProducts();
  const trendingProducts = useMemo(() => products.slice(0, 8), [products]);

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Trending Products</h2>
      </div>
      <ProductGrid products={trendingProducts} />
    </section>
  );
}

function NewArrivalsSection() {
  const { data: products } = useProducts();
  const newArrivals = useMemo(() => [...products].reverse().slice(0, 8), [products]);

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">New Arrivals</h2>
      </div>
      <ProductGrid products={newArrivals} />
    </section>
  );
}

function HomePage() {
  return (
    <div className="space-y-14">
      <HeroSection />
      <CategorySection />

      <ProductSectionErrorBoundary>
        <Suspense fallback={<ProductSkeleton count={8} />}>
          <TrendingProductsSection />
        </Suspense>
      </ProductSectionErrorBoundary>

      <ProductSectionErrorBoundary>
        <Suspense fallback={<ProductSkeleton count={8} />}>
          <NewArrivalsSection />
        </Suspense>
      </ProductSectionErrorBoundary>

      <NewsletterSection />
    </div>
  );
}

export default HomePage;
