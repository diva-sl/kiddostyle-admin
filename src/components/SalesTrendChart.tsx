import React, { useState } from "react";

export const SalesTrendChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<"Revenue" | "Orders">(
    "Revenue",
  );

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#dfbec4]/30 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h4 className="text-lg font-extrabold text-[#131b2e] font-display">
            Sales Trend
          </h4>
          <p className="text-xs text-[#584045]/60 mt-1">
            Monthly performance overview
          </p>
        </div>

        <div className="flex gap-2 p-1 bg-[#f2f3ff] rounded-full border border-[#dfbec4]/20">
          {(["Revenue", "Orders"] as const).map((m) => {
            const isSelected = activeMetric === m;
            return (
              <button
                key={m}
                onClick={() => setActiveMetric(m)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#b31f56] shadow-sm"
                    : "text-[#584045]/70 hover:text-[#b31f56]"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-4 px-2 mb-4 relative z-10 border-b border-[#dfbec4]/20 pb-4">
        {[
          { month: "JAN", height: "45%", active: false },
          { month: "FEB", height: "60%", active: false },
          { month: "MAR", height: "35%", active: false },
          { month: "APR", height: "85%", active: true },
          { month: "MAY", height: "55%", active: false },
          { month: "JUN", height: "70%", active: false },
          { month: "JUL", height: "95%", active: false },
        ].map((bar, idx) => (
          <div
            key={idx}
            className="group/bar flex flex-col items-center gap-2 flex-1"
          >
            <div
              className={`w-10 rounded-t-xl transition-all duration-500 chart-bar ${
                bar.active
                  ? "bg-[#b31f56]"
                  : "bg-[#ff5c8d]/30 group-hover/bar:bg-[#b31f56]"
              }`}
              style={{ height: bar.height }}
            />
            <span
              className={`text-[10px] font-bold ${bar.active ? "text-[#b31f56]" : "text-[#584045]/60"}`}
            >
              {bar.month}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#b31f56]/5 rounded-full blur-3xl group-hover:bg-[#b31f56]/10 transition-colors pointer-events-none" />
    </div>
  );
};
