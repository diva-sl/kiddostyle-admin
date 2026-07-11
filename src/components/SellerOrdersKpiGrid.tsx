import React from "react";
import {
  MdPendingActions,
  MdLocalShipping,
  MdCheckCircle,
  MdPayments,
} from "react-icons/md";

export const SellerOrdersKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Pending Orders */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#ffd167]/30 text-[#785a00] rounded-2xl">
            <MdPendingActions className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#584045]/60">+12%</span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">24</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Pending Orders
          </p>
        </div>
      </div>

      {/* In Transit */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#b7eaff] text-[#006780] rounded-2xl">
            <MdLocalShipping className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#006780] bg-[#b7eaff]/30 px-2 py-0.5 rounded-full">
            +5%
          </span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">18</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            In Transit
          </p>
        </div>
      </div>

      {/* Delivered Today */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#ffd9df] text-[#b31f56] rounded-2xl">
            <MdCheckCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#b31f56] bg-[#ffd9df]/30 px-2 py-0.5 rounded-full">
            +28%
          </span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">42</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Delivered Today
          </p>
        </div>
      </div>

      {/* Daily Revenue */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col gap-3 hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-[#f2f3ff] text-[#584045] rounded-2xl">
            <MdPayments className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#584045]/60">
            $12.4k total
          </span>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#131b2e]">$2,840</p>
          <p className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-wider mt-0.5">
            Daily Revenue
          </p>
        </div>
      </div>
    </div>
  );
};
