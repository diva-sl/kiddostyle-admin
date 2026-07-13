import { apiClient } from "./apiClient";

export interface Review {
  id?: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: string; // "pending", "approved", "rejected"
  createdAt?: string;
}

export const reviewService = {
  getReviews: async (): Promise<Review[]> => {
    const { data } = await apiClient.get<Review[]>("/reviews");
    return data;
  },
  createReview: async (data: any): Promise<Review> => {
    const { data: created } = await apiClient.post<Review>("/reviews", data);
    return created;
  },
  updateReviewStatus: async (id: string, status: string): Promise<any> => {
    const { data } = await apiClient.put<any>(`/reviews/${id}`, { status });
    return data;
  },
  deleteReview: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/reviews/${id}`);
    return data;
  },
};
