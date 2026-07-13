import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { BannerKpiGrid } from "../components/BannerKpiGrid";
import { ActivePromotions } from "../components/ActivePromotions";
import { UpcomingExpiredTabs } from "../components/UpcomingExpiredTabs";

export const BannerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Banner Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Schedule and optimize your site-wide promotional assets.
          </p>
        </div>

        <button
          onClick={() => navigate("/banner/new")}
          className="bg-[#b31f56] text-white px-6 py-3 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-lg hover:shadow-[#b31f56]/20 transition-all active:scale-[0.98] cursor-pointer border-none"
        >
          <MdAdd className="w-4.5 h-4.5" />
          Add New Banner
        </button>
      </section>

      {/* Summary Bento metrics */}
      <BannerKpiGrid />

      {/* Active Promotion Campaigns sidecards */}
      <ActivePromotions />

      {/* Tab schedulers details upcoming/expired list */}
      <UpcomingExpiredTabs />
    </div>
  );
};

export default BannerPage;
