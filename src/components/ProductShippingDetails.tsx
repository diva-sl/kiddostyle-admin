import React from "react";
import { MdLocalShipping } from "react-icons/md";

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
            defaultValue={0.5}
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
              defaultValue="20cm"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-2.5 text-center text-sm outline-none"
            />
            <input
              type="text"
              defaultValue="15cm"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-2.5 text-center text-sm outline-none"
            />
            <input
              type="text"
              defaultValue="5cm"
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-2.5 text-center text-sm outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
