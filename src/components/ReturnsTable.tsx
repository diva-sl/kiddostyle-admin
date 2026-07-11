import React from "react";
import {
  MdFilterList,
  MdMoreVert,
  MdCheck,
  MdClose,
  MdVisibility,
  MdInfo,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface ReturnRequest {
  id: string;
  customerInitials: string;
  customerBg: string;
  customerName: string;
  date: string;
  reason: string;
  reasonColor: string;
  amount: string;
  status: "pending" | "approved" | "refunded" | "rejected";
  statusText: string;
  statusColor: string;
}

const returnsList: ReturnRequest[] = [
  {
    id: "#KD-89210",
    customerInitials: "SM",
    customerBg: "bg-[#ffd167]/30 text-[#765900]",
    customerName: "Sarah Miller",
    date: "Oct 24, 2023",
    reason: "Wrong Size",
    reasonColor: "bg-[#f2f3ff] text-[#131b2e]",
    amount: "$145.00",
    status: "pending",
    statusText: "Pending",
    statusColor: "bg-[#ffd167]/20 text-[#765900] border border-[#ffd167]/30",
  },
  {
    id: "#KD-89195",
    customerInitials: "JB",
    customerBg: "bg-[#ff5c8d]/20 text-[#b31f56]",
    customerName: "James Brown",
    date: "Oct 23, 2023",
    reason: "Damaged",
    reasonColor: "bg-[#ffdad6] text-[#ba1a1a]",
    amount: "$89.50",
    status: "approved",
    statusText: "Approved",
    statusColor: "bg-[#00a4ca]/10 text-[#006780] border border-[#00a4ca]/20",
  },
  {
    id: "#KD-89182",
    customerInitials: "EL",
    customerBg: "bg-[#e2e7ff] text-[#584045]",
    customerName: "Emma Lee",
    date: "Oct 22, 2023",
    reason: "Changed Mind",
    reasonColor: "bg-[#f2f3ff] text-[#131b2e]",
    amount: "$210.00",
    status: "refunded",
    statusText: "Refunded",
    statusColor: "bg-[#faf8ff] text-[#584045]/80 border border-[#dfbec4]/30",
  },
  {
    id: "#KD-89170",
    customerInitials: "DW",
    customerBg: "bg-[#b7eaff] text-[#006780]",
    customerName: "David Wilson",
    date: "Oct 21, 2023",
    reason: "Wrong Item",
    reasonColor: "bg-[#f2f3ff] text-[#131b2e]",
    amount: "$56.00",
    status: "rejected",
    statusText: "Rejected",
    statusColor: "bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/20",
  },
];

export const ReturnsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden">
      {/* Title Controls */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex items-center justify-between">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          Recent Return Requests
        </h4>

        <div className="flex gap-2">
          <button className="p-2 hover:bg-[#f2f3ff] rounded-lg text-[#584045] transition-colors cursor-pointer">
            <MdFilterList className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-[#f2f3ff] rounded-lg text-[#584045] transition-colors cursor-pointer">
            <MdMoreVert className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 font-bold text-xs text-[#584045]/70 border-b border-[#dfbec4]/25">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {returnsList.map((row) => (
              <tr key={row.id} className="hover:bg-[#faf8ff] transition-colors">
                <td className="px-6 py-4 font-bold text-[#b31f56]">{row.id}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${row.customerBg}`}
                    >
                      {row.customerInitials}
                    </div>
                    <span className="font-bold text-[#131b2e]">
                      {row.customerName}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-[#584045]/80">{row.date}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.reasonColor}`}
                  >
                    {row.reason}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-extrabold text-[#131b2e]">
                  {row.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${row.statusColor}`}
                  >
                    {row.status === "pending" && (
                      <span className="w-1.5 h-1.5 bg-[#785a00] rounded-full animate-pulse" />
                    )}
                    {row.statusText}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {row.status === "pending" ? (
                      <>
                        <button
                          className="w-8 h-8 rounded-full bg-[#006780]/10 text-[#006780] flex items-center justify-center hover:bg-[#006780] hover:text-white transition-all cursor-pointer"
                          title="Approve"
                        >
                          <MdCheck className="w-4 h-4" />
                        </button>
                        <button
                          className="w-8 h-8 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] flex items-center justify-center hover:bg-[#ba1a1a] hover:text-white transition-all cursor-pointer"
                          title="Reject"
                        >
                          <MdClose className="w-4 h-4" />
                        </button>
                      </>
                    ) : row.status === "rejected" ? (
                      <button className="text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer">
                        <MdInfo className="w-5 h-5" />
                      </button>
                    ) : (
                      <button className="text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer">
                        <MdVisibility className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex items-center justify-between select-none">
        <p className="text-xs font-semibold text-[#584045]/80">
          Showing 1-4 of 12 Pending Returns
        </p>
        <div className="flex gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#faf8ff] text-[#584045] opacity-50 cursor-not-allowed">
            <MdChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-xs cursor-pointer">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-xs cursor-pointer">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors cursor-pointer">
            <MdChevronRight className="w-5 h-5 text-[#584045]" />
          </button>
        </div>
      </div>
    </div>
  );
};
