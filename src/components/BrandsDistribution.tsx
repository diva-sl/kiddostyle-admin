import React from "react";

export const BrandsDistribution: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#dfbec4]/30 p-6 flex flex-col justify-between h-full">
      {/* Title */}
      <h3 className="font-display text-base font-extrabold text-[#131b2e] mb-4">
        Brand Distribution
      </h3>

      {/* SVG Donut Chart Mockup */}
      <div className="relative h-48 flex items-center justify-center">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="#ff5c8d"
            strokeDasharray="440"
            strokeDashoffset="110"
            strokeWidth="20"
          />
          <circle
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="#00a4ca"
            strokeDasharray="440"
            strokeDashoffset="330"
            strokeWidth="20"
          />
          <circle
            cx="80"
            cy="80"
            fill="transparent"
            r="70"
            stroke="#ffd167"
            strokeDasharray="440"
            strokeDashoffset="400"
            strokeWidth="20"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-[#131b2e] leading-none">
            24
          </span>
          <span className="text-[10px] text-[#584045]/60 font-bold uppercase tracking-wider mt-1">
            Brands
          </span>
        </div>
      </div>

      {/* Legend list details */}
      <div className="space-y-3 mt-6">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5c8d]" />
            <span className="text-[#584045]/80">Apparel</span>
          </div>
          <span className="text-[#131b2e]">45%</span>
        </div>

        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00a4ca]" />
            <span className="text-[#584045]/80">Accessories</span>
          </div>
          <span className="text-[#131b2e]">30%</span>
        </div>

        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ffd167]" />
            <span className="text-[#584045]/80">Footwear</span>
          </div>
          <span className="text-[#131b2e]">15%</span>
        </div>

        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#dfbec4]" />
            <span className="text-[#584045]/80">Other</span>
          </div>
          <span className="text-[#131b2e]">10%</span>
        </div>
      </div>

      {/* Strategy Promo banner */}
      <div className="mt-6 p-4 bg-[#f2f3ff] rounded-xl border border-[#dfbec4]/30">
        <p className="text-[10px] text-[#b31f56] font-extrabold uppercase tracking-wider mb-1">
          Strategy Tip
        </p>
        <p className="text-xs font-semibold text-[#584045] leading-relaxed">
          Accessories show a 12% higher conversion rate this month. Consider
          onboarding 2 new jewelry brands.
        </p>
      </div>
    </div>
  );
};
