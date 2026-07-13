import React from "react";
import { useCustomers } from "../hooks/useCustomers";

interface SegmentItem {
  title: string;
  description: string;
  percentage: string;
  indicatorColor: string;
  opacity?: string;
}

export const GrowthSegmentation: React.FC = () => {
  const { data: customers = [] } = useCustomers();

  // Calculate dynamic segment shares
  const total = customers.length || 1;
  const vipCount = customers.filter((c) => c.totalSpent > 1000).length;
  const activeCount = customers.filter((c) => c.status === "active").length;
  const suspendedCount = customers.filter(
    (c) => c.status === "suspended",
  ).length;

  const vipPct = Math.round((vipCount / total) * 100);
  const activePct = Math.round((activeCount / total) * 100);
  const atRiskPct = Math.round((suspendedCount / total) * 100);

  const segmentItems: SegmentItem[] =
    customers.length > 0
      ? [
          {
            title: "VIP Tier",
            description: "Spent over $1,000",
            percentage: `${vipPct}%`,
            indicatorColor: "bg-[#b31f56]",
          },
          {
            title: "Active Accounts",
            description: "Verified and active status",
            percentage: `${activePct}%`,
            indicatorColor: "bg-[#00a4ca]",
          },
          {
            title: "At-Risk",
            description: "Suspended or blocked accounts",
            percentage: `${atRiskPct}%`,
            indicatorColor: "bg-[#584045]/60",
            opacity: "opacity-50",
          },
        ]
      : [
          {
            title: "VIP",
            description: "Top 5% of spenders",
            percentage: "15%",
            indicatorColor: "bg-[#b31f56]",
          },
          {
            title: "Active",
            description: "Ordered in last 30d",
            percentage: "42%",
            indicatorColor: "bg-[#00a4ca]",
          },
          {
            title: "New",
            description: "First order this month",
            percentage: "28%",
            indicatorColor: "bg-[#ffd167]",
          },
          {
            title: "At-Risk",
            description: "No order in 90d",
            percentage: "15%",
            indicatorColor: "bg-[#584045]/60",
            opacity: "opacity-50",
          },
        ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* LTV & CAC Growth Histograms */}
      <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Growth Trends
          </h4>

          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b31f56]" />
              <span className="text-[10px] font-bold text-[#584045]/70">
                LTV
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a4ca]" />
              <span className="text-[10px] font-bold text-[#584045]/70">
                CAC
              </span>
            </div>
          </div>
        </div>

        {/* Column Bar Charts */}
        <div className="h-60 flex items-end justify-between gap-4 px-4 relative pt-4">
          <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="border-t border-[#131b2e] w-full h-px" />
            <div className="border-t border-[#131b2e] w-full h-px" />
            <div className="border-t border-[#131b2e] w-full h-px" />
            <div className="border-t border-[#131b2e] w-full h-px" />
          </div>

          {/* Month JAN */}
          <div className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex justify-center items-end gap-1.5 h-full">
              <div
                className="w-4 bg-[#b31f56] rounded-t-full transition-all group-hover:brightness-105"
                style={{ height: "60%" }}
              />
              <div
                className="w-4 bg-[#00a4ca] rounded-t-full transition-all group-hover:brightness-105"
                style={{ height: "30%" }}
              />
            </div>
            <span className="text-[9px] text-[#584045]/60 font-bold mt-2">
              JAN
            </span>
          </div>

          {/* Month FEB */}
          <div className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex justify-center items-end gap-1.5 h-full">
              <div
                className="w-4 bg-[#b31f56] rounded-t-full"
                style={{ height: "75%" }}
              />
              <div
                className="w-4 bg-[#00a4ca] rounded-t-full"
                style={{ height: "25%" }}
              />
            </div>
            <span className="text-[9px] text-[#584045]/60 font-bold mt-2">
              FEB
            </span>
          </div>

          {/* Month MAR */}
          <div className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex justify-center items-end gap-1.5 h-full">
              <div
                className="w-4 bg-[#b31f56] rounded-t-full"
                style={{ height: "65%" }}
              />
              <div
                className="w-4 bg-[#00a4ca] rounded-t-full"
                style={{ height: "40%" }}
              />
            </div>
            <span className="text-[9px] text-[#584045]/60 font-bold mt-2">
              MAR
            </span>
          </div>

          {/* Month APR */}
          <div className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex justify-center items-end gap-1.5 h-full">
              <div
                className="w-4 bg-[#b31f56] rounded-t-full"
                style={{ height: "90%" }}
              />
              <div
                className="w-4 bg-[#00a4ca] rounded-t-full"
                style={{ height: "20%" }}
              />
            </div>
            <span className="text-[9px] text-[#584045]/60 font-bold mt-2">
              APR
            </span>
          </div>

          {/* Month MAY */}
          <div className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex justify-center items-end gap-1.5 h-full">
              <div
                className="w-4 bg-[#b31f56] rounded-t-full"
                style={{ height: "80%" }}
              />
              <div
                className="w-4 bg-[#00a4ca] rounded-t-full"
                style={{ height: "35%" }}
              />
            </div>
            <span className="text-[9px] text-[#584045]/60 font-bold mt-2">
              MAY
            </span>
          </div>

          {/* Month JUN */}
          <div className="flex-1 flex flex-col items-center gap-1 group">
            <div className="w-full flex justify-center items-end gap-1.5 h-full">
              <div
                className="w-4 bg-[#b31f56] rounded-t-full"
                style={{ height: "85%" }}
              />
              <div
                className="w-4 bg-[#00a4ca] rounded-t-full"
                style={{ height: "30%" }}
              />
            </div>
            <span className="text-[9px] text-[#584045]/60 font-bold mt-2">
              JUN
            </span>
          </div>
        </div>
      </div>

      {/* Tiers Segmentation Breakdown */}
      <div className="lg:col-span-1 bg-white p-6 rounded-[2rem] border border-[#dfbec4]/30 shadow-sm flex flex-col">
        <h4 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Segmentation
        </h4>

        <div className="flex-grow flex flex-col justify-around gap-4">
          {segmentItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between ${item.opacity || ""}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-10 rounded-full shrink-0 ${item.indicatorColor}`}
                />
                <div>
                  <p className="font-bold text-xs text-[#131b2e]">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-[#584045]/60 font-semibold">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="font-display text-base font-extrabold text-[#131b2e]">
                {item.percentage}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
