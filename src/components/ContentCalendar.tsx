import React from "react";
import { MdChevronLeft, MdChevronRight, MdMoreVert } from "react-icons/md";

export const ContentCalendar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Calendar Card */}
      <div className="glass-card bg-white rounded-3xl p-6 shadow-sm border border-[#dfbec4]/30">
        <div className="flex items-center justify-between mb-4 border-b border-[#dfbec4]/10 pb-2">
          <h4 className="font-display text-base font-extrabold text-[#131b2e]">
            Content Calendar
          </h4>
          <div className="flex gap-1">
            <button className="p-1 hover:text-[#b31f56] cursor-pointer">
              <MdChevronLeft className="w-5 h-5 text-[#584045]/70" />
            </button>
            <button className="p-1 hover:text-[#b31f56] cursor-pointer">
              <MdChevronRight className="w-5 h-5 text-[#584045]/70" />
            </button>
          </div>
        </div>

        <div className="mb-6 select-none">
          <p className="text-xs font-extrabold text-center mb-4 text-[#131b2e] uppercase tracking-wider">
            November 2023
          </p>
          <div className="grid grid-cols-7 text-center gap-y-2 text-xs font-bold">
            <div className="text-[#584045]/50">S</div>
            <div className="text-[#584045]/50">M</div>
            <div className="text-[#584045]/50">T</div>
            <div className="text-[#584045]/50">W</div>
            <div className="text-[#584045]/50">T</div>
            <div className="text-[#584045]/50">F</div>
            <div className="text-[#584045]/50">S</div>

            {/* Numeric grids */}
            <div className="p-2 text-[#584045]/30">29</div>
            <div className="p-2 text-[#584045]/30">30</div>
            <div className="p-2 text-[#584045]/30">31</div>
            <div className="p-2 text-[#131b2e]">1</div>
            <div className="p-2 text-[#131b2e]">2</div>
            <div className="p-2 text-[#131b2e]">3</div>
            <div className="p-2 text-[#131b2e]">4</div>

            {/* Scheduled day 5 */}
            <div className="p-2 bg-[#ffd167] text-[#765900] rounded-full font-bold relative flex items-center justify-center cursor-pointer">
              5
              <span className="absolute bottom-1 w-1 h-1 bg-[#765900] rounded-full" />
            </div>

            <div className="p-2 text-[#131b2e]">6</div>
            <div className="p-2 text-[#131b2e]">7</div>
            <div className="p-2 text-[#131b2e]">8</div>
            <div className="p-2 text-[#131b2e]">9</div>
            <div className="p-2 text-[#131b2e]">10</div>
            <div className="p-2 text-[#131b2e]">11</div>

            {/* Active draft day 12 */}
            <div className="p-2 bg-[#ff5c8d]/20 text-[#b31f56] rounded-full font-bold flex items-center justify-center cursor-pointer">
              12
            </div>
          </div>
        </div>

        {/* Upcoming Lists */}
        <div className="space-y-4 pt-4 border-t border-[#dfbec4]/10">
          <h5 className="text-[10px] font-extrabold text-[#584045]/60 uppercase tracking-widest">
            Upcoming
          </h5>

          {/* Item 1 */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf8ff] border border-[#dfbec4]/20 select-none">
            <div className="w-10 h-10 rounded-lg bg-[#ffdf9b] flex flex-col items-center justify-center text-[#785a00] shrink-0 font-display">
              <span className="font-extrabold text-sm leading-none">05</span>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-bold text-[#131b2e] truncate">
                Rainy Day Essentials
              </p>
              <p className="text-[10px] text-[#785a00] font-bold mt-0.5">
                09:00 AM
              </p>
            </div>
            <button className="text-[#584045]/40 hover:text-[#b31f56] cursor-pointer">
              <MdMoreVert className="w-5 h-5" />
            </button>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf8ff] border border-[#dfbec4]/20 select-none">
            <div className="w-10 h-10 rounded-lg bg-[#ffd9df] flex flex-col items-center justify-center text-[#b31f56] shrink-0 font-display">
              <span className="font-extrabold text-sm leading-none">12</span>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-bold text-[#131b2e] truncate">
                Winter Preview
              </p>
              <p className="text-[10px] text-[#b31f56] font-bold mt-0.5">
                02:30 PM
              </p>
            </div>
            <button className="text-[#584045]/40 hover:text-[#b31f56] cursor-pointer">
              <MdMoreVert className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Optimization Pink Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-[#b31f56] text-white shadow-sm min-h-[160px] flex flex-col justify-between">
        <div className="relative z-10 space-y-1">
          <h4 className="font-display text-sm font-extrabold">
            Optimization Tip
          </h4>
          <p className="text-[11px] leading-relaxed opacity-90">
            Posts with 'Style Tips' get 40% more engagement. Try creating more
            listicles!
          </p>
        </div>

        <button className="relative z-10 w-fit px-5 py-2.5 bg-white text-[#b31f56] rounded-full text-xs font-bold hover:bg-[#ffdf9b] hover:text-[#785a00] transition-colors cursor-pointer">
          View Analytics
        </button>

        {/* Decorative watermarks blur */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-4 -top-4 w-20 h-20 bg-[#ff5c8d]/20 rounded-full blur-xl pointer-events-none" />
      </div>
    </div>
  );
};
