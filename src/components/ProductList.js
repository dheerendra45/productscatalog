import React, { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/api';
import { useCart } from '../contexts/cartcontext';
import { useAvailability } from '../contexts/AvailabilityContext';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({});
  const itemsPerPage = 9;

  const { addToCart } = useCart();
  const { checkAvailability } = useAvailability();

  const fetchProducts = async (currentPage, params = {}) => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts(currentPage, itemsPerPage, params);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      
      
      const productIds = data.products.map(p => p.id);
      checkAvailability(productIds);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    setPage(1);
    fetchProducts(1, searchParams);
  }, [searchParams]);

  
  useEffect(() => {
    fetchProducts(page, searchParams);
  }, [page]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0); 
    }
  };

  return (
    <div className="container mx-auto px-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <SearchFilter onSearch={handleSearch} />

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
        
          [...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="col-span-3 text-center text-xl text-gray-500 dark:text-gray-400 py-8">
            No products found
          </div>
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>

      
      {totalPages > 1 && !loading && (
        <div className="flex justify-center items-center space-x-2 pb-8">
          <button
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md 
              bg-white dark:bg-gray-800 
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700 
              disabled:bg-gray-50 dark:disabled:bg-gray-900 
              disabled:text-gray-500 dark:disabled:text-gray-600 
              disabled:cursor-not-allowed"
          >
            First
          </button>
          
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md 
              bg-white dark:bg-gray-800 
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700 
              disabled:bg-gray-50 dark:disabled:bg-gray-900 
              disabled:text-gray-500 dark:disabled:text-gray-600 
              disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
            
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= page - 1 && pageNumber <= page + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 border rounded-md 
                      ${page === pageNumber 
                        ? 'bg-blue-500 text-white dark:bg-blue-700' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === page - 2 ||
                pageNumber === page + 2
              ) {
                return (
                  <span 
                    key={pageNumber} 
                    className="px-2 text-gray-700 dark:text-gray-300"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md 
              bg-white dark:bg-gray-800 
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700 
              disabled:bg-gray-50 dark:disabled:bg-gray-900 
              disabled:text-gray-500 dark:disabled:text-gray-600 
              disabled:cursor-not-allowed"
          >
            Next
          </button>
          
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md 
              bg-white dark:bg-gray-800 
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-700 
              disabled:bg-gray-50 dark:disabled:bg-gray-900 
              disabled:text-gray-500 dark:disabled:text-gray-600 
              disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;