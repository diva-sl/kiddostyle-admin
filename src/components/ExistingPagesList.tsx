import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdVisibility,
  MdEdit,
  MdDelete,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import {
  useLandingPages,
  useDeleteLandingPage,
} from "../hooks/useLandingPages";

const fallbackLandingPagesList = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
  const navigate = useNavigate();
  const { data: pages = [], isLoading } = useLandingPages();
  const deleteMutation = useDeleteLandingPage();

  // Pagination states
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this marketing page layout permanently?",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Map to unified layout representation
  const displayList =
    pages.length > 0
      ? pages.map((p) => ({
          id: p.id || "",
          title: p.title,
          slug: p.slug,
          status: p.active ? "published" : "draft",
          statusText: p.active ? "Published" : "Draft",
          statusColor: p.active ? "bg-[#785a00]" : "bg-[#584045]/60",
          statusBg: p.active
            ? "bg-[#ffd167]/30 text-[#765900]"
            : "bg-[#f2f3ff]/60 text-[#584045]/80",
          lastEdited: p.createdAt
            ? new Date(p.createdAt).toLocaleDateString()
            : "Just now",
          analyticsActive: p.active,
        }))
      : fallbackLandingPagesList;

  // Pagination Bounds
  const totalItems = displayList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = displayList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none bg-white border border-[#dfbec4]/30 rounded-3xl">
        Loading existing destinations...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden h-full">
      {/* Title & Filters */}
      <div className="px-6 py-5 border-b border-[#dfbec4]/20 flex items-center justify-between">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          Existing Pages
        </h4>
        <div className="flex gap-2 text-xs font-bold text-[#584045]/75">
          Showing {paginatedList.length} items
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
            {paginatedList.map((page) => (
              <tr
                key={page.id}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
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

                <td className="px-6 py-4 text-[#584045]/80">
                  {page.lastEdited}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/landing-pages/edit/${page.id}`)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2f3ff] text-[#584045] transition-all cursor-pointer border-none bg-none"
                      title="Preview details"
                    >
                      <MdVisibility className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => navigate(`/landing-pages/edit/${page.id}`)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#b31f56] hover:bg-[#ff5c8d]/10 transition-all cursor-pointer border-none bg-none"
                      title="Edit layout details"
                    >
                      <MdEdit className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#ba1a1a] hover:bg-[#ffdad6] transition-all cursor-pointer border-none bg-none"
                      title="Delete Page"
                    >
                      <MdDelete className="w-4.5 h-4.5" />
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
        <span>
          Showing {currentPage} of {totalPages} pages
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#dfbec4]/25 hover:bg-[#faf8ff] text-[#584045] disabled:opacity-30 cursor-pointer"
          >
            <MdChevronLeft className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#dfbec4]/25 hover:bg-[#faf8ff] text-[#584045] disabled:opacity-30 cursor-pointer"
          >
            <MdChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
