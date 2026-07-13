import React, { useState, useContext } from "react";
import { MdPayments } from "react-icons/md";
import { ProductFormContext } from "../context/ProductFormContext";

export const ProductPricingInventory: React.FC = () => {
  const [trackInventory, setTrackInventory] = useState(true);
  const context = useContext(ProductFormContext);
  if (!context) return null;

  const { formState, setFormState } = context;

  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <h3 className="font-display text-base font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#dfbec4]/10 pb-3">
        <MdPayments className="text-[#b31f56] w-5 h-5 shrink-0" />
        Pricing &amp; Inventory
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
            Base Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#584045]/50 font-bold">
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={formState.price || ""}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              className="w-full bg-[#f2f3ff] border-none rounded-xl py-3 pl-8 pr-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
            Sale / Discount Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#584045]/50 font-bold">
              $
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={formState.originalPrice || ""}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  originalPrice: Number(e.target.value),
                }))
              }
              className="w-full bg-[#f2f3ff] border-none rounded-xl py-3 pl-8 pr-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
            />
          </div>
        </div>

        {/* Toggle Slider Switch */}
        <div className="border-t border-[#dfbec4]/20 pt-5 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-[#584045]">
              Track Inventory
            </label>
            <button
              onClick={() => setTrackInventory(!trackInventory)}
              className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                trackInventory ? "bg-[#b31f56]" : "bg-[#dfbec4]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  trackInventory ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={formState.stock}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    stock: Number(e.target.value),
                  }))
                }
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#584045]/70 uppercase tracking-wider mb-2">
                Threshold
              </label>
              <input
                type="number"
                defaultValue={5}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
