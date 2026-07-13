import { apiClient } from "./apiClient";

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  subCategories: string[];
  createdAt?: string;
  totalProducts?: number; // Calculated dynamically in lists
}

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  },
  createCategory: async (data: Category): Promise<Category> => {
    const { data: created } = await apiClient.post<Category>(
      "/categories",
      data,
    );
    return created;
  },
  updateCategory: async (id: string, data: Partial<Category>): Promise<any> => {
    const { data: updated } = await apiClient.put<any>(
      `/categories/${id}`,
      data,
    );
    return updated;
  },
  deleteCategory: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/categories/${id}`);
    return data;
  },
};
