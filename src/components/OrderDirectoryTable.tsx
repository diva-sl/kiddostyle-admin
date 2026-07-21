import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLocalShipping,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useOrders } from "../hooks/useOrders";

interface OrderDirectoryTableProps {
  sellerId?: string;
}

const fallbackOrdersList = [
  {
    id: "1",
    orderNumber: "KD-8923",
    date: "Oct 24, 2023",
    name: "Sarah Miller",
    initials: "SM",
    avatarBg: "bg-[#ffd167]/30 text-[#785a00]",
    amount: "$124.50",
    status: "shipped",
    statusText: "Shipped",
    statusColor: "bg-[#b7eaff] text-[#006780]",
  },
  {
    id: "2",
    orderNumber: "KD-8924",
    date: "Oct 24, 2023",
    name: "James Davis",
    initials: "JD",
    avatarBg: "bg-[#ffd9df] text-[#b31f56]",
    amount: "$89.00",
    status: "pending",
    statusText: "Pending",
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
  },
  {
    id: "3",
    orderNumber: "KD-8925",
    date: "Oct 23, 2023",
    name: "Emma Wilson",
    initials: "EM",
    avatarBg: "bg-[#b7eaff] text-[#006780]",
    amount: "$210.20",
    status: "delivered",
    statusText: "Delivered",
    statusColor: "bg-[#ffd9df] text-[#b31f56]",
  },
  {
    id: "4",
    orderNumber: "KD-8926",
    date: "Oct 23, 2023",
    name: "Robert Taylor",
    initials: "RT",
    avatarBg: "bg-[#f2f3ff] text-[#584045]",
    amount: "$45.00",
    status: "cancelled",
    statusText: "Cancelled",
    statusColor: "bg-[#ffdad6] text-[#ba1a1a]",
  },
];

export const OrderDirectoryTable: React.FC<OrderDirectoryTableProps> = ({
  sellerId,
}) => {
  const navigate = useNavigate();
  const { data: rawOrders, isLoading } = useOrders(
    sellerId ? { sellerId } : undefined,
  );
  const dbOrders = Array.isArray(rawOrders) ? rawOrders : [];

  const [filter, setFilter] = useState<
    "all" | "pending" | "shipped" | "delivered" | "cancelled"
  >("all");
  const [sortBy, setSortBy] = useState("latest");

  // Pagination states
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const displayList =
    dbOrders.length > 0
      ? dbOrders.map((o) => {
          const initials = (o.customer?.name || "G")
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
          return {
            id: o.id || "",
            orderNumber: o.orderNumber,
            date: o.createdAt
              ? new Date(o.createdAt).toLocaleDateString()
              : "Just now",
            name: o.customer?.name || "Guest Customer",
            initials,
            avatarBg: "bg-[#ffd9df] text-[#b31f56]",
            amount: `$${(o.totalAmount || 0).toFixed(2)}`,
            status: o.status || "pending",
            statusText: (o.status || "pending").toUpperCase(),
          };
        })
      : fallbackOrdersList;

  const filteredOrders = displayList.filter((o) => {
    if (filter === "all") return true;
    return o.status === filter;
  });

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "shipped") {
      return {
        icon: <MdLocalShipping className="w-3.5 h-3.5" />,
        color: "bg-[#b7eaff] text-[#006780]",
      };
    }
    if (s === "delivered") {
      return {
        icon: <MdCheckCircle className="w-3.5 h-3.5" />,
        color: "bg-green-100 text-green-800",
      };
    }
    if (s === "cancelled") {
      return {
        icon: <MdCancel className="w-3.5 h-3.5" />,
        color: "bg-[#ffdad6] text-[#ba1a1a]",
      };
    }
    return {
      icon: <MdSchedule className="w-3.5 h-3.5" />,
      color: "bg-[#ffd167]/30 text-[#765900]",
    };
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 bg-white rounded-3xl border border-[#dfbec4]/30">
        Loading orders directory...
      </div>
    );
  }

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
              onClick={() => {
                setFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs capitalize transition-all cursor-pointer whitespace-nowrap border-none ${
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
            {paginatedList.map((row) => {
              const badge = getStatusBadge(row.status);
              return (
                <tr
                  key={row.id}
                  className="hover:bg-[#faf8ff] transition-colors group"
                >
                  <td
                    onClick={() => row.id && navigate(`/orders/${row.id}`)}
                    className="py-4 px-6 font-bold text-[#b31f56] cursor-pointer hover:underline"
                  >
                    #{row.orderNumber}
                  </td>

                  <td className="py-4 px-6 text-[#584045]/80">{row.date}</td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${row.avatarBg}`}
                      >
                        {row.initials}
                      </div>
                      <span className="font-bold text-[#131b2e]">
                        {row.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-extrabold text-sm text-[#131b2e]">
                    {row.amount}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold capitalize select-none ${badge.color}`}
                    >
                      {badge.icon}
                      {row.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => row.id && navigate(`/orders/${row.id}`)}
                      className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/60 hover:text-[#b31f56] transition-colors cursor-pointer border-none bg-none"
                      title="View Invoice Details"
                    >
                      <MdVisibility className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex justify-between items-center bg-[#f2f3ff]/10">
        <p className="text-[10px] font-extrabold text-[#584045]/60">
          Showing {paginatedList.length} of {totalItems} orders
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#dfbec4]/30 hover:bg-[#faf8ff] transition-colors disabled:opacity-30 cursor-pointer border-none"
          >
            <MdChevronLeft className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>

          <span className="px-3 py-1 rounded-full bg-[#b31f56] text-white font-bold text-xs">
            {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#dfbec4]/30 hover:bg-[#faf8ff] transition-colors disabled:opacity-30 cursor-pointer border-none"
          >
            <MdChevronRight className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
