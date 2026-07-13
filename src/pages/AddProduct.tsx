import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdArrowBack } from "react-icons/md";
import { ProductBasicInfo } from "../components/ProductBasicInfo";
import { ProductMediaGallery } from "../components/ProductMediaGallery";
import { ProductVariants } from "../components/ProductVariants";
import { ProductPricingInventory } from "../components/ProductPricingInventory";
import { ProductShippingDetails } from "../components/ProductShippingDetails";
import { ProductPublicationStatus } from "../components/ProductPublicationStatus";
import { ProductFormFooter } from "../components/ProductFormFooter";
import { ProductFormProvider } from "../context/ProductFormContext";

export const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  return (
    <ProductFormProvider>
      <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
        {/* Breadcrumb Navigation */}
        <header>
          <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
            <span
              onClick={() => navigate("/products")}
              className="hover:text-[#b31f56] cursor-pointer transition-colors"
            >
              Products
            </span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">
              {isEditMode ? "Edit Product" : "New Product"}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/products")}
              className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
              title="Back to products list"
            >
              <MdArrowBack className="w-4 h-4" />
            </button>
            <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
              {isEditMode ? "Configure Product Details" : "Create New Product"}
            </h2>
          </div>
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
    </ProductFormProvider>
  );
};

export default AddProductPage;
