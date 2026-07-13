import React, { useContext } from "react";
import { MdImage, MdCloudUpload, MdDelete, MdAdd } from "react-icons/md";
import { ProductFormContext } from "../context/ProductFormContext";
import { apiClient } from "../services/apiClient";

export const ProductMediaGallery: React.FC = () => {
  const context = useContext(ProductFormContext);
  if (!context) return null;

  const { formState, setFormState } = context;

  // File upload handler calling backend S3 integration, falling back to Base64 on offline/auth issues
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "products");

      try {
        const { data } = await apiClient.post<{ url: string; filename: string }>("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        // Append new S3 URL to formState
        setFormState(prev => ({
          ...prev,
          images: [...prev.images, data.url]
        }));
      } catch (err: any) {
        console.warn("S3 upload failed, falling back to local Base64 string:", err);
        
        // Fallback: Read file as Base64 Data URL so it is fully visual and works offline
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setFormState(prev => ({
              ...prev,
              images: [...prev.images, reader.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormState(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e] flex items-center gap-2">
          <MdImage className="text-[#b31f56] w-5 h-5 shrink-0" />
          Media Gallery
        </h3>
        <button 
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              setFormState(prev => ({ ...prev, images: [...prev.images, url] }));
            }
          }}
          className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer"
        >
          Add via URL
        </button>
      </div>

      {/* Hidden input trigger */}
      <input 
        type="file" 
        id="product-gallery-upload"
        accept="image/*"
        className="hidden" 
        onChange={handleFileChange}
      />

      {/* Drag & Drop Upload Block */}
      <div 
        onClick={() => document.getElementById("product-gallery-upload")?.click()}
        className="border-2 border-dashed border-[#dfbec4] rounded-2xl p-8 flex flex-col items-center justify-center bg-[#faf8ff] hover:bg-[#f2f3ff] transition-all cursor-pointer group"
      >
        <MdCloudUpload className="text-[#b31f56] w-12 h-12 mb-3 group-hover:scale-105 transition-transform" />
        <p className="font-bold text-sm text-[#131b2e] mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-[#584045]/60">
          PNG, JPG or WEBP image types (max. 10MB)
        </p>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-4 gap-4">
        {formState.images.map((imgUrl, idx) => (
          <div key={idx} className="aspect-square rounded-xl bg-[#f2f3ff] overflow-hidden border border-[#dfbec4]/20 relative group">
            <img
              className="w-full h-full object-cover"
              src={imgUrl}
              alt={`Product preview ${idx + 1}`}
            />
            <div className="absolute inset-0 bg-[#b31f56]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => removeImage(idx)}
                className="bg-[#ba1a1a] text-white rounded-full p-2 shadow-md hover:bg-red-700 transition-colors cursor-pointer"
              >
                <MdDelete className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Upload Slot */}
        <div 
          onClick={() => document.getElementById("product-gallery-upload")?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-[#dfbec4] flex items-center justify-center hover:bg-[#f2f3ff] transition-colors cursor-pointer text-[#dfbec4] hover:text-[#b31f56]"
        >
          <MdAdd className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
