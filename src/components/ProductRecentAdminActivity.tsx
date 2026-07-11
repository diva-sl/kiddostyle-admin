import React from "react";
import { MdHistory } from "react-icons/md";

interface ActivityLog {
  initials: string;
  avatarColor: string;
  title: string;
  meta: string;
  nestedBox?: string;
}

const logs: ActivityLog[] = [
  {
    initials: "SJ",
    avatarColor: "bg-[#ffd9df] text-[#b31f56]",
    title: "Stock replenished (3-6m)",
    meta: "Sarah Jenkins • 2 hours ago",
    nestedBox: "Added 50 units to Main Warehouse via PO #9822",
  },
  {
    initials: "MK",
    avatarColor: "bg-[#b7eaff] text-[#006780]",
    title: "Price updated",
    meta: "Michael K. • Yesterday at 4:15 PM",
  },
  {
    initials: "SY",
    avatarColor: "bg-[#eaedff] text-[#584045]",
    title: "Image gallery modified",
    meta: "System • 3 days ago",
  },
];

export const ProductRecentAdminActivity: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      {/* Title */}
      <h3 className="font-display text-base font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#dfbec4]/10 pb-3">
        <MdHistory className="text-[#b31f56] w-5 h-5 shrink-0" />
        Recent Admin Activity
      </h3>

      {/* Logs feed list */}
      <div className="space-y-4">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${log.avatarColor}`}
            >
              {log.initials}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <p className="text-xs font-bold text-[#131b2e] truncate">
                {log.title}
              </p>
              <p className="text-[10px] text-[#584045]/60 font-semibold">
                {log.meta}
              </p>

              {log.nestedBox && (
                <div className="bg-[#f2f3ff] p-2.5 rounded-xl border border-[#dfbec4]/20 text-[10px] font-bold text-[#584045] mt-1">
                  {log.nestedBox}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom link */}
      <div className="text-center pt-2">
        <button className="text-xs font-bold text-[#b31f56] hover:underline cursor-pointer">
          View Full Audit Log
        </button>
      </div>
    </section>
  );
};
