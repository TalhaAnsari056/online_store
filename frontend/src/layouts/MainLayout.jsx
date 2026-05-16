import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ProductSearchProvider } from '../context/ProductSearchContext';

function MainLayout({ children }) {
  return (
    <ProductSearchProvider>
      <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </div>
    </ProductSearchProvider>
  );
}

export default MainLayout;
