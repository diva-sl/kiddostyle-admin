import React from "react";
import { MdSync, MdCheckCircle } from "react-icons/md";

export const ProductFormFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 right-0 w-[calc(100%-16rem)] bg-white/90 backdrop-blur-md border-t border-[#dfbec4]/30 p-4 px-8 z-40 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none">
        <MdSync className="w-4 h-4 animate-spin" />
        Auto-saved at 2:45 PM
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm font-bold text-[#584045]/80 hover:bg-[#f2f3ff] px-5 py-2.5 rounded-full transition-all cursor-pointer">
          Discard Changes
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-lg shadow-[#b31f56]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
          <MdCheckCircle className="w-4 h-4" />
          Publish Product
        </button>
      </div>
    </footer>
  );
};
