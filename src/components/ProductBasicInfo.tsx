import React from "react";
import { MdInfo } from "react-icons/md";

export const ProductBasicInfo: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <h3 className="font-display text-lg font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#dfbec4]/10 pb-3">
        <MdInfo className="text-[#b31f56] w-5 h-5 shrink-0" />
        Basic Information
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g. Organic Cotton Summer Onesie"
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe the material, fit, and style..."
            rows={4}
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
              SKU
            </label>
            <input
              type="text"
              placeholder="KDS-001"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
              Category
            </label>
            <select className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#584045] text-sm cursor-pointer">
              <option>Select Category</option>
              <option>Newborn</option>
              <option>Toddler</option>
              <option>Outdoor Wear</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
