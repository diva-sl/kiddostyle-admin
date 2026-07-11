import React, { useState } from "react";

export const StoreFeaturesConfig: React.FC = () => {
  const [toggles, setToggles] = useState({
    multiCurrency: true,
    inventoryTracking: true,
    guestCheckout: false,
  });

  const handleToggle = (
    key: "multiCurrency" | "inventoryTracking" | "guestCheckout",
  ) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-[#dfbec4]/30 shadow-sm select-none">
      <h3 className="font-display text-sm font-extrabold text-[#b31f56] mb-6">
        Store Features
      </h3>

      <div className="space-y-5 text-xs font-semibold text-[#131b2e]">
        {/* Toggle 1 */}
        <div className="flex items-center justify-between py-3 border-b border-[#dfbec4]/15">
          <div>
            <p className="font-bold text-xs">Multi-Currency Support</p>
            <p className="text-[10px] text-[#584045]/60 mt-0.5">
              Automatically detect and show prices in customer's local currency.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggles.multiCurrency}
              onChange={() => handleToggle("multiCurrency")}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/15 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
          </label>
        </div>

        {/* Toggle 2 */}
        <div className="flex items-center justify-between py-3 border-b border-[#dfbec4]/15">
          <div>
            <p className="font-bold text-xs">Inventory Tracking</p>
            <p className="text-[10px] text-[#584045]/60 mt-0.5">
              Show 'Low Stock' warnings on product pages.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggles.inventoryTracking}
              onChange={() => handleToggle("inventoryTracking")}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/15 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
          </label>
        </div>

        {/* Toggle 3 */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-bold text-xs">Guest Checkout</p>
            <p className="text-[10px] text-[#584045]/60 mt-0.5">
              Allow customers to buy without creating an account.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggles.guestCheckout}
              onChange={() => handleToggle("guestCheckout")}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/15 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
          </label>
        </div>
      </div>
    </div>
  );
};
