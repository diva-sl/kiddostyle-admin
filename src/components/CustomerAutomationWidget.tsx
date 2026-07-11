import React from "react";
import { MdAutoAwesome } from "react-icons/md";

export const CustomerAutomationWidget: React.FC = () => {
  return (
    <div className="mt-12 p-8 bg-[#e2e7ff]/30 rounded-[40px] flex flex-col md:flex-row items-center gap-8 border border-white select-none">
      {/* Left Suggestion Context */}
      <div className="flex-1 space-y-4">
        <h4 className="font-display text-lg font-extrabold text-[#b31f56]">
          Automate Your Customer Journey
        </h4>
        <p className="text-xs text-[#584045] leading-relaxed font-semibold">
          Set up automated welcome emails, anniversary discounts, and win-back
          campaigns directly from the customer segment views.
        </p>
        <button className="px-6 py-3 bg-[#785a00] hover:bg-[#5b4300] text-white font-bold text-xs rounded-full hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer">
          Configure Automations
        </button>
      </div>

      {/* Right Smart segment icon circle */}
      <div className="w-full md:w-1/3 relative flex justify-center">
        <div className="w-48 h-48 bg-white rounded-full flex flex-col items-center justify-center p-6 shadow-xl border border-[#dfbec4]/10 shrink-0">
          <div className="text-center">
            <MdAutoAwesome className="text-[#b31f56] w-12 h-12 mx-auto mb-1.5" />
            <p className="font-display text-sm font-extrabold text-[#131b2e]">
              Smart Insights
            </p>
            <p className="text-[10px] font-bold text-[#584045]/60 mt-1">
              AI-powered segmentation
            </p>
          </div>
        </div>

        {/* Small floating bubble decorations */}
        <div className="absolute top-2 left-6 w-8 h-8 bg-[#ffd167] rounded-full animate-bounce duration-1000 opacity-80" />
        <div className="absolute bottom-2 right-6 w-6 h-6 bg-[#00a4ca] rounded-full opacity-70" />
      </div>
    </div>
  );
};
