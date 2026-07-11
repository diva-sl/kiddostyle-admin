import React from "react";
import {
  MdLocationOn,
  MdFilterList,
  MdCategory,
  MdExpandMore,
} from "react-icons/md";

interface InventoryFiltersProps {
  selectedCount: number;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  selectedCount,
}) => {
  const isBatchActive = selectedCount > 0;

  return (
    <div className="bg-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-[#dfbec4]/30 shadow-sm">
      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Location Dropdown */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#faf8ff] rounded-xl border border-[#dfbec4]/25 relative">
          <MdLocationOn className="text-[#584045]/60 w-4 h-4" />
          <select className="bg-transparent border-none text-xs font-bold text-[#584045] pr-6 focus:ring-0 outline-none cursor-pointer appearance-none">
            <option>All Warehouses</option>
            <option>Main Hub - Seattle</option>
            <option>East Coast - NJ</option>
            <option>London - Heathrow</option>
          </select>
          <MdExpandMore className="absolute right-2 top-1/2 -translate-y-1/2 text-[#584045]/60 pointer-events-none w-4 h-4" />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#faf8ff] rounded-xl border border-[#dfbec4]/25 relative">
          <MdFilterList className="text-[#584045]/60 w-4 h-4" />
          <select className="bg-transparent border-none text-xs font-bold text-[#584045] pr-6 focus:ring-0 outline-none cursor-pointer appearance-none">
            <option>Stock Status: All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <MdExpandMore className="absolute right-2 top-1/2 -translate-y-1/2 text-[#584045]/60 pointer-events-none w-4 h-4" />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#faf8ff] rounded-xl border border-[#dfbec4]/25 relative">
          <MdCategory className="text-[#584045]/60 w-4 h-4" />
          <select className="bg-transparent border-none text-xs font-bold text-[#584045] pr-6 focus:ring-0 outline-none cursor-pointer appearance-none">
            <option>All Categories</option>
            <option>Knitwear</option>
            <option>Footwear</option>
            <option>Outerwear</option>
          </select>
          <MdExpandMore className="absolute right-2 top-1/2 -translate-y-1/2 text-[#584045]/60 pointer-events-none w-4 h-4" />
        </div>
      </div>

      {/* Batch Action Buttons */}
      <div
        className={`flex items-center gap-4 transition-all duration-300 ${
          isBatchActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-40 pointer-events-none"
        }`}
      >
        <span className="text-xs font-bold text-[#584045]">
          <span className="text-[#b31f56] font-extrabold mr-1">
            {selectedCount}
          </span>{" "}
          selected
        </span>
        <button className="px-4 py-2 bg-[#ff5c8d]/10 text-[#b31f56] rounded-full font-bold text-xs hover:bg-[#ff5c8d]/20 active:scale-95 transition-all cursor-pointer">
          Update Stock
        </button>
        <button className="px-4 py-2 bg-[#ffdad6] text-[#ba1a1a] rounded-full font-bold text-xs hover:bg-[#ffdad6]/80 active:scale-95 transition-all cursor-pointer">
          Mark Out of Stock
        </button>
      </div>
    </div>
  );
};
