import React from "react";
import {
  MdVisibility,
  MdArticle,
  MdTimer,
  MdMail,
  MdTrendingUp,
  MdCheckCircle,
  MdGroupAdd,
} from "react-icons/md";

export const BlogKpiGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* KPI 1: Total Views */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
            Total Views
          </span>
          <div className="p-2.5 bg-[#ff5c8d]/10 rounded-xl text-[#b31f56]">
            <MdVisibility className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none mb-2">
            45k
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-[#006780]">
            <MdTrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Active Posts */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
            Active Posts
          </span>
          <div className="p-2.5 bg-[#ffd167]/20 rounded-xl text-[#765900]">
            <MdArticle className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none mb-2">
            32
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-[#584045]/60">
            <MdCheckCircle className="w-4 h-4 text-[#785a00]" />
            <span>Live on website</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Avg Read Time */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
            Avg. Read Time
          </span>
          <div className="p-2.5 bg-[#00a4ca]/10 rounded-xl text-[#006780]">
            <MdTimer className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none mb-2">
            4m
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-[#006780]">
            <MdTrendingUp className="w-4 h-4" />
            <span>High engagement</span>
          </div>
        </div>
      </div>

      {/* KPI 4: Subscribers */}
      <div className="glass-card bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#584045]/70 uppercase tracking-wider">
            Subscribers
          </span>
          <div className="p-2.5 bg-[#e2e7ff] rounded-xl text-[#b31f56]">
            <MdMail className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-[#131b2e] leading-none mb-2">
            12.4k
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-[#b31f56]">
            <MdGroupAdd className="w-4 h-4" />
            <span>+200 this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};
