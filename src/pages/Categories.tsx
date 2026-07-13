import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { CategoryKpiGrid } from "../components/CategoryKpiGrid";
import { CatalogStructureTable } from "../components/CatalogStructureTable";
import { CategoryInsights } from "../components/CategoryInsights";
import type { Category } from "../services/categoryService";

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenAdd = () => {
    navigate("/categories/new");
  };

  const handleOpenEdit = (cat: Category) => {
    navigate(`/categories/edit/${cat.id}`);
  };

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Category Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Organize and manage your product catalog structure.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#b31f56] text-white px-7 py-3 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-lg hover:shadow-[#b31f56]/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          <MdAdd className="w-5 h-5" />
          Add New Category
        </button>
      </section>

      {/* Summary Stats Grid metrics */}
      <CategoryKpiGrid />

      {/* Main Catalog data tables */}
      <CatalogStructureTable onEdit={handleOpenEdit} />

      {/* Bottom Insights Performance growth charts & tips */}
      <CategoryInsights />
    </div>
  );
};

export default CategoriesPage;
