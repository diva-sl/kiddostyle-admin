import React from "react";
import {
  MdPayments,
  MdLocalShipping,
  MdAccountBalance,
  MdAssignmentReturn,
  MdTrendingUp,
} from "react-icons/md";

export const FinancialMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Gross Revenue */}
      <div className="bg-[#b31f56] text-white p-6 rounded-3xl relative overflow-hidden hover:scale-[1.01] hover:shadow-lg transition-all duration-300">
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
          <MdPayments className="text-[100px]" />
        </div>
        <p className="text-[10px] font-extrabold opacity-80 uppercase tracking-widest mb-1">
          Gross Revenue
        </p>
        <h3 className="text-2xl font-extrabold mb-2">$113,842.00</h3>
        <div className="flex items-center gap-1 text-[10px] font-extrabold bg-white/20 w-fit px-2.5 py-0.5 rounded-full backdrop-blur-md">
          <MdTrendingUp className="w-3.5 h-3.5" /> +14.2%
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 hover:scale-[1.01] hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-extrabold text-[#584045]/70 uppercase tracking-wider">
            Shipping
          </p>
          <span className="text-[#b31f56] bg-[#ff5c8d]/10 p-2 rounded-xl">
            <MdLocalShipping className="w-5 h-5" />
          </span>
        </div>
        <h3 className="text-xl font-extrabold text-[#131b2e]">$8,240.50</h3>
        <p className="text-[10px] text-[#b31f56] font-extrabold mt-2">
          7.2% of gross
        </p>
      </div>

      {/* Tax */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 hover:scale-[1.01] hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-extrabold text-[#584045]/70 uppercase tracking-wider">
            Tax (Total)
          </p>
          <span className="text-[#785a00] bg-[#ffd167]/20 p-2 rounded-xl">
            <MdAccountBalance className="w-5 h-5" />
          </span>
        </div>
        <h3 className="text-xl font-extrabold text-[#131b2e]">$12,114.20</h3>
        <p className="text-[10px] text-[#785a00] font-extrabold mt-2">
          10.6% avg rate
        </p>
      </div>

      {/* Refunds */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 hover:scale-[1.01] hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-extrabold text-[#584045]/70 uppercase tracking-wider">
            Refunds
          </p>
          <span className="text-[#ba1a1a] bg-[#ffdad6] p-2 rounded-xl">
            <MdAssignmentReturn className="w-5 h-5" />
          </span>
        </div>
        <h3 className="text-xl font-extrabold text-[#ba1a1a]">-$2,410.00</h3>
        <p className="text-[10px] text-[#ba1a1a] font-extrabold mt-2">
          2.1% loss rate
        </p>
      </div>
    </div>
  );
};
