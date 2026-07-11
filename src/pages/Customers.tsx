import React from "react";
import { MdDownload, MdPersonAdd, MdAdd } from "react-icons/md";
import { CustomersKpiGrid } from "../components/CustomersKpiGrid";
import { CustomersFilterTable } from "../components/CustomersFilterTable";
import { CustomerAutomationWidget } from "../components/CustomerAutomationWidget";

export const CustomersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Customer Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            View and manage your registered customer database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdDownload className="w-4.5 h-4.5" />
            Export CSV
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdPersonAdd className="w-4.5 h-4.5" />
            Add Customer
          </button>
        </div>
      </section>

      {/* Overview statistical asymmetric Bento grid */}
      <CustomersKpiGrid />

      {/* Main Customers segment search list tables */}
      <CustomersFilterTable />

      {/* Bottom journey automations suggestion segment */}
      <CustomerAutomationWidget />

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#b31f56] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer">
        <MdAdd className="w-6 h-6" />
      </button>
    </div>
  );
};
export default CustomersPage;
