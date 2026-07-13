import { apiClient } from "./apiClient";

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: "active" | "inactive";
}

export interface Brand {
  id?: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  status: "active" | "inactive";
}

export interface Order {
  id?: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt?: string;
}

export interface Coupon {
  id?: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  expiryDate?: string;
  active: boolean;
}

export interface Review {
  id?: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
}

export interface ReturnRequest {
  id?: string;
  orderNumber: string;
  customerName: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "refunded";
  refundAmount: number;
  requestedAt?: string;
}

export interface Role {
  id?: string;
  name: string;
  description?: string;
  permissions: string[];
}

export interface SystemSettings {
  siteName: string;
  siteEmail: string;
  sitePhone: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
}

export const adminService = {
  // Categories CRUD
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  },
  createCategory: async (body: Category): Promise<Category> => {
    const { data } = await apiClient.post<Category>("/categories", body);
    return data;
  },
  updateCategory: async (
    id: string,
    body: Partial<Category>,
  ): Promise<Category> => {
    const { data } = await apiClient.put<Category>(`/categories/${id}`, body);
    return data;
  },
  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },

  // Brands CRUD
  getBrands: async (): Promise<Brand[]> => {
    const { data } = await apiClient.get<Brand[]>("/brands");
    return data;
  },

  // Orders CRUD
  getOrders: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>("/orders");
    return data;
  },
  updateOrder: async (id: string, body: Partial<Order>): Promise<Order> => {
    const { data } = await apiClient.put<Order>(`/orders/${id}`, body);
    return data;
  },

  // Coupons CRUD
  getCoupons: async (): Promise<Coupon[]> => {
    const { data } = await apiClient.get<Coupon[]>("/coupons");
    return data;
  },
  createCoupon: async (body: Coupon): Promise<Coupon> => {
    const { data } = await apiClient.post<Coupon>("/coupons", body);
    return data;
  },

  // Reviews CRUD
  getReviews: async (): Promise<Review[]> => {
    const { data } = await apiClient.get<Review[]>("/reviews");
    return data;
  },
  updateReviewStatus: async (
    id: string,
    status: "approved" | "rejected",
  ): Promise<void> => {
    await apiClient.put(`/reviews/${id}`, { status });
  },

  // Returns CRUD
  getReturns: async (): Promise<ReturnRequest[]> => {
    const { data } = await apiClient.get<ReturnRequest[]>("/returns");
    return data;
  },

  // Roles CRUD
  getRoles: async (): Promise<Role[]> => {
    const { data } = await apiClient.get<Role[]>("/roles");
    return data;
  },

  // Settings
  getSettings: async (): Promise<SystemSettings> => {
    const { data } = await apiClient.get<SystemSettings>("/settings");
    return data;
  },
  updateSettings: async (body: SystemSettings): Promise<void> => {
    await apiClient.post("/settings", body);
  },

  // Dashboard Stats
  getAnalytics: async (): Promise<any> => {
    const { data } = await apiClient.get("/analytics");
    return data;
  },
};
