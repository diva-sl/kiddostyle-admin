import React from "react";
import { ShoppingBag, UserPlus, Package2, Star } from "lucide-react";

interface ActivityItem {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  lineActive: boolean;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "New order #KS-9021",
    subtitle: "2 mins ago • $124.50",
    icon: ShoppingBag,
    color:
      "text-[#b31f56] bg-[#e2e7ff] group-hover:bg-[#b31f56] group-hover:text-white",
    lineActive: true,
  },
  {
    id: 2,
    title: "New Customer Registered",
    subtitle: "15 mins ago • Leo M.",
    icon: UserPlus,
    color:
      "text-[#785a00] bg-[#e2e7ff] group-hover:bg-[#785a00] group-hover:text-white",
    lineActive: true,
  },
  {
    id: 3,
    title: "Low Stock Alert",
    subtitle: "1 hour ago • Cotton T-Shirt (Blue)",
    icon: Package2,
    color:
      "text-[#ba1a1a] bg-[#ffdad6]/60 group-hover:bg-[#ba1a1a] group-hover:text-white",
    lineActive: true,
  },
  {
    id: 4,
    title: "Product Review",
    subtitle: "3 hours ago • 5 stars by Anna S.",
    icon: Star,
    color:
      "text-[#006780] bg-[#ffd167]/30 group-hover:bg-[#006780] group-hover:text-white",
    lineActive: false,
  },
];

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#dfbec4]/30 overflow-hidden h-full">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-display text-lg font-extrabold text-[#131b2e]">
          Recent Activity
        </h4>
        <button className="text-xs font-bold text-[#b31f56] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex gap-4 group relative">
              {/* Connecting line */}
              {act.lineActive && (
                <div className="absolute top-10 left-5 w-[1px] h-10 bg-[#dfbec4]/30" />
              )}

              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${act.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="pb-2">
                <p className="text-sm font-bold text-[#131b2e]">{act.title}</p>
                <p className="text-xs text-[#584045]/70 mt-0.5">
                  {act.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
