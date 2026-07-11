import React from "react";
import { MdPayments, MdShoppingBag, MdInventory, MdStar } from "react-icons/md";

export const SellerStatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Today's Sales */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd167]/30 text-[#765900] flex items-center justify-center">
            <MdPayments className="w-6 h-6" />
          </div>
          <span className="text-[#006780] font-bold text-[10px] bg-[#b7eaff] px-2.5 py-0.5 rounded-full">
            +12.5%
          </span>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Today's Sales
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">$1,420.50</h3>
      </div>

      {/* Pending Orders */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd9df] text-[#b31f56] flex items-center justify-center">
            <MdShoppingBag className="w-6 h-6" />
          </div>
          <span className="bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Urgent
          </span>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Pending Orders
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">24</h3>
      </div>

      {/* Low Stock */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] text-[#b31f56] flex items-center justify-center">
            <MdInventory className="w-6 h-6" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Low Stock Alerts
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">8 items</h3>
      </div>

      {/* Avg. Rating */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdf9b] text-[#785a00] flex items-center justify-center">
            <MdStar className="w-6 h-6" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Avg. Rating
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">4.9/5.0</h3>
      </div>
    </div>
  );
};
