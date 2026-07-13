import { apiClient } from "./apiClient";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "seller" | "manager" | "editor";
  status: "active" | "suspended";
  createdAt?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  register: async (data: Record<string, string>): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  },

  getSessionUser: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },
};
