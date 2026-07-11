import React from "react";
import { MdStar } from "react-icons/md";

export const ReviewsStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Reviews */}
      <div className="bg-[#f2f3ff] p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm cursor-default">
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
          Total Reviews
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-extrabold text-[#131b2e] leading-none">
            12,842
          </span>
          <span className="text-[#785a00] font-bold text-xs">+12%</span>
        </div>
      </div>

      {/* Avg Rating */}
      <div className="bg-[#f2f3ff] p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm cursor-default">
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
          Avg. Rating
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-extrabold text-[#131b2e] leading-none">
            4.8
          </span>
          <div className="flex text-[#ffd167] shrink-0">
            <MdStar className="w-4 h-4" />
            <MdStar className="w-4 h-4" />
            <MdStar className="w-4 h-4" />
            <MdStar className="w-4 h-4" />
            <MdStar className="w-4 h-4 text-[#dfbec4]" />
          </div>
        </div>
      </div>

      {/* Pending Reviews */}
      <div className="bg-[#f2f3ff] p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm cursor-default">
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
          Pending Review
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-extrabold text-[#b31f56] leading-none">
            24
          </span>
          <span className="text-[#584045]/60 text-xs font-bold font-display uppercase tracking-widest">
            urgent
          </span>
        </div>
      </div>

      {/* Response Rate */}
      <div className="bg-[#f2f3ff] p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm cursor-default">
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
          Response Rate
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-extrabold text-[#131b2e] leading-none">
            94%
          </span>
          <span className="text-[#006780] font-bold text-xs uppercase tracking-wider">
            Optimal
          </span>
        </div>
      </div>
    </div>
  );
};
