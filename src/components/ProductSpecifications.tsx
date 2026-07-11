import React, { useState } from "react";

export const ProductSpecifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"General" | "Pricing" | "SEO">(
    "General",
  );

  return (
    <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      {/* Specifications header & tabs toggle bar */}
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e]">
          Product Specifications
        </h3>

        <div className="flex gap-4">
          {(["General", "Pricing", "SEO"] as const).map((tab) => {
            const isSelected =
              (tab === "General" && activeTab === "General") ||
              (tab === "Pricing" && activeTab === "Pricing") ||
              (tab === "SEO" && activeTab === "SEO");
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold pb-1 transition-all cursor-pointer relative ${
                  isSelected
                    ? "text-[#b31f56]"
                    : "text-[#584045]/60 hover:text-[#b31f56]"
                }`}
              >
                {tab === "General" ? "General Info" : tab}
                {isSelected && (
                  <span className="absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#785a00]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spec details grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Description detail */}
        <div className="md:col-span-7 space-y-2">
          <h4 className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-widest">
            Description
          </h4>
          <p className="text-xs text-[#584045] leading-relaxed font-semibold">
            Our signature Organic Cotton Romper is crafted from GOTS-certified
            100% organic cotton. Designed with baby's comfort in mind, it
            features a breathable waffle knit texture, nickel-free snap closures
            for easy diaper changes, and tagless labels to prevent irritation.
            The minimalist aesthetic makes it perfect for everyday wear or
            special occasions.
          </p>
        </div>

        {/* Highlight data blocks */}
        <div className="md:col-span-5 bg-[#dae2fd]/30 p-5 rounded-2xl grid grid-cols-2 gap-4">
          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">
              Base Price
            </span>
            <p className="text-base font-extrabold text-[#b31f56] mt-0.5">
              $34.00
            </p>
          </div>

          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">
              Cost Per Item
            </span>
            <p className="text-base font-extrabold text-[#131b2e] mt-0.5">
              $12.50
            </p>
          </div>

          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">
              Margin
            </span>
            <p className="text-base font-extrabold text-[#785a00] mt-0.5">
              63.2%
            </p>
          </div>

          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">
              Collection
            </span>
            <p className="text-xs font-extrabold text-[#131b2e] mt-1.5">
              Earth Tones
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
