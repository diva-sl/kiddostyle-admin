import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { returnService } from "../services/returnService";
import type { Return } from "../services/returnService";

export const useReturns = () => {
  return useQuery({
    queryKey: ["returns"],
    queryFn: returnService.getReturns,
  });
};

export const useUpdateReturn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Return> }) =>
      returnService.updateReturn(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
    },
  });
};
