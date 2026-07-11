import React from 'react';
import { MdVisibility, MdMoreVert, MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface OrderItem {
  id: string;
  date: string;
  customerName: string;
  initials: string;
  avatarColor: string;
  avatarText: string;
  amount: string;
  status: string;
  statusColor: string;
}

const orders: OrderItem[] = [
  {
    id: "#KS-8892",
    date: "22 Oct 2023, 10:45 AM",
    customerName: "Emily Morrison",
    initials: "EM",
    avatarColor: "bg-[#dae2fd] text-[#131b2e]",
    avatarText: "EM",
    amount: "$124.50",
    status: "Shipped",
    statusColor: "bg-[#ffd167]/30 text-[#765900]",
  },
  {
    id: "#KS-8891",
    date: "21 Oct 2023, 02:30 PM",
    customerName: "James Wilson",
    initials: "JW",
    avatarColor: "bg-[#5bd5fc]/20 text-[#003442]",
    avatarText: "JW",
    amount: "$89.00",
    status: "Delivered",
    statusColor: "bg-[#00a4ca]/10 text-[#006780]",
  },
  {
    id: "#KS-8890",
    date: "21 Oct 2023, 11:15 AM",
    customerName: "Sophia Chen",
    initials: "SC",
    avatarColor: "bg-[#ffd9df] text-[#3f0018]",
    avatarText: "SC",
    amount: "$256.75",
    status: "Pending",
    statusColor: "bg-[#e2e7ff] text-[#584045] border border-[#dfbec4]/30",
  },
  {
    id: "#KS-8889",
    date: "20 Oct 2023, 09:20 AM",
    customerName: "Marcus Bennett",
    initials: "MB",
    avatarColor: "bg-[#ffdad6] text-[#ba1a1a]",
    avatarText: "MB",
    amount: "$45.20",
    status: "Cancelled",
    statusColor: "bg-[#ffdad6] text-[#ba1a1a]",
  },
  {
    id: "#KS-8888",
    date: "19 Oct 2023, 04:55 PM",
    customerName: "Laura O'Connell",
    initials: "LO",
    avatarColor: "bg-[#ffdf9b] text-[#251a00]",
    avatarText: "LO",
    amount: "$312.00",
    status: "Processing",
    statusColor: "bg-[#ff5c8d]/20 text-[#b31f56]",
  },
];

export const OrdersTable: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-[#dfbec4]/30 overflow-hidden">
      
      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]">
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">Date</th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">Total Amount</th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-[#f2f3ff]/20 hover:shadow-md transition-all font-semibold text-[#131b2e]">
                <td className="px-6 py-5">
                  <span className="font-bold text-[#b31f56]">{o.id}</span>
                </td>
                <td className="px-6 py-5 text-[#584045]">
                  {o.date}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${o.avatarColor}`}>
                      {o.initials}
                    </div>
                    <span className="font-bold text-[#131b2e]">{o.customerName}</span>
                  </div>
                </td>
                <td className="px-6 py-5 font-bold text-[#131b2e]">
                  {o.amount}
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${o.statusColor}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right space-x-1 shrink-0">
                  <button className="p-2 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer">
                    <MdVisibility className="w-5 h-5 inline" />
                  </button>
                  <button className="p-2 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer">
                    <MdMoreVert className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination panel */}
      <div className="px-8 py-4 bg-[#f2f3ff] border-t border-[#dfbec4]/20 flex items-center justify-between select-none">
        <p className="font-semibold text-xs text-[#584045]">Showing 1 to 5 of 124 orders</p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-white transition-colors opacity-50 cursor-not-allowed">
            <MdChevronLeft className="w-5 h-5 text-[#584045]" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-xs cursor-pointer">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-xs cursor-pointer">3</button>
          <span className="w-10 h-10 flex items-center justify-center text-[#584045]/60 text-xs">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors font-bold text-xs cursor-pointer">25</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-white transition-colors cursor-pointer">
            <MdChevronRight className="w-5 h-5 text-[#584045]" />
          </button>
        </div>
      </div>

    </div>
  );
};
