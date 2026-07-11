import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface MemberRow {
  name: string;
  email: string;
  initials: string;
  initialsBg: string;
  role: string;
  roleBg: string;
  lastActive: string;
  avatar?: string;
}

const membersList: MemberRow[] = [
  {
    name: "Marcus Bennett",
    email: "marcus.b@kiddostyle.com",
    initials: "MB",
    initialsBg: "bg-[#ffd9df] text-[#8f003f]",
    role: "Super Admin",
    roleBg: "bg-[#ffd9df] text-[#8f003f]",
    lastActive: "Just now",
  },
  {
    name: "Elena Rodriguez",
    email: "elena.r@kiddostyle.com",
    initials: "ER",
    initialsBg: "bg-[#ffd167]/30 text-[#765900]",
    role: "Editor",
    roleBg: "bg-[#ffd167]/30 text-[#765900]",
    lastActive: "2 hours ago",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKerpQc16ettAuzMO8KUjN64EFOh4PVJSPcQW4kxZOmtjdPyZGnWmQIOAwurDCHGLYNjnsymWAk0OS27v0ZbC1apC12vEtiZ4tIp_ZpwJco-SUdBakBDAfcpSEmaBuUnkZOSDmX2R141IbZzm8RUsjQVbn-3lSdYMSppbyW4_LHqiKSxIYIDov9ZmnJuUUcwr57aNEfKfabKswAawGfcJZlwQZ6tVaQBqELf9hJbThSqsz1uGJSAeVLaGrqJWlpanP-izBiqMTbJeT",
  },
  {
    name: "Jordan Smith",
    email: "jordan.s@kiddostyle.com",
    initials: "JS",
    initialsBg: "bg-[#b7eaff] text-[#006780]",
    role: "Viewer",
    roleBg: "bg-[#f2f3ff] text-[#584045]/80",
    lastActive: "Oct 12, 2023",
  },
];

export const TeamDirectoryTable: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#dfbec4]/30 shadow-sm h-full">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-8 select-none">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Team Directory
        </h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full bg-[#f2f3ff] text-xs font-bold text-[#584045] hover:bg-[#e2e7ff]/40 transition-colors cursor-pointer">
            Export CSV
          </button>
          <button className="px-4 py-2 rounded-full bg-[#f2f3ff] text-xs font-bold text-[#584045] hover:bg-[#e2e7ff]/40 transition-colors cursor-pointer">
            Filters
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#dfbec4]/20 text-[10px] font-extrabold text-[#584045]/60 uppercase tracking-widest select-none">
              <th className="pb-4">Name</th>
              <th className="pb-4">Role</th>
              <th className="pb-4 text-center">Last Active</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {membersList.map((row, idx) => (
              <tr
                key={idx}
                className="group hover:bg-[#faf8ff] transition-colors"
              >
                {/* User Identity Details */}
                <td className="py-4 flex items-center gap-3">
                  {row.avatar ? (
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-[#dfbec4]/20 shrink-0"
                      src={row.avatar}
                      alt={row.name}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${row.initialsBg}`}
                    >
                      {row.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#131b2e]">{row.name}</p>
                    <p className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
                      {row.email}
                    </p>
                  </div>
                </td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider select-none ${row.roleBg}`}
                  >
                    {row.role}
                  </span>
                </td>

                <td className="py-4 text-center text-[#584045]/80 select-none">
                  {row.lastActive}
                </td>

                {/* Edit options */}
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-1 select-none">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:text-[#b31f56] hover:bg-white transition-all shadow-sm cursor-pointer">
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:text-[#ba1a1a] hover:bg-white transition-all shadow-sm cursor-pointer">
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
