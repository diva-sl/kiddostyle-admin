import React from "react";
import { MdLayers, MdAdd, MdEdit } from "react-icons/md";

export const ProductVariants: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e] flex items-center gap-2">
          <MdLayers className="text-[#b31f56] w-5 h-5 shrink-0" />
          Product Variants
        </h3>
        <button className="bg-[#ffd167] text-[#765900] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer">
          <MdAdd className="w-4 h-4" />
          Add Variant
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#dfbec4]/30">
        <table className="w-full text-left">
          <thead className="bg-[#f2f3ff] text-xs font-bold text-[#584045]/80">
            <tr>
              <th className="p-3">Variant</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {/* Variant 1 */}
            <tr className="hover:bg-[#faf8ff] transition-colors">
              <td className="p-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#FFB6C1] border border-[#dfbec4]" />
                <span>Pink / 0-3M</span>
              </td>
              <td className="p-3 text-[#584045]/70">KDS-001-P-03</td>
              <td className="p-3 font-bold">$24.00</td>
              <td className="p-3">
                <span className="bg-[#ffd167]/30 px-2 py-0.5 rounded text-[#765900] font-extrabold text-[10px]">
                  12 Units
                </span>
              </td>
              <td className="p-3 text-right">
                <button className="text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer">
                  <MdEdit className="w-4 h-4" />
                </button>
              </td>
            </tr>

            {/* Variant 2 */}
            <tr className="hover:bg-[#faf8ff] transition-colors">
              <td className="p-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#ADD8E6] border border-[#dfbec4]" />
                <span>Blue / 0-3M</span>
              </td>
              <td className="p-3 text-[#584045]/70">KDS-001-B-03</td>
              <td className="p-3 font-bold">$24.00</td>
              <td className="p-3">
                <span className="bg-[#ffdad6] px-2 py-0.5 rounded text-[#ba1a1a] font-extrabold text-[10px]">
                  Low Stock
                </span>
              </td>
              <td className="p-3 text-right">
                <button className="text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer">
                  <MdEdit className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
