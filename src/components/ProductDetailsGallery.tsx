import React, { useState } from "react";
import { MdZoomIn } from "react-icons/md";

export const ProductDetailsGallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpbt01cFJnRHiQjVabTou3I4JYtIvzhFA0WjgucebTz3AgDITPGbPPkESjeqE1lgydYnCP36nEEExJBuINQwoTnOLitkUVtTSB80dADjluaE9gMN_3ytAHcolJbNA0og_nOL4Bov9LygTVrqwEqPO0ip6QqQqV2_z9pg92m1ihVaBV3T_USX2_oh-KBhxPaUGW8kukJmiPIDon9McHD4guVWJ6PApEPkbx6XHpbouarN_j2FMJrf7_E1qU7rIWhXcTgR-PiywzPvs",
  );

  const thumbs = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpbt01cFJnRHiQjVabTou3I4JYtIvzhFA0WjgucebTz3AgDITPGbPPkESjeqE1lgydYnCP36nEEExJBuINQwoTnOLitkUVtTSB80dADjluaE9gMN_3ytAHcolJbNA0og_nOL4Bov9LygTVrqwEqPO0ip6QqQqV2_z9pg92m1ihVaBV3T_USX2_oh-KBhxPaUGW8kukJmiPIDon9McHD4guVWJ6PApEPkbx6XHpbouarN_j2FMJrf7_E1qU7rIWhXcTgR-PiywzPvs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTl8wuyY0o-tFT8Goy9jGgYG95c1ja8qZK1tHHB5Uuw16v9YFGV11KQHCOKIzOclyJEMZpF3ZHDWa2SMN6SIr2tpoGzNcCL-bWG87EcVmE9NRtwVdWCmXMK80xi0j-NJSJSbToqd_bWFfhHrVuH_GaMZmtLf1yFZJvU74RSQE2c3FWTrRGr5MCcxFZmc_wPBbuuL11BId0uaB4x3Ve5lsublg6oI95M_-MKdsLO1bWWDgBfJsE2O5-TVzMrVb_TwOE5HVNC-rlzfgk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB-oDwV1MxAysKP-oHJjUIBJF32aXDfCjTsN0uTv7A5W3YXJQLmlr1-WYextB6LdXq4FQcg1NysEy-EGPyUngi59ueEi9Un5-arUTrtqB3vaIdGOzGovSecxNk8894zFrMBaVnVzxFTpPSk1N0xY8MnjmPNc_ys2xk3RrVatM6Ip-UQQ1ZtYWgG_9KeXqa6JlHdtuNoNsVzjAiAgiM-ECfAGDdB8da4GVG2GasEuE8Jz2XjpSQu4K0ivWQcfTEVZxYemrieP5XRSac2",
  ];

  return (
    <div className="bg-white p-4 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
      {/* Big Hero Preview */}
      <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#faf8ff] relative group border border-[#dfbec4]/20">
        <img
          src={activeImage}
          alt="Active product view"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover zoom badge */}
        <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2.5 rounded-full shadow-sm text-[#131b2e] flex items-center justify-center transition-all cursor-pointer">
          <MdZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails list row */}
      <div className="grid grid-cols-3 gap-3">
        {thumbs.slice(0, 2).map((img, idx) => (
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

        {/* More thumbnails overlays */}
        <div className="aspect-square rounded-xl bg-[#e2e7ff] border border-[#dfbec4]/20 flex flex-col items-center justify-center text-[#b31f56] font-bold text-xs cursor-pointer select-none hover:bg-[#eaedff] transition-colors">
          <span>+ 2 More</span>
        </div>
      </div>
    </div>
  );
};
