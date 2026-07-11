import React from "react";
import {
  MdStar,
  MdVerified,
  MdAlternateEmail,
  MdSmartphone,
  MdLocationOn,
  MdCheckroom,
  MdUmbrella,
  MdDirectionsWalk,
  MdSmartToy,
} from "react-icons/md";

export const CustomerProfileCard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Profile Detail Info */}
      <div className="bg-white rounded-3xl p-8 border border-[#dfbec4]/30 shadow-sm text-center relative overflow-hidden select-none">
        {/* VIP badge top right */}
        <div className="absolute top-6 right-6">
          <span className="bg-[#ffd167] text-[#765900] px-4 py-1 rounded-full font-bold text-[10px] flex items-center gap-1">
            <MdStar className="w-3.5 h-3.5" /> VIP Member
          </span>
        </div>

        {/* Profile Avatar verified status */}
        <div className="relative inline-block mb-6 mt-4">
          <img
            className="w-32 h-32 rounded-full border-4 border-[#ffd9df] p-1 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqtQJy-nVpAERk9w-zpWSQKEXS3pLh-0S-SgSc6KOAj9QxPfOEM6DytCHvPJPwWBiWnjD76pCcCRjILPLmHDXRu_xqVs4K-dfKJJIJaTpMiZDPoHmbVgBgCH1J0cckIOH0I4rtaK7Q8vEiu32fXZWrh-J1m8k9H6RfVBkeb8eBi9s53Ustrd3n987Bzzr3tLaZxweuw6x858EphgiCQlUONqUxkOxfTV2HKxdDBodtjrlVc-wxKU9XFVDqz3KqMAQLYzl4oy-pWkVQ"
            alt="Eleanor Mason"
          />
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-[#dfbec4]/10">
            <MdVerified className="text-[#b31f56] w-5 h-5" />
          </div>
        </div>

        <h3 className="font-display text-lg font-extrabold text-[#131b2e] mb-1">
          Eleanor Mason
        </h3>
        <p className="text-xs font-bold text-[#584045]/60 mb-6">
          Customer since Sept 2021
        </p>

        {/* LTV & Orders metrics */}
        <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-[#dfbec4]/20 select-none">
          <div>
            <p className="text-[9px] font-extrabold text-[#584045]/60 uppercase tracking-widest mb-1">
              Total Orders
            </p>
            <p className="text-2xl font-extrabold text-[#b31f56]">42</p>
          </div>
          <div>
            <p className="text-[9px] font-extrabold text-[#584045]/60 uppercase tracking-widest mb-1">
              Lifetime Value
            </p>
            <p className="text-2xl font-extrabold text-[#785a00]">$3,842</p>
          </div>
        </div>

        {/* Contact info list */}
        <div className="pt-6 space-y-4 text-left text-xs font-semibold text-[#131b2e]">
          <div className="flex items-center gap-3">
            <MdAlternateEmail className="text-[#ff5c8d] w-4.5 h-4.5 shrink-0" />
            <span>eleanor.m@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MdSmartphone className="text-[#ff5c8d] w-4.5 h-4.5 shrink-0" />
            <span>+1 (555) 012-3456</span>
          </div>
          <div className="flex items-center gap-3">
            <MdLocationOn className="text-[#ff5c8d] w-4.5 h-4.5 shrink-0" />
            <span>Brooklyn, New York, USA</span>
          </div>
        </div>
      </div>

      {/* Categories Badge card */}
      <div className="bg-white rounded-3xl p-8 border border-[#dfbec4]/30 shadow-sm select-none">
        <h3 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Top Categories
        </h3>
        <div className="flex flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-wider">
          <span className="bg-[#ffd9df] text-[#8f003f] px-3.5 py-2 rounded-full flex items-center gap-1.5">
            <MdCheckroom className="w-4 h-4" /> Organic Basics
          </span>
          <span className="bg-[#b7eaff] text-[#004e61] px-3.5 py-2 rounded-full flex items-center gap-1.5">
            <MdUmbrella className="w-4 h-4" /> Rainwear
          </span>
          <span className="bg-[#ffdf9b] text-[#5b4300] px-3.5 py-2 rounded-full flex items-center gap-1.5">
            <MdDirectionsWalk className="w-4 h-4" /> Soft Shoes
          </span>
          <span className="bg-[#e2e7ff] text-[#131b2e] px-3.5 py-2 rounded-full flex items-center gap-1.5">
            <MdSmartToy className="w-4 h-4" /> Wooden Toys
          </span>
        </div>
      </div>
    </div>
  );
};
