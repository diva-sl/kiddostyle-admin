import React from "react";

export const ReturnsInsights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Return reasons breakdown graph bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
        <h5 className="font-display text-sm font-extrabold text-[#131b2e]">
          Return Reasons Breakdown
        </h5>

        <div className="space-y-4">
          {/* Reason 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#584045]/85">Sizing Issues</span>
              <span className="text-[#131b2e] font-extrabold">68%</span>
            </div>
            <div className="w-full bg-[#f2f3ff] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#b31f56] h-full rounded-full"
                style={{ width: "68%" }}
              />
            </div>
          </div>

          {/* Reason 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#584045]/85">Wrong Color/Item</span>
              <span className="text-[#131b2e] font-extrabold">14%</span>
            </div>
            <div className="w-full bg-[#f2f3ff] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#ffd167] h-full rounded-full"
                style={{ width: "14%" }}
              />
            </div>
          </div>

          {/* Reason 3 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#584045]/85">Product Damaged</span>
              <span className="text-[#131b2e] font-extrabold">10%</span>
            </div>
            <div className="w-full bg-[#f2f3ff] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#ba1a1a] h-full rounded-full"
                style={{ width: "10%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer loyalty response speeds card */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h5 className="font-display text-sm font-extrabold text-[#131b2e] mb-1">
            Customer Loyalty Impact
          </h5>
          <p className="text-xs text-[#584045]/70 font-semibold mb-6">
            Returns handled within 24h see a 40% higher re-purchase rate.
          </p>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#006780]">22h</p>
              <p className="text-[9px] font-extrabold text-[#584045]/50 uppercase tracking-wider mt-1">
                Avg Response
              </p>
            </div>

            <div className="h-12 w-px bg-[#dfbec4]/30" />

            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#b31f56]">84%</p>
              <p className="text-[9px] font-extrabold text-[#584045]/50 uppercase tracking-wider mt-1">
                Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Floating gradient glow elements */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#b31f56]/5 rounded-full blur-3xl group-hover:bg-[#b31f56]/10 transition-colors pointer-events-none" />
      </div>
    </div>
  );
};
