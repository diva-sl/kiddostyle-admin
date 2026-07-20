import React from "react";
import { MdPayments, MdVpnKey } from "react-icons/md";

interface PaymentSettingsProps {
  stripeKey: string;
  setStripeKey: (val: string) => void;
  paypalClientId: string;
  setPaypalClientId: (val: string) => void;
  codEnabled: boolean;
  setCodEnabled: (val: boolean) => void;
}

export const PaymentSettings: React.FC<PaymentSettingsProps> = ({
  stripeKey,
  setStripeKey,
  paypalClientId,
  setPaypalClientId,
  codEnabled,
  setCodEnabled,
}) => {
  return (
    <div className="space-y-6 max-w-5xl select-none">
      {/* Stripe Credentials Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#b31f56]/10 flex items-center justify-center text-[#b31f56]">
            <MdPayments className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              Stripe Integration
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold">
              Accept Credit &amp; Debit Card payments online
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold flex items-center gap-1">
              <MdVpnKey className="w-4 h-4 text-[#584045]/60" />
              Stripe Publishable Key
            </label>
            <input
              type="text"
              placeholder="pk_test_..."
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56] font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* PayPal Credentials Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffd167]/20 flex items-center justify-center text-[#785a00]">
            <MdPayments className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              PayPal Smart Checkout
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold">
              Process global payments via PayPal accounts
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold">PayPal Client ID</label>
            <input
              type="text"
              placeholder="client_id_..."
              value={paypalClientId}
              onChange={(e) => setPaypalClientId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56] font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* Cash on Delivery Toggle */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
            Cash on Delivery (COD)
          </h3>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
            Allow customers to pay in cash upon package delivery
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={codEnabled}
            onChange={(e) => setCodEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/15 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b31f56]" />
        </label>
      </div>
    </div>
  );
};
