import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/adminService";

// Dashboard Analytics hook
export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: adminService.getAnalytics,
  });
};

// Orders hook
export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["adminOrders"],
    queryFn: adminService.getOrders,
  });
};

// Categories hook
export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["adminCategories"],
    queryFn: adminService.getCategories,
  });
};

// Settings Hooks
export const useSystemSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: adminService.getSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
