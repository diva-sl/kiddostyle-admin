import React from "react";
import { ProductsHeader } from "../components/ProductsHeader";
import { ProductsFilter } from "../components/ProductsFilter";
import { ProductsTable } from "../components/ProductsTable";
import { ProductsBentoSummary } from "../components/ProductsBentoSummary";

export const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Page headers and new product CTA */}
      <ProductsHeader />

      {/* 2. Catalog quick searches and dropdown categories */}
      <ProductsFilter />

      {/* 3. Products List tables */}
      <ProductsTable />

      {/* 4. Bottom Inventory health metrics cards */}
      <ProductsBentoSummary />
    </div>
  );
};
export default ProductsPage;
