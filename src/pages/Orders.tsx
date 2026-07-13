import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersHeader } from "../components/OrdersHeader";
import { OrdersFilter } from "../components/OrdersFilter";
import { OrdersTable } from "../components/OrdersTable";
import { useOrders } from "../hooks/useOrders";

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbOrders = [] } = useOrders();

  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");

  const activeShipmentsCount =
    dbOrders.length > 0
      ? dbOrders.filter(
          (o) =>
            o.status === "pending" ||
            o.status === "processing" ||
            o.status === "shipped",
        ).length
      : 24;

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none">
      {/* 1. Welcome greeting and active shipments count banner */}
      <OrdersHeader
        onManualOrderClick={() => navigate("/orders/new")}
        activeShipmentsCount={activeShipmentsCount}
        dbOrders={dbOrders}
      />

      {/* 2. Filter and Search Code selectors */}
      <OrdersFilter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 3. Main Orders Table grid */}
      <OrdersTable activeTab={activeTab} searchQuery={searchQuery} />
    </div>
  );
};

export default OrdersPage;
