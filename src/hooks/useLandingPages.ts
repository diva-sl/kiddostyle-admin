import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { landingPageService } from "../services/landingPageService";
import type { LandingPage } from "../services/landingPageService";

export const useLandingPages = () => {
  return useQuery({
    queryKey: ["landingPages"],
    queryFn: landingPageService.getLandingPages,
  });
};

export const useCreateLandingPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: landingPageService.createLandingPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landingPages"] });
    },
  });
};

export const useUpdateLandingPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<LandingPage>;
    }) => landingPageService.updateLandingPage(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landingPages"] });
    },
  });
};

export const useDeleteLandingPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: landingPageService.deleteLandingPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landingPages"] });
    },
  });
};
