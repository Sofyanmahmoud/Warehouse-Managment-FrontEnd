import api from './axios';
import type { Product } from '../types';

export const inventoryService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  // Update stock (The Increase/Decrease logic)
  updateStock: async (id: number, quantity: number) => {
    const response = await api.patch(`/products/${id}/stock`, { quantity });
    return response.data;
  },

  // Add a new product
  createProduct: async (productData: Partial<Product>) => {
    const response = await api.post('/products', productData);
    return response.data;
  }
};