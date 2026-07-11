import React, { useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";

interface TxnRow {
  id: string;
  title: string;
  orderId: string;
  date: string;
  status: "completed" | "pending" | "withdrawn";
  statusText: string;
  statusColor: string;
  amount: string;
  image?: string;
  isWallet?: boolean;
}

const transactions: TxnRow[] = [
  {
    id: "1",
    title: "Organic Cotton Sun Tee",
    orderId: "Order #KS-9284",
    date: "Oct 18, 2023",
    status: "completed",
    statusText: "Completed",
    statusColor: "bg-[#b7eaff] text-[#006780]",
    amount: "$34.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCohLNcuFW16ViRGYoxJYdc8odULK0mGhj_AeE1pJJyazcR9zmfaSSvXf-q7jmF1pqLNdpLRxIkL9amnFpUINPOz-ev80LRilC4-za1wgpSMex5Ki7xoEAKkpqKShTjKOzCzyA-0sufVBeFbnpdeiwsuFaK_gieVBFaKj8-zsMd4aVbI8wa1k4XsrtolOlUglOrFReA7yFaUh_Y-0jQtQxI2x55MLKUGpesoz51eny23KEuA6CtTHnZ1F94df5SNglIgLGNNW0-afHj",
  },
  {
    id: "2",
    title: "Rainbow Denim Overalls",
    orderId: "Order #KS-9271",
    date: "Oct 17, 2023",
    status: "pending",
    statusText: "Pending",
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
    amount: "$58.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrhCfcdRvFvasVsIc0z1c6Sdn-uXPFHCRoNDTZaVW5vtUfhxThkw51f_acgAkIvTAsQBf-6-q747KBoC-uc_xBPd4-LC7CQLYsDN4p0bP3v4PX6ErQzj_AXDtRpVkWzGtrfS6LfKTj95kavVWFiBMiTEYAQ1WbRf1613-lxu4EZe6VwWSmCDn9wiqGEuxkjYwSSxZLpIXH7GlZGFcvN6tE3t21I_zqf3jGp1GA2fUT1wIJ-wX8Xq4Bn6hZ1Ip0sMHY96OrQDtwYVHe",
  },
  {
    id: "3",
    title: "Payout to Bank Account",
    orderId: "Reference #910283",
    date: "Oct 15, 2023",
    status: "withdrawn",
    statusText: "Withdrawn",
    statusColor: "bg-[#e2e7ff] text-[#131b2e]",
    amount: "-$1,200.00",
    isWallet: true,
  },
];

export const RecentPaymentsTable: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "sales" | "refunds">("sales");

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
          Recent Transactions
        </h4>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#b31f56] text-white shadow-sm"
                : "text-[#584045]/70 border border-[#dfbec4]/20 bg-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("sales")}
            className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
              filter === "sales"
                ? "bg-[#b31f56] text-white shadow-sm"
                : "text-[#584045]/70 border border-[#dfbec4]/20 bg-white"
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setFilter("refunds")}
            className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
              filter === "refunds"
                ? "bg-[#b31f56] text-white shadow-sm"
                : "text-[#584045]/70 border border-[#dfbec4]/20 bg-white"
            }`}
          >
            Refunds
          </button>
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
            {transactions.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#faf8ff] transition-colors cursor-pointer"
              >
                {/* Details thumbnail */}
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

                {/* Status Badges */}
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
                      row.status === "withdrawn"
                        ? "text-[#584045]/85"
                        : "text-[#b31f56]"
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
          <button className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer">
            View Transaction History
          </button>
        </div>
      </div>
    </div>
  );
};
