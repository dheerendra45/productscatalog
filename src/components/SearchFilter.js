import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const categories = [
  'smartphones', 'laptops', 'fragrances', 'skincare', 
  'groceries', 'home-decoration', 'furniture', 'tops',
  'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes'
];

const SearchFilter = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: '',
    maxPrice: 5000,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedParams, setDebouncedParams] = useState(searchParams);

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams(searchParams);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchParams]);

  
  useEffect(() => {
    onSearch(debouncedParams);
  }, [debouncedParams, onSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            name="query"
            value={searchParams.query}
            onChange={handleInputChange}
            placeholder="Search products..."
            className="w-full rounded-l-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 
              text-gray-900 transition-colors placeholder:text-gray-500 
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 
              dark:placeholder:text-gray-400 dark:focus:border-blue-400"
          />
          <MagnifyingGlassIcon 
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 
              text-gray-400 dark:text-gray-500" 
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="rounded-r-lg bg-blue-500 px-4 py-2.5 text-white transition-colors 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-400"
          aria-label="Toggle filters"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
        </button>
      </div>

      {showFilters && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm 
          dark:border-gray-700 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <select
                name="category"
                value={searchParams.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
                  text-gray-900 transition-colors focus:border-blue-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 
                  dark:focus:border-blue-400"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Max Price: ${searchParams.maxPrice}
              </label>
              <input
                type="range"
                name="maxPrice"
                min="0"
                max="5000"
                value={searchParams.maxPrice}
                onChange={handleInputChange}
                className="w-full cursor-pointer appearance-none rounded-lg bg-gray-200 
                  accent-blue-500 dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>$0</span>
                <span>$5000</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;