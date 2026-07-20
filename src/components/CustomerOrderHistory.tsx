import React from "react";
import type { Customer } from "../services/customerService";

interface CustomerOrderHistoryProps {
  customer: Customer;
}

interface OrderRow {
  id: string;
  date: string;
  items: string;
  status: "processing" | "delivered";
  statusText: string;
  statusColor: string;
  amount: string;
}

const historyList: OrderRow[] = [
  {
    id: "#KS-90124",
    date: "Oct 24, 2023",
    items: "4 items",
    status: "processing",
    statusText: "Processing",
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
    amount: "$210.00",
  },
  {
    id: "#KS-88231",
    date: "Sep 12, 2023",
    items: "2 items",
    status: "delivered",
    statusText: "Delivered",
    statusColor: "bg-green-50 text-green-700 border border-green-100",
    amount: "$154.50",
  },
  {
    id: "#KS-85112",
    date: "Aug 05, 2023",
    items: "7 items",
    status: "delivered",
    statusText: "Delivered",
    statusColor: "bg-green-50 text-green-700 border border-green-100",
    amount: "$420.00",
  },
];

export const CustomerOrderHistory: React.FC<CustomerOrderHistoryProps> = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden select-none">
      {/* Title */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex justify-between items-center select-none">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Order History
        </h3>
        <button className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer">
          View All
        </button>
      </div>

      {/* Grid list details */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/40 text-xs font-bold text-[#584045]/70 border-b border-[#dfbec4]/20 select-none">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {historyList.map((row) => (
              <tr key={row.id} className="hover:bg-[#faf8ff] transition-colors">
                <td className="px-6 py-4 font-bold text-[#b31f56]">{row.id}</td>
                <td className="px-6 py-4 text-[#584045]/80">{row.date}</td>
                <td className="px-6 py-4 text-[#584045]/80">{row.items}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.statusColor}`}
                  >
                    {row.statusText}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-extrabold text-[#131b2e]">
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
