import React from "react";
import {
  MdFilterList,
  MdSort,
  MdVisibility,
  MdEdit,
  MdBarChart,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface LandingPageItem {
  title: string;
  slug: string;
  status: "published" | "draft" | "scheduled";
  statusText: string;
  statusColor: string;
  statusBg: string;
  lastEdited: string;
  analyticsActive: boolean;
}

const landingPagesList: LandingPageItem[] = [
  {
    title: "Summer Sale 2024",
    slug: "/promos/summer-sale-2024",
    status: "published",
    statusText: "Published",
    statusColor: "bg-[#785a00]",
    statusBg: "bg-[#ffd167]/30 text-[#765900]",
    lastEdited: "Oct 24, 2023",
    analyticsActive: true,
  },
  {
    title: "Back to School",
    slug: "/collections/back-to-school",
    status: "draft",
    statusText: "Draft",
    statusColor: "bg-[#584045]/60",
    statusBg: "bg-[#f2f3ff]/60 text-[#584045]/80",
    lastEdited: "Today, 10:45 AM",
    analyticsActive: false,
  },
  {
    title: "Newborn Essentials",
    slug: "/newborn-essentials",
    status: "published",
    statusText: "Published",
    statusColor: "bg-[#785a00]",
    statusBg: "bg-[#ffd167]/30 text-[#765900]",
    lastEdited: "Sep 12, 2023",
    analyticsActive: true,
  },
  {
    title: "Winter Outerwear",
    slug: "/winter-collection",
    status: "scheduled",
    statusText: "Scheduled",
    statusColor: "bg-[#ba1a1a]",
    statusBg: "bg-[#ffdad6] text-[#ba1a1a]",
    lastEdited: "Oct 20, 2023",
    analyticsActive: false,
  },
];

export const ExistingPagesList: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden h-full">
      {/* Title & Filters */}
      <div className="px-6 py-5 border-b border-[#dfbec4]/20 flex items-center justify-between">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          Existing Pages
        </h4>

        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-[#faf8ff] rounded-lg text-[#584045]/70 transition-colors cursor-pointer">
            <MdFilterList className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-[#faf8ff] rounded-lg text-[#584045]/70 transition-colors cursor-pointer">
            <MdSort className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Pages table grids */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/40 text-xs font-bold text-[#584045]/70 border-b border-[#dfbec4]/20 select-none">
              <th className="px-6 py-4">Page Title &amp; Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Edited</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {landingPagesList.map((page, idx) => (
              <tr key={idx} className="hover:bg-[#faf8ff] transition-colors">
                {/* Title Slug */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#131b2e]">
                      {page.title}
                    </span>
                    <span className="text-[10px] text-[#584045]/50 font-mono mt-0.5">
                      {page.slug}
                    </span>
                  </div>
                </td>

                {/* Status Pill */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${page.statusBg}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${page.statusColor}`}
                    />
                    {page.statusText}
                  </span>
                </td>

                {/* Last Edited Date */}
                <td className="px-6 py-4 text-[#584045]/80">
                  {page.lastEdited}
                </td>

                {/* Action buttons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2f3ff] text-[#584045] transition-all cursor-pointer"
                      title="Preview"
                    >
                      <MdVisibility className="w-4.5 h-4.5" />
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#b31f56] hover:bg-[#ff5c8d]/10 transition-all cursor-pointer"
                      title="Edit"
                    >
                      <MdEdit className="w-4.5 h-4.5" />
                    </button>
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        page.analyticsActive
                          ? "text-[#006780] hover:bg-[#00a4ca]/10 cursor-pointer"
                          : "text-[#584045]/30 cursor-not-allowed"
                      }`}
                      title="Analytics"
                      disabled={!page.analyticsActive}
                    >
                      <MdBarChart className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-[#f2f3ff]/10 border-t border-[#dfbec4]/20 flex items-center justify-between text-xs font-bold text-[#584045]/70 select-none">
        <span>Showing 4 of 24 pages</span>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#dfbec4]/25 hover:bg-[#faf8ff] text-[#584045] cursor-pointer">
            <MdChevronLeft className="w-4.5 h-4.5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#dfbec4]/25 hover:bg-[#faf8ff] text-[#584045] cursor-pointer">
            <MdChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
