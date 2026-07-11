import React from "react";
import { MdGroup, MdStar, MdShoppingBag } from "react-icons/md";

export const CustomersKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Customers */}
      <div className="bg-white border border-[#dfbec4]/30 p-6 rounded-3xl hover:scale-[1.01] hover:shadow-md transition-all cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-[#ff5c8d]/20 text-[#b31f56] rounded-2xl">
            <MdGroup className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-[#765900] bg-[#ffd167]/30 px-2 py-0.5 rounded-full">
            +12% vs last month
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Total Customers
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            12,842
          </h3>
        </div>
      </div>

      {/* Active 30d */}
      <div className="bg-white border border-[#dfbec4]/30 p-6 rounded-3xl hover:scale-[1.01] hover:shadow-md transition-all cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-[#ffd167]/25 text-[#785a00] rounded-2xl">
            <MdStar className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold text-[#765900] bg-[#ffd167]/30 px-2 py-0.5 rounded-full">
            High engagement
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Active (30d)
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            8,291
          </h3>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white border border-[#dfbec4]/30 p-6 rounded-3xl hover:scale-[1.01] hover:shadow-md transition-all cursor-default flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-[#b7eaff] text-[#006780] rounded-2xl">
            <MdShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#584045]/60 bg-[#f2f3ff] px-2 py-0.5 rounded-full">
            Avg. $124.00
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Total Revenue
          </p>
          <h3 className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            $1.59M
          </h3>
        </div>
      </div>

      {/* KiddoStyle Pro Promo Card */}
      <div className="bg-[#b31f56] p-6 rounded-3xl text-white flex flex-col justify-between overflow-hidden relative group hover:scale-[1.01] hover:shadow-lg transition-all min-h-[140px]">
        <div className="z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
            Join KiddoStyle Pro
          </p>
          <h3 className="text-base font-extrabold mt-1.5 leading-tight">
            Advanced Analytics for Power Users
          </h3>
        </div>
        <button className="z-10 mt-4 text-left text-xs font-bold underline underline-offset-4 decoration-[#ffd167] cursor-pointer hover:text-[#ffd167] transition-colors select-none">
          Learn More
        </button>
        {/* Glowing visual abstract circle */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#ff5c8d] rounded-full opacity-20 blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
      </div>
    </div>
  );
};
