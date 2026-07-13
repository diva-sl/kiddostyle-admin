import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEvent, MdEdit, MdDelete } from "react-icons/md";
import { useBanners, useDeleteBanner } from "../hooks/useBanners";

interface CampaignCard {
  id: string;
  title: string;
  subtext: string;
  image: string;
}

const fallbackUpcomingCampaigns: CampaignCard[] = [
  {
    id: "3",
    title: "Back to School 2024",
    subtext: "Starts in 12 days",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Dbncbk_WMBvrVf525PZj_OsHkNNRyU6YRxFRv7u8dVn1-3J7qUHW1Ad8LlPqGFDYH8m84cD3OlAFAEqYVJqtm_HJ7jKpxRlBbaeMPtBuVMWs9Jj_RlM_Wxpmf5g_C7O7dBdC2234V_aSnqqZTdwuQpr9OopVzLR1cfm_b_pZgmnfcOYPwXjnK0MrwHDxoGegPRzrAXiWtkjdqj6w0eX6SQFE5u3Gg-Ii0P9FagNHKd7JpVWzQBNdcX7H8_ywXmxnUG1eQxI5Oucd",
  },
  {
    id: "4",
    title: "New Arrival: Baby Gifts",
    subtext: "Starts in 5 days",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXu-g0VoPXI66NXIcUoobLnbgN5raW1wauBiBNGmOpv6pFQ-FR7kcddkQaxTUYyAWwWv-kvfaUnzOYyocNeGadiHEqYSO3GX-UDo1SAjGDWurkAPIVdiZ4GW0ccTsIC6PFIC_9Np7IjHsDaVRMjir3qVdX1HcTPbgnXyZ3XT3sAjQsnoTclksyvScBnPX7t20k0HC8REo2KZ5KRmTw1sfsYyxxzFQH7ij3cbcGheeDCiiHwF7r9kTA7jXNmDusZ6xD5jxahaFtKGSgGR",
  },
];

export const UpcomingExpiredTabs: React.FC = () => {
  const navigate = useNavigate();
  const { data: banners = [] } = useBanners();
  const deleteMutation = useDeleteBanner();

  const [activeTab, setActiveTab] = useState<"upcoming" | "expired">(
    "upcoming",
  );

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this draft/paused banner request?",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Map paused draft/inactive banners to upcoming lists
  const displayList =
    banners.length > 0
      ? banners
          .filter((b) => !b.active)
          .map((b) => ({
            id: b.id || "",
            title: b.title,
            subtext: `Paused / Position: ${b.position}`,
            image:
              b.image ||
              "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
          }))
      : fallbackUpcomingCampaigns;

  return (
    <div className="space-y-6">
      {/* Navigation Headers Tabs */}
      <div className="flex items-center gap-6 border-b border-[#dfbec4]/30 select-none">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-3 px-1 font-bold text-xs transition-all cursor-pointer border-none bg-none ${
            activeTab === "upcoming"
              ? "text-[#b31f56] border-b-2 border-b-[#b31f56]"
              : "text-[#584045]/70 hover:text-[#131b2e]"
          }`}
        >
          Draft &amp; Paused Campaigns ({displayList.length})
        </button>
        <button
          onClick={() => setActiveTab("expired")}
          className={`pb-3 px-1 font-bold text-xs transition-all cursor-pointer border-none bg-none ${
            activeTab === "expired"
              ? "text-[#b31f56] border-b-2 border-b-[#b31f56]"
              : "text-[#584045]/70 hover:text-[#131b2e]"
          }`}
        >
          Expired Archives (28)
        </button>
      </div>

      {/* Campaign Cards layout Grid */}
      {activeTab === "upcoming" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((camp) => (
            <div
              key={camp.id}
              className="glass-panel bg-white/70 rounded-2xl p-4 flex gap-4 items-center border border-[#dfbec4]/30 border-l-4 border-l-[#ffd167] shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f2f3ff] border border-[#dfbec4]/20 select-none">
                <img
                  className="w-full h-full object-cover"
                  src={camp.image}
                  alt={camp.title}
                />
              </div>

              <div className="flex-grow min-w-0 select-none">
                <h4 className="font-display text-xs font-extrabold text-[#131b2e] truncate">
                  {camp.title}
                </h4>
                <p className="text-[10px] text-[#584045]/70 font-bold flex items-center gap-1 mt-1">
                  <MdEvent className="w-3.5 h-3.5 text-[#584045]/60" />
                  {camp.subtext}
                </p>
              </div>

              <div className="flex flex-col gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => navigate(`/banner/edit/${camp.id}`)}
                  className="w-7 h-7 rounded-full hover:bg-[#faf8ff] text-[#584045] flex items-center justify-center transition-colors cursor-pointer border-none bg-none"
                  title="Edit details"
                >
                  <MdEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(camp.id)}
                  className="w-7 h-7 rounded-full hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center transition-colors cursor-pointer border-none bg-none"
                  title="Delete post permanently"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 font-bold text-xs text-[#584045]/50 select-none border border-dashed border-[#dfbec4]/40 rounded-3xl bg-white/20">
          Expired archive campaigns are listed here.
        </div>
      )}
    </div>
  );
};
