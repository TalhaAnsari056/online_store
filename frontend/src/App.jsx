import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';

const pageTransition = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -28 },
};

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
