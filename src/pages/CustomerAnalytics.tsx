import React from "react";
import { MdCalendarToday, MdDownload, MdPersonAdd } from "react-icons/md";
import { AnalyticsKpiGrid } from "../components/AnalyticsKpiGrid";
import { GrowthSegmentation } from "../components/GrowthSegmentation";
import { TopSpendersActivity } from "../components/TopSpendersActivity";

export const CustomerAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Customer Analytics
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Deep dive into your community's engagement and growth.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdCalendarToday className="w-4 h-4 text-[#584045]/70" />
            Last 30 Days
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdDownload className="w-4.5 h-4.5" />
            Export Report
          </button>
        </div>
      </section>

      {/* Summary KPI Bento Grid Metrics */}
      <AnalyticsKpiGrid />

      {/* Month Growth Trend charts and segment lists */}
      <GrowthSegmentation />

      {/* Lower level Spenders list & event activity widgets */}
      <TopSpendersActivity />

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 group flex items-center z-50">
        <span className="bg-[#131b2e] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold mr-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Add New Customer
        </span>

        <button className="w-14 h-14 bg-[#b31f56] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <MdPersonAdd className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default CustomerAnalyticsPage;
