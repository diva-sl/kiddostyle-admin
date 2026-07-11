import React from "react";
import {
  MdPayments,
  MdShoppingBag,
  MdAnalytics,
  MdGroupAdd,
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";

export const AnalyticsOverviewKpis: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Total Revenue */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#dfbec4]/30 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#ffd9df] rounded-2xl text-[#b31f56]">
            <MdPayments className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-0.5 text-green-700 font-bold text-[10px] bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            <MdTrendingUp className="w-3.5 h-3.5" />
            12.5%
          </div>
        </div>
        <p className="text-[#584045]/70 font-extrabold text-[10px] uppercase tracking-wider">
          Total Revenue
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
          $142,850
        </h3>

        {/* Mini chart bar mockup */}
        <div className="mt-4 flex items-end gap-1 h-8">
          <div className="bg-[#ff5c8d]/25 w-full rounded-t-sm h-[40%]" />
          <div className="bg-[#ff5c8d]/25 w-full rounded-t-sm h-[65%]" />
          <div className="bg-[#ff5c8d]/25 w-full rounded-t-sm h-[55%]" />
          <div className="bg-[#b31f56] w-full rounded-t-sm h-[85%]" />
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#dfbec4]/30 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#ffdf9b] rounded-2xl text-[#785a00]">
            <MdShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-0.5 text-green-700 font-bold text-[10px] bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            <MdTrendingUp className="w-3.5 h-3.5" />
            8.2%
          </div>
        </div>
        <p className="text-[#584045]/70 font-extrabold text-[10px] uppercase tracking-wider">
          Total Orders
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
          2,482
        </h3>

        <div className="mt-4 flex items-end gap-1 h-8">
          <div className="bg-[#ffd167]/30 w-full rounded-t-sm h-[30%]" />
          <div className="bg-[#ffd167]/30 w-full rounded-t-sm h-[45%]" />
          <div className="bg-[#785a00] w-full rounded-t-sm h-[90%]" />
          <div className="bg-[#ffd167]/30 w-full rounded-t-sm h-[60%]" />
        </div>
      </div>

      {/* Avg Order Value */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#dfbec4]/30 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#b7eaff] rounded-2xl text-[#006780]">
            <MdAnalytics className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-0.5 text-[#ba1a1a] font-bold text-[10px] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
            <MdTrendingDown className="w-3.5 h-3.5" />
            2.1%
          </div>
        </div>
        <p className="text-[#584045]/70 font-extrabold text-[10px] uppercase tracking-wider">
          Avg. Order Value
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
          $57.55
        </h3>

        <div className="mt-4 flex items-end gap-1 h-8">
          <div className="bg-[#00a4ca] w-full rounded-t-sm h-[70%]" />
          <div className="bg-[#00a4ca]/20 w-full rounded-t-sm h-[75%]" />
          <div className="bg-[#00a4ca]/20 w-full rounded-t-sm h-[65%]" />
          <div className="bg-[#00a4ca]/20 w-full rounded-t-sm h-[60%]" />
        </div>
      </div>

      {/* Customer Growth */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#dfbec4]/30 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#ffd9df] rounded-2xl text-[#b31f56]">
            <MdGroupAdd className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-0.5 text-green-700 font-bold text-[10px] bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            <MdTrendingUp className="w-3.5 h-3.5" />
            15.4%
          </div>
        </div>
        <p className="text-[#584045]/70 font-extrabold text-[10px] uppercase tracking-wider">
          Customer Growth
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
          +1,120
        </h3>

        <div className="mt-4 flex items-end gap-1 h-8">
          <div className="bg-[#ff5c8d]/25 w-full rounded-t-sm h-[40%]" />
          <div className="bg-[#b31f56] w-full rounded-t-sm h-[55%]" />
          <div className="bg-[#b31f56] w-full rounded-t-sm h-[75%]" />
          <div className="bg-[#b31f56] w-full rounded-t-sm h-[95%]" />
        </div>
      </div>
    </div>
  );
};
