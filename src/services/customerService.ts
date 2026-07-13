import { apiClient } from "./apiClient";

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: string; // "active", "suspended"
  totalSpent: number;
  joinedDate?: string;
  notes?: string[];
}

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    const { data } = await apiClient.get<Customer[]>("/customers");
    return data;
  },
  createCustomer: async (data: any): Promise<Customer> => {
    const { data: created } = await apiClient.post<Customer>(
      "/customers",
      data,
    );
    return created;
  },
  updateCustomer: async (id: string, data: Partial<Customer>): Promise<any> => {
    const { data: updated } = await apiClient.put<any>(
      `/customers/${id}`,
      data,
    );
    return updated;
  },
  deleteCustomer: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/customers/${id}`);
    return data;
  },
};
