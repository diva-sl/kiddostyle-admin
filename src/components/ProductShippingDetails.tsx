import React from "react";
import { MdLocalShipping, MdClose } from "react-icons/md";

export const ProductShippingDetails: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <h3 className="font-display text-base font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#dfbec4]/10 pb-3">
        <MdLocalShipping className="text-[#b31f56] w-5 h-5 shrink-0" />
        Shipping Details
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            placeholder="0.5"
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
            Dimensions (L x W x H)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="L"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-2.5 text-center text-sm outline-none"
            />
            <input
              type="text"
              placeholder="W"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-2.5 text-center text-sm outline-none"
            />
            <input
              type="text"
              placeholder="H"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-2.5 text-center text-sm outline-none"
            />
          </div>
        </div>

        {/* Custom Attributes */}
        <div className="border-t border-[#dfbec4]/20 pt-5 space-y-3">
          <h4 className="text-sm font-bold text-[#131b2e]">
            Custom Attributes
          </h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-[#faf8ff] p-3 rounded-xl border border-[#dfbec4]/30 text-xs font-semibold">
              <span>Material: Organic Cotton</span>
              <button className="text-[#584045]/60 hover:text-[#b31f56] cursor-pointer">
                <MdClose className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#faf8ff] p-3 rounded-xl border border-[#dfbec4]/30 text-xs font-semibold">
              <span>Wash Care: Machine Wash Cold</span>
              <button className="text-[#584045]/60 hover:text-[#b31f56] cursor-pointer">
                <MdClose className="w-4 h-4" />
              </button>
            </div>

            <button className="w-full py-2.5 border border-dashed border-[#b31f56]/30 text-[#b31f56] font-bold text-xs rounded-xl hover:bg-[#b31f56]/5 transition-colors cursor-pointer">
              + Add Attribute
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
