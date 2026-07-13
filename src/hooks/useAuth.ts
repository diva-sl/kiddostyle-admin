import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useAdminSession = () => {
  return useQuery({
    queryKey: ["adminSession"],
    queryFn: authService.getSessionUser,
    retry: false,
    enabled: !!localStorage.getItem("token"),
  });
};

export const useAdminLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.setQueryData(["adminSession"], data.user);
      queryClient.invalidateQueries({ queryKey: ["adminSession"] });
    },
  });
};
