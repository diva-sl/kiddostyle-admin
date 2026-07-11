import React from "react";
import { MdAdd, MdSpeed } from "react-icons/md";
import { LandingPerformanceStats } from "../components/LandingPerformanceStats";
import { ExistingPagesList } from "../components/ExistingPagesList";
import { SeoHealthAudit } from "../components/SeoHealthAudit";

export const LandingPagesPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Landing Pages
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Design, deploy, and analyze marketing destinations.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-[#b31f56] text-white px-6 py-3 rounded-full font-bold text-xs shadow-lg hover:bg-[#ffd9df] hover:text-[#b31f56] hover:shadow-[#b31f56]/20 transition-all active:scale-[0.98] cursor-pointer">
          <MdAdd className="w-5 h-5" />
          Create New Page
        </button>
      </section>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Stats and Listing Cards (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <LandingPerformanceStats />
          <ExistingPagesList />
        </div>

        {/* Right Side: SEO Audits Cards (col-span-4) */}
        <div className="lg:col-span-4">
          <SeoHealthAudit />
        </div>
      </div>

      {/* Floating Insights Dial Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 group flex items-center z-50">
        <span className="bg-[#131b2e] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold mr-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none select-none">
          Performance Insights
        </span>

        <button className="w-14 h-14 bg-[#ffd167] text-[#765900] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <MdSpeed className="w-7 h-7" />
        </button>
      </div>

      {/* Atmospheric Branding Footer */}
      <footer className="text-center pt-8 text-[10px] text-[#584045]/40 font-bold select-none border-t border-[#dfbec4]/10 mt-12 pb-4">
        © 2024 KiddoStyle Premium CMS Engine. All rights reserved.
      </footer>
    </div>
  );
};
export default LandingPagesPage;
