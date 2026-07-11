import React from "react";
import { MdImage, MdCloudUpload, MdDelete, MdAdd } from "react-icons/md";

export const ProductMediaGallery: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e] flex items-center gap-2">
          <MdImage className="text-[#b31f56] w-5 h-5 shrink-0" />
          Media Gallery
        </h3>
        <button className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer">
          Add via URL
        </button>
      </div>

      {/* Drag & Drop Upload Block */}
      <div className="border-2 border-dashed border-[#dfbec4] rounded-2xl p-8 flex flex-col items-center justify-center bg-[#faf8ff] hover:bg-[#f2f3ff] transition-all cursor-pointer group">
        <MdCloudUpload className="text-[#b31f56] w-12 h-12 mb-3 group-hover:scale-105 transition-transform" />
        <p className="font-bold text-sm text-[#131b2e] mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-[#584045]/60">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="aspect-square rounded-xl bg-[#f2f3ff] overflow-hidden border border-[#dfbec4]/20 relative group">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-oDwV1MxAysKP-oHJjUIBJF32aXDfCjTsN0uTv7A5W3YXJQLmlr1-WYextB6LdXq4FQcg1NysEy-EGPyUngi59ueEi9Un5-arUTrtqB3vaIdGOzGovSecxNk8894zFrMBaVnVzxFTpPSk1N0xY8MnjmPNc_ys2xk3RrVatM6Ip-UQQ1ZtYWgG_9KeXqa6JlHdtuNoNsVzjAiAgiM-ECfAGDdB8da4GVG2GasEuE8Jz2XjpSQu4K0ivWQcfTEVZxYemrieP5XRSac2"
            alt="Product flat lay onesie preview"
          />
          <div className="absolute inset-0 bg-[#b31f56]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-[#ba1a1a] text-white rounded-full p-2 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
              <MdDelete className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upload Slot */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-[#dfbec4] flex items-center justify-center hover:bg-[#f2f3ff] transition-colors cursor-pointer text-[#dfbec4] hover:text-[#b31f56]">
          <MdAdd className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
