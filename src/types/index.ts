export interface User {
  id: number;
  name: string;
  role: 'admin' | 'customer';
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}