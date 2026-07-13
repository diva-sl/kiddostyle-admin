import { apiClient } from "./apiClient";

export interface Banner {
  id?: string;
  title: string;
  subtitle: string;
  image?: string;
  link: string;
  position: string; // "hero", "middle", "footer"
  active: boolean;
  createdAt?: string;
}

export const bannerService = {
  getBanners: async (): Promise<Banner[]> => {
    const { data } = await apiClient.get<Banner[]>("/banners");
    return data;
  },
  createBanner: async (payload: any): Promise<Banner> => {
    const { data } = await apiClient.post<Banner>("/banners", payload);
    return data;
  },
  updateBanner: async (id: string, payload: Partial<Banner>): Promise<any> => {
    const { data } = await apiClient.put<any>(`/banners/${id}`, payload);
    return data;
  },
  deleteBanner: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/banners/${id}`);
    return data;
  },
};
