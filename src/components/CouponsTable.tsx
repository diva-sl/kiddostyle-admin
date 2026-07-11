import React, { useState } from "react";
import {
  MdFilterList,
  MdDownload,
  MdEdit,
  MdContentCopy,
  MdDelete,
  MdVisibility,
  MdReplay,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface CouponRow {
  code: string;
  campaign: string;
  type: string;
  value: string;
  used: number;
  limit: number | "infinite";
  expiry: string;
  status: "active" | "expired";
}

const initialCoupons: CouponRow[] = [
  {
    code: "KIDDO25",
    campaign: "Summer Launch",
    type: "Percentage",
    value: "25% OFF",
    used: 325,
    limit: 500,
    expiry: "Oct 24, 2024",
    status: "active",
  },
  {
    code: "WELCOME50",
    campaign: "New User Bonus",
    type: "Fixed Amount",
    value: "$50.00",
    used: 12,
    limit: "infinite",
    expiry: "Dec 31, 2024",
    status: "active",
  },
  {
    code: "BACK2SCHOOL",
    campaign: "Seasonal Promo",
    type: "Percentage",
    value: "15% OFF",
    used: 1000,
    limit: 1000,
    expiry: "Aug 30, 2024",
    status: "expired",
  },
  {
    code: "FREESHIP",
    campaign: "Store Wide",
    type: "Free Shipping",
    value: "N/A",
    used: 2214,
    limit: 2500,
    expiry: "Jan 15, 2025",
    status: "active",
  },
];

export const CouponsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Expired">(
    "All",
  );

  return (
    <div className="bg-white border border-[#dfbec4]/30 rounded-[32px] overflow-hidden shadow-sm">
      {/* Table Filter Controls */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#dfbec4]/20">
        <div className="flex gap-2">
          {(["All", "Active", "Expired"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#ffd167] text-[#765900]"
                  : "text-[#584045]/80 hover:bg-[#f2f3ff]"
              }`}
            >
              {tab === "All" ? "All Coupons" : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#dfbec4]/30 text-[#584045] rounded-full font-bold text-xs hover:bg-[#f2f3ff] transition-all cursor-pointer">
            <MdFilterList className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#dfbec4]/30 text-[#584045] rounded-full font-bold text-xs hover:bg-[#f2f3ff] transition-all cursor-pointer">
            <MdDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Grid Canvas Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#f2f3ff]/50 border-b border-[#dfbec4]/25">
              <th className="px-8 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Coupon Code
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Usage Limit
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Status
              </th>
              <th className="px-8 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {initialCoupons
              .filter(
                (c) =>
                  activeTab === "All" || c.status === activeTab.toLowerCase(),
              )
              .map((row, idx) => {
                const isExpired = row.status === "expired";
                const isInfinite = row.limit === "infinite";
                const percentage =
                  row.limit === "infinite"
                    ? 5
                    : Math.round((row.used / row.limit) * 100);

                return (
                  <tr
                    key={idx}
                    className={`group hover:bg-[#f2f3ff]/30 transition-colors ${isExpired ? "opacity-60" : ""}`}
                  >
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span
                          className={`font-bold text-sm ${isExpired ? "text-[#131b2e]" : "text-[#b31f56]"}`}
                        >
                          {row.code}
                        </span>
                        <span className="text-[9px] text-[#584045]/50 uppercase tracking-wider font-extrabold mt-0.5">
                          {row.campaign}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-[#584045]">{row.type}</td>

                    <td className="px-6 py-5 font-bold text-sm text-[#131b2e]">
                      {row.value}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-[#f2f3ff] rounded-full overflow-hidden border border-[#dfbec4]/20">
                          <div
                            className={`h-full rounded-full ${isExpired ? "bg-[#584045]/40" : "bg-[#b31f56]"}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#584045]/80 select-none">
                          {row.used}/{isInfinite ? "∞" : row.limit}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-[#584045]">{row.expiry}</td>

                    <td className="px-6 py-5">
                      {isExpired ? (
                        <span className="px-3 py-1 bg-[#f2f3ff] text-[#584045]/60 text-[10px] font-extrabold uppercase rounded-full tracking-wide">
                          Expired
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00a4ca]/10 text-[#006780] text-[10px] font-extrabold uppercase rounded-full tracking-wide">
                          <span className="w-1.5 h-1.5 bg-[#006780] rounded-full animate-pulse" />
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-8 py-5 text-right">
                      {/* Action buttons (revealed on hover) */}
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {isExpired ? (
                          <>
                            <button className="p-2 hover:bg-[#faf8ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer">
                              <MdVisibility className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-[#faf8ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer">
                              <MdReplay className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="p-2 hover:bg-[#faf8ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer">
                              <MdEdit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-[#faf8ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer">
                              <MdContentCopy className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 hover:bg-[#ffdad6] text-[#ba1a1a] rounded-full transition-all cursor-pointer">
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 flex justify-between items-center bg-[#f2f3ff]/30 select-none">
        <p className="text-xs text-[#584045]/70 font-bold">
          Showing 1 to 10 of 42 coupons
        </p>
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#faf8ff] border border-[#dfbec4]/20 transition-all text-[#584045] opacity-50 cursor-not-allowed">
            <MdChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2f3ff] transition-all text-[#131b2e] font-bold text-xs cursor-pointer">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2f3ff] transition-all text-[#131b2e] font-bold text-xs cursor-pointer">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2f3ff] transition-all text-[#131b2e] cursor-pointer">
            <MdChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
