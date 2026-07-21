import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMoreHoriz, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface FinancialTransactionsProps {
  orders: any[];
}

const fallbackTransactions = [
  {
    id: "TXN-94021",
    name: "Maria Anders",
    email: "m.anders@email.com",
    amount: "$248.00",
    status: "paid",
    date: "Oct 24, 2026",
  },
  {
    id: "TXN-94020",
    name: "David Lee",
    email: "d.lee@email.com",
    amount: "$1,210.50",
    status: "pending",
    date: "Oct 23, 2026",
  },
  {
    id: "TXN-94019",
    name: "Sumi Kim",
    email: "s.kim@email.com",
    amount: "$89.00",
    status: "refunded",
    date: "Oct 22, 2026",
  },
  {
    id: "TXN-94018",
    name: "James Taylor",
    email: "j.taylor@email.com",
    amount: "$432.25",
    status: "paid",
    date: "Oct 21, 2026",
  },
];

export const FinancialTransactions: React.FC<FinancialTransactionsProps> = ({
  orders,
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "paid" | "refunded">("all");

  // Map orders list to transactional structure or fall back
  const safeOrders = Array.isArray(orders) ? orders : [];
  const displayList =
    safeOrders.length > 0
      ? safeOrders.map((o) => {
          const initials = (o.customer?.name || "G")
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
          return {
            id: `TXN-${o.orderNumber}`,
            orderId: o.id,
            name: o.customer?.name || "Guest Customer",
            email: o.customer?.email || "N/A",
            initials,
            avatarBg: "bg-[#ffd9df] text-[#b31f56]",
            amount: `$${o.totalAmount.toFixed(2)}`,
            status: o.status === "delivered" ? "paid" : "pending",
            date: o.createdAt
              ? new Date(o.createdAt).toLocaleDateString()
              : "Just now",
          };
        })
      : fallbackTransactions.map((t) => {
          const initials = t.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
          return {
            id: t.id,
            orderId: "",
            name: t.name,
            email: t.email,
            initials,
            avatarBg:
              t.status === "paid"
                ? "bg-[#ffd167]/30 text-[#785a00]"
                : "bg-[#b7eaff] text-[#006780]",
            amount: t.amount,
            status: t.status,
            date: t.date,
          };
        });

  const filteredTxns = displayList.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const getStatusColor = (status: string) => {
    if (status === "paid")
      return "bg-green-50 text-green-700 border border-green-150";
    if (status === "pending")
      return "bg-amber-50 text-amber-700 border border-amber-100";
    return "bg-red-50 text-red-700 border border-red-100";
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm select-none">
      {/* Table Header Filter options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
            Recent Transactions
          </h3>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
            Detailed view of the latest store orders
          </p>
        </div>

        <div className="flex p-1 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/20">
          {(["all", "paid", "refunded"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                filter === tab
                  ? "bg-white text-[#b31f56] shadow-sm"
                  : "text-[#584045]/60 hover:text-[#131b2e]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2.5">
          <thead>
            <tr className="text-[#584045]/60 text-[10px] font-extrabold uppercase tracking-widest">
              <th className="px-4 pb-2">Transaction ID</th>
              <th className="px-4 pb-2">Customer Info</th>
              <th className="px-4 pb-2">Gross Amount</th>
              <th className="px-4 pb-2">Status</th>
              <th className="px-4 pb-2">Order Date</th>
              <th className="px-4 pb-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs font-semibold text-[#131b2e]">
            {filteredTxns.map((row, idx) => (
              <tr key={idx} className="group hover:bg-[#faf8ff] transition-all">
                <td
                  onClick={() =>
                    row.orderId && navigate(`/orders/${row.orderId}`)
                  }
                  className="px-4 py-4 bg-white border-y border-l border-[#dfbec4]/20 rounded-l-2xl group-hover:border-[#b31f56]/20 font-bold text-[#b31f56] cursor-pointer hover:underline"
                >
                  {row.id}
                </td>

                <td className="px-4 py-4 bg-white border-y border-[#dfbec4]/20 group-hover:border-[#b31f56]/20">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white shrink-0 ${row.avatarBg}`}
                    >
                      {row.initials}
                    </div>
                    <div>
                      <p className="font-bold text-[#131b2e]">{row.name}</p>
                      <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
                        {row.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 bg-white border-y border-[#dfbec4]/20 group-hover:border-[#b31f56]/20 font-extrabold text-sm text-[#131b2e]">
                  {row.amount}
                </td>

                <td className="px-4 py-4 bg-white border-y border-[#dfbec4]/20 group-hover:border-[#b31f56]/20">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(row.status)}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="capitalize">{row.status}</span>
                  </span>
                </td>

                <td className="px-4 py-4 bg-white border-y border-[#dfbec4]/20 group-hover:border-[#b31f56]/20 text-[#584045]/80">
                  {row.date}
                </td>

                <td className="px-4 py-4 bg-white border-y border-r border-[#dfbec4]/20 rounded-r-2xl text-right group-hover:border-[#b31f56]/20">
                  <button
                    onClick={() =>
                      row.orderId && navigate(`/orders/${row.orderId}`)
                    }
                    className="p-1.5 hover:bg-[#faf8ff] rounded-xl text-[#584045]/60 hover:text-[#b31f56] transition-all cursor-pointer border-none bg-none"
                    title="View Transaction Invoice"
                  >
                    <MdMoreHoriz className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View All Bottom Link */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-1 text-[#b31f56] font-bold text-xs hover:underline cursor-pointer group border-none bg-none"
        >
          View All Transaction History
          <MdKeyboardDoubleArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
