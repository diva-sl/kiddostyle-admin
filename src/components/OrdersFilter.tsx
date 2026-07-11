import React, { useState } from 'react';
import { MdCalendarToday, MdExpandMore, MdFilterList } from 'react-icons/md';

export const OrdersFilter: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="bg-white rounded-3xl p-2 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4 border border-[#dfbec4]/30">
      
      {/* Filtering Tab Triggers */}
      <div className="flex gap-1">
        {["All Orders", "Pending", "Processing", "Completed"].map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
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

      {/* Date Pickers */}
      <div className="flex items-center gap-3 pr-2">
        <div className="flex items-center bg-[#f2f3ff] px-4 py-2 rounded-full border border-[#dfbec4]/20 select-none">
          <MdCalendarToday className="w-4 h-4 mr-2 text-[#584045]/60" />
          <span className="font-semibold text-xs text-[#584045]">Oct 12, 2023 - Oct 19, 2023</span>
          <MdExpandMore className="w-5 h-5 ml-4 text-[#584045]/60 cursor-pointer" />
        </div>
        
        <button className="p-2.5 bg-[#ffd167] text-[#765900] rounded-full hover:shadow-md transition-all cursor-pointer flex items-center justify-center">
          <MdFilterList className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
