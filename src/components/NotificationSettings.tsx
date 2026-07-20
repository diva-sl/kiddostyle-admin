import React from "react";
import { MdNotificationsActive, MdMail } from "react-icons/md";

interface NotificationSettingsProps {
  orderEmailAlert: string;
  setOrderEmailAlert: (val: string) => void;
  orderConfirmationEnabled: boolean;
  setOrderConfirmationEnabled: (val: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  orderEmailAlert,
  setOrderEmailAlert,
  orderConfirmationEnabled,
  setOrderConfirmationEnabled,
}) => {
  return (
    <div className="space-y-6 max-w-5xl select-none">
      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#b31f56]/10 flex items-center justify-center text-[#b31f56]">
            <MdNotificationsActive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              Email Alert Dispatcher
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold">
              Set admin recipient emails for new order alerts
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold text-[#131b2e]">
          <div>
            <label className="block mb-1.5 font-bold flex items-center gap-1">
              <MdMail className="w-4 h-4 text-[#584045]/60" />
              Admin New Order Notification Recipient
            </label>
            <input
              type="email"
              value={orderEmailAlert}
              onChange={(e) => setOrderEmailAlert(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf8ff] border border-[#dfbec4]/35 outline-none focus:border-[#b31f56]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
            Automated Order Receipts
          </h3>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
            Send instant email confirmation receipts to customers upon checkout
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={orderConfirmationEnabled}
            onChange={(e) => setOrderConfirmationEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/15 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b31f56]" />
        </label>
      </div>
    </div>
  );
};
