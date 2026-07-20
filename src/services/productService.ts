import { apiClient } from "./apiClient";

export interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[];
  category: string;
  brand?: string;
  sellerId?: string; // Links product to a specific seller account
  vendor?: string; // Seller brand name e.g. "Petit Boutique"
  stock: number;
  sku?: string;
  discount?: number;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  createdAt?: string;
}

export const productService = {
  // Pass sellerId in params to filter seller-specific products
  getProducts: async (params?: {
    sellerId?: string;
    category?: string;
    query?: string;
  }): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>("/products", { params });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  createProduct: async (productData: Omit<Product, "id">): Promise<Product> => {
    // Automatically attach sellerId from session if logged in as a seller
    const stored = localStorage.getItem("user");
    let sellerId = productData.sellerId;
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.role === "seller") sellerId = user.id || user._id;
      } catch (e) {}
    }

    const { data } = await apiClient.post<Product>("/products", {
      ...productData,
      sellerId,
    });
    return data;
  },

  updateProduct: async (
    id: string,
    productData: Partial<Product>,
  ): Promise<Product> => {
    const { data } = await apiClient.put<Product>(
      `/products/${id}`,
      productData,
    );
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
