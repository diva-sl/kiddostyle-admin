import React, { useState, useEffect } from "react";
import {
  MdSearch,
  MdNotifications,
  MdHelpOutline,
  MdInfo,
  MdDoneAll,
} from "react-icons/md";
import { BrandingSettings } from "../components/BrandingSettings";
import { RegionalContactSettings } from "../components/RegionalContactSettings";
import { StoreFeaturesConfig } from "../components/StoreFeaturesConfig";
import { PaymentSettings } from "../components/PaymentSettings";
import { ShippingSettings } from "../components/ShippingSettings";
import { NotificationSettings } from "../components/NotificationSettings";
import { useSettings, useUpdateSettings } from "../hooks/useSettings";

type SettingsTab = "general" | "payments" | "shipping" | "notifications";

export const SettingsPage: React.FC = () => {
  const { data: dbSettings } = useSettings();
  const updateMutation = useUpdateSettings();

  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saving, setSaving] = useState(false);

  // 1. General Settings State
  const [siteName, setSiteName] = useState("KiddoStyle Kids Fashion");
  const [siteEmail, setSiteEmail] = useState("hello@kiddostyle.com");
  const [sitePhone, setSitePhone] = useState("+1 (555) 000-1234");
  const [currency, setCurrency] = useState("USD");
  const [logo, setLogo] = useState("");

  // 2. Payment Settings State
  const [stripeKey, setStripeKey] = useState("pk_test_sample12345");
  const [paypalClientId, setPaypalClientId] = useState("client_id_sample98765");
  const [codEnabled, setCodEnabled] = useState(true);

  // 3. Shipping Settings State
  const [standardFee, setStandardFee] = useState(5.0);
  const [expressFee, setExpressFee] = useState(15.0);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50.0);

  // 4. Notification Settings State
  const [orderEmailAlert, setOrderEmailAlert] = useState(
    "orders@kiddostyle.com",
  );
  const [orderConfirmationEnabled, setOrderConfirmationEnabled] =
    useState(true);

  useEffect(() => {
    if (dbSettings) {
      if (dbSettings.siteName) setSiteName(dbSettings.siteName);
      if (dbSettings.siteEmail) setSiteEmail(dbSettings.siteEmail);
      if (dbSettings.sitePhone) setSitePhone(dbSettings.sitePhone);
      if (dbSettings.currency) setCurrency(dbSettings.currency);
      if (dbSettings.logo) setLogo(dbSettings.logo);

      const anySettings = dbSettings as any;
      if (anySettings.stripeKey) setStripeKey(anySettings.stripeKey);
      if (anySettings.paypalClientId)
        setPaypalClientId(anySettings.paypalClientId);
      if (typeof anySettings.codEnabled === "boolean")
        setCodEnabled(anySettings.codEnabled);
      if (typeof anySettings.shippingFee === "number")
        setStandardFee(anySettings.shippingFee);
      if (typeof anySettings.expressFee === "number")
        setExpressFee(anySettings.expressFee);
      if (typeof anySettings.freeShippingThreshold === "number")
        setFreeShippingThreshold(anySettings.freeShippingThreshold);
      if (anySettings.orderEmailAlert)
        setOrderEmailAlert(anySettings.orderEmailAlert);
      if (typeof anySettings.orderConfirmationEnabled === "boolean")
        setOrderConfirmationEnabled(anySettings.orderConfirmationEnabled);
    }
  }, [dbSettings]);

  const handleSaveAll = () => {
    setSaving(true);
    const payload = {
      siteName,
      siteEmail,
      sitePhone,
      currency,
      logo,
      stripeKey,
      paypalClientId,
      codEnabled,
      shippingFee: standardFee,
      expressFee,
      freeShippingThreshold,
      orderEmailAlert,
      orderConfirmationEnabled,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => alert("Global settings updated across all modules!"),
      onError: (err: any) => alert("Failed to save settings: " + err.message),
      onSettled: () => setSaving(false),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 relative select-none">
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
          <button className="p-2 text-[#584045]/70 hover:text-[#b31f56] transition-colors relative cursor-pointer border-none bg-none">
            <MdNotifications className="w-5 h-5" />
            <span className="w-1.5 h-1.5 bg-[#b31f56] rounded-full absolute top-2 right-2" />
          </button>
          <button className="p-2 text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer border-none bg-none">
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
            className={`pb-3 border-b-2 capitalize transition-all cursor-pointer relative border-none bg-none ${
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

      {/* Render Active Tab Content */}
      {activeTab === "general" && (
        <div className="space-y-6 max-w-5xl">
          <BrandingSettings
            siteTitle={siteName}
            setSiteTitle={setSiteName}
            logo={logo}
            setLogo={setLogo}
          />
          <RegionalContactSettings
            currency={currency}
            setCurrency={setCurrency}
            email={siteEmail}
            setEmail={setSiteEmail}
            phone={sitePhone}
            setPhone={setSitePhone}
          />
          <StoreFeaturesConfig />
        </div>
      )}

      {activeTab === "payments" && (
        <PaymentSettings
          stripeKey={stripeKey}
          setStripeKey={setStripeKey}
          paypalClientId={paypalClientId}
          setPaypalClientId={setPaypalClientId}
          codEnabled={codEnabled}
          setCodEnabled={setCodEnabled}
        />
      )}

      {activeTab === "shipping" && (
        <ShippingSettings
          standardFee={standardFee}
          setStandardFee={setStandardFee}
          expressFee={expressFee}
          setExpressFee={setExpressFee}
          freeShippingThreshold={freeShippingThreshold}
          setFreeShippingThreshold={setFreeShippingThreshold}
        />
      )}

      {activeTab === "notifications" && (
        <NotificationSettings
          orderEmailAlert={orderEmailAlert}
          setOrderEmailAlert={setOrderEmailAlert}
          orderConfirmationEnabled={orderConfirmationEnabled}
          setOrderConfirmationEnabled={setOrderConfirmationEnabled}
        />
      )}

      {/* Sticky Save Footer */}
      <footer className="fixed bottom-0 left-64 right-0 h-20 bg-white/75 backdrop-blur-md border-t border-[#dfbec4]/30 flex items-center justify-between px-12 z-40">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#584045]/80">
          <MdInfo className="w-4 h-4 text-[#b31f56]" />
          Synchronized with Go/MongoDB settings collection
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-[#b31f56] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer border-none"
          >
            {saving ? "Saving..." : "Save Changes"}
            <MdDoneAll className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;
