import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../services/api';
import { useCart } from '../contexts/cartcontext';
import { useAvailability } from '../contexts/AvailabilityContext';
import { StarIcon } from '@heroicons/react/24/solid';

const Toast = ({ message, onClose }) => (
  <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg dark:bg-green-600">
    <span>🎁 {message}</span>
    <button onClick={onClose} className="ml-2 font-bold">×</button>
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const { addToCart } = useCart();
  const { availabilities, checkAvailability } = useAvailability();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productDetails = await ProductService.getProductById(id);
        setProduct(productDetails);

        const relatedResponse = await ProductService.getProducts(1, 4, { 
          category: productDetails.category 
        });
        setRelatedProducts(relatedResponse.products.filter(p => p.id !== productDetails.id));

        checkAvailability([productDetails.id]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setToastMessage(`${product.title} added to cart!`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  if (loading) return <div className="text-center text-xl mt-10 dark:text-white">Loading...</div>;
  if (!product) return <div className="text-center text-xl mt-10 dark:text-white">Product not found</div>;

  const availability = availabilities[product.id] || { inStock: true, stock: product.stock };
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon 
        key={i} 
        className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-96 object-cover rounded-lg shadow-md dark:shadow-gray-800"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(1, 5).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.title} - ${index + 2}`} 
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="dark:text-white">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">({product.rating} / 5)</span>
          </div>

          <p className="text-gray-700 mb-4 dark:text-gray-300">{product.description}</p>

          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-red-500 dark:text-red-400">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className="mb-4">
            <strong>Category:</strong> <span className="dark:text-gray-300">{product.category}</span>
          </div>

          <div className="mb-4">
            <strong>Brand:</strong> <span className="dark:text-gray-300">{product.brand}</span>
          </div>

          <div className="mb-4">
            {availability.inStock ? (
              <span className="text-green-600 dark:text-green-400">
                In Stock - {availability.stock} items available
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400">Out of Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!availability.inStock}
            className={`w-full py-3 rounded-lg ${
              availability.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                : 'bg-gray-400 text-gray-600 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {availability.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map(related => (
            <div 
              key={related.id} 
              className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <img 
                src={related.thumbnail} 
                alt={related.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold truncate dark:text-white">{related.title}</h3>
                <p className="text-green-600 font-bold dark:text-green-400">${related.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

export default ProductDetailPage;