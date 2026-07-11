import React from "react";
import {
  MdFilterList,
  MdDownload,
  MdAddComment,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { ReviewsStats } from "../components/ReviewsStats";
import { ReviewsFeed } from "../components/ReviewsFeed";

export const ReviewsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Page Headers Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 select-none">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Reviews Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Oversee and respond to customer feedback across your catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdFilterList className="w-4 h-4 text-[#584045]/70" />
            Filter
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </section>

      {/* Summary KPI Stats cards */}
      <ReviewsStats />

      {/* Reviews feed item layout lists */}
      <ReviewsFeed />

      {/* Pagination Footer */}
      <div className="flex justify-between items-center select-none pt-4">
        <p className="text-xs text-[#584045]/70 font-bold">
          Showing 1 to 10 of 1,240 reviews
        </p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors cursor-pointer">
            <MdChevronLeft className="w-5 h-5 text-[#584045]" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors font-bold text-xs cursor-pointer">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors font-bold text-xs cursor-pointer">
            3
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-xs text-[#584045]/60">
            ...
          </span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors font-bold text-xs cursor-pointer">
            124
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors cursor-pointer">
            <MdChevronRight className="w-5 h-5 text-[#584045]" />
          </button>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#ffd167] text-[#765900] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer">
        <MdAddComment className="w-6 h-6" />
      </button>
    </div>
  );
};
export default ReviewsPage;
