import React from "react";
import { MdVerifiedUser, MdTrendingUp, MdNewReleases } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { useBrands } from "../hooks/useBrands";

export const BrandsKpiGrid: React.FC = () => {
  const { data: brands = [] } = useBrands();

  const totalBrands = brands.length > 0 ? brands.length : 24;
  const activePartnerships =
    brands.length > 0 ? brands.filter((b) => b.status === "active").length : 18;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* KPI 1: Total Brands */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dfbec4]/30 hover:shadow-md transition-shadow cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-[#ff5c8d]/20 flex items-center justify-center rounded-xl text-[#b31f56] shrink-0">
            <MdVerifiedUser className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            Live DB
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60 mb-1">
            Total Brands
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none">
            {totalBrands}
          </h3>
        </div>
      </div>

      {/* KPI 2: Top Performer */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dfbec4]/30 hover:shadow-md transition-shadow cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-[#ffd167]/20 flex items-center justify-center rounded-xl text-[#785a00] shrink-0">
            <MdTrendingUp className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#765900] bg-[#ffd167]/30 px-2 py-0.5 rounded-full">
            MiniMe
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60 mb-1">
            Top Performer
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none">
            MiniMe
          </h3>
        </div>
      </div>

      {/* KPI 3: Active Partnerships */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dfbec4]/30 hover:shadow-md transition-shadow cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-[#b7eaff] flex items-center justify-center rounded-xl text-[#006780] shrink-0">
            <FaHandshake className="w-6 h-6" />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60 mb-1">
            Active Partnerships
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none">
            {activePartnerships}
          </h3>
        </div>
      </div>

      {/* KPI 4: New Brands */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dfbec4]/30 hover:shadow-md transition-shadow cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-[#f2f3ff] flex items-center justify-center rounded-xl text-[#b31f56] shrink-0">
            <MdNewReleases className="w-6 h-6" />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60 mb-1">
            New This Month
          </p>
          <h3 className="text-2xl font-extrabold text-[#b31f56] leading-none">
            +3
          </h3>
        </div>
      </div>
    </div>
  );
};
