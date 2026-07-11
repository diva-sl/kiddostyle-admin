import React from "react";
import { MdChevronRight, MdDownload, MdDoneAll } from "react-icons/md";
import { ReturnsKpiGrid } from "../components/ReturnsKpiGrid";
import { ReturnsTable } from "../components/ReturnsTable";
import { ReturnsInsights } from "../components/ReturnsInsights";

export const ReturnsPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Title Breadcrumbs */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold select-none mb-1.5">
            <span>Dashboard</span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">
              Returns &amp; Refunds
            </span>
          </nav>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Returns &amp; Refunds
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdDownload className="w-4 h-4" />
            Export CSV
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdDoneAll className="w-4 h-4" />
            Bulk Approve
          </button>
        </div>
      </section>

      {/* Bento summary KPIs grid stats */}
      <ReturnsKpiGrid />

      {/* Main Catalog Return request tables */}
      <ReturnsTable />

      {/* Down level charts breakdowns and loyalty response indicators */}
      <ReturnsInsights />

      {/* Footer Branding tag */}
      <footer className="text-center pt-8 text-[10px] text-[#584045]/50 font-bold select-none border-t border-[#dfbec4]/10 mt-12 pb-4">
        © 2026 KiddoStyle Premium CMS • Designed with care for little
        fashionistas.
      </footer>
    </div>
  );
};
export default ReturnsPage;
