import React, { useState } from "react";
import { InventoryKpiGrid } from "../components/InventoryKpiGrid";
import { InventoryFilters } from "../components/InventoryFilters";
import { InventoryTable } from "../components/InventoryTable";

export const InventoryPage: React.FC = () => {
  const [selectedCount, setSelectedCount] = useState(0);

  // Lifted filters state coordinates inputs and grid results
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");
  const [statusFilter, setStatusFilter] = useState("Stock Status: All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  return (
    <div className="space-y-6">
      {/* 1. KPIs Section: Bento Style Cards */}
      <InventoryKpiGrid />

      {/* 2. Filters & Batch Actions Bar */}
      <InventoryFilters
        selectedCount={selectedCount}
        warehouseFilter={warehouseFilter}
        setWarehouseFilter={setWarehouseFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* 3. Main Stock Table Canvas */}
      <InventoryTable
        onSelectionChange={setSelectedCount}
        warehouseFilter={warehouseFilter}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default InventoryPage;
