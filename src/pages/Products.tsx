import React, { useState } from "react";
import { ProductsHeader } from "../components/ProductsHeader";
import { ProductsFilter } from "../components/ProductsFilter";
import { ProductsTable } from "../components/ProductsTable";
import { ProductsBentoSummary } from "../components/ProductsBentoSummary";

export const ProductsPage: React.FC = () => {
  // Lifted filter states to share across child search modules
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("Stock Status");
  const [publishFilter, setPublishFilter] = useState("All Statuses");

  return (
    <div className="space-y-6">
      {/* 1. Page headers and new product CTA */}
      <ProductsHeader />

      {/* 2. Catalog quick searches and dropdown categories */}
      <ProductsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        publishFilter={publishFilter}
        setPublishFilter={setPublishFilter}
      />

      {/* 3. Products List tables */}
      <ProductsTable
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        publishFilter={publishFilter}
      />

      {/* 4. Bottom Inventory health metrics cards */}
      <ProductsBentoSummary />
    </div>
  );
};

export default ProductsPage;
