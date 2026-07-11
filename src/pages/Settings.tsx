import React, { useState } from "react";
import {
  MdSearch,
  MdNotifications,
  MdHelpOutline,
  MdPayments,
  MdLocalShipping,
  MdNotificationsActive,
  MdInfo,
  MdDoneAll,
} from "react-icons/md";
import { BrandingSettings } from "../components/BrandingSettings";
import { RegionalContactSettings } from "../components/RegionalContactSettings";
import { StoreFeaturesConfig } from "../components/StoreFeaturesConfig";

type SettingsTab = "general" | "payments" | "shipping" | "notifications";

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  return (
    <div className="space-y-8 pb-32 relative select-none">
      {/* Top Header Search Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Global Settings
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Configure your site parameters and preferences.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <MdSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#584045]/60" />
            <input
              type="text"
              placeholder="Search settings..."
              className="pl-10 pr-4 py-2 bg-[#faf8ff] rounded-full text-xs font-semibold border border-[#dfbec4]/30 outline-none w-60 focus:border-[#b31f56]"
            />
          </div>
          <button className="p-2 text-[#584045]/70 hover:text-[#b31f56] transition-colors relative cursor-pointer">
            <MdNotifications className="w-5 h-5" />
            <span className="w-1.5 h-1.5 bg-[#b31f56] rounded-full absolute top-2 right-2" />
          </button>
          <button className="p-2 text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer">
            <MdHelpOutline className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Tabs navigation panel */}
      <div className="flex gap-8 border-b border-[#dfbec4]/20 select-none text-xs font-extrabold">
        {(
          ["general", "payments", "shipping", "notifications"] as SettingsTab[]
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 border-b-2 capitalize transition-all cursor-pointer relative ${
              activeTab === tab
                ? "text-[#b31f56] border-b-[#ffd167] font-bold"
                : "text-[#584045]/60 border-b-transparent hover:text-[#131b2e]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ffd167] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Conditional Tabs render contents */}
      {activeTab === "general" && (
        <div className="space-y-6 max-w-5xl">
          <BrandingSettings />
          <RegionalContactSettings />
          <StoreFeaturesConfig />
        </div>
      )}

      {activeTab === "payments" && (
        <div className="py-20 text-center space-y-4 max-w-5xl bg-white rounded-3xl border border-[#dfbec4]/25">
          <MdPayments className="w-14 h-14 mx-auto text-[#dfbec4]" />
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Payment Gateways
          </h4>
          <p className="text-xs text-[#584045]/70 font-semibold">
            Configure Stripe, PayPal and Apple Pay integrations here.
          </p>
        </div>
      )}

      {activeTab === "shipping" && (
        <div className="py-20 text-center space-y-4 max-w-5xl bg-white rounded-3xl border border-[#dfbec4]/25">
          <MdLocalShipping className="w-14 h-14 mx-auto text-[#dfbec4]" />
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Shipping & Fulfillment
          </h4>
          <p className="text-xs text-[#584045]/70 font-semibold">
            Set your delivery zones and carrier rates.
          </p>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="py-20 text-center space-y-4 max-w-5xl bg-white rounded-3xl border border-[#dfbec4]/25">
          <MdNotificationsActive className="w-14 h-14 mx-auto text-[#dfbec4]" />
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Email Notifications
          </h4>
          <p className="text-xs text-[#584045]/70 font-semibold">
            Manage customer and admin alert templates.
          </p>
        </div>
      )}

      {/* Sticky Save Footer */}
      <footer className="fixed bottom-0 left-64 right-0 h-20 bg-white/75 backdrop-blur-md border-t border-[#dfbec4]/30 flex items-center justify-between px-12 z-40">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#584045]/80">
          <MdInfo className="w-4 h-4 text-[#b31f56]" />
          Last saved: Today at 09:42 AM
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-full text-xs font-bold text-[#584045] hover:bg-[#f2f3ff] transition-all cursor-pointer">
            Discard Changes
          </button>

          <button className="px-6 py-2.5 rounded-full bg-[#b31f56] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            Save Changes
            <MdDoneAll className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
export default SettingsPage;
