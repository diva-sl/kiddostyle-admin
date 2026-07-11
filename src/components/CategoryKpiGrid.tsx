import React from "react";
import {
  MdCategory,
  MdCheckCircle,
  MdTrendingUp,
  MdInventory,
} from "react-icons/md";

export const CategoryKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#ffd9df] rounded-xl text-[#b31f56]">
            <MdCategory className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#765900] bg-[#ffd167]/30 px-2 py-0.5 rounded-full">
            +2 this month
          </span>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Total Categories
          </h4>
          <p className="text-3xl font-extrabold text-[#131b2e] leading-none">
            14
          </p>
        </div>
      </div>

      {/* Active Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#b7eaff] rounded-xl text-[#006780]">
            <MdCheckCircle className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Active Categories
          </h4>
          <p className="text-3xl font-extrabold text-[#131b2e] leading-none">
            12
          </p>
        </div>
      </div>

      {/* Top Category (Sales) */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#ffdf9b] rounded-xl text-[#785a00]">
            <MdTrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Top Category (Sales)
          </h4>
          <p className="text-lg font-extrabold text-[#131b2e] leading-tight">
            Girls Wear
          </p>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-1">
            $45.2k this month
          </p>
        </div>
      </div>

      {/* Empty Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#ffdad6] rounded-xl text-[#ba1a1a]">
            <MdInventory className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Empty Categories
          </h4>
          <p className="text-3xl font-extrabold text-[#131b2e] leading-none">
            0
          </p>
        </div>
      </div>
    </div>
  );
};
