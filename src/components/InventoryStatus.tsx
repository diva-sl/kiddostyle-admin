import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Gamepad2 } from "lucide-react";

export const InventoryStatus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Stock Health Card */}
      <div className="bg-[#dae2fd]/40 p-8 rounded-3xl shadow-sm border border-[#dfbec4]/30 flex-grow relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-lg font-extrabold text-[#131b2e] font-display mb-2">
            Inventory Health
          </h4>
          <p className="text-xs text-[#584045] font-semibold mb-6">
            92% of your stock is healthy and active.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#584045] mb-2">
                <span>Optimal Stock</span>
                <span className="text-[#131b2e] font-extrabold">850 Items</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006780] rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#584045] mb-2">
                <span>Low Stock Warning</span>
                <span className="text-[#131b2e] font-extrabold">42 Items</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#785a00] rounded-full"
                  style={{ width: "15%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#ba1a1a] mb-2">
                <span>Out of Stock</span>
                <span className="text-[#ba1a1a] font-extrabold">12 Items</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ba1a1a] rounded-full"
                  style={{ width: "5%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toys icon watermark */}
        <div className="absolute -right-8 -top-8 text-[#dae2fd] opacity-20 pointer-events-none select-none">
          <Gamepad2 className="w-48 h-48 rotate-12" />
        </div>
      </div>

      {/* Action Add Product Button */}
      <button
        onClick={() => navigate("/products/new")}
        className="w-full py-5 bg-[#ffd167] text-[#765900] rounded-3xl font-bold text-base flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all squish shadow-lg cursor-pointer"
      >
        <PlusCircle className="w-6 h-6" />
        Add New Product
      </button>
    </div>
  );
};
