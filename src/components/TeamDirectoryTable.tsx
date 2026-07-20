import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRoles, useDeleteRole } from "../hooks/useRoles";

const initialFallbackMembers = [
  {
    id: "1",
    name: "Marcus Bennett",
    email: "marcus.b@kiddostyle.com",
    initials: "MB",
    role: "Super Admin",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    email: "elena.r@kiddostyle.com",
    initials: "ER",
    role: "Editor",
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "Jordan Smith",
    email: "jordan.s@kiddostyle.com",
    initials: "JS",
    role: "Viewer",
    lastActive: "Oct 12, 2023",
  },
];

export const TeamDirectoryTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbRoles = [], isLoading } = useRoles();
  const deleteMutation = useDeleteRole();
  const [fallbackList, setFallbackList] = useState(initialFallbackMembers);

  const handleDeleteRole = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this staff role definition?",
      )
    ) {
      if (dbRoles.length > 0) {
        deleteMutation.mutate(id, {
          onSuccess: () => alert("Role deleted successfully!"),
          onError: (err: any) => alert("Failed to delete role: " + err.message),
        });
      } else {
        setFallbackList((prev) => prev.filter((r) => r.id !== id));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 bg-white rounded-3xl border border-[#dfbec4]/30">
        Loading staff roles...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#dfbec4]/30 shadow-sm h-full select-none">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-8 select-none">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Team Directory Roles (
          {dbRoles.length > 0 ? dbRoles.length : fallbackList.length})
        </h3>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#dfbec4]/20 text-[10px] font-extrabold text-[#584045]/60 uppercase tracking-widest select-none">
              <th className="pb-4">Role Title</th>
              <th className="pb-4">Description / Permissions</th>
              <th className="pb-4 text-center">Status</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {dbRoles.length > 0
              ? dbRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="group hover:bg-[#faf8ff] transition-colors"
                  >
                    <td className="py-4 font-bold text-[#131b2e]">
                      {role.name}
                    </td>
                    <td className="py-4 text-[#584045]/80">
                      <p>{role.description || "System permission role"}</p>
                      <div className="flex gap-1 flex-wrap mt-1">
                        {(role.permissions || []).map((p) => (
                          <span
                            key={p}
                            className="text-[9px] bg-[#f2f3ff] text-[#b31f56] px-2 py-0.5 rounded-full font-bold"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => navigate(`/roles/edit/${role.id}`)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:text-[#b31f56] hover:bg-white transition-all shadow-sm cursor-pointer border-none bg-none"
                          title="Edit Role"
                        >
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id || "")}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:text-[#ba1a1a] hover:bg-white transition-all shadow-sm cursor-pointer border-none bg-none"
                          title="Delete Role"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : fallbackList.map((row) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-[#faf8ff] transition-colors"
                  >
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-[#ffd9df] text-[#8f003f] shrink-0">
                        {row.initials}
                      </div>
                      <div>
                        <p className="font-bold text-[#131b2e]">{row.name}</p>
                        <p className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
                          {row.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#ffd9df] text-[#8f003f]">
                        {row.role}
                      </span>
                    </td>
                    <td className="py-4 text-center text-[#584045]/80">
                      {row.lastActive}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => navigate(`/roles/edit/${row.id}`)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:text-[#b31f56] hover:bg-white transition-all shadow-sm cursor-pointer border-none bg-none"
                          title="Edit Role"
                        >
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(row.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:text-[#ba1a1a] hover:bg-white transition-all shadow-sm cursor-pointer border-none bg-none"
                          title="Delete Role"
                        >
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
