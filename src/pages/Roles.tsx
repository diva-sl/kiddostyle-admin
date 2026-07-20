import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { TeamDirectoryTable } from "../components/TeamDirectoryTable";
import { RoleConfigPanel } from "../components/RoleConfigPanel";
import { PermissionMatrix } from "../components/PermissionMatrix";

export const RolesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Role Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1.5 max-w-xl">
            Define your team's access levels and manage individual permissions
            to maintain security and workflow efficiency.
          </p>
        </div>

        <button
          onClick={() => navigate("/roles/new")}
          className="bg-[#b31f56] text-white px-6 py-3 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-lg hover:shadow-[#b31f56]/20 transition-all active:scale-[0.98] cursor-pointer border-none"
        >
          <MdAdd className="w-4.5 h-4.5" />
          Create New Role
        </button>
      </section>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Directory Lists (col-span-8) */}
        <div className="lg:col-span-8">
          <TeamDirectoryTable />
        </div>

        {/* Right Side: Status Config Toggles (col-span-4) */}
        <div className="lg:col-span-4">
          <RoleConfigPanel />
        </div>
      </div>

      {/* Bottom Full Access Matrix */}
      <PermissionMatrix />
    </div>
  );
};

export default RolesPage;
