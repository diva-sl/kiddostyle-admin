import React, { useState } from "react";
import { MdUpload } from "react-icons/md";

export const BrandingSettings: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState("KiddoStyle Kids Fashion");
  const [tagline, setTagline] = useState("Joyful clothing for tiny explorers");

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
              src="https://lh3.googleusercontent.com/aida/AP1WRLsoTKHJFHY2ctVlaMylQ5e9LeYrLTLS3pQdFEW4gmytNj-0fPPigzPcwA7X6TVrWWdEfrp9P8sAc6bLgdGb9S7M2L8CC7LEKLKPNLfBiueBLXbf0cYjo1I9NLff8aoFhZ7f56hIJdPGdbxYyMQc6tT-vZUQ3rlvBrTvoInOc6Zu_qZMyxUGUiDChJ9Q_4K3W31ywYshph5VFk9TNFVrw1w1gsnq_pAjz7PaEflTtwW_XilE8JgR4Mx7TT9d"
              alt="Bache Hai Logo"
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
              className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/30 focus:outline-none focus:border-[#b31f56] focus:ring-2 focus:ring-[#b31f56]/15 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block mb-1.5 font-bold">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Joyful clothing for tiny explorers"
              className="w-full max-w-md px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/30 focus:outline-none focus:border-[#b31f56] focus:ring-2 focus:ring-[#b31f56]/15 transition-all outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
