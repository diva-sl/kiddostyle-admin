import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useCustomers, useDeleteCustomer } from "../hooks/useCustomers";

const sampleFallbackCustomers = [
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
];

export const CustomersFilterTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbCustomers, isLoading } = useCustomers();
  const deleteMutation = useDeleteCustomer();

  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this customer record?")
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Map to unified customer representation
  const displayList =
    Array.isArray(dbCustomers) && dbCustomers.length > 0
      ? dbCustomers.map((c) => {
          const initials = c.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
          return {
            id: c.id || "",
            name: c.name,
            sub: c.totalSpent > 1000 ? "VIP Member" : "Verified Customer",
            initials,
            initialsColor:
              c.totalSpent > 1000
                ? "bg-[#ff5c8d]/20 text-[#b31f56]"
                : "bg-[#ffd167]/30 text-[#765900]",
            email: c.email,
            orders: c.notes?.length || 0, // simulate orders count
            spend: `$${c.totalSpent.toFixed(2)}`,
            joinDate: c.joinedDate
              ? new Date(c.joinedDate).toLocaleDateString()
              : "Oct 12, 2023",
            status: c.status === "active" ? "active" : "inactive",
            avatar: c.avatar,
          };
        })
      : sampleFallbackCustomers;

  // Filter list by status & search query
  const filteredCustomers = displayList.filter((c) => {
    const matchesStatus = filter === "all" || c.status === filter;
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination Bounds
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startIdx =
    totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70">
        Loading customer registry...
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#dfbec4]/30 rounded-[32px] shadow-sm overflow-hidden select-none">
      {/* Header Filters & Search bar */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f2f3ff]/30">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-[#faf8ff] p-1 rounded-full border border-[#dfbec4]/20">
            {(["all", "active", "inactive"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setFilter(tab);
                  setCurrentPage(1);
                }}
                className={`px-5 py-1.5 font-bold text-xs rounded-full transition-all cursor-pointer capitalize ${
                  filter === tab
                    ? "bg-[#b31f56] text-white shadow-sm"
                    : "text-[#584045]/85 hover:bg-[#f2f3ff]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#dfbec4]/25 rounded-full px-5 py-1.5 text-xs font-semibold text-[#131b2e] outline-none focus:ring-2 focus:ring-[#b31f56]/15 w-60"
          />
        </div>
        <p className="text-xs font-bold text-[#584045]/70">
          Showing {startIdx}-{endIdx} of {totalItems} profiles
        </p>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70 border-b border-[#dfbec4]/20 select-none">
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Total Orders</th>
              <th className="px-6 py-4">Total Spent</th>
              <th className="px-6 py-4">Join Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/25 text-xs font-semibold text-[#131b2e]">
            {paginatedList.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {row.avatar ? (
                      <img
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#dfbec4]/20 cursor-pointer"
                        src={row.avatar}
                        alt={row.name}
                        onClick={() => navigate(`/customers/${row.id}`)}
                      />
                    ) : (
                      <div
                        onClick={() => navigate(`/customers/${row.id}`)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer ${row.initialsColor}`}
                      >
                        {row.initials}
                      </div>
                    )}
                    <div>
                      <p
                        onClick={() => navigate(`/customers/${row.id}`)}
                        className="font-bold text-sm text-[#131b2e] hover:text-[#b31f56] cursor-pointer"
                      >
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
                <td className="px-6 py-4 font-extrabold text-[#131b2e]">
                  {row.spend}
                </td>
                <td className="px-6 py-4 text-[#584045]/80">{row.joinDate}</td>

                <td className="px-6 py-4">
                  {row.status === "active" ? (
                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 font-bold text-[10px] rounded-full border border-green-100 select-none">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] rounded-full border border-[#ba1a1a]/20 select-none">
                      <span className="w-1.5 h-1.5 bg-[#ba1a1a] rounded-full mr-2" />
                      Suspended
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/customers/${row.id}`)}
                      className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer"
                      title="View Customer Profile"
                    >
                      <MdVisibility className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => navigate(`/customers/edit/${row.id}`)}
                      className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer"
                      title="Edit Profile"
                    >
                      <MdEdit className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-1.5 hover:bg-[#ffdad6] rounded-full text-[#ba1a1a] cursor-pointer"
                      title="Delete Customer Profile"
                    >
                      <MdDelete className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex items-center justify-between bg-[#f2f3ff]/10 select-none">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-[#584045] border border-[#dfbec4]/35 hover:bg-[#faf8ff] disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer"
        >
          <MdChevronLeft className="w-4.5 h-4.5" /> Previous
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-[#584045]/75">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-[#584045] border border-[#dfbec4]/35 hover:bg-[#faf8ff] disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer"
        >
          Next <MdChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
