import React from "react";
import { MdLightbulb, MdTaskAlt, MdArrowForward } from "react-icons/md";

export const CategoryInsights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Category sales performance */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          Category Performance
        </h4>

        <div className="space-y-5">
          {/* Performance Item 1 */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
              <span className="text-[#131b2e]">Girls Wear</span>
              <span className="text-[#b31f56]">85% growth</span>
            </div>
            <div className="w-full bg-[#f2f3ff] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#b31f56] h-full rounded-full"
                style={{ width: "85%" }}
              />
            </div>
          </div>

          {/* Performance Item 2 */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
              <span className="text-[#131b2e]">Accessories</span>
              <span className="text-[#785a00]">62% growth</span>
            </div>
            <div className="w-full bg-[#f2f3ff] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#ffd167] h-full rounded-full"
                style={{ width: "62%" }}
              />
            </div>
          </div>

          {/* Performance Item 3 */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
              <span className="text-[#131b2e]">Winter Collection</span>
              <span className="text-[#006780]">48% growth</span>
            </div>
            <div className="w-full bg-[#f2f3ff] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#00a4ca] h-full rounded-full"
                style={{ width: "48%" }}
              />
            </div>
          </div>
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
            SEO Quick Tips
          </h4>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Optimize your category pages for better search visibility.
          </p>
        </div>

        <ul className="space-y-3 my-5 text-xs font-bold text-[#131b2e] leading-relaxed">
          <li className="flex gap-2 items-start">
            <MdTaskAlt className="text-[#b31f56] w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>
              Use descriptive H1 titles with keywords like "Toddler Dresses".
            </span>
          </li>
          <li className="flex gap-2 items-start">
            <MdTaskAlt className="text-[#b31f56] w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>
              Add meta-descriptions (150-160 chars) for each category.
            </span>
          </li>
          <li className="flex gap-2 items-start">
            <MdTaskAlt className="text-[#b31f56] w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>Internal link your main categories from the homepage.</span>
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
