import { apiClient } from "./apiClient";

export interface ReturnItem {
  productId: string;
  name: string;
  quantity: number;
}

export interface Return {
  id?: string;
  orderNumber: string;
  customerName: string;
  items: ReturnItem[];
  reason: string;
  status: string; // "pending", "approved", "rejected", "refunded"
  refundAmount: number;
  requestedAt?: string;
}

export const returnService = {
  getReturns: async (): Promise<Return[]> => {
    const { data } = await apiClient.get<Return[]>("/returns");
    return data;
  },
  createReturn: async (payload: any): Promise<Return> => {
    const { data } = await apiClient.post<Return>("/returns", payload);
    return data;
  },
  updateReturn: async (id: string, payload: Partial<Return>): Promise<any> => {
    const { data } = await apiClient.put<any>(`/returns/${id}`, payload);
    return data;
  },
};
