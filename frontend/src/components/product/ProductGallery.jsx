import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getProductImage } from '../../utils/productHelpers';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProductGallery({ images = [], name = 'Product' }) {
  const slides = images.map(getProductImage).filter(Boolean);

  if (!slides.length) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">No image available</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        className="product-gallery aspect-[4/5] w-full"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`}>
            <img src={src} alt={`${name} view ${index + 1}`} className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductGallery;
