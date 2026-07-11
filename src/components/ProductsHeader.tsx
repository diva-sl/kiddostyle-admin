import React from "react";
import { useNavigate } from "react-router-dom";
import { MdChevronRight, MdAdd } from "react-icons/md";

export const ProductsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e] mb-1">
          Product Management
        </h2>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none">
          <span>Dashboard</span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">Products</span>
        </nav>
      </div>

      <button
        onClick={() => navigate("/products/new")}
        className="flex items-center gap-2 px-6 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-lg hover:shadow-[#b31f56]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <MdAdd className="w-4 h-4" />
        Add New Product
      </button>
    </div>
  );
};
