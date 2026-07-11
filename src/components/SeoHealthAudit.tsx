import React from "react";
import { MdAnalytics } from "react-icons/md";

interface AuditItem {
  title: string;
  badge: string;
  badgeClass: string;
  score: number;
  barColor: string;
  scoreColor: string;
}

const auditList: AuditItem[] = [
  {
    title: "Summer Sale 2024",
    badge: "OPTIMIZED",
    badgeClass: "bg-[#ffd167]/30 text-[#765900]",
    score: 92,
    barColor: "bg-[#ffd167]",
    scoreColor: "text-[#765900]",
  },
  {
    title: "Back to School",
    badge: "FIX NEEDED",
    badgeClass: "bg-[#ffd9df] text-[#b31f56]",
    score: 48,
    barColor: "bg-[#b31f56]",
    scoreColor: "text-[#b31f56]",
  },
  {
    title: "Holiday Teaser",
    badge: "PENDING",
    badgeClass: "bg-[#00a4ca]/10 text-[#006780]",
    score: 71,
    barColor: "bg-[#00a4ca]",
    scoreColor: "text-[#006780]",
  },
];

export const SeoHealthAudit: React.FC = () => {
  return (
    <div className="bg-[#e2e7ff]/30 p-6 rounded-3xl border border-[#dfbec4]/30 select-none">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          SEO Health
        </h4>
        <MdAnalytics className="text-[#b31f56] w-6 h-6 shrink-0" />
      </div>

      {/* Audit Items lists */}
      <div className="space-y-4">
        {auditList.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow-sm border border-[#dfbec4]/20"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-xs text-[#131b2e] truncate pr-2">
                {item.title}
              </span>
              <span
                className={`px-2 py-0.5 text-[8px] font-extrabold rounded-full shrink-0 ${item.badgeClass}`}
              >
                {item.badge}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-grow h-2 bg-[#f2f3ff] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.barColor}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className={`font-extrabold text-sm ${item.scoreColor}`}>
                {item.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Audit execution trigger button */}
      <button className="w-full mt-6 py-2.5 text-center font-bold text-xs text-[#b31f56] border-2 border-[#b31f56] rounded-full bg-white hover:bg-[#b31f56] hover:text-white transition-all active:scale-[0.98] cursor-pointer">
        Run Full Audit
      </button>
    </div>
  );
};
