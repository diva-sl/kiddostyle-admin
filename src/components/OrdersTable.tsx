import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdVisibility,
  MdDelete,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useOrders, useDeleteOrder } from "../hooks/useOrders";
import type { Order } from "../services/orderService";

interface OrdersTableProps {
  activeTab: string;
  searchQuery: string;
}

// Retains your exact custom colors configuration for fallbacks
const fallbackOrdersList = [
  {
    id: "1",
    orderNumber: "KS-8892",
    customer: { name: "Emily Morrison", email: "emily@example.com" },
    totalAmount: 124.5,
    status: "shipped",
    createdAt: "2026-10-22T10:45:00.000Z",
    avatarColor: "bg-[#dae2fd] text-[#131b2e]",
  },
  {
    id: "2",
    orderNumber: "KS-8891",
    customer: { name: "James Wilson", email: "james@example.com" },
    totalAmount: 89.0,
    status: "delivered",
    createdAt: "2026-10-21T14:30:00.000Z",
    avatarColor: "bg-[#5bd5fc]/20 text-[#003442]",
  },
  {
    id: "3",
    orderNumber: "KS-8890",
    customer: { name: "Sophia Chen", email: "sophia@example.com" },
    totalAmount: 256.75,
    status: "pending",
    createdAt: "2026-10-21T11:15:00.000Z",
    avatarColor: "bg-[#ffd9df] text-[#3f0018]",
  },
  {
    id: "4",
    orderNumber: "KS-8889",
    customer: { name: "Marcus Bennett", email: "marcus@example.com" },
    totalAmount: 45.2,
    status: "cancelled",
    createdAt: "2026-10-20T09:20:00.000Z",
    avatarColor: "bg-[#ffdad6] text-[#ba1a1a]",
  },
  {
    id: "5",
    orderNumber: "KS-8888",
    customer: { name: "Laura O'Connell", email: "laura@example.com" },
    totalAmount: 312.0,
    status: "processing",
    createdAt: "2026-10-19T16:55:00.000Z",
    avatarColor: "bg-[#ffdf9b] text-[#251a00]",
  },
];

export const OrdersTable: React.FC<OrdersTableProps> = ({
  activeTab,
  searchQuery,
}) => {
  const navigate = useNavigate();
  const { data: dbOrders, isLoading } = useOrders();
  const deleteMutation = useDeleteOrder();

  // Pagination states
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this order document?")
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Map backend query results or fall back
  const displayList: any[] =
    dbOrders && dbOrders.length > 0
      ? dbOrders
      : fallbackOrdersList.map((o) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          customer: {
            name: o.customer.name,
            email: o.customer.email,
            phone: "+1 555-0100", // Fills the required customer phone property
          },
          items: [] as any[], // Safe type declaration for empty line items
          totalAmount: o.totalAmount,
          status: o.status,
          paymentMethod: "COD",
          paymentStatus: "pending",
          createdAt: o.createdAt,
          avatarColor: o.avatarColor,
        }));

  // Filter Orders based on active inputs
  const filteredList = displayList.filter((o) => {
    // 1. Tab Status filters
    if (
      activeTab !== "All Orders" &&
      o.status.toLowerCase() !== activeTab.toLowerCase()
    )
      return false;

    // 2. Search query filters
    if (searchQuery) {
      const matchNum = o.orderNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchCust = (o.customer?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchNum && !matchCust) return false;
    }

    return true;
  });

  // Pagination Calculations
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startIdx =
    totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  // Status color mapper
  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-[#00a4ca]/10 text-[#006780]";
    if (s === "shipped") return "bg-[#ffd167]/30 text-[#765900]";
    if (s === "processing") return "bg-[#ff5c8d]/20 text-[#b31f56]";
    if (s === "cancelled") return "bg-[#ffdad6] text-[#ba1a1a]";
    return "bg-[#e2e7ff] text-[#584045]"; // pending status style
  };

  // Avatar background generators if live db doesn't specify one
  const getAvatarStyle = (o: any) => {
    if (o.avatarColor) return o.avatarColor;
    const colors = [
      "bg-[#dae2fd] text-[#131b2e]",
      "bg-[#5bd5fc]/20 text-[#003442]",
      "bg-[#ffd9df] text-[#3f0018]",
      "bg-[#ffdf9b] text-[#251a00]",
    ];
    const code = o.customer?.name?.charCodeAt(0) || 0;
    return colors[code % colors.length];
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70">
        Loading active order catalog...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-[#dfbec4]/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff] text-[#584045]/80 uppercase text-[10px] tracking-widest font-bold border-b border-[#dfbec4]/20 select-none">
              <th className="px-6 py-5">Order ID</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Total Amount</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {paginatedList.map((o) => {
              const customerName = o.customer?.name || "Guest Customer";
              const initials = customerName
                .split(" ")
                .map((w: any[]) => w[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={o.id}
                  className="hover:bg-[#f2f3ff]/20 transition-all group"
                >
                  <td className="px-6 py-5">
                    <span className="font-bold text-[#b31f56]">
                      #{o.orderNumber}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-[#584045]">
                    {new Date(o.createdAt || Date.now()).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${getAvatarStyle(o)}`}
                      >
                        {initials}
                      </div>
                      <span className="font-bold text-[#131b2e]">
                        {customerName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-extrabold text-[#131b2e]">
                    ${o.totalAmount.toFixed(2)}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${getStatusStyle(o.status)}`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/orders/${o.id}`)}
                        className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer"
                        title="View order details invoice"
                      >
                        <MdVisibility className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(o.id || "")}
                        className="p-1.5 hover:bg-[#ffdad6] text-[#ba1a1a] rounded-full cursor-pointer"
                        title="Delete order record"
                      >
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-8 py-4 bg-[#f2f3ff] border-t border-[#dfbec4]/20 flex items-center justify-between select-none">
        <p className="font-semibold text-xs text-[#584045]">
          Showing {startIdx} to {endIdx} of {totalItems} orders
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <MdChevronLeft className="w-5 h-5 text-[#584045]" />
          </button>
          <span className="px-3.5 py-2.5 rounded-lg bg-[#b31f56] text-white font-bold text-xs select-none">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <MdChevronRight className="w-5 h-5 text-[#584045]" />
          </button>
        </div>
      </div>
    </div>
  );
};
