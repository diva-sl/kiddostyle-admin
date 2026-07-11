import React from "react";
import { MdSearch, MdExpandMore, MdFilterList } from "react-icons/md";

export const ProductsFilter: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm mb-8 flex flex-col lg:flex-row gap-4 border border-[#dfbec4]/20">
      {/* Quick Search */}
      <div className="relative flex-grow group">
        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#584045]/50 group-focus-within:text-[#b31f56] transition-colors w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, SKU or category..."
          className="w-full pl-12 pr-4 py-3 bg-[#f2f3ff] border-none rounded-2xl font-body-md text-sm focus:ring-2 focus:ring-[#b31f56]/10 outline-none text-[#131b2e]"
        />
      </div>

      {/* Select Categories & Status Dropdowns */}
      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-3 bg-[#f2f3ff] border-none rounded-2xl font-semibold text-xs text-[#584045] focus:ring-2 focus:ring-[#b31f56]/10 outline-none cursor-pointer">
            <option>All Categories</option>
            <option>Newborn</option>
            <option>Toddler Boy</option>
            <option>Toddler Girl</option>
            <option>Shoes</option>
          </select>
          <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#584045]/60 w-5 h-5" />
        </div>

        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-3 bg-[#f2f3ff] border-none rounded-2xl font-semibold text-xs text-[#584045] focus:ring-2 focus:ring-[#b31f56]/10 outline-none cursor-pointer">
            <option>Stock Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#584045]/60 w-5 h-5" />
        </div>

        <button className="px-5 py-3 bg-[#e2e7ff] rounded-2xl font-bold text-xs text-[#584045] hover:bg-[#dfbec4]/30 transition-all flex items-center gap-2 cursor-pointer">
          <MdFilterList className="w-5 h-5" />
          Advanced Filters
        </button>
      </div>
    </div>
  );
};
