import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForward, MdVisibility } from "react-icons/md";
import { useOrders } from "../hooks/useOrders";

const fallbackOrders = [
  {
    id: "1",
    orderNumber: "KS-8821",
    customerName: "Sarah Miller",
    initials: "SM",
    status: "pending",
    itemsCount: 2,
    total: "$145.00",
  },
  {
    id: "2",
    orderNumber: "KS-8820",
    customerName: "James Harrison",
    initials: "JH",
    status: "shipped",
    itemsCount: 1,
    total: "$89.50",
  },
  {
    id: "3",
    orderNumber: "KS-8819",
    customerName: "Emily Parker",
    initials: "EP",
    status: "processing",
    itemsCount: 3,
    total: "$210.00",
  },
];

export const SellerOrders: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbOrders = [], isLoading } = useOrders();

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
            customerName: o.customer?.name || "Guest Customer",
            initials,
            status: o.status || "pending",
            itemsCount: o.items?.length || 1,
            total: `$${(o.totalAmount || 0).toFixed(2)}`,
          };
        })
      : fallbackOrders;

  const getStatusStyle = (status: string) => {
    if (status === "pending") return "bg-[#ffd167]/30 text-[#765900]";
    if (status === "shipped" || status === "delivered")
      return "bg-[#00a4ca]/10 text-[#006780]";
    return "bg-[#ffd9df] text-[#b31f56]";
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 bg-white rounded-3xl border border-[#dfbec4]/30">
        Loading recent orders...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden mb-12 select-none">
      {/* Title block */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex justify-between items-center bg-[#f2f3ff]/30">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Recent Customer Orders
        </h3>
        <button
          onClick={() => navigate("/orders")}
          className="text-[#b31f56] font-bold text-xs flex items-center gap-0.5 hover:underline cursor-pointer border-none bg-none"
        >
          View all orders
          <MdArrowForward className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Grid listing */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {displayList.slice(0, 5).map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                <td
                  onClick={() => navigate(`/orders/${row.id}`)}
                  className="px-6 py-4 font-bold text-[#b31f56] cursor-pointer hover:underline"
                >
                  #{row.orderNumber}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] bg-[#ffd9df] text-[#b31f56]">
                      {row.initials}
                    </div>
                    <span className="font-bold text-[#131b2e]">
                      {row.customerName}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize ${getStatusStyle(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-[#584045]/60">
                  {row.itemsCount} {row.itemsCount === 1 ? "item" : "items"}
                </td>

                <td className="px-6 py-4 font-extrabold text-[#131b2e]">
                  {row.total}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`/orders/${row.id}`)}
                    className="p-1.5 hover:bg-[#f2f3ff] rounded-lg text-[#584045]/60 hover:text-[#b31f56] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none bg-none"
                    title="View Order Details"
                  >
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
