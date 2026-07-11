import React from "react";
import { Banknote, Package, UserPlus, AlertTriangle } from "lucide-react";

export const AnalyticsMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Sales */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#dfbec4]/30 flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-[#b31f56]/10 text-[#b31f56]">
            <Banknote className="w-5 h-5" />
          </div>
          <span className="text-[#785a00] font-bold text-xs">+12.5%</span>
        </div>
        <div>
          <p className="text-xs font-semibold mb-1 text-[#584045]/80">
            Total Sales
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-none">
            $24,500.00
          </h3>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#dfbec4]/30 flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-[#00a4ca]/10 text-[#006780]">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[#006780] font-bold text-xs">48 New</span>
        </div>
        <div>
          <p className="text-xs font-semibold mb-1 text-[#584045]/80">
            Active Orders
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-none">
            156
          </h3>
        </div>
      </div>

      {/* New Customers */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#dfbec4]/30 flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-[#ffd167]/10 text-[#785a00]">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="text-[#785a00] font-bold text-xs">+8%</span>
        </div>
        <div>
          <p className="text-xs font-semibold mb-1 text-[#584045]/80">
            New Customers
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-none">
            1,240
          </h3>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-[#ffdad6]/20 p-6 rounded-3xl shadow-sm border border-[#ba1a1a]/10 flex flex-col justify-between hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-[#ba1a1a]/10 text-[#ba1a1a]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="text-[#ba1a1a] font-bold text-xs">Urgent</span>
        </div>
        <div>
          <p className="text-xs font-semibold mb-1 text-[#ba1a1a]">
            Low Stock Alerts
          </p>
          <h3 className="text-xl font-extrabold text-[#131b2e] leading-none">
            12 Items
          </h3>
        </div>
      </div>
    </div>
  );
};
