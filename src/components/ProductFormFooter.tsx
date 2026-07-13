import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdSync, MdCheckCircle } from "react-icons/md";
import { ProductFormContext } from "../context/ProductFormContext";

export const ProductFormFooter: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(ProductFormContext);
  if (!context) return null;

  const { submitForm, isEditMode } = context;

  return (
    <footer className="fixed bottom-0 right-0 w-[calc(100%-16rem)] bg-white/90 backdrop-blur-md border-t border-[#dfbec4]/30 p-4 px-8 z-40 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none">
        <MdSync className="w-4 h-4 animate-spin" />
        Form connected to DB
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate("/products")}
          className="text-sm font-bold text-[#584045]/80 hover:bg-[#f2f3ff] px-5 py-2.5 rounded-full transition-all cursor-pointer"
        >
          Discard Changes
        </button>
        <button 
          onClick={submitForm}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-lg shadow-[#b31f56]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <MdCheckCircle className="w-4 h-4" />
          {isEditMode ? "Save Changes" : "Publish Product"}
        </button>
      </div>
    </footer>
  );
};
