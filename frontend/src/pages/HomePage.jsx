import { Component, Suspense, useMemo } from 'react';
import CategorySection from '../components/CategorySection';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import ProductSection from '../components/ProductSection';
import ProductSkeleton from '../components/ProductSkeleton';
import { useProducts } from '../hooks/useProducts';
import { categoryToSlug, normalizeSlug } from '../utils/productHelpers';

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

function HomeProductSections() {
  const { data: products } = useProducts();

  const { trending, newArrivals, popularHoodies } = useMemo(() => {
    const featured = products.filter((product) => product.isFeatured).slice(0, 8);

    const newest = [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    const hoodies = products
      .filter((product) => normalizeSlug(categoryToSlug(product.category)) === 'hoodies')
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 8);

    return {
      trending: featured,
      newArrivals: newest,
      popularHoodies: hoodies,
    };
  }, [products]);

  return (
    <div className="space-y-14">
      <ProductSection
        title="Trending Products"
        subtitle="Featured drops hand-picked by the TRENDORA team."
        products={trending}
        viewAllTo="/shop"
      />
      <ProductSection
        title="New Arrivals"
        subtitle="The latest pieces added to the collection."
        products={newArrivals}
        viewAllTo="/shop"
      />
      <ProductSection
        title="Popular Hoodies"
        subtitle="Top-rated hoodies built for layered street style."
        products={popularHoodies}
        viewAllTo="/category/hoodies"
      />
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-14">
      <HeroSection />
      <CategorySection />

      <ProductSectionErrorBoundary>
        <Suspense fallback={<ProductSkeleton count={8} />}>
          <HomeProductSections />
        </Suspense>
      </ProductSectionErrorBoundary>

      <NewsletterSection />
    </div>
  );
}

export default HomePage;
