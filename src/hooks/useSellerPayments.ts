import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sellerPaymentService } from "../services/sellerPaymentService";

export const useSellerBalance = (sellerId?: string) => {
  return useQuery({
    queryKey: ["sellerBalance", sellerId],
    queryFn: () => sellerPaymentService.getSellerBalance(sellerId),
  });
};

export const useSellerTransactions = (sellerId?: string) => {
  return useQuery({
    queryKey: ["sellerTransactions", sellerId],
    queryFn: () => sellerPaymentService.getTransactions(sellerId),
  });
};

export const useRequestWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ amount, sellerId }: { amount: number; sellerId?: string }) =>
      sellerPaymentService.requestWithdrawal(amount, sellerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sellerBalance"] });
      queryClient.invalidateQueries({ queryKey: ["sellerTransactions"] });
    },
  });
};
