import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdCheck,
  MdOutlineVisibility,
  MdEdit,
  MdArchive,
} from "react-icons/md";
import { ProductDetailsGallery } from "../components/ProductDetailsGallery";
import { ProductDetailsStats } from "../components/ProductDetailsStats";
import { ProductSpecifications } from "../components/ProductSpecifications";
import { ProductStockBreakdown } from "../components/ProductStockBreakdown";
import { ProductRecentAdminActivity } from "../components/ProductRecentAdminActivity";

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top action bar greetings */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4 select-none">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 bg-[#ffd167]/30 text-[#765900] px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase">
              <MdCheck className="w-3.5 h-3.5" />
              Active
            </span>
            <span className="text-[10px] font-bold text-[#584045]/60">
              SKU: OC-ROMP-001
            </span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Organic Cotton Romper
          </h2>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdOutlineVisibility className="w-4 h-4 text-[#584045]/70" />
            View Storefront
          </button>

          <button
            onClick={() => navigate("/products/edit/OC-ROMP-001")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
          >
            <MdEdit className="w-4 h-4" />
            Edit Product
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-full transition-all cursor-pointer">
            <MdArchive className="w-4 h-4" />
            Archive
          </button>
        </div>
      </header>

      {/* Main product layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image previews, total sales overview */}
        <div className="lg:col-span-4 space-y-6">
          <ProductDetailsGallery />
          <ProductDetailsStats />
        </div>

        {/* Right Column: Spec grid, breakdowns tables, history logs */}
        <div className="lg:col-span-8 space-y-6">
          <ProductSpecifications />
          <ProductStockBreakdown />
          <ProductRecentAdminActivity />
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
