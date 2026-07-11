import { apiClient } from './apiClient';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  brand?: string;
  stock: number;
  discount?: number;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  createdAt?: string;
}

export const productService = {
  getProducts: async (params?: Record<string, string | number>): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/products', { params });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const { data } = await apiClient.post<Product>('/products', productData);
    return data;
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const { data } = await apiClient.put<Product>(`/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
