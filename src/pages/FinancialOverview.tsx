import React from "react";
import {
  MdChevronRight,
  MdCalendarToday,
  MdExpandMore,
  MdFileDownload,
} from "react-icons/md";
import { FinancialMetrics } from "../components/FinancialMetrics";
import { DailySalesMix } from "../components/DailySalesMix";
import { FinancialTransactions } from "../components/FinancialTransactions";

export const FinancialOverviewPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Title & Action Row Breadcrumbs banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold mb-1.5 select-none">
            <span>Dashboard</span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">Sales & Revenue</span>
          </nav>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Financial Overview
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Real-time performance tracking for KiddoStyle retail channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-2xl font-bold text-xs text-[#584045] hover:bg-[#faf8ff] transition-all cursor-pointer">
            <MdCalendarToday className="w-4 h-4 text-[#584045]/70" />
            Last 30 Days
            <MdExpandMore className="w-4 h-4 text-[#584045]/60 ml-1" />
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-2xl font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdFileDownload className="w-4.5 h-4.5" />
            Export Data
          </button>
        </div>
      </section>

      {/* Metrics bento cards stats */}
      <FinancialMetrics />

      {/* Daily sales Performance charts progress bar mix */}
      <DailySalesMix />

      {/* Transaction billing list index logs */}
      <FinancialTransactions />
    </div>
  );
};
export default FinancialOverviewPage;
