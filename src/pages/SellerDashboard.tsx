import React, { useState, useEffect } from "react";
import { MdCalendarToday } from "react-icons/md";
import { SellerStatsGrid } from "../components/SellerStatsGrid";
import { SellerRevenueStock } from "../components/SellerRevenueStock";
import { SellerOrders } from "../components/SellerOrders";

export const SellerDashboardPage: React.FC = () => {
  const [sellerName, setSellerName] = useState("Chloe");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.name) {
          setSellerName(user.name.split(" ")[0]);
        }
      } catch (e) {}
    }
  }, []);

  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Welcome back, {sellerName}!
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Here's what's happening with your marketplace store catalog today.
          </p>
        </div>

        <div className="flex bg-[#f2f3ff] px-4 py-2.5 rounded-xl border border-[#dfbec4]/30 shadow-sm items-center gap-2 text-xs font-bold text-[#584045]">
          <MdCalendarToday className="w-4.5 h-4.5 text-[#b31f56]" />
          <span>Today &mdash; {todayStr}</span>
        </div>
      </section>

      {/* Summary KPI Stats cards */}
      <SellerStatsGrid />

      {/* Revenue columns chart & stock warning levels */}
      <SellerRevenueStock />

      {/* Recent marketplace customer orders list */}
      <SellerOrders />
    </div>
  );
};

export default SellerDashboardPage;
