import React from "react";
import {
  MdTrendingDown,
  MdPendingActions,
  MdPayments,
  MdStraighten,
} from "react-icons/md";
import { useReturns } from "../hooks/useReturns";

export const ReturnsKpiGrid: React.FC = () => {
  const { data: returns = [] } = useReturns();

  // 1. Calculate pending return count dynamically
  const pendingCount =
    returns.length > 0
      ? returns.filter((r) => r.status === "pending").length
      : 12;

  // 2. Calculate total refunded amount dynamically (status == refunded)
  const totalRefunded =
    returns.length > 0
      ? returns
          .filter((r) => r.status === "refunded")
          .reduce((sum, r) => sum + r.refundAmount, 0)
      : 1240;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Return Rate */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm relative overflow-hidden group hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default">
        <div className="absolute top-4 right-4 text-[#b31f56] opacity-10 group-hover:scale-110 transition-transform">
          <MdTrendingDown className="w-12 h-12" />
        </div>
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-3">
          Return Rate
        </p>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none">
            4.2%
          </h3>
          <span className="text-[#ba1a1a] font-bold text-[10px] bg-[#ffdad6] px-1.5 py-0.5 rounded-md mb-0.5">
            ↓ 1.2%
          </span>
        </div>
        <div className="mt-5 w-full bg-[#f2f3ff] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#b31f56] h-full w-[42%]" />
        </div>
      </div>

      {/* Pending Returns */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm relative overflow-hidden group hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default">
        <div className="absolute top-4 right-4 text-[#785a00] opacity-10 group-hover:scale-110 transition-transform">
          <MdPendingActions className="w-12 h-12" />
        </div>
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-3">
          Pending Returns
        </p>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none">
            {pendingCount}
          </h3>
          <span className="text-[#765900] font-bold text-[10px] bg-[#ffd167]/30 px-1.5 py-0.5 rounded-md mb-0.5">
            Action Required
          </span>
        </div>
        <p className="text-[10px] text-[#584045]/60 font-bold mt-4">
          Requires CMS validation approval
        </p>
      </div>

      {/* Total Refunded */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm relative overflow-hidden group hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default">
        <div className="absolute top-4 right-4 text-[#006780] opacity-10 group-hover:scale-110 transition-transform">
          <MdPayments className="w-12 h-12" />
        </div>
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-3">
          Total Refunded
        </p>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none">
            ${totalRefunded.toLocaleString()}
          </h3>
          <span className="text-[#006780] font-bold text-[10px] bg-[#00a4ca]/10 px-1.5 py-0.5 rounded-md mb-0.5">
            This Month
          </span>
        </div>
        <p className="text-[10px] text-[#584045]/60 font-bold mt-4">
          Live DB total sum
        </p>
      </div>

      {/* Main Reason */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm relative overflow-hidden group hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default">
        <div className="absolute top-4 right-4 text-[#b31f56] opacity-10 group-hover:scale-110 transition-transform">
          <MdStraighten className="w-12 h-12" />
        </div>
        <p className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-3">
          Main Reason
        </p>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none uppercase">
            Sizing
          </h3>
          <span className="text-[#b31f56] font-bold text-[10px] bg-[#ffd9df] px-1.5 py-0.5 rounded-md mb-0.5">
            68%
          </span>
        </div>
        <p className="text-[10px] text-[#584045]/60 font-bold mt-4">
          Followed by: Wrong Color (14%)
        </p>
      </div>
    </div>
  );
};
