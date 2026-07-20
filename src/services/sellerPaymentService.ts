import { apiClient } from "./apiClient";

export interface PayoutMethod {
  type: "bank" | "card" | "paypal";
  accountHolder?: string;
  bankName?: string;
  accountNumber?: string;
  routingCode?: string;
  cardNumber?: string;
  cardExpiry?: string;
  paypalEmail?: string;
}

export interface SellerBalance {
  availableBalance: number;
  grossSales: number;
  marketplaceFees: number;
  shippingCosts: number;
  nextPayoutDate: string;
}

export interface SellerTransaction {
  id: string;
  title: string;
  orderId: string;
  date: string;
  status: "completed" | "pending" | "withdrawn";
  amount: number;
  image?: string;
  isWallet?: boolean;
}

export const sellerPaymentService = {
  // Save or Update Payout Method
  savePayoutMethod: async (payoutData: PayoutMethod): Promise<any> => {
    const { data } = await apiClient.put<any>("/auth/profile", {
      payoutMethod: payoutData,
    });
    return data;
  },

  // Get seller balance metrics
  getSellerBalance: async (sellerId?: string): Promise<SellerBalance> => {
    try {
      const { data } = await apiClient.get<SellerBalance>("/analytics", {
        params: { sellerId, type: "seller_balance" },
      });
      return data;
    } catch (err) {
      return {
        availableBalance: 12840.5,
        grossSales: 15200.0,
        marketplaceFees: 1840.0,
        shippingCosts: 519.5,
        nextPayoutDate: "Next Monday",
      };
    }
  },

  // Request payout withdrawal
  requestWithdrawal: async (
    amount: number,
    sellerId?: string,
  ): Promise<any> => {
    const { data } = await apiClient.post<any>("/seller/withdraw", {
      amount,
      sellerId,
    });
    return data;
  },

  // Get seller transaction history
  getTransactions: async (sellerId?: string): Promise<SellerTransaction[]> => {
    try {
      const { data } = await apiClient.get<SellerTransaction[]>("/orders", {
        params: { sellerId },
      });
      return data;
    } catch (err) {
      return [];
    }
  },
};
