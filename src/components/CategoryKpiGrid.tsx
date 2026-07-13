import React from "react";
import {
  MdCategory,
  MdCheckCircle,
  MdTrendingUp,
  MdInventory,
} from "react-icons/md";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

export const CategoryKpiGrid: React.FC = () => {
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();

  const totalCategories = categories.length;
  const activeCategories = categories.filter(
    (c) => c.status === "active",
  ).length;

  // Calculate empty categories (categories with 0 products matching)
  const emptyCategories = categories.filter((cat) => {
    const matchedCount = products.filter(
      (p) => p.category.toLowerCase() === cat.name.toLowerCase(),
    ).length;
    return matchedCount === 0;
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#ffd9df] rounded-xl text-[#b31f56]">
            <MdCategory className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-[#765900] bg-[#ffd167]/30 px-2 py-0.5 rounded-full">
            Live Database
          </span>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Total Categories
          </h4>
          <p className="text-3xl font-extrabold text-[#131b2e] leading-none">
            {totalCategories}
          </p>
        </div>
      </div>

      {/* Active Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#b7eaff] rounded-xl text-[#006780]">
            <MdCheckCircle className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Active Categories
          </h4>
          <p className="text-3xl font-extrabold text-[#131b2e] leading-none">
            {activeCategories}
          </p>
        </div>
      </div>

      {/* Top Category (Sales) */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#ffdf9b] rounded-xl text-[#785a00]">
            <MdTrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Top Category (Catalog)
          </h4>
          <p className="text-lg font-extrabold text-[#131b2e] leading-tight">
            Girls Wear
          </p>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-1">
            342 active items
          </p>
        </div>
      </div>

      {/* Empty Categories */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-[#ffdad6] rounded-xl text-[#ba1a1a]">
            <MdInventory className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="text-[#584045]/70 font-semibold text-xs mb-1">
            Empty Categories
          </h4>
          <p className="text-3xl font-extrabold text-[#131b2e] leading-none">
            {emptyCategories}
          </p>
        </div>
      </div>
    </div>
  );
};
