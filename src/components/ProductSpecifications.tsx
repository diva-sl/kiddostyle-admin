import React, { useState } from "react";

interface SpecProps {
  description?: string;
  price?: number;
  category?: string;
}

export const ProductSpecifications: React.FC<SpecProps> = ({
  description,
  price,
  category,
}) => {
  const [activeTab, setActiveTab] = useState<"General" | "Pricing" | "SEO">("General");

  const displayDesc = description || "Our signature Organic Cotton Romper is crafted from GOTS-certified 100% organic cotton. Designed with baby's comfort in mind, it features a breathable waffle knit texture, snap closures, and tagless labels.";
  const displayPrice = price ? `$${price.toFixed(2)}` : "$34.00";
  const displayCost = price ? `$${(price * 0.36).toFixed(2)}` : "$12.50";
  const displayCategory = category || "Earth Tones";

  return (
    <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e]">
          Product Specifications
        </h3>

        <div className="flex gap-4">
          {(["General", "Pricing", "SEO"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold pb-1 transition-all cursor-pointer relative ${
                  isSelected ? "text-[#b31f56]" : "text-[#584045]/60 hover:text-[#b31f56]"
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-2">
          <h4 className="text-[10px] font-bold text-[#584045]/60 uppercase tracking-widest">
            {activeTab} Specifications
          </h4>
          <p className="text-xs text-[#584045] leading-relaxed font-semibold">
            {activeTab === "General" ? displayDesc : activeTab === "Pricing" ? `This catalog details pricing lists. Standard retail prices are locked at base values of ${displayPrice}.` : "SEO indexing tags: kiddo, organic-cotton, toddler-outfit."}
          </p>
        </div>

        <div className="md:col-span-5 bg-[#dae2fd]/30 p-5 rounded-2xl grid grid-cols-2 gap-4">
          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">Base Price</span>
            <p className="text-base font-extrabold text-[#b31f56] mt-0.5">{displayPrice}</p>
          </div>

          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">Cost Per Item</span>
            <p className="text-base font-extrabold text-[#131b2e] mt-0.5">{displayCost}</p>
          </div>

          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">Margin</span>
            <p className="text-base font-extrabold text-[#785a00] mt-0.5">64.0%</p>
          </div>

          <div>
            <span className="text-[9px] font-bold text-[#584045]/60 uppercase">Category Group</span>
            <p className="text-xs font-extrabold text-[#131b2e] mt-1.5">{displayCategory}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
