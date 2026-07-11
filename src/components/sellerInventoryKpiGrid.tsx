import React from "react";
import {
  MdCategory,
  MdTrendingUp,
  MdAssignment,
  MdVisibility,
} from "react-icons/md";

export const InventoryKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Total Products */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#ffd167]/30 text-[#765900] rounded-2xl">
            <MdCategory className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#584045]/60">+12%</span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">1,284</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Total Products
          </p>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#ffd9df] text-[#b31f56] rounded-2xl">
            <MdTrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#b31f56]">+5.2k</span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">$24.8k</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Monthly Revenue
          </p>
        </div>
      </div>

      {/* Low Stock */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#b7eaff] text-[#006780] rounded-2xl">
            <MdAssignment className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-full">
            8 Low
          </span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">42</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Low Stock Items
          </p>
        </div>
      </div>

      {/* Store Visits */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#f2f3ff] text-[#584045] rounded-2xl">
            <MdVisibility className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#584045]/60">
            Active
          </span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">12.4k</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Store Visits
          </p>
        </div>
      </div>
    </div>
  );
};
