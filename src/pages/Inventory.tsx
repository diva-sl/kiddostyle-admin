import React, { useState } from "react";
import { InventoryKpiGrid } from "../components/InventoryKpiGrid";
import { InventoryFilters } from "../components/InventoryFilters";
import { InventoryTable } from "../components/InventoryTable";

export const InventoryPage: React.FC = () => {
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="space-y-6">
      {/* 1. KPIs Section: Bento Style Cards */}
      <InventoryKpiGrid />

      {/* 2. Filters & Batch Actions Bar */}
      <InventoryFilters selectedCount={selectedCount} />

      {/* 3. Main Stock Table Canvas */}
      <InventoryTable onSelectionChange={setSelectedCount} />
    </div>
  );
};
export default InventoryPage;
