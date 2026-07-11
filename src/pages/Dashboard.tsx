import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { DashboardHeader } from "../components/DashboardHeader";
import { AnalyticsMetrics } from "../components/AnalyticsMetrics";
import { SalesTrendChart } from "../components/SalesTrendChart";
import { RecentActivity } from "../components/RecentActivity";
import { TopProducts } from "../components/TopProducts";
import { InventoryStatus } from "../components/InventoryStatus";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome greeting */}
      <DashboardHeader />

      {/* Bento Metric Boxes */}
      <AnalyticsMetrics />

      {/* Sales trends and recent logs */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <SalesTrendChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <RecentActivity />
        </div>
      </div>

      {/* Top ranks and inventory health details */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <TopProducts />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <InventoryStatus />
        </div>
      </div>

      {/* Sticky Mobile FAB */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <button
          onClick={() => navigate("/products/new")}
          className="w-16 h-16 bg-[#b31f56] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
