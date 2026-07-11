import React from "react";
import { InventoryKpiGrid } from "../components/InventoryKpiGrid";
import { ProductCatalogTable } from "../components/ProductCatalogTable";

export const SellerInventoryPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex justify-between items-end gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Inventory Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Manage and monitor your children's fashion catalog.
          </p>
        </div>
      </section>

      {/* Summary Metrics bento boxes */}
      <InventoryKpiGrid />

      {/* Main product listings catalog table */}
      <ProductCatalogTable />
    </div>
  );
};
export default SellerInventoryPage;
