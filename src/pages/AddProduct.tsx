import React from "react";
import { MdChevronRight } from "react-icons/md";
import { ProductBasicInfo } from "../components/ProductBasicInfo";
import { ProductMediaGallery } from "../components/ProductMediaGallery";
import { ProductVariants } from "../components/ProductVariants";
import { ProductPricingInventory } from "../components/ProductPricingInventory";
import { ProductShippingDetails } from "../components/ProductShippingDetails";
import { ProductPublicationStatus } from "../components/ProductPublicationStatus";
import { ProductFormFooter } from "../components/ProductFormFooter";

export const AddProductPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24">
      {/* Title */}
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-1">
          <span>Products</span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">Add New</span>
        </nav>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
          Add New Product
        </h2>
      </header>

      {/* Main Form Fields Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form details */}
        <div className="lg:col-span-8 space-y-6">
          <ProductBasicInfo />
          <ProductMediaGallery />
          <ProductVariants />
        </div>

        {/* Right Column: Pricing & publications status */}
        <div className="lg:col-span-4 space-y-6">
          <ProductPricingInventory />
          <ProductShippingDetails />
          <ProductPublicationStatus />
        </div>
      </div>

      {/* Sticky Save Footer */}
      <ProductFormFooter />
    </div>
  );
};
export default AddProductPage;
