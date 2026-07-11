import React from "react";
import {
  MdCampaign,
  MdAdsClick,
  MdTrendingUp,
  MdPayments,
} from "react-icons/md";

export const BannerKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Active Banners */}
      <div className="glass-panel bg-white/75 backdrop-blur-md p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow cursor-default">
        <div className="w-12 h-12 rounded-full bg-[#ffd167] flex items-center justify-center text-[#765900] shrink-0">
          <MdCampaign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Active Banners
          </p>
          <p className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            12
          </p>
        </div>
      </div>

      {/* Total Clicks */}
      <div className="glass-panel bg-white/75 backdrop-blur-md p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow cursor-default">
        <div className="w-12 h-12 rounded-full bg-[#00a4ca] flex items-center justify-center text-white shrink-0">
          <MdAdsClick className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Total Clicks
          </p>
          <p className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            48.2k
          </p>
        </div>
      </div>

      {/* Avg CTR */}
      <div className="glass-panel bg-white/75 backdrop-blur-md p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow cursor-default">
        <div className="w-12 h-12 rounded-full bg-[#ff5c8d] flex items-center justify-center text-white shrink-0">
          <MdTrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Avg. CTR
          </p>
          <p className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            4.8%
          </p>
        </div>
      </div>

      {/* Revenue Gen */}
      <div className="glass-panel bg-white/75 backdrop-blur-md p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow cursor-default">
        <div className="w-12 h-12 rounded-full bg-[#ffdf9b] flex items-center justify-center text-[#5b4300] shrink-0">
          <MdPayments className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider">
            Revenue Gen.
          </p>
          <p className="text-2xl font-extrabold text-[#131b2e] leading-none mt-1">
            $12.4k
          </p>
        </div>
      </div>
    </div>
  );
};
