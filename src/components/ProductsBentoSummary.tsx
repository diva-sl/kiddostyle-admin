import React from "react";
import {
  MdInventory,
  MdTrendingUp,
  MdWarning,
  MdAttachMoney,
} from "react-icons/md";

export const ProductsBentoSummary: React.FC = () => {
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
            1,284
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
          <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
            Toddler Boy
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
            14 Items
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
            $42.8k
          </h3>
        </div>
      </div>
    </div>
  );
};
