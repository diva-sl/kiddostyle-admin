import React from "react";
import { MdLocalShipping, MdAttachMoney } from "react-icons/md";

interface ShippingSettingsProps {
  standardFee: number;
  setStandardFee: (val: number) => void;
  expressFee: number;
  setExpressFee: (val: number) => void;
  freeShippingThreshold: number;
  setFreeShippingThreshold: (val: number) => void;
}

export const ShippingSettings: React.FC<ShippingSettingsProps> = ({
  standardFee,
  setStandardFee,
  expressFee,
  setExpressFee,
  freeShippingThreshold,
  setFreeShippingThreshold,
}) => {
  return (
    <div className="space-y-6 max-w-5xl select-none">
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00a4ca]/10 flex items-center justify-center text-[#006780]">
            <MdLocalShipping className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              Shipping &amp; Delivery Rates
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold">
              Configure standard delivery fees and threshold incentives
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold flex items-center gap-1">
              <MdAttachMoney className="w-4 h-4 text-[#584045]/60" />
              Standard Shipping Fee ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={standardFee}
              onChange={(e) => setStandardFee(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-bold flex items-center gap-1">
              <MdAttachMoney className="w-4 h-4 text-[#584045]/60" />
              Express Courier Fee ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={expressFee}
              onChange={(e) => setExpressFee(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-bold flex items-center gap-1">
              <MdAttachMoney className="w-4 h-4 text-[#584045]/60" />
              Free Shipping Above ($)
            </label>
            <input
              type="number"
              min="0"
              step="5"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
