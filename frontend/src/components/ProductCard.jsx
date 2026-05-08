import { useState } from 'react';

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const formattedPrice = Number(product.price || 0).toFixed(2);
  const imageSrc =
    typeof product.image === 'string' && product.image.startsWith('http')
      ? product.image
      : `http://localhost:5000${product.image || ''}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {!imageError ? (
        <img
          className="h-52 w-full object-cover"
          src={imageSrc}
          alt={product.name}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-semibold text-slate-500">
          Image unavailable
        </div>
      )}

      <div className="space-y-2 p-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">{product.name}</h2>
        <p className="text-sm text-slate-500">{product.category || 'General'}</p>
        <p className="text-xl font-bold text-indigo-600">${formattedPrice}</p>
      </div>
    </article>
  );
}

export default ProductCard;
