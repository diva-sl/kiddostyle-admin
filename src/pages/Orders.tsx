import React from 'react';
import { OrdersHeader } from '../components/OrdersHeader';
import { OrdersFilter } from '../components/OrdersFilter';
import { OrdersTable } from '../components/OrdersTable';

export const OrdersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome greeting / active shipments count */}
      <OrdersHeader />

      {/* Filter and Date selectors */}
      <OrdersFilter />

      {/* Main Table grid */}
      <OrdersTable />
    </div>
  );
};
export default OrdersPage;
