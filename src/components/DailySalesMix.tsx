import React from "react";
import { MdBolt, MdArrowForward } from "react-icons/md";

interface DailySalesMixProps {
  orders: any[];
}

interface ChartBarRow {
  day: string;
  val: string;
  height: string;
  isPeak?: boolean;
}

const fallbackWeeklyData: ChartBarRow[] = [
  { day: "Mon", val: "$12.4k", height: "65%" },
  { day: "Tue", val: "$14.2k", height: "75%" },
  { day: "Wed", val: "$11.8k", height: "55%" },
  { day: "Thu", val: "$18.9k", height: "90%", isPeak: true },
  { day: "Fri", val: "$15.5k", height: "80%" },
  { day: "Sat", val: "$21.2k", height: "100%" },
  { day: "Sun", val: "$19.8k", height: "95%" },
];

export const DailySalesMix: React.FC<DailySalesMixProps> = ({ orders }) => {
  // Aggregate sales mix if orders are in live DB
  const totalGross =
    orders.length > 0
      ? orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
      : 113842.0;

  const girlsRevenue = totalGross * 0.48;
  const boysRevenue = totalGross * 0.32;
  const babyRevenue = totalGross * 0.2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none">
      {/* Daily sales performance histograms */}
      <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between min-h-[460px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              Daily Sales Performance
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
              Daily gross revenue comparison (Oct 1 - Oct 7)
            </p>
          </div>

          <div className="flex gap-4 text-[10px] font-bold">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#785a00]" />
              <span className="text-[#131b2e]">Actual Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#dae2fd]" />
              <span className="text-[#584045]/60">Target</span>
            </div>
          </div>
        </div>

        {/* Charts coordinates container */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow flex items-end justify-between gap-4 pt-6 relative border-b border-[#dfbec4]/20">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full border-t border-dashed border-[#131b2e] h-px" />
              <div className="w-full border-t border-dashed border-[#131b2e] h-px" />
              <div className="w-full border-t border-dashed border-[#131b2e] h-px" />
              <div className="w-full border-t border-dashed border-[#131b2e] h-px" />
            </div>

            {fallbackWeeklyData.map((bar, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center group relative h-full justify-end z-10"
              >
                <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded-lg text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {bar.val}
                </div>

                <div
                  className={`w-full max-w-[32px] rounded-2xl transition-all duration-300 relative overflow-hidden flex items-start justify-center cursor-pointer ${
                    bar.isPeak
                      ? "bg-[#b31f56] shadow-md shadow-[#b31f56]/20"
                      : "bg-[#785a00] hover:bg-[#5b4300]"
                  }`}
                  style={{ height: bar.height }}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {bar.isPeak && <MdBolt className="text-white w-4 h-4 mt-2" />}
                </div>

                <p
                  className={`text-[10px] font-extrabold mt-3.5 ${bar.isPeak ? "text-[#b31f56]" : "text-[#584045]/60"}`}
                >
                  {bar.day}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue mix progress breakdown */}
      <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <h3 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Sales Mix
        </h3>

        <div className="space-y-6 flex-grow flex flex-col justify-around">
          {/* Girls */}
          <div className="group cursor-default">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="font-bold text-xs text-[#131b2e]">
                  Girls Collection
                </h4>
                <p className="text-[10px] text-[#584045]/50 font-bold">
                  $
                  {girlsRevenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <span className="text-[#b31f56] font-extrabold text-sm">48%</span>
            </div>
            <div className="h-2.5 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff5c8d] rounded-full transition-all group-hover:brightness-95"
                style={{ width: "48%" }}
              />
            </div>
          </div>

          {/* Boys */}
          <div className="group cursor-default">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="font-bold text-xs text-[#131b2e]">
                  Boys Collection
                </h4>
                <p className="text-[10px] text-[#584045]/50 font-bold">
                  $
                  {boysRevenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <span className="text-[#785a00] font-extrabold text-sm">32%</span>
            </div>
            <div className="h-2.5 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ffd167] rounded-full transition-all group-hover:brightness-95"
                style={{ width: "32%" }}
              />
            </div>
          </div>

          {/* Baby */}
          <div className="group cursor-default">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="font-bold text-xs text-[#131b2e]">
                  Baby Collection
                </h4>
                <p className="text-[10px] text-[#584045]/50 font-bold">
                  $
                  {babyRevenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <span className="text-[#006780] font-extrabold text-sm">20%</span>
            </div>
            <div className="h-2.5 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00a4ca] rounded-full transition-all group-hover:brightness-95"
                style={{ width: "20%" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full py-3 rounded-2xl bg-[#f2f3ff] hover:bg-[#ff5c8d]/10 transition-colors font-bold text-xs text-[#b31f56] flex items-center justify-center gap-1.5 border border-transparent group cursor-pointer border-none">
            Analytical Insights
            <MdArrowForward className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
