import React from "react";
import { MdFilterList } from "react-icons/md";

interface OrdersFilterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const OrdersFilter: React.FC<OrdersFilterProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="bg-white rounded-3xl p-3 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 border border-[#dfbec4]/30 select-none">
      {/* Filtering Tab Triggers */}
      <div className="flex gap-1">
        {[
          "All Orders",
          "Pending",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ].map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#b31f56] text-white"
                  : "hover:bg-[#f2f3ff] text-[#584045]/80"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Code Search Input & Filters */}
      <div className="flex items-center gap-3 pr-2">
        <input
          type="text"
          placeholder="Search by order or customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#faf8ff] border border-[#dfbec4]/25 rounded-full px-5 py-2 text-xs font-semibold text-[#131b2e] outline-none focus:ring-2 focus:ring-[#b31f56]/15 w-60"
        />

        <button className="p-2.5 bg-[#ffd167] text-[#765900] rounded-full hover:shadow-md transition-all cursor-pointer flex items-center justify-center border border-none">
          <MdFilterList className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
