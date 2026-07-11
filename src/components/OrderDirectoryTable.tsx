import React, { useState } from "react";
import {
  MdLocalShipping,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdMoreHoriz,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface OrderRow {
  id: string;
  date: string;
  name: string;
  initials: string;
  avatarBg: string;
  amount: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  statusText: string;
  statusIcon: React.ReactNode;
  statusColor: string;
}

const orders: OrderRow[] = [
  {
    id: "#KD-8923",
    date: "Oct 24, 2023",
    name: "Sarah Miller",
    initials: "SM",
    avatarBg: "bg-[#ffd167]/30 text-[#785a00]",
    amount: "$124.50",
    status: "shipped",
    statusText: "Shipped",
    statusIcon: <MdLocalShipping className="w-3.5 h-3.5" />,
    statusColor: "bg-[#b7eaff] text-[#006780]",
  },
  {
    id: "#KD-8924",
    date: "Oct 24, 2023",
    name: "James Davis",
    initials: "JD",
    avatarBg: "bg-[#ffd9df] text-[#b31f56]",
    amount: "$89.00",
    status: "pending",
    statusText: "Pending",
    statusIcon: <MdSchedule className="w-3.5 h-3.5" />,
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
  },
  {
    id: "#KD-8925",
    date: "Oct 23, 2023",
    name: "Emma Wilson",
    initials: "EM",
    avatarBg: "bg-[#b7eaff] text-[#006780]",
    amount: "$210.20",
    status: "delivered",
    statusText: "Delivered",
    statusIcon: <MdCheckCircle className="w-3.5 h-3.5" />,
    statusColor: "bg-[#ffd9df] text-[#b31f56]",
  },
  {
    id: "#KD-8926",
    date: "Oct 23, 2023",
    name: "Robert Taylor",
    initials: "RT",
    avatarBg: "bg-[#f2f3ff] text-[#584045]",
    amount: "$45.00",
    status: "cancelled",
    statusText: "Cancelled",
    statusIcon: <MdCancel className="w-3.5 h-3.5" />,
    statusColor: "bg-[#ffdad6] text-[#ba1a1a]",
  },
];

export const OrderDirectoryTable: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "pending" | "shipped" | "delivered" | "cancelled"
  >("all");
  const [sortBy, setSortBy] = useState("latest");

  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.status === filter;
  });

  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden select-none">
      {/* Table Header Filter & Sorting */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#f2f3ff]/30">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          {(
            ["all", "pending", "shipped", "delivered", "cancelled"] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full font-bold text-xs capitalize transition-all cursor-pointer whitespace-nowrap ${
                filter === tab
                  ? "bg-[#b31f56] text-white shadow-sm"
                  : "bg-white text-[#584045]/70 hover:bg-[#faf8ff] border border-[#dfbec4]/20"
              }`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#584045]/60">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none focus:ring-0 font-bold text-xs text-[#b31f56] cursor-pointer outline-none"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid listing Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70">
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Total Amount</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {filteredOrders.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                <td className="py-4 px-6 font-bold text-[#b31f56]">{row.id}</td>

                <td className="py-4 px-6 text-[#584045]/80">{row.date}</td>

                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${row.avatarBg}`}
                    >
                      {row.initials}
                    </div>
                    <span className="font-bold text-[#131b2e]">{row.name}</span>
                  </div>
                </td>

                <td className="py-4 px-6 font-extrabold text-sm text-[#131b2e]">
                  {row.amount}
                </td>

                {/* Multi colored status badges */}
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold select-none ${row.statusColor}`}
                  >
                    {row.statusIcon}
                    {row.statusText}
                  </span>
                </td>

                <td className="py-4 px-6 text-right">
                  <button className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/60 hover:text-[#b31f56] transition-colors cursor-pointer">
                    <MdMoreHoriz className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex justify-between items-center bg-[#f2f3ff]/10">
        <p className="text-[10px] font-extrabold text-[#584045]/60">
          Showing 1-4 of 124 orders
        </p>

        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#dfbec4]/30 hover:bg-[#faf8ff] transition-colors disabled:opacity-30 cursor-pointer">
            <MdChevronLeft className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>

          <button className="w-8 h-8 rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#faf8ff] text-[#584045] font-bold text-xs cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#faf8ff] text-[#584045] font-bold text-xs cursor-pointer">
            3
          </button>

          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#dfbec4]/30 hover:bg-[#faf8ff] transition-colors cursor-pointer">
            <MdChevronRight className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
