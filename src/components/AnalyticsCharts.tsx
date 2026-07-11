import React from "react";

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch select-none">
      {/* Sales performance Line area chart (col-span-2) */}
      <div className="lg:col-span-2 bg-white p-6 rounded-[40px] shadow-sm border border-[#dfbec4]/30 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Sales Performance
          </h4>

          <div className="flex gap-4 font-bold text-[10px] text-[#584045]/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b31f56]" />
              <span>This Period</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dfbec4]" />
              <span>Previous Period</span>
            </div>
          </div>
        </div>

        {/* SVG Drawing area charts line */}
        <div className="h-60 flex items-end justify-between relative px-4 pt-4">
          {/* Y axis indicators */}
          <div className="absolute left-0 inset-y-4 flex flex-col justify-between text-[10px] font-bold text-[#584045]/50 -ml-4">
            <span>25k</span>
            <span>15k</span>
            <span>5k</span>
            <span>0k</span>
          </div>

          <div className="flex-1 ml-4 h-full flex items-end relative border-b border-l border-[#dfbec4]/30">
            <svg
              className="w-full h-full absolute inset-0"
              preserveAspectRatio="none"
              viewBox="0 0 1000 300"
            >
              <defs>
                <linearGradient
                  id="chartGrad"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "rgba(179, 31, 86, 0.15)",
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: "rgba(179, 31, 86, 0)",
                      stopOpacity: 1,
                    }}
                  />
                </linearGradient>
              </defs>

              {/* Previous period path */}
              <path
                d="M0,280 Q100,260 200,240 T400,220 T600,230 T800,210 T1000,180"
                fill="none"
                stroke="#dfbec4"
                strokeDasharray="5,5"
                strokeWidth="2"
              />

              {/* Active area path */}
              <path
                d="M0,290 Q100,220 200,180 T400,120 T600,160 T800,100 T1000,60 L1000,300 L0,300 Z"
                fill="url(#chartGrad)"
              />

              {/* Active line path */}
              <path
                d="M0,290 Q100,220 200,180 T400,120 T600,160 T800,100 T1000,60"
                fill="none"
                stroke="#b31f56"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        {/* X axis labels info */}
        <div className="flex justify-between mt-4 px-10 text-[10px] font-bold text-[#584045]/60 pl-12">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Traffic sources doughnut card breakdown (col-span-1) */}
      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-[#dfbec4]/30 flex flex-col items-center justify-between">
        <h4 className="font-display text-sm font-extrabold text-[#131b2e] self-start mb-6">
          Traffic Sources
        </h4>

        {/* Doughnut SVG Graph */}
        <div className="relative w-44 h-44 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="88"
              cy="88"
              fill="none"
              r="72"
              stroke="#faf8ff"
              strokeWidth="18"
            />
            <circle
              cx="88"
              cy="88"
              fill="none"
              r="72"
              stroke="#b31f56"
              strokeDasharray="452"
              strokeDashoffset="135"
              strokeLinecap="round"
              strokeWidth="18"
            />
            <circle
              cx="88"
              cy="88"
              fill="none"
              r="72"
              stroke="#785a00"
              strokeDasharray="452"
              strokeDashoffset="310"
              strokeLinecap="round"
              strokeWidth="18"
            />
            <circle
              cx="88"
              cy="88"
              fill="none"
              r="72"
              stroke="#006780"
              strokeDasharray="452"
              strokeDashoffset="400"
              strokeLinecap="round"
              strokeWidth="18"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-[#b31f56] leading-none">
              8.4k
            </span>
            <span className="text-[10px] text-[#584045]/50 font-extrabold uppercase mt-1">
              Visits
            </span>
          </div>
        </div>

        {/* Legends values detail lists */}
        <div className="w-full space-y-3.5 text-xs font-bold text-[#131b2e]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b31f56]" />
              <span className="text-[#584045]/80">Search Engine</span>
            </div>
            <span>45%</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#785a00]" />
              <span className="text-[#584045]/80">Direct</span>
            </div>
            <span>30%</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006780]" />
              <span className="text-[#584045]/80">Social Media</span>
            </div>
            <span>15%</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#faf8ff] border border-[#dfbec4]/40" />
              <span className="text-[#584045]/80">Email</span>
            </div>
            <span>10%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
