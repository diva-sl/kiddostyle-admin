import React from "react";
import { MdSearch, MdExpandMore, MdFilterList } from "react-icons/md";

interface ProductsFilterProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  publishFilter: string;
  setPublishFilter: (val: string) => void;
}

export const ProductsFilter: React.FC<ProductsFilterProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  publishFilter,
  setPublishFilter,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm mb-8 flex flex-col lg:flex-row gap-4 border border-[#dfbec4]/20">
      {/* Quick Search */}
      <div className="relative flex-grow group">
        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#584045]/50 group-focus-within:text-[#b31f56] transition-colors w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, SKU or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#f2f3ff] border-none rounded-2xl font-body-md text-sm focus:ring-2 focus:ring-[#b31f56]/10 outline-none text-[#131b2e]"
        />
      </div>

      {/* Select Categories & Status Dropdowns */}
      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 bg-[#f2f3ff] border-none rounded-2xl font-semibold text-xs text-[#584045] focus:ring-2 focus:ring-[#b31f56]/10 outline-none cursor-pointer"
          >
            <option value="All Categories">All Categories</option>
            <option value="Newborn">Newborn</option>
            <option value="Toddler Boy">Toddler Boy</option>
            <option value="Toddler Girl">Toddler Girl</option>
            <option value="Shoes">Shoes</option>
          </select>
          <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#584045]/60 w-5 h-5" />
        </div>

        {/* Stock Status Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 bg-[#f2f3ff] border-none rounded-2xl font-semibold text-xs text-[#584045] focus:ring-2 focus:ring-[#b31f56]/10 outline-none cursor-pointer"
          >
            <option value="Stock Status">Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <MdExpandMore className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#584045]/60 w-5 h-5" />
        </div>

        {/* Publish Lifecycle Status Dropdown */}
        <div className="relative">
          <select
            value={publishFilter}
            onChange={(e) => setPublishFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 bg-[#f2f3ff] border-none rounded-2xl font-semibold text-xs text-[#584045] focus:ring-2 focus:ring-[#b31f56]/10 outline-none cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Archived">Archived</option>
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
