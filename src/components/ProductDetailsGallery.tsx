import React, { useState, useEffect } from "react";
import { MdZoomIn } from "react-icons/md";

interface GalleryProps {
  images: string[];
}

export const ProductDetailsGallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  return (
    <div className="bg-white p-4 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
      {/* Big Hero Preview */}
      <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#faf8ff] relative group border border-[#dfbec4]/20">
        {activeImage && (
          <img
            src={activeImage}
            alt="Active product view"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2.5 rounded-full shadow-sm text-[#131b2e] flex items-center justify-center transition-all cursor-pointer">
          <MdZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails list row */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`aspect-square rounded-xl overflow-hidden bg-[#faf8ff] border-2 transition-all cursor-pointer ${
              activeImage === img ? "border-[#b31f56]" : "border-[#dfbec4]/20"
            }`}
          >
            <img
              src={img}
              alt="Product thumbnail"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
