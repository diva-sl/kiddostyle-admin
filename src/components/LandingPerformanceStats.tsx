import React from "react";
import { MdTrendingUp, MdTrendingDown, MdCheckCircle } from "react-icons/md";

export const LandingPerformanceStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top Page Views */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between h-40 hover:scale-[1.01] hover:shadow-md transition-all cursor-default">
        <div>
          <p className="text-[10px] font-bold text-[#b31f56] uppercase tracking-wider mb-2">
            Top Page Views
          </p>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none">
            12.4k
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[#785a00] font-bold text-xs">
          <MdTrendingUp className="w-4.5 h-4.5" />
          <span>Summer Sale +12%</span>
        </div>
      </div>

      {/* Avg. Bounce Rate */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between h-40 hover:scale-[1.01] hover:shadow-md transition-all cursor-default">
        <div>
          <p className="text-[10px] font-bold text-[#006780] uppercase tracking-wider mb-2">
            Avg. Bounce Rate
          </p>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none">
            32.1%
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[#ba1a1a] font-bold text-xs">
          <MdTrendingDown className="w-4.5 h-4.5" />
          <span>Critical: B2S Page</span>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between h-40 hover:scale-[1.01] hover:shadow-md transition-all cursor-default">
        <div>
          <p className="text-[10px] font-bold text-[#785a00] uppercase tracking-wider mb-2">
            Conversion Rate
          </p>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none">
            4.8%
          </h3>
        </div>
        <div className="flex items-center gap-1 text-green-700 font-bold text-xs">
          <MdCheckCircle className="w-4.5 h-4.5 text-green-600" />
          <span>Above Industry Avg</span>
        </div>
      </div>
    </div>
  );
};
