import { apiClient } from "./apiClient";

export interface LandingPage {
  id?: string;
  title: string;
  slug: string;
  content?: Record<string, any>; // JSON design configuration config
  active: boolean;
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
}

export const landingPageService = {
  getLandingPages: async (): Promise<LandingPage[]> => {
    const { data } = await apiClient.get<LandingPage[]>("/landing-pages");
    return data;
  },
  createLandingPage: async (payload: any): Promise<LandingPage> => {
    const { data } = await apiClient.post<LandingPage>(
      "/landing-pages",
      payload,
    );
    return data;
  },
  updateLandingPage: async (
    id: string,
    payload: Partial<LandingPage>,
  ): Promise<any> => {
    const { data } = await apiClient.put<any>(`/landing-pages/${id}`, payload);
    return data;
  },
  deleteLandingPage: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/landing-pages/${id}`);
    return data;
  },
};
