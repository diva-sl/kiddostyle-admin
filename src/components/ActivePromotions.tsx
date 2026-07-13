import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowForward,
  MdCalendarToday,
  MdLink,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { useBanners, useDeleteBanner } from "../hooks/useBanners";

const fallbackActivePromosList = [
  {
    id: "1",
    position: "Home Hero",
    title: "Summer Essentials 2024",
    subtitle: "May 01 - Aug 31",
    link: "/collection/summer",
    clicks: "12,402",
    ctr: "5.2%",
    revenue: "$4,210",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnfJKDNtjzZu7UX20vjwKzeuhrKdHUmoLNvOJU9E7Lr7NVGJJ6Q0Po18SEaXj2CYUFEfp5gfKCv_v3nKGdUhHHtqFHgz3CZXU0tYZIINikGVND8_fqEufFS0n4ha6wCDi5yfTnKVo7K0AyufkGaAkebllLrcfGT_n60LAhtRPdquBENb93k_R0sgAi4Bh-itFwRIRnnElJTs_tRe98doibTGi_Sw1DYU4ac8MzPumSJ4cIFsIf9iYlZc4GOfdgGQ2x78fWYgi8UzaG",
  },
  {
    id: "2",
    position: "Category Sidebar",
    title: "Eco-Friendly Toys Launch",
    subtitle: "Jun 15 - Jul 15",
    link: "/toys/eco",
    clicks: "8,115",
    ctr: "3.9%",
    revenue: "$2,850",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcL8eCVlhqJyjeCeGIlYln12KWVAIRmxA-j92oYUdSdia678cRoFQcQGedtWGIibwDj5t5p7DuUHCUjSm1gwNs90CUYRSqQpfEKb3RV1F9Z-uWs3xc6fKV_g7gY7kK6i8FlvrH13tC8J9-ybFHAG_vikmEuLZD1olwD4S_uiHwP15XMVrKiiMSubenbVqNmOs0k0EIi-tsgSkYEAMIiOvLwySNkr57B8qEcpHmhX4zqOHIJfGcE78-WS8H9yXlIjvwYvhqrOqd9NZe",
  },
];

export const ActivePromotions: React.FC = () => {
  const navigate = useNavigate();
  const { data: banners = [], isLoading } = useBanners();
  const deleteMutation = useDeleteBanner();

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this promotional banner permanently?",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Filter out only active banners, or map fallbacks
  const displayList =
    banners.length > 0
      ? banners
          .filter((b) => b.active)
          .map((b) => ({
            id: b.id,
            tag: `${b.position} Placement`,
            title: b.title,
            dateRange: "Active Campaign",
            path: b.link,
            clicks: "0",
            ctr: "0.0%",
            revenue: "$0",
            image:
              b.image ||
              "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=300&q=80",
          }))
      : fallbackActivePromosList.map((p) => ({
          id: p.id,
          tag: p.position,
          title: p.title,
          dateRange: p.subtitle,
          path: p.link,
          clicks: p.clicks,
          ctr: p.ctr,
          revenue: p.revenue,
          image: p.image,
        }));

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Loading active campaign promotions...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between select-none">
        <h2 className="font-display text-base font-extrabold text-[#131b2e]">
          Current Active Promotions ({displayList.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {displayList.map((promo) => (
          <div
            key={promo.id}
            className="glass-panel bg-white/70 rounded-2xl overflow-hidden flex flex-col sm:flex-row group border border-[#dfbec4]/30 hover:shadow-lg transition-all"
          >
            {/* Image banner preview */}
            <div className="relative w-full sm:w-52 h-48 sm:h-auto overflow-hidden shrink-0 bg-[#f2f3ff] select-none">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={promo.image}
                alt={promo.title}
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#b31f56] text-white text-[9px] font-extrabold rounded-md shadow-sm select-none">
                ACTIVE
              </div>
            </div>

            {/* Text description body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-bold text-[10px] uppercase tracking-wider text-[#b31f56]">
                      {promo.tag}
                    </p>
                    <h3 className="font-display text-base font-extrabold text-[#131b2e] leading-tight mt-1">
                      {promo.title}
                    </h3>
                  </div>

                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/banner/edit/${promo.id}`)}
                      className="p-1 hover:bg-[#f2f3ff] rounded-full text-[#584045]/60 hover:text-[#b31f56] transition-colors cursor-pointer border-none bg-none"
                      title="Edit Banner details"
                    >
                      <MdEdit className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id || "")}
                      className="p-1 hover:bg-[#ffdad6] rounded-full text-[#ba1a1a] transition-colors cursor-pointer border-none bg-none"
                      title="Delete Campaign"
                    >
                      <MdDelete className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 select-none">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#584045]/70">
                    <MdCalendarToday className="w-4 h-4 shrink-0 text-[#584045]/65" />
                    <span>{promo.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#584045]/70">
                    <MdLink className="w-4 h-4 shrink-0 text-[#584045]/65" />
                    <span className="truncate max-w-[140px]">{promo.path}</span>
                  </div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#dfbec4]/20 mt-6 select-none">
                <div>
                  <p className="text-[9px] text-[#584045]/50 uppercase font-extrabold">
                    Clicks
                  </p>
                  <p className="font-bold text-sm text-[#131b2e] mt-0.5">
                    {promo.clicks}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-[#584045]/50 uppercase font-extrabold">
                    CTR
                  </p>
                  <p className="font-bold text-sm text-[#b31f56] mt-0.5">
                    {promo.ctr}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-[#584045]/50 uppercase font-extrabold">
                    Revenue
                  </p>
                  <p className="font-bold text-sm text-[#131b2e] mt-0.5">
                    {promo.revenue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
