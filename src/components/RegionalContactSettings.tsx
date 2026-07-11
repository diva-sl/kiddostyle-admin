import React, { useState } from "react";

export const RegionalContactSettings: React.FC = () => {
  const [currency, setCurrency] = useState("USD - US Dollar ($)");
  const [timezone, setTimezone] = useState(
    "(GMT-05:00) Eastern Time (US & Canada)",
  );
  const [email, setEmail] = useState("hello@kiddostyle.com");
  const [phone, setPhone] = useState("+1 (555) 000-1234");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
      {/* Left Regional Panel */}
      <div className="bg-white p-6 rounded-xl border border-[#dfbec4]/30 shadow-sm space-y-4">
        <h3 className="font-display text-sm font-extrabold text-[#b31f56]">
          Regional
        </h3>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56] cursor-pointer"
            >
              <option>USD - US Dollar ($)</option>
              <option>EUR - Euro (€)</option>
              <option>GBP - British Pound (£)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 font-bold">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56] cursor-pointer"
            >
              <option>(GMT-05:00) Eastern Time (US & Canada)</option>
              <option>(GMT-08:00) Pacific Time (US & Canada)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Contact Info Panel */}
      <div className="bg-white p-6 rounded-xl border border-[#dfbec4]/30 shadow-sm space-y-4">
        <h3 className="font-display text-sm font-extrabold text-[#b31f56]">
          Contact Info
        </h3>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold">Public Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-bold">Phone Number</label>
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
