import { apiClient } from "./apiClient";

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  author: string;
  image?: string;
  tags: string[];
  status: string; // "draft", "published"
  publishedAt?: string;
}

export const blogService = {
  getArticles: async (): Promise<Article[]> => {
    const { data } = await apiClient.get<Article[]>("/blog");
    return data;
  },
  createArticle: async (payload: any): Promise<Article> => {
    const { data } = await apiClient.post<Article>("/blog", payload);
    return data;
  },
  updateArticle: async (
    id: string,
    payload: Partial<Article>,
  ): Promise<any> => {
    const { data } = await apiClient.put<any>(`/blog/${id}`, payload);
    return data;
  },
  deleteArticle: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/blog/${id}`);
    return data;
  },
};
