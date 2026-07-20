import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { InventoryKpiGrid } from "../components/InventoryKpiGrid";
import { ProductCatalogTable } from "../components/ProductCatalogTable";

export const SellerInventoryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Inventory Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Manage and monitor your children's fashion catalog.
          </p>
        </div>

        {/* Add Product Action Button for Sellers & Admins */}
        <button
          onClick={() => navigate("/products/new")}
          className="flex items-center gap-1.5 bg-[#b31f56] text-white px-6 py-3 rounded-full font-bold text-xs shadow-lg hover:shadow-[#b31f56]/20 transition-all active:scale-[0.98] cursor-pointer border-none"
        >
          <MdAdd className="w-5 h-5" />
          Add New Product
        </button>
      </section>

      {/* Summary Metrics bento boxes */}
      <InventoryKpiGrid />

      {/* Main product listings catalog table */}
      <ProductCatalogTable />
    </div>
  );
};

export default SellerInventoryPage;
