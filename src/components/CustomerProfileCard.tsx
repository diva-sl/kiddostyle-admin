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
import type { Customer } from "../services/customerService";

interface CustomerProfileCardProps {
  customer: Customer;
}

export const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({
  customer,
}) => {
  const isVip = customer.totalSpent > 1000;
  const initials = customer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Summary Profile Detail Info */}
      <div className="bg-white rounded-3xl p-8 border border-[#dfbec4]/30 shadow-sm text-center relative overflow-hidden select-none">
        {/* VIP badge top right */}
        {isVip && (
          <div className="absolute top-6 right-6">
            <span className="bg-[#ffd167] text-[#765900] px-4 py-1 rounded-full font-bold text-[10px] flex items-center gap-1">
              <MdStar className="w-3.5 h-3.5" /> VIP Member
            </span>
          </div>
        )}

        {/* Profile Avatar verified status */}
        <div className="relative inline-block mb-6 mt-4">
          {customer.avatar ? (
            <img
              className="w-32 h-32 rounded-full border-4 border-[#ffd9df] p-1 object-cover bg-white"
              src={customer.avatar}
              alt={customer.name}
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-[#ffd9df] flex items-center justify-center font-display text-4xl font-extrabold text-[#765900] bg-[#ffd167]/30 select-none">
              {initials}
            </div>
          )}
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-[#dfbec4]/10">
            <MdVerified className="text-[#b31f56] w-5 h-5" />
          </div>
        </div>

        <h3 className="font-display text-lg font-extrabold text-[#131b2e] mb-1">
          {customer.name}
        </h3>
        <p className="text-xs font-bold text-[#584045]/60 mb-6">
          Status:{" "}
          <span className="uppercase text-[#b31f56]">{customer.status}</span>
        </p>

        {/* LTV & Orders metrics */}
        <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-[#dfbec4]/20 select-none">
          <div>
            <p className="text-[9px] font-extrabold text-[#584045]/60 uppercase tracking-widest mb-1">
              Total Orders
            </p>
            <p className="text-2xl font-extrabold text-[#b31f56]">
              {customer.notes?.length || 14}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-extrabold text-[#584045]/60 uppercase tracking-widest mb-1">
              Lifetime Value
            </p>
            <p className="text-2xl font-extrabold text-[#785a00]">
              ${customer.totalSpent.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Contact info list */}
        <div className="pt-6 space-y-4 text-left text-xs font-semibold text-[#131b2e]">
          <div className="flex items-center gap-3">
            <MdAlternateEmail className="text-[#ff5c8d] w-4.5 h-4.5 shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MdSmartphone className="text-[#ff5c8d] w-4.5 h-4.5 shrink-0" />
            <span>{customer.phone || "No phone registered"}</span>
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
