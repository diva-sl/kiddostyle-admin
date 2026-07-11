import React from "react";
import { MdDownload, MdAdd } from "react-icons/md";
import { BrandsKpiGrid } from "../components/BrandsKpiGrid";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import { BrandsDistribution } from "../components/BrandsDistribution";

export const BrandsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Brand Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Monitor and curate partner relationships for KiddoStyle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdDownload className="w-4 h-4" />
            Export
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdAdd className="w-4 h-4" />
            Add New Brand
          </button>
        </div>
      </section>

      {/* Summary Metrics bento boxes */}
      <BrandsKpiGrid />

      {/* Main Content Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <BrandsPortfolio />
        </div>

        <div className="lg:col-span-4">
          <BrandsDistribution />
        </div>
      </div>
    </div>
  );
};
export default BrandsPage;
