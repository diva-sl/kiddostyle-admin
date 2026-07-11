import React from "react";
import {
  MdEdit,
  MdStars,
  MdSupportAgent,
  MdArrowForward,
} from "react-icons/md";

export const PayoutGoalSupport: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Payout default visa method */}
      <div className="bg-[#f2f3ff]/40 rounded-[24px] p-6 border border-[#dfbec4]/30 space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="font-display text-sm font-extrabold text-[#131b2e]">
            Payout Method
          </h5>
          <button className="text-[#b31f56] cursor-pointer hover:scale-105 transition-transform select-none">
            <MdEdit className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-[#dfbec4]/20">
          <div className="w-12 h-8 bg-[#1A1F71] rounded-md flex items-center justify-center text-white text-[8px] font-extrabold shrink-0">
            VISA
          </div>
          <div className="flex-grow text-xs font-semibold text-[#131b2e]">
            <p className="font-bold">**** 4242</p>
            <p className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
              Expires 12/26
            </p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
        </div>

        <p className="text-[10px] text-[#584045]/60 font-bold leading-relaxed">
          Funds are automatically transferred every Monday to your default
          account.
        </p>
      </div>

      {/* Target goals progress bar */}
      <div className="bg-[#ffd167]/20 text-[#765900] rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-[#dfbec4]/10">
        <div className="z-10 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs">
            <MdStars className="w-4.5 h-4.5 text-[#765900]" />
            <span>Monthly Goal</span>
          </div>
          <h5 className="text-xl font-extrabold text-[#765900]">$15,000.00</h5>
        </div>

        <div className="z-10 mt-6 space-y-1.5 text-xs font-semibold">
          <div className="flex justify-between text-[10px] font-bold">
            <span>Progress (85%)</span>
            <span>$2,160 to go!</span>
          </div>
          <div className="w-full bg-[#765900]/10 rounded-full h-3.5 p-0.5">
            <div className="bg-[#785a00] h-full rounded-full w-[85%]" />
          </div>
        </div>

        <button className="z-10 mt-6 w-full bg-[#785a00] text-white rounded-full py-2.5 font-bold text-xs hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer shadow-md">
          Set New Goal
        </button>

        {/* Background abstract overlay icon */}
        <div className="absolute -right-8 -bottom-8 opacity-5 text-[#785a00] pointer-events-none">
          <MdStars className="text-[100px]" />
        </div>
      </div>

      {/* Support card details */}
      <div className="bg-[#e2e7ff]/30 rounded-[24px] p-6 border border-[#dfbec4]/30 flex gap-4 items-start select-none">
        <div className="w-9 h-9 rounded-full bg-[#00a4ca] text-white flex items-center justify-center shrink-0">
          <MdSupportAgent className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-bold text-xs text-[#131b2e]">Payment issue?</h5>
          <p className="text-[10px] text-[#584045]/70 font-semibold mt-1 leading-relaxed">
            Our seller support team is here to help you 24/7 with any financial
            queries.
          </p>
          <a
            className="text-[#006780] font-bold text-[10px] flex items-center gap-0.5 mt-3 hover:underline cursor-pointer"
            href="#support"
          >
            Contact Support <MdArrowForward className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
