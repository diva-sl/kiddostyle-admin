import React, { useState } from "react";
import { MdFileDownload } from "react-icons/md";
import { AnalyticsOverviewKpis } from "../components/AnalyticsOverviewKpis";
import { AnalyticsCharts } from "../components/AnalyticsCharts";
import { TopSellersLogs } from "../components/TopSellersLogs";

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "ytd">("7d");

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Analytics Overview
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Real-time performance metrics and retail insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Timeframe tab filters */}
          <div className="flex bg-[#f2f3ff] rounded-full p-1 border border-[#dfbec4]/30 shadow-sm">
            <button
              onClick={() => setTimeframe("7d")}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                timeframe === "7d"
                  ? "bg-white text-[#b31f56] shadow-sm"
                  : "text-[#584045]/70 hover:text-[#131b2e]"
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframe("30d")}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                timeframe === "30d"
                  ? "bg-white text-[#b31f56] shadow-sm"
                  : "text-[#584045]/70 hover:text-[#131b2e]"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeframe("ytd")}
              className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                timeframe === "ytd"
                  ? "bg-white text-[#b31f56] shadow-sm"
                  : "text-[#584045]/70 hover:text-[#131b2e]"
              }`}
            >
              YTD
            </button>
          </div>

          <button className="flex items-center gap-1.5 bg-[#b31f56] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdFileDownload className="w-4.5 h-4.5" />
            Export Report
          </button>
        </div>
      </section>

      {/* Summary transaction KPIs widgets */}
      <AnalyticsOverviewKpis />

      {/* Main visual charting and traffic doughnuts */}
      <AnalyticsCharts />

      {/* Bottom Best selling velocity & activity timeline feed */}
      <TopSellersLogs />
    </div>
  );
};
export default AnalyticsPage;
