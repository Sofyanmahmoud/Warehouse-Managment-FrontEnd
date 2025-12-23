export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  current_stock: number;
  min_stock: number; // For low stock alerts
  price: number;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}