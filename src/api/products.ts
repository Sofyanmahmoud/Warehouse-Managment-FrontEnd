import api from './axios';
import type { ProductUpsertForm } from '../lib/validation';

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    category: string;
    category_id: number;
    image?: string;
    status: 'In Stock' | 'Out of Stock';
    quantity: number;
}

export interface Category {
    id: number;
    name: string;
}

export const getProducts = async () => {
    const response = await api.get<{ data: Product[] }>('/products');
    return response.data.data;
};

export const getProduct = async (id: number) => {
    const response = await api.get<{ data: Product }>(`/products/${id}`);
    return response.data.data;
};

export const createProduct = async (data: ProductUpsertForm) => {
    const response = await api.post<{ data: Product }>('/products', data);
    return response.data.data;
};

export const updateProduct = async (id: number, data: ProductUpsertForm) => {
    const response = await api.put<{ data: Product }>(`/products/${id}`, data);
    return response.data.data;
};

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
};

export const getCategories = async () => {
    const response = await api.get<Category[]>('/categories'); // Assuming there is a categories endpoint
    return response.data;
};
