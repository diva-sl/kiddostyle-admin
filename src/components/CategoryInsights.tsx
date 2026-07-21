import React from "react";
import { MdLightbulb, MdTaskAlt, MdArrowForward } from "react-icons/md";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

interface PerformanceItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export const CategoryInsights: React.FC = () => {
  const { data: rawCategories } = useCategories();
  const { data: rawProducts } = useProducts();

  const categories = Array.isArray(rawCategories) ? rawCategories : [];
  const products = Array.isArray(rawProducts) ? rawProducts : [];

  const totalProducts = products.length || 1;

  // Build live category stats, fallback to static mock parameters if empty
  let performanceList: PerformanceItem[] = [];

  if (categories.length > 0) {
    const list = categories.map((cat) => {
      const count = products.filter(
        (p) => (p?.category || "").toLowerCase() === (cat?.name || "").toLowerCase(),
      ).length;
      const percentage = Math.round((count / totalProducts) * 100);
      return {
        name: cat.name,
        count,
        percentage,
        color: cat.name.toLowerCase().includes("girl")
          ? "bg-[#b31f56]"
          : cat.name.toLowerCase().includes("boy")
            ? "bg-[#ffd167]"
            : "bg-[#00a4ca]",
      };
    });
    // Sort by count to show top performing categories first
    performanceList = list.sort((a, b) => b.count - a.count).slice(0, 3);
  }

  // Fallback visual definitions if database has no items
  if (performanceList.length === 0) {
    performanceList = [
      { name: "Girls Wear", count: 342, percentage: 85, color: "bg-[#b31f56]" },
      {
        name: "Accessories",
        count: 249,
        percentage: 62,
        color: "bg-[#ffd167]",
      },
      {
        name: "Winter Collection",
        count: 180,
        percentage: 48,
        color: "bg-[#00a4ca]",
      },
    ];
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Category sales performance */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          Category Catalog Distribution
        </h4>

        <div className="space-y-5">
          {performanceList.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
                <span className="text-[#131b2e]">{item.name}</span>
                <span className="text-[#584045]/85">
                  {item.percentage}% share ({item.count} items)
                </span>
              </div>
              <div className="w-full bg-[#f2f3ff] rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Quick Tips glass-card */}
      <div className="glass-card bg-white/70 p-6 rounded-3xl border border-[#dfbec4]/30 relative overflow-hidden group flex flex-col justify-between shadow-sm min-h-[260px]">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ff5c8d]/10 rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

        <div>
          <div className="w-12 h-12 bg-[#ffdf9b] rounded-2xl flex items-center justify-center text-[#785a00] mb-4 select-none">
            <MdLightbulb className="w-6 h-6" />
          </div>
          <h4 className="font-display text-base font-extrabold text-[#131b2e]">
            SEO Checklist Quick Tips
          </h4>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Optimize your category landing index for search engine rankings.
          </p>
        </div>

        <ul className="space-y-3.5 my-5 text-xs font-bold text-[#131b2e] leading-relaxed">
          <li className="flex gap-2.5 items-start">
            <MdTaskAlt className="text-[#b31f56] w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>
              Write descriptive descriptive keywords like{" "}
              <strong>"Infant Rompers"</strong> inside H1 headers.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <MdTaskAlt className="text-[#b31f56] w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>
              Keep custom meta-descriptions between 150-160 characters for high
              click-through rates.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <MdTaskAlt className="text-[#b31f56] w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>
              Use Gated Sub-categories internally to distribute PageRank catalog
              power.
            </span>
          </li>
        </ul>

        <button className="text-[#b31f56] font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all cursor-pointer select-none">
          View full SEO Guide
          <MdArrowForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
