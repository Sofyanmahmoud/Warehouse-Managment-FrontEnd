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
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  total_orders: number;
  status: 'active' | 'inactive';
  avatar?: string;
}