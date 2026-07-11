import React from "react";
import { MdArrowForward, MdVisibility } from "react-icons/md";

interface OrderRow {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  status: "pending" | "shipped" | "processing";
  statusText: string;
  statusColor: string;
  items: string;
  total: string;
}

const recentOrders: OrderRow[] = [
  {
    id: "#KS-8821",
    name: "Sarah Miller",
    initials: "SM",
    avatarBg: "bg-[#ffd9df] text-[#b31f56]",
    status: "pending",
    statusText: "Pending",
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
    items: "",
    total: "",
  },
  {
    id: "#KS-8820",
    name: "James Harrison",
    initials: "JH",
    avatarBg: "bg-[#b7eaff] text-[#006780]",
    status: "shipped",
    statusText: "Shipped",
    statusColor: "bg-[#00a4ca]/10 text-[#006780]",
    items: "",
    total: "",
  },
  {
    id: "#KS-8819",
    name: "Emily Parker",
    initials: "EP",
    avatarBg: "bg-[#ffd167]/30 text-[#785a00]",
    status: "processing",
    statusText: "Processing",
    statusColor: "bg-[#ffd9df] text-[#b31f56]",
    items: "",
    total: "",
  },
];

export const SellerOrders: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden mb-12">
      {/* Title block */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex justify-between items-center bg-[#f2f3ff]/30 select-none">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Recent Orders
        </h3>
        <button className="text-[#b31f56] font-bold text-xs flex items-center gap-0.5 hover:underline cursor-pointer">
          View all orders
          <MdArrowForward className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Grid listing */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70 select-none">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {recentOrders.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                <td className="px-6 py-4 font-bold text-[#131b2e]">{row.id}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] ${row.avatarBg}`}
                    >
                      {row.initials}
                    </div>
                    <span className="font-bold text-[#131b2e]">{row.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold select-none ${row.statusColor}`}
                  >
                    {row.statusText}
                  </span>
                </td>

                <td className="px-6 py-4 text-[#584045]/60">{row.items}</td>

                <td className="px-6 py-4 font-extrabold text-[#131b2e]">
                  {row.total}
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 hover:bg-[#f2f3ff] rounded-lg text-[#584045]/60 hover:text-[#b31f56] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <MdVisibility className="w-4.5 h-4.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
