import api from './axios';
import type { Customer } from '../types';

export const customerService = {
  getAllCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await api.get('/customers');
      return response.data;
    } catch (error) {
      // Return mock data if backend isn't ready
      return [
        { id: 1, name: 'Johnson D.', email: 'johnson@example.com', phone: '+1 234 567', total_orders: 12, status: 'active' },
        { id: 2, name: 'Didinya J.', email: 'didinya@example.com', phone: '+1 234 888', total_orders: 5, status: 'active' },
        { id: 3, name: 'Penny L.', email: 'penny@example.com', phone: '+1 234 999', total_orders: 24, status: 'inactive' },
        { id: 4, name: 'Elon M.', email: 'elon@spacex.com', phone: '+1 000 001', total_orders: 1, status: 'active' },
      ];
    }
  }
};