import React from "react";
import { MdPayments, MdShoppingBag, MdInventory, MdStar } from "react-icons/md";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";

export const SellerStatsGrid: React.FC = () => {
  const { data: orders = [] } = useOrders();
  const { data: products = [] } = useProducts();

  // Calculate Today's Sales
  const totalSales =
    orders.length > 0
      ? orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
      : 1420.5;

  // Calculate Pending Orders
  const pendingOrdersCount =
    orders.length > 0
      ? orders.filter((o) => o.status === "pending").length
      : 24;

  // Calculate Low Stock Count (stock <= 5)
  const lowStockCount =
    products.length > 0
      ? products.filter((p) => (p.stock || 0) <= 5).length
      : 8;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Today's Sales */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd167]/30 text-[#765900] flex items-center justify-center">
            <MdPayments className="w-6 h-6" />
          </div>
          <span className="text-[#006780] font-bold text-[10px] bg-[#b7eaff] px-2.5 py-0.5 rounded-full">
            +12.5%
          </span>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Total Store Sales
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">
          $
          {totalSales.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h3>
      </div>

      {/* Pending Orders */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd9df] text-[#b31f56] flex items-center justify-center">
            <MdShoppingBag className="w-6 h-6" />
          </div>
          <span className="bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Urgent
          </span>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Pending Orders
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">
          {pendingOrdersCount}
        </h3>
      </div>

      {/* Low Stock */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] text-[#b31f56] flex items-center justify-center">
            <MdInventory className="w-6 h-6" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Low Stock Alerts
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">
          {lowStockCount} items
        </h3>
      </div>

      {/* Avg. Rating */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdf9b] text-[#785a00] flex items-center justify-center">
            <MdStar className="w-6 h-6" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-[#584045]/60 mb-1 uppercase tracking-wider">
          Avg. Rating
        </p>
        <h3 className="text-2xl font-extrabold text-[#131b2e]">4.9/5.0</h3>
      </div>
    </div>
  );
};
