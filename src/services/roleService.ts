import { apiClient } from "./apiClient";

export interface Role {
  id?: string;
  name: string;
  description: string;
  permissions: string[];
}

export const roleService = {
  getRoles: async (): Promise<Role[]> => {
    const { data } = await apiClient.get<Role[]>("/roles");
    return data;
  },
  createRole: async (payload: Role): Promise<Role> => {
    const { data } = await apiClient.post<Role>("/roles", payload);
    return data;
  },
  updateRole: async (id: string, payload: Partial<Role>): Promise<any> => {
    const { data } = await apiClient.put<any>(`/roles/${id}`, payload);
    return data;
  },
  deleteRole: async (id: string): Promise<any> => {
    const { data } = await apiClient.delete<any>(`/roles/${id}`);
    return data;
  },
};
