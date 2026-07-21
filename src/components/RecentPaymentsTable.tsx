import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useOrders } from "../hooks/useOrders";

interface RecentPaymentsTableProps {
  sellerId?: string;
}

interface TxnDisplayItem {
  id: string;
  title: string;
  orderId: string;
  date: string;
  statusText: string;
  statusColor: string;
  amount: string;
  image?: string;
  isWallet?: boolean;
}

const fallbackTxns: TxnDisplayItem[] = [
  {
    id: "1",
    title: "Organic Cotton Sun Tee",
    orderId: "Order #KS-9284",
    date: "Oct 18, 2023",
    statusText: "Completed",
    statusColor: "bg-[#b7eaff] text-[#006780]",
    amount: "$34.00",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
    isWallet: false,
  },
  {
    id: "2",
    title: "Rainbow Denim Overalls",
    orderId: "Order #KS-9271",
    date: "Oct 17, 2023",
    statusText: "Pending",
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
    amount: "$58.50",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80",
    isWallet: false,
  },
  {
    id: "3",
    title: "Payout to Bank Account",
    orderId: "Reference #910283",
    date: "Oct 15, 2023",
    statusText: "Withdrawn",
    statusColor: "bg-[#e2e7ff] text-[#131b2e]",
    amount: "-$1,200.00",
    isWallet: true,
  },
];

export const RecentPaymentsTable: React.FC<RecentPaymentsTableProps> = ({
  sellerId,
}) => {
  const navigate = useNavigate();
  const { data: rawOrders, isLoading } = useOrders(
    sellerId ? { sellerId } : undefined,
  );
  const dbOrders = Array.isArray(rawOrders) ? rawOrders : [];
  const [filter, setFilter] = useState<"all" | "sales" | "refunds">("all");

  const displayList: TxnDisplayItem[] =
    dbOrders.length > 0
      ? dbOrders.map((o) => ({
          id: o.id || "",
          title: o.items?.[0]?.name || "Customer Store Order",
          orderId: `Order #${o.orderNumber}`,
          date: o.createdAt
            ? new Date(o.createdAt).toLocaleDateString()
            : "Just now",
          statusText: o.paymentStatus === "paid" ? "Completed" : "Pending",
          statusColor:
            o.paymentStatus === "paid"
              ? "bg-[#b7eaff] text-[#006780]"
              : "bg-[#ffd167]/30 text-[#765900]",
          amount: `$${(o.totalAmount || 0).toFixed(2)}`,
          image:
            o.items?.[0]?.image ||
            "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
          isWallet: false,
        }))
      : fallbackTxns;

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 bg-white rounded-3xl border border-[#dfbec4]/30">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
          Recent Transactions
        </h4>

        <div className="flex gap-2">
          {(["all", "sales", "refunds"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer border-none capitalize ${
                filter === tab
                  ? "bg-[#b31f56] text-white shadow-sm"
                  : "text-[#584045]/70 border border-[#dfbec4]/20 bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing Table */}
      <div className="bg-white rounded-[24px] border border-[#dfbec4]/30 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f2f3ff]/40 border-b border-[#dfbec4]/20 text-xs font-bold text-[#584045]/70">
            <tr>
              <th className="px-6 py-4">Order / Item</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {displayList.map((row) => (
              <tr
                key={row.id}
                onClick={() => row.id && navigate(`/orders/${row.id}`)}
                className="hover:bg-[#faf8ff] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {row.isWallet ? (
                      <div className="w-12 h-12 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/20 flex items-center justify-center text-[#b31f56] shrink-0">
                        <MdAccountBalanceWallet className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#dfbec4]/20 bg-[#faf8ff]">
                        <img
                          className="w-full h-full object-cover"
                          src={row.image}
                          alt={row.title}
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-[#131b2e] leading-snug">
                        {row.title}
                      </p>
                      <p className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
                        {row.orderId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[#584045]/80">{row.date}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded text-[9px] uppercase font-extrabold tracking-wider select-none ${row.statusColor}`}
                  >
                    {row.statusText}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-extrabold text-sm text-[#131b2e]">
                  <span
                    className={
                      row.isWallet ? "text-[#584045]/85" : "text-[#b31f56]"
                    }
                  >
                    {row.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer actions view history */}
        <div className="p-4 bg-[#faf8ff] text-center border-t border-[#dfbec4]/15">
          <button
            onClick={() => navigate("/seller/orders")}
            className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer border-none bg-none"
          >
            View Complete Orders Statement
          </button>
        </div>
      </div>
    </div>
  );
};
