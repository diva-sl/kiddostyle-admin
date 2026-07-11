import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

interface StockWarningItem {
  title: string;
  left: string;
  image: string;
}

const stockWarnings: StockWarningItem[] = [
  {
    title: "Organic Cotton Ribbed Sweater",
    left: "2 units left",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0ee3YzwLQrIvhMdpbxyMnCCQdDfcwRc_nlabgWlcuaACwwW1xcnNz6nlWeEasjvw_NVC2bhrukH-zHmWF16VOytTzIcyayuZzxLcvzxzF-TvRPDg5DLrokj3M_jTHFpLqXeSVnDUWW0wDC6pBjSJ_I_PtNx3sO7n3-cjPPdj1Au6fLjd_SEtPh-nruSC9irlDnb0xivxoAKOypylD_mJQmgmAjJaU9x59zlOMB9RD1IjVoIJWwfCkBrTpNfClpKaR_TMhxJZR53V8",
  },
  {
    title: "Linen Overalls - Olive",
    left: "5 units left",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvPuWXrETKEoJEGhmgJUNaYwhtO7bRJJ-NAqCOaUiTFMHcO4ypyfULQaNSUb97tFB4xKXXLCxP5ynTaenzWuvQ_5W_1qdiix1r66_xHuOFa66mJGG1ekI6Kw3Wpi--pPLy_BNuW2g4v_-0V_bLXdJF_Al0d2D8hRMcTvpmT6ebSwLpX6clAIpAOGHPEE5RuFBNklGtZNsc41e5JytVJ-KzEk8qpFb9QEVtonPD9iv5WEtwTrMuRT0TBOKCzWcg8DuT7SzayjXzZHPs",
  },
  {
    title: "Leather T-Strap Shoes",
    left: "3 units left",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDD-CypIAW_rI5j4v_6lHqlwTf3HBrB-PHZ7m2-5Qnt8YyI0hI6EvQR7NHN5ZlHUZHknghHh81L_CKnV_ZVT1JVATsX2LZNdBuXBJpDroO4Thm2HYSnxUjSU6lg_N3_OuK9c8YKR-BYnO4skUGADrWG8FstFqT6lI16Rr5IkaUa9SKn-k4I0Z3_7aUYp2HqfmuUJm7lYK8th1rX-FD_44n02U0nSidtpkATlmeokM04QHPrd9m_DxdU48qQavsDpW4alQw6VBcW-CuH",
  },
];

export const SellerRevenueStock: React.FC = () => {
  const [tab, setTab] = useState<"week" | "month">("week");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch select-none">
      {/* Weekly Revenue Columns Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              Weekly Revenue
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
              Performance over the last 7 days
            </p>
          </div>
          <div className="flex bg-[#faf8ff] rounded-full p-1 border border-[#dfbec4]/20">
            <button
              onClick={() => setTab("week")}
              className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
                tab === "week"
                  ? "bg-[#ffd9df] text-[#b31f56]"
                  : "text-[#584045]/60"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTab("month")}
              className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
                tab === "month"
                  ? "bg-[#ffd9df] text-[#b31f56]"
                  : "text-[#584045]/60"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Vertical histograms list */}
        <div className="h-60 flex items-end justify-between gap-4 pt-6 px-2 relative border-b border-[#dfbec4]/20 pb-1">
          {/* Monday */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $420
            </div>
            <div
              className="w-full bg-[#ffd9df] hover:bg-[#ff5c8d]/30 transition-all rounded-t-xl"
              style={{ height: "40%" }}
            />
            <span className="text-[10px] font-bold text-[#584045]/60 mt-3.5">
              Mon
            </span>
          </div>

          {/* Tuesday */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $680
            </div>
            <div
              className="w-full bg-[#ffd9df] hover:bg-[#ff5c8d]/30 transition-all rounded-t-xl"
              style={{ height: "65%" }}
            />
            <span className="text-[10px] font-bold text-[#584045]/60 mt-3.5">
              Tue
            </span>
          </div>

          {/* Wednesday */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $590
            </div>
            <div
              className="w-full bg-[#ffd9df] hover:bg-[#ff5c8d]/30 transition-all rounded-t-xl"
              style={{ height: "55%" }}
            />
            <span className="text-[10px] font-bold text-[#584045]/60 mt-3.5">
              Wed
            </span>
          </div>

          {/* Thursday (Peak) */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $1,100
            </div>
            <div
              className="w-full bg-[#ff5c8d] rounded-t-xl"
              style={{ height: "90%" }}
            />
            <span className="text-[10px] font-extrabold text-[#b31f56] mt-3.5">
              Thu
            </span>
          </div>

          {/* Friday */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $480
            </div>
            <div
              className="w-full bg-[#ffd9df] hover:bg-[#ff5c8d]/30 transition-all rounded-t-xl"
              style={{ height: "45%" }}
            />
            <span className="text-[10px] font-bold text-[#584045]/60 mt-3.5">
              Fri
            </span>
          </div>

          {/* Saturday */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $820
            </div>
            <div
              className="w-full bg-[#ffd9df] hover:bg-[#ff5c8d]/30 transition-all rounded-t-xl"
              style={{ height: "75%" }}
            />
            <span className="text-[10px] font-bold text-[#584045]/60 mt-3.5">
              Sat
            </span>
          </div>

          {/* Sunday */}
          <div className="flex-grow flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              $950
            </div>
            <div
              className="w-full bg-[#ffd9df] hover:bg-[#ff5c8d]/30 transition-all rounded-t-xl"
              style={{ height: "85%" }}
            />
            <span className="text-[10px] font-bold text-[#584045]/60 mt-3.5">
              Sun
            </span>
          </div>
        </div>
      </div>

      {/* Right stock alerts checklist panel */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <h3 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Low Stock Alerts
        </h3>

        <div className="space-y-4">
          {stockWarnings.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 hover:bg-[#faf8ff] rounded-2xl transition-all border border-[#dfbec4]/10"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#dfbec4]/20">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#131b2e] truncate">
                  {item.title}
                </p>
                <p className="text-[10px] text-[#ba1a1a] font-extrabold mt-0.5">
                  {item.left}
                </p>
              </div>
              <button className="w-7 h-7 rounded-full bg-[#f2f3ff] hover:bg-[#b31f56] hover:text-white text-[#b31f56] flex items-center justify-center transition-all cursor-pointer">
                <MdAdd className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full py-2.5 border-2 border-[#dfbec4] hover:bg-[#faf8ff] text-[#584045] font-bold rounded-2xl transition-colors text-xs cursor-pointer">
          View All Inventory
        </button>
      </div>
    </div>
  );
};
