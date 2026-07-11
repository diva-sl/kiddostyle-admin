import React from "react";
import { useNavigate } from "react-router-dom";
import { MdChevronRight, MdAdd } from "react-icons/md";
import { CouponsKpiGrid } from "../components/CouponsKpiGrid";
import { CouponsTable } from "../components/CouponsTable";
import { CampaignPerformance } from "../components/CampaignPerformance";

export const CouponsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumbs and Titles */}
      <section>
        <div className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold select-none mb-1.5">
          <span>Marketing</span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            Promotions &amp; Coupons
          </span>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e] mb-1">
          Coupon Management
        </h2>
        <p className="text-xs text-[#584045]/70 font-semibold">
          Manage and track your promotional campaign performance.
        </p>
      </section>

      {/* Bento analytics grids */}
      <CouponsKpiGrid />

      {/* Main Catalog coupons table */}
      <CouponsTable />

      {/* Redemption trends columns + smart recommendation widgets */}
      <CampaignPerformance />

      {/* Bottom Sticky Floating Action Button (FAB) */}
      <button
        onClick={() => navigate("/coupons/new")}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#b31f56] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group cursor-pointer"
      >
        <MdAdd className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        <span className="absolute right-20 px-4 py-2 bg-[#283044] text-white rounded-xl text-xs font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
          New Campaign
        </span>
      </button>
    </div>
  );
};
export default CouponsPage;
