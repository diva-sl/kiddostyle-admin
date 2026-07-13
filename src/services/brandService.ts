import { apiClient } from "./apiClient";

export interface Brand {
  id?: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  status: string;
  createdAt?: string;
  products?: number; // Calculated dynamically in grids
}

export const brandService = {
  getBrands: async (): Promise<Brand[]> => {
    const { data } = await apiClient.get<Brand[]>("/brands");
    return data;
  },
  createBrand: async (data: Brand): Promise<Brand> => {
    const { data: created } = await apiClient.post<Brand>("/brands", data);
    return created;
  },
  updateBrand: async (id: string, data: Partial<Brand>): Promise<any> => {
    const { data: updated } = await apiClient.put<any>(`/brands/${id}`, data);
    return updated;
  },
  deleteBrand: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/brands/${id}`);
    return data;
  },
};
