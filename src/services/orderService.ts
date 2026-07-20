import { apiClient } from "./apiClient";

export interface OrderItem {
  productId: string;
  sellerId?: string; // Vendor associated with this item
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id?: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  totalAmount: number;
  status: string; // "pending", "processing", "shipped", "delivered", "cancelled"
  paymentMethod: string;
  paymentStatus: string;
  createdAt?: string;
  updatedAt?: string;
}

export const orderService = {
  // Filter seller transactions by passing sellerId
  getOrders: async (params?: { sellerId?: string }): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>("/orders", { params });
    return data;
  },
  createOrder: async (data: Order): Promise<Order> => {
    const { data: created } = await apiClient.post<Order>("/orders", data);
    return created;
  },
  updateOrder: async (id: string, data: Partial<Order>): Promise<any> => {
    const { data: updated } = await apiClient.put<any>(`/orders/${id}`, data);
    return updated;
  },
  deleteOrder: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/orders/${id}`);
    return data;
  },
};
