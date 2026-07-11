import React from "react";
import { MdFileDownload } from "react-icons/md";
import { SellerOrdersKpiGrid } from "../components/SellerOrdersKpiGrid";
import { OrderDirectoryTable } from "../components/OrderDirectoryTable";

export const SellerOrdersPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex justify-between items-end gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Order Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Manage your customer's requests and track shipments.
          </p>
        </div>

        <button className="bg-white border border-[#dfbec4] text-[#b31f56] hover:bg-[#faf8ff] font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer text-xs">
          <MdFileDownload className="w-4.5 h-4.5" />
          Export CSV
        </button>
      </section>

      {/* Summary Metrics boards */}
      <SellerOrdersKpiGrid />

      {/* Main transactions search listing tables */}
      <OrderDirectoryTable />
    </div>
  );
};
export default SellerOrdersPage;
