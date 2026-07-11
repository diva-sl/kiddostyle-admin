import React from "react";

export const ProductPublicationStatus: React.FC = () => {
  return (
    <section className="bg-[#dae2fd]/30 p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-3 h-3 bg-[#785a00] rounded-full animate-pulse" />
        <span className="text-sm font-bold text-[#131b2e]">Draft Mode</span>
      </div>
      <p className="text-xs text-[#584045]/70 leading-relaxed">
        This product is not currently visible to customers on the storefront.
      </p>
      <button className="w-full bg-[#283044] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#131b2e] transition-all cursor-pointer">
        Schedule Launch
      </button>
    </section>
  );
};
