import React from "react";
import { MdPayments, MdPersonAdd, MdGroup, MdCached } from "react-icons/md";

export const AnalyticsKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Avg. Lifetime Value */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all group cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#ffd167] rounded-2xl text-[#765900] shrink-0">
            <MdPayments className="w-5 h-5" />
          </div>
          <span className="text-[#b31f56] font-bold text-xs">+12.4%</span>
        </div>
        <div>
          <p className="text-[#584045]/70 text-xs font-semibold uppercase tracking-wider">
            Avg. Lifetime Value
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1.5 group-hover:scale-105 transition-transform origin-left">
            $482.50
          </h3>
        </div>
      </div>

      {/* Acquisition Cost */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all group cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#00a4ca] rounded-2xl text-white shrink-0">
            <MdPersonAdd className="w-5 h-5" />
          </div>
          <span className="text-[#ba1a1a] font-bold text-xs">-3.2%</span>
        </div>
        <div>
          <p className="text-[#584045]/70 text-xs font-semibold uppercase tracking-wider">
            Acquisition Cost
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1.5 group-hover:scale-105 transition-transform origin-left">
            $18.90
          </h3>
        </div>
      </div>

      {/* Active Community */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all group cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#ff5c8d] rounded-2xl text-white shrink-0">
            <MdGroup className="w-5 h-5" />
          </div>
          <span className="text-[#b31f56] font-bold text-xs">+8.1%</span>
        </div>
        <div>
          <p className="text-[#584045]/70 text-xs font-semibold uppercase tracking-wider">
            Active Community
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1.5 group-hover:scale-105 transition-transform origin-left">
            2,481
          </h3>
        </div>
      </div>

      {/* Retention Rate */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all group cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#e2e7ff] rounded-2xl text-[#131b2e] shrink-0">
            <MdCached className="w-5 h-5" />
          </div>
          <span className="text-[#b31f56] font-bold text-xs">+1.5%</span>
        </div>
        <div>
          <p className="text-[#584045]/70 text-xs font-semibold uppercase tracking-wider">
            Retention Rate
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1.5 group-hover:scale-105 transition-transform origin-left">
            74.2%
          </h3>
        </div>
      </div>
    </div>
  );
};
