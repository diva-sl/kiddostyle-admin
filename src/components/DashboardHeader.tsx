import React from "react";
import { Calendar, Download } from "lucide-react";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e] mb-1">
          Dashboard Overview
        </h2>
        <p className="text-[#584045] text-sm">
          Welcome back, Sarah. Here's what's happening today.
        </p>
      </div>

      <div className="flex gap-3 shrink-0">
        <button className="px-5 py-2.5 rounded-full border border-[#dfbec4] font-semibold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all squish flex items-center gap-2 cursor-pointer">
          <Calendar className="w-4 h-4 text-[#584045]/70" />
          Last 30 Days
        </button>

        <button className="px-5 py-2.5 rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all squish flex items-center gap-2 cursor-pointer">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
};
