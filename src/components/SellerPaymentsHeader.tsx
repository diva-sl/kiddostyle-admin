import React from "react";

export const SellerPaymentsHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch select-none">
      {/* Available Balance Card (col-span-7) */}
      <div className="lg:col-span-7 bg-[#b31f56] text-white rounded-[32px] p-6 relative overflow-hidden flex flex-col justify-between shadow-lg min-h-[220px]">
        <div className="relative z-10">
          <p className="text-[10px] font-extrabold opacity-80 uppercase tracking-widest mb-1">
            Available Balance
          </p>
          <h3 className="text-4xl font-extrabold">$12,840.50</h3>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex-1">
            <p className="text-[9px] font-bold opacity-90 uppercase tracking-wider">
              Next Payout
            </p>
            <p className="text-base font-extrabold mt-0.5">Oct 24, 2023</p>
          </div>

          <button className="bg-[#ffd167] text-[#765900] px-6 py-3 rounded-full font-bold text-xs hover:bg-[#ffdf9b] transition-all active:scale-[0.98] cursor-pointer shadow-md self-center">
            Withdraw Now
          </button>
        </div>

        {/* Backdrop abstract glows */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#ff5c8d] rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#ffd167] rounded-full blur-3xl opacity-20 pointer-events-none" />
      </div>

      {/* Revenue Mix breakdown list (col-span-5) */}
      <div className="lg:col-span-5 bg-white border border-[#dfbec4]/30 rounded-[32px] p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
        <h4 className="font-display text-sm font-extrabold text-[#b31f56] mb-4">
          Revenue Mix
        </h4>

        <div className="space-y-4 flex-grow flex flex-col justify-around text-xs font-semibold text-[#131b2e]">
          <div>
            <div className="flex justify-between mb-1.5">
              <span>Gross Sales</span>
              <span className="font-bold">$15,200</span>
            </div>
            <div className="w-full bg-[#f2f3ff] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#b31f56] h-full rounded-full"
                style={{ width: "82%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span>Marketplace Fees</span>
              <span className="text-[#584045]/60 font-bold">-$1,840</span>
            </div>
            <div className="w-full bg-[#f2f3ff] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#785a00] h-full rounded-full"
                style={{ width: "12%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span>Shipping Costs</span>
              <span className="text-[#584045]/60 font-bold">-$519</span>
            </div>
            <div className="w-full bg-[#f2f3ff] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#00a4ca] h-full rounded-full"
                style={{ width: "6%" }}
              />
            </div>
          </div>
        </div>

        <p className="text-[9px] text-[#584045]/50 font-bold mt-4 text-center italic">
          Calculated based on the last 30 days of activity.
        </p>
      </div>
    </div>
  );
};
