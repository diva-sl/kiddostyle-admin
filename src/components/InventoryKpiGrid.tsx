import React from "react";
import {
  MdPayments,
  MdErrorOutline,
  MdWarning,
  MdLocalShipping,
} from "react-icons/md";

export const InventoryKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* KPI 1: Total Inventory Value */}
      <div className="bento-card bg-[#eaedff]/40 p-6 rounded-[2rem] flex flex-col justify-between border border-[#dfbec4]/20 hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-default">
        <div className="flex justify-between items-start mb-4">
          <span className="p-2 bg-[#00a4ca]/10 text-[#006780] rounded-full">
            <MdPayments className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-[#006780]">+12%</span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e] leading-none">
            $428k
          </p>
          <p className="text-xs font-bold text-[#584045]/60 mt-1">
            Total Inventory Value
          </p>
        </div>
      </div>

      {/* KPI 2: Out of Stock */}
      <div className="bento-card bg-[#ffdad6]/40 p-6 rounded-[2rem] flex flex-col justify-between border border-[#ba1a1a]/15 hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-default">
        <div className="flex justify-between items-start mb-4">
          <span className="p-2 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-full">
            <MdErrorOutline className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-[#ba1a1a]">Critical</span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#ba1a1a] leading-none">
            24
          </p>
          <p className="text-xs font-bold text-[#584045]/60 mt-1">
            Out of Stock Items
          </p>
        </div>
      </div>

      {/* KPI 3: Low Stock Alerts */}
      <div className="bento-card bg-[#ffd167]/20 p-6 rounded-[2rem] flex flex-col justify-between border border-[#785a00]/15 hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-default">
        <div className="flex justify-between items-start mb-4">
          <span className="p-2 bg-[#785a00]/10 text-[#785a00] rounded-full">
            <MdWarning className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-[#785a00]">
            Action Required
          </span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#785a00] leading-none">
            156
          </p>
          <p className="text-xs font-bold text-[#584045]/60 mt-1">
            Low Stock Alerts
          </p>
        </div>
      </div>

      {/* KPI 4: Incoming Shipments */}
      <div className="bento-card bg-[#f2f3ff] p-6 rounded-[2rem] flex flex-col justify-between border border-[#dfbec4]/20 hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-default">
        <div className="flex justify-between items-start mb-4">
          <span className="p-2 bg-[#b31f56]/10 text-[#b31f56] rounded-full">
            <MdLocalShipping className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-[#b31f56]">In Transit</span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e] leading-none">
            12
          </p>
          <p className="text-xs font-bold text-[#584045]/60 mt-1">
            Incoming Shipments
          </p>
        </div>
      </div>
    </div>
  );
};
