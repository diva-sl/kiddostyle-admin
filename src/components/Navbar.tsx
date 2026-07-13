import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdNotifications, MdSettings } from "react-icons/md";

interface NavbarProps {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const displayName = user ? user.name : "Admin User";
  const profilePic = user ? user.profilePic : "";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex justify-between items-center h-16 px-8 sticky top-0 z-30 bg-white border-b border-[#dfbec4]/20 w-full shadow-sm">
      <div className="hidden lg:block shrink-0">
        <h2 className="text-xs font-bold text-[#131b2e]/40 uppercase tracking-widest font-display">
          {title}
        </h2>
      </div>

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

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#584045]/70 hover:bg-[#eaedff]/40 transition-all squish relative cursor-pointer">
          <MdNotifications className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#b31f56] rounded-full"></span>
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#584045]/70 hover:bg-[#eaedff]/40 transition-all squish cursor-pointer"
        >
          <MdSettings className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-[#dfbec4]/20 mx-2 opacity-40"></div>

        {/* Dynamic Admin Headshot widget */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#b31f56] flex items-center justify-center bg-[#b31f56]/10 text-white font-extrabold text-xs">
            {profilePic ? (
              <img
                className="w-full h-full object-cover"
                src={profilePic}
                alt={displayName}
              />
            ) : (
              <span className="text-[#b31f56]">{firstLetter}</span>
            )}
          </div>
          <span className="text-sm font-semibold text-[#131b2e] group-hover:text-[#b31f56] transition-colors">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
};
