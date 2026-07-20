import React from "react";
import { MdUpload } from "react-icons/md";

interface BrandingSettingsProps {
  siteTitle: string;
  setSiteTitle: (val: string) => void;
  logo: string;
  setLogo: (val: string) => void;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({
  siteTitle,
  setSiteTitle,
  logo,
  setLogo,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#dfbec4]/30 shadow-sm select-none">
      <h3 className="font-display text-sm font-extrabold text-[#b31f56] mb-2">
        Store Branding
      </h3>
      <p className="text-[10px] font-bold text-[#584045]/60 mb-6">
        Manage your store's visual identity across all platforms.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Logo preview upload overlay */}
        <div className="relative group">
          <div className="w-28 h-28 rounded-2xl bg-[#faf8ff] flex items-center justify-center overflow-hidden border-2 border-dashed border-[#dfbec4] hover:border-[#b31f56] transition-all cursor-pointer">
            <img
              className="w-full h-full object-cover"
              src={
                logo ||
                "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80"
              }
              alt="Store Logo"
            />
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <MdUpload className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex-1 w-full space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold">Site Title</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/30 focus:outline-none focus:border-[#b31f56] outline-none"
            />
          </div>
          <div>
            <label className="block mb-1.5 font-bold">Logo Image URL</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/30 focus:outline-none focus:border-[#b31f56] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
