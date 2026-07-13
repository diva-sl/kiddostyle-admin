import { apiClient } from "./apiClient";

export interface Coupon {
  id?: string;
  code: string;
  discountType: string; // "percentage", "fixed"
  discountValue: number;
  minPurchase: number;
  expiryDate: string; // ISO string
  active: boolean;
  usageLimit: number;
  usageCount: number;
  createdAt?: string;
}

export const couponService = {
  getCoupons: async (): Promise<Coupon[]> => {
    const { data } = await apiClient.get<Coupon[]>("/coupons");
    return data;
  },
  createCoupon: async (data: Coupon): Promise<Coupon> => {
    const { data: created } = await apiClient.post<Coupon>("/coupons", data);
    return created;
  },
  updateCoupon: async (id: string, data: Partial<Coupon>): Promise<any> => {
    const { data: updated } = await apiClient.put<any>(`/coupons/${id}`, data);
    return updated;
  },
  deleteCoupon: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/coupons/${id}`);
    return data;
  },
};
