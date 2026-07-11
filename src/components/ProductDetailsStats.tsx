import React from "react";
import { MdTrendingUp } from "react-icons/md";

export const ProductDetailsStats: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Sales performance graphic card */}
      <div className="bg-[#00a4ca] p-6 rounded-3xl shadow-sm text-white relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div>
          <p className="text-[10px] tracking-wider uppercase font-extrabold text-white/70">
            Total Sales (30D)
          </p>
          <h3 className="text-2xl font-extrabold mt-1">$4,280.00</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-white/90 mt-4">
          <MdTrendingUp className="w-4 h-4" />
          <span>+12.5% from last month</span>
        </div>

        {/* Watermark bank note background */}
        <div className="absolute right-[-10px] bottom-[-20px] w-28 h-20 bg-white/5 rounded-t-3xl blur-[1px] rotate-[-12deg]" />
      </div>

      {/* Grid boxes info */}
      <div className="grid grid-cols-2 gap-4">
        {/* Views */}
        <div className="bg-[#f2f3ff] p-5 rounded-2xl border border-[#dfbec4]/30">
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase">
            Product Views
          </p>
          <h4 className="text-lg font-extrabold text-[#131b2e] mt-1.5">
            1,842
          </h4>
          <span className="text-[10px] text-[#584045]/80 font-bold block mt-1">
            Avg 61/day
          </span>
        </div>

        {/* Conv rate */}
        <div className="bg-[#f2f3ff] p-5 rounded-2xl border border-[#dfbec4]/30">
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase">
            Conv. Rate
          </p>
          <h4 className="text-lg font-extrabold text-[#131b2e] mt-1.5">3.8%</h4>
          <span className="text-[10px] text-[#006780] font-extrabold block mt-1">
            Above average
          </span>
        </div>
      </div>
    </div>
  );
};
