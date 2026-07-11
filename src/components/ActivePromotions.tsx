import React from "react";
import {
  MdArrowForward,
  MdCalendarToday,
  MdLink,
  MdMoreVert,
} from "react-icons/md";

interface PromotionCard {
  tag: string;
  tagColor: string;
  title: string;
  dateRange: string;
  path: string;
  clicks: string;
  ctr: string;
  revenue: string;
  image: string;
}

const activePromosList: PromotionCard[] = [
  {
    tag: "Home Hero",
    tagColor: "text-[#b31f56]",
    title: "Summer Essentials 2024",
    dateRange: "May 01 - Aug 31",
    path: "/collection/summer",
    clicks: "12,402",
    ctr: "5.2%",
    revenue: "$4,210",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnfJKDNtjzZu7UX20vjwKzeuhrKdHUmoLNvOJU9E7Lr7NVGJJ6Q0Po18SEaXj2CYUFEfp5gfKCv_v3nKGdUhHHtqFHgz3CZXU0tYZIINikGVND8_fqEufFS0n4ha6wCDi5yfTnKVo7K0AyufkGaAkebllLrcfGT_n60LAhtRPdquBENb93k_R0sgAi4Bh-itFwRIRnnElJTs_tRe98doibTGi_Sw1DYU4ac8MzPumSJ4cIFsIf9iYlZc4GOfdgGQ2x78fWYgi8UzaG",
  },
  {
    tag: "Category Sidebar",
    tagColor: "text-[#006780]",
    title: "Eco-Friendly Toys Launch",
    dateRange: "Jun 15 - Jul 15",
    path: "/toys/eco",
    clicks: "8,115",
    ctr: "3.9%",
    revenue: "$2,850",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcL8eCVlhqJyjeCeGIlYln12KWVAIRmxA-j92oYUdSdia678cRoFQcQGedtWGIibwDj5t5p7DuUHCUjSm1gwNs90CUYRSqQpfEKb3RV1F9Z-uWs3xc6fKV_g7gY7kK6i8FlvrH13tC8J9-ybFHAG_vikmEuLZD1olwD4S_uiHwP15XMVrKiiMSubenbVqNmOs0k0EIi-tsgSkYEAMIiOvLwySNkr57B8qEcpHmhX4zqOHIJfGcE78-WS8H9yXlIjvwYvhqrOqd9NZe",
  },
];

export const ActivePromotions: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between select-none">
        <h2 className="font-display text-base font-extrabold text-[#131b2e]">
          Current Active Promotions
        </h2>
        <button className="text-[#b31f56] font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer">
          View Scheduler
          <MdArrowForward className="w-4 h-4" />
        </button>
      </div>

      {/* Promotions layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {activePromosList.map((promo, idx) => (
          <div
            key={idx}
            className="glass-panel bg-white/70 rounded-2xl overflow-hidden flex flex-col sm:flex-row group border border-[#dfbec4]/30 hover:shadow-lg transition-all"
          >
            {/* Banner Left Image side */}
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

            {/* Banner Right Text Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p
                      className={`font-bold text-[10px] uppercase tracking-wider ${promo.tagColor}`}
                    >
                      {promo.tag}
                    </p>
                    <h3 className="font-display text-base font-extrabold text-[#131b2e] leading-tight mt-1">
                      {promo.title}
                    </h3>
                  </div>

                  <button className="p-1 hover:bg-[#f2f3ff] rounded-full text-[#584045]/60 transition-colors cursor-pointer select-none">
                    <MdMoreVert className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 select-none">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#584045]/70">
                    <MdCalendarToday className="w-4 h-4 shrink-0 text-[#584045]/65" />
                    <span>{promo.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#584045]/70">
                    <MdLink className="w-4 h-4 shrink-0 text-[#584045]/65" />
                    <span>{promo.path}</span>
                  </div>
                </div>
              </div>

              {/* Lower Level Stats */}
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
