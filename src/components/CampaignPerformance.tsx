import React from "react";

export const CampaignPerformance: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Left Trends Graph Card */}
      <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-[#dfbec4]/30 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display text-base font-extrabold text-[#131b2e]">
              Redemption Trends
            </h3>
            <p className="text-xs text-[#584045]/60 mt-1 font-semibold">
              Weekly usage across all active coupons
            </p>
          </div>

          <select className="bg-[#f2f3ff] border-none rounded-full px-4 py-2 font-bold text-xs text-[#584045] outline-none cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        {/* Weekly Column Chart */}
        <div className="h-48 flex items-end justify-between gap-3 px-4 relative z-10 border-b border-[#dfbec4]/10 pb-2">
          {[
            { label: "W1-A", height: "35%", highlighted: false },
            { label: "W1-B", height: "55%", highlighted: false },
            { label: "W2-A", height: "40%", highlighted: false },
            { label: "W2-B", height: "90%", highlighted: true },
            { label: "W3-A", height: "65%", highlighted: false },
            { label: "W3-B", height: "50%", highlighted: false },
            { label: "W4-A", height: "60%", highlighted: false },
            { label: "W4-B", height: "45%", highlighted: false },
          ].map((bar, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center gap-1 group/bar cursor-default"
            >
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${
                  bar.highlighted
                    ? "bg-[#b31f56]"
                    : "bg-[#ff5c8d]/20 group-hover/bar:bg-[#b31f56]/60"
                }`}
                style={{ height: bar.height }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-3 px-4 text-[10px] font-bold text-[#584045]/50 select-none">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </div>

      {/* Right Marketing Tiered Promos Card */}
      <div className="bg-[#ffd167] p-8 rounded-[32px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[260px]">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/30 text-[#765900] text-[9px] font-extrabold uppercase rounded-full tracking-widest mb-4">
            Pro Tip
          </span>
          <h3 className="font-display text-lg font-extrabold text-[#765900] mb-2 leading-tight">
            Boost Sales with Tiered Discounts
          </h3>
          <p className="text-xs font-bold leading-relaxed text-[#765900]/95">
            Coupons with a minimum spend of $100 currently have a 24% higher
            average order value.
          </p>
        </div>

        <button className="relative z-10 w-full py-4 bg-[#765900] text-white font-extrabold text-xs rounded-full hover:shadow-lg transition-all active:scale-95 cursor-pointer">
          Create Tiered Promo
        </button>

        {/* Visual background circle */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};
