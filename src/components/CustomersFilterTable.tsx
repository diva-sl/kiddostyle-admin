import React, { useState } from "react";
import {
  MdArrowDropDown,
  MdMoreHoriz,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface CustomerRow {
  id: string;
  name: string;
  sub: string;
  initials: string;
  initialsColor: string;
  email: string;
  orders: number;
  spend: string;
  joinDate: string;
  status: "active" | "inactive";
  avatar?: string;
}

const customersList: CustomerRow[] = [
  {
    id: "1",
    name: "Eleanor Mason",
    sub: "Verified Customer",
    initials: "EM",
    initialsColor: "bg-[#ffd167]/30 text-[#765900]",
    email: "eleanor.m@example.com",
    orders: 14,
    spend: "$1,240.50",
    joinDate: "Oct 12, 2023",
    status: "active",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    sub: "VIP Member",
    initials: "MT",
    initialsColor: "bg-[#ff5c8d]/20 text-[#b31f56]",
    email: "m.thorne@techflow.io",
    orders: 32,
    spend: "$4,102.00",
    joinDate: "May 05, 2022",
    status: "active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmg4YZ3QB7-iwd3TSQVj8mRUPyeSAxVE9D5OjvF8-zR87_Q5sAlsFk5dd55zVdax_yfPI7ovYv05o_dPKhTlqgBdQu2o9WM6w4driqllutcKgWM6niK5ETpNBM-2Qq0f9VecqbbT6VzrnsmNkPdqb68OhliDYiI5pOXaHyKxUkoBP5Z_i4Id8SIOKZzw3t3vc1oCdZoUm4V3TNrw0u-C5x3ubyYiwKQVGQkHM3a-1z0on8Gjo0h6FuakOoSODfSNagBV_3IC928_83",
  },
  {
    id: "3",
    name: "Sophia Liang",
    sub: "New Account",
    initials: "SL",
    initialsColor: "bg-[#ff5c8d]/20 text-[#b31f56]",
    email: "sophia.l@me.com",
    orders: 1,
    spend: "$89.99",
    joinDate: "Jan 18, 2024",
    status: "inactive",
  },
  {
    id: "4",
    name: "Clara Schmidt",
    sub: "Verified Customer",
    initials: "CS",
    initialsColor: "bg-[#e2e7ff] text-[#584045]",
    email: "clara.sch@web.de",
    orders: 8,
    spend: "$642.15",
    joinDate: "Sep 30, 2023",
    status: "active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmaa9PV2JiQ-vgR2fLbiC7HeZIu-zeboAEK3fxS2sUzoxQJk5Q2l5VPxo1LZw1_3vXp9Dq4z4m-JcytHjvBuhsctaBf7DnWw5gCiurCJ7cfQ9J5auzKaz03elbnwlD9tKPlj05Ztnd7e2eTe1cpjgKFef_wy8sYnMS2zVZp_P_RP3G8kLFb23yY59jEggj9qATnSEuH2SGBc6qBXN1w_nrVbJ7gVxZ2Q-9c_nwF_DDGum93H1KcmJDf4YhcTK2H00jEV87DqBtXv32",
  },
];

export const CustomersFilterTable: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredCustomers = customersList.filter((c) => {
    if (filter === "active") return c.status === "active";
    if (filter === "inactive") return c.status === "inactive";
    return true;
  });

  return (
    <div className="bg-white border border-[#dfbec4]/30 rounded-[32px] shadow-sm overflow-hidden">
      {/* Header Filters */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f2f3ff]/30 select-none">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#584045]/70">
            Filter by Status:
          </span>
          <div className="flex bg-[#faf8ff] p-1 rounded-full border border-[#dfbec4]/20">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 font-bold text-xs rounded-full transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#b31f56] text-white shadow-sm"
                  : "text-[#584045]/85 hover:bg-[#f2f3ff]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-1.5 font-bold text-xs rounded-full transition-all cursor-pointer ${
                filter === "active"
                  ? "bg-[#b31f56] text-white shadow-sm"
                  : "text-[#584045]/85 hover:bg-[#f2f3ff]"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("inactive")}
              className={`px-4 py-1.5 font-bold text-xs rounded-full transition-all cursor-pointer ${
                filter === "inactive"
                  ? "bg-[#b31f56] text-white shadow-sm"
                  : "text-[#584045]/85 hover:bg-[#f2f3ff]"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
        <p className="text-xs font-bold text-[#584045]/70">
          Showing 1-10 of 12,842
        </p>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70 border-b border-[#dfbec4]/20 select-none">
              <th className="px-6 py-4">
                <span className="flex items-center gap-1 cursor-pointer hover:text-[#131b2e]">
                  Name <MdArrowDropDown className="w-4.5 h-4.5" />
                </span>
              </th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Total Orders</th>
              <th className="px-6 py-4">Total Spend</th>
              <th className="px-6 py-4">Join Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/25 text-xs font-semibold text-[#131b2e]">
            {filteredCustomers.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                {/* Identity avatar details */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {row.avatar ? (
                      <img
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#dfbec4]/20"
                        src={row.avatar}
                        alt={row.name}
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${row.initialsColor}`}
                      >
                        {row.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm text-[#131b2e]">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
                        {row.sub}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[#584045]/80">{row.email}</td>

                <td className="px-6 py-4 text-[#584045]/85">{row.orders}</td>

                <td className="px-6 py-4 font-bold text-[#131b2e]">
                  {row.spend}
                </td>

                <td className="px-6 py-4 text-[#584045]/80">{row.joinDate}</td>

                {/* Status Badges */}
                <td className="px-6 py-4">
                  {row.status === "active" ? (
                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 font-bold text-[10px] rounded-full border border-green-100 select-none">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-[#f2f3ff] text-[#584045]/80 font-bold text-[10px] rounded-full border border-[#dfbec4]/30 select-none">
                      <span className="w-1.5 h-1.5 bg-[#dfbec4] rounded-full mr-2" />
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-[#584045]/60 hover:text-[#b31f56] transition-colors cursor-pointer select-none">
                    <MdMoreHoriz className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex items-center justify-between bg-[#f2f3ff]/10 select-none">
        <button className="px-4 py-2 text-[#584045] border border-[#dfbec4]/35 hover:bg-[#faf8ff] transition-all rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer">
          <MdChevronLeft className="w-4.5 h-4.5" /> Previous
        </button>

        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#faf8ff] text-[#584045] font-bold text-xs transition-colors cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#faf8ff] text-[#584045] font-bold text-xs transition-colors cursor-pointer">
            3
          </button>
          <span className="px-1 text-[#dfbec4] font-bold">...</span>
          <button className="w-8 h-8 rounded-full hover:bg-[#faf8ff] text-[#584045] font-bold text-xs transition-colors cursor-pointer">
            128
          </button>
        </div>

        <button className="px-4 py-2 text-[#584045] border border-[#dfbec4]/35 hover:bg-[#faf8ff] transition-all rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer">
          Next <MdChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
