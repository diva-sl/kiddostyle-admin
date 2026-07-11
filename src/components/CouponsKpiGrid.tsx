import React from "react";
import {
  MdTrendingUp,
  MdPayments,
  MdGroup,
  MdHourglassEmpty,
} from "react-icons/md";

export const CouponsKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Redemptions */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#ff5c8d]/10 flex items-center justify-center text-[#b31f56]">
            <MdTrendingUp className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#006780] bg-[#b7eaff] px-2.5 py-1 rounded-full">
            +12.5%
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-[#584045]/60">
            Total Redemptions
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-snug mt-0.5">
            1,284
          </h3>
        </div>
      </div>

      {/* Total Discount Value */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd167]/20 flex items-center justify-center text-[#785a00]">
            <MdPayments className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#785a00] bg-[#ffd167]/40 px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-[#584045]/60">
            Total Discount Value
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-snug mt-0.5">
            $14,520
          </h3>
        </div>
      </div>

      {/* Unique Customers */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#00a4ca]/10 flex items-center justify-center text-[#006780]">
            <MdGroup className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#584045]/80 bg-[#f2f3ff] px-2.5 py-1 rounded-full">
            Unique
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-[#584045]/60">
            Unique Customers
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-snug mt-0.5">
            942
          </h3>
        </div>
      </div>

      {/* Expires Soon */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
            <MdHourglassEmpty className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-1 rounded-full">
            Expires Soon
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-[#584045]/60">
            Ending within 48h
          </p>
          <h3 className="text-xl font-extrabold text-[#ba1a1a] leading-snug mt-0.5">
            3
          </h3>
        </div>
      </div>
    </div>
  );
};
