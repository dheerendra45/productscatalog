
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const ProductService = {
  async getProducts(page = 1, limit = 10, filters = {}) {
    try {
      const { 
        query = '', 
        category = '', 
        minPrice = 0, 
        maxPrice = 99999 
      } = filters;

      let url = query 
        ? `${BASE_URL}/products/search?q=${query}` 
        : `${BASE_URL}/products`;

      const params = {
        limit,
        skip: (page - 1) * limit
      };

      if (category) params.category = category;

      const response = await axios.get(url, { params });

      // Client-side price filtering
      const filteredProducts = response.data.products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
      );

      return {
        
        products: filteredProducts,
        total: response.data.total,
        limit: params.limit,
        skip: params.skip
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async checkProductAvailability(productId) {
    try {
      const response = await axios.get(`${BASE_URL}/products/${productId}`);
      return {
        id: productId,
        inStock: response.data.stock > 0,
        stock: response.data.stock
      };
    } catch (error) {
      console.error('Error checking product availability:', error);
      return {
        id: productId,
        inStock: false,
        stock: 0
      };
    }
  },

  async batchCheckAvailability(productIds) {
    const availabilityPromises = productIds.map(id => 
      this.checkProductAvailability(id)
    );
    return await Promise.all(availabilityPromises);
  },

  async getProductById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const response = await axios.post(`${BASE_URL}/carts/add`, {
        userId: 1,
        products: [{ id: productId, quantity }]
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
};
