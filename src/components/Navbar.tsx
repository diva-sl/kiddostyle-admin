import React from 'react';
import { MdSearch, MdNotifications, MdSettings } from 'react-icons/md';

interface NavbarProps {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center h-16 px-8 sticky top-0 z-30 bg-white border-b border-[#dfbec4]/20 w-full shadow-sm">
      {/* Title / Breadcrumb context */}
      <div className="hidden lg:block shrink-0">
        <h2 className="text-xs font-bold text-[#131b2e]/40 uppercase tracking-widest font-display">{title}</h2>
      </div>

      {/* Search Input Bar (fills screen up to max-w-2xl) */}
      <div className="flex items-center gap-6 w-full max-w-2xl ml-6">
        <div className="relative w-full">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584045]/60 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search orders, customers, or SKUs..." 
            className="w-full bg-[#f2f3ff] border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#b31f56]/20 font-body-md text-sm outline-none text-[#131b2e]"
          />
        </div>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon Button */}
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#584045]/70 hover:bg-[#eaedff]/40 transition-all squish relative cursor-pointer">
          <MdNotifications className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#b31f56] rounded-full"></span>
        </button>

        {/* Settings Button */}
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#584045]/70 hover:bg-[#eaedff]/40 transition-all squish cursor-pointer">
          <MdSettings className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-[#dfbec4]/20 mx-2 opacity-40"></div>

        {/* Admin Headshot widget */}
        <div className="flex items-center gap-3 cursor-pointer group select-none">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#dfbec4]/40">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCPuT57vK0NIodXWpJ52fyymrnagN363JtLn3IDaCXtc1JV7shDAOMYJ9zOFHr2Oa45BCsATUeMxJOAnk8Y7885mUREOd-8id5RJvfDnvbedQTp9CmceAsHyGZ-orkaWCnf-cUVp_JDVXesKD343Zjc4tOe8zzQ0t2uiJG-kQWs3mOS0_TheksWju5gPD1TX-Qv2gE38kH7cbfQRT0ZBeaZEzMr758bdIqvBzJ8X7wRjD4r26JKp-B2ulmOT-IGyGxtK15IOtdMqa6"
              alt="Admin Sarah" 
            />
          </div>
          <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#b31f56] transition-colors">
            Admin Sarah
          </span>
        </div>
      </div>
    </header>
  );
};
