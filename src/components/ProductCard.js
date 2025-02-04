import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Toast = ({ message, onClose }) => (
  <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg dark:bg-green-600">
    <span>🎁 {message}</span>
    <button onClick={onClose} className="ml-2 font-bold">×</button>
  </div>
);

const ProductCard = ({ product = {}, onAddToCart = () => {} }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    id,
    thumbnail = '',
    title = 'Product Title',
    description = 'Product Description',
    price = 0,
    oldPrice,
    discount,
    inStock = true,
    category,
    slug
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      onAddToCart(product);
      setToastMessage(`${title} added to cart!`);
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-900/30 dark:hover:shadow-gray-900/40"
    >
      {discount && discount > 0 && (
        <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white dark:bg-red-600">
          -{discount}%
        </div>
      )}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400" />
          </div>
        )}
        <img
          src={thumbnail || '/api/placeholder/400/400'}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
      </div>
      <div className="p-4">
        {category && (
          <p className="mb-2 text-sm uppercase text-gray-500 dark:text-gray-400">{category}</p>
        )}
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl text-gray-900 dark:text-white">
                ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
              </span>
              {oldPrice && (
                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                  ${typeof oldPrice === 'number' ? oldPrice.toFixed(2) : '0.00'}
                </span>
              )}
            </div>
            {!inStock && (
              <span className="text-sm font-medium text-red-500 dark:text-red-400">Out of Stock</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex items-center gap-2 rounded-full p-2 transition-colors ${
              inStock
                ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                : 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
            }`}
            aria-label={inStock ? 'Add to cart' : 'Out of stock'}
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

export default ProductCard;