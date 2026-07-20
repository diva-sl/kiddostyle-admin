import React from "react";

interface RegionalContactSettingsProps {
  currency: string;
  setCurrency: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
}

export const RegionalContactSettings: React.FC<
  RegionalContactSettingsProps
> = ({ currency, setCurrency, email, setEmail, phone, setPhone }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
      {/* Left Regional Panel */}
      <div className="bg-white p-6 rounded-xl border border-[#dfbec4]/30 shadow-sm space-y-4">
        <h3 className="font-display text-sm font-extrabold text-[#b31f56]">
          Regional Settings
        </h3>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold">
              Base Store Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56] cursor-pointer"
            >
              <option value="USD">USD - US Dollar ($)</option>
              <option value="EUR">EUR - Euro (€)</option>
              <option value="GBP">GBP - British Pound (£)</option>
              <option value="INR">INR - Indian Rupee (₹)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Contact Info Panel */}
      <div className="bg-white p-6 rounded-xl border border-[#dfbec4]/30 shadow-sm space-y-4">
        <h3 className="font-display text-sm font-extrabold text-[#b31f56]">
          Public Contact Information
        </h3>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold">
              Public Support Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-bold">
              Public Helpline Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
