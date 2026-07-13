import React from "react";
import {
  MdInventory,
  MdTrendingUp,
  MdWarning,
  MdAttachMoney,
} from "react-icons/md";
import { useProducts } from "../hooks/useProducts";

export const ProductsBentoSummary: React.FC = () => {
  const { data: dbProducts } = useProducts();

  // Collaborate dynamic backend metrics with fallback data
  const totalProducts = dbProducts && dbProducts.length > 0 ? dbProducts.length : 1284;

  // Low stock calculation (between 1 and 10 items)
  const lowStockCount = dbProducts && dbProducts.length > 0
    ? dbProducts.filter(p => p.stock > 0 && p.stock <= 10).length
    : 14;

  // Total value calculation (sum of price * stock)
  const totalValue = dbProducts && dbProducts.length > 0
    ? dbProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)
    : 42800;

  const displayValue = totalValue >= 1000
    ? `$${(totalValue / 1000).toFixed(1)}k`
    : `$${totalValue.toFixed(2)}`;

  // Top category calculator
  let topCategory = "Toddler Boy";
  if (dbProducts && dbProducts.length > 0) {
    const categoryCounts: Record<string, number> = {};
    dbProducts.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    let maxCount = 0;
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });
  }

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Products */}
      <div className="glass-card p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-[#b31f56]/10 text-[#b31f56] rounded-2xl flex items-center justify-center shrink-0">
          <MdInventory className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60">
            Total Products
          </p>
          <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
            {totalProducts.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Top Category */}
      <div className="glass-card p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-[#785a00]/10 text-[#785a00] rounded-2xl flex items-center justify-center shrink-0">
          <MdTrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60">
            Top Category
          </p>
          <h3 className="text-lg font-bold text-[#131b2e] leading-snug truncate max-w-[140px]">
            {topCategory}
          </h3>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="glass-card p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-2xl flex items-center justify-center shrink-0">
          <MdWarning className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60">
            Low Stock Alert
          </p>
          <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
            {lowStockCount} Items
          </h3>
        </div>
      </div>

      {/* Inventory Value */}
      <div className="glass-card p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-[#006780]/10 text-[#006780] rounded-2xl flex items-center justify-center shrink-0">
          <MdAttachMoney className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#584045]/60">
            Inventory Value
          </p>
          <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
            {displayValue}
          </h3>
        </div>
      </div>
    </div>
  );
};
