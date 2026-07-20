import { apiClient } from "./apiClient";

export interface Settings {
  id?: string;
  siteName: string;
  siteEmail: string;
  sitePhone: string;
  logo?: string;
  currency: string;
  taxRate?: number;
  shippingFee?: number;
}

export const settingsService = {
  getSettings: async (): Promise<Settings> => {
    const { data } = await apiClient.get<Settings>("/settings");
    return data;
  },
  updateSettings: async (payload: Partial<Settings>): Promise<any> => {
    const { data } = await apiClient.put<any>("/settings", payload);
    return data;
  },
};
