import React from "react";
import { useNavigate } from "react-router-dom";
import { MdShoppingBag, MdPersonAdd, MdStar, MdLoyalty } from "react-icons/md";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer } from "../services/customerService";

interface SpenderItem {
  id: string;
  name: string;
  detail: string;
  total: string;
  badge: string;
  badgeColor: string;
  image: string;
}

interface ActivityItem {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconColor: string;
}

const fallbackSpenders: SpenderItem[] = [
  {
    id: "1",
    name: "Emilia Clarke",
    detail: "Joined Jan 2023 • 12 Orders",
    total: "$2,140.50",
    badge: "VIP Member",
    badgeColor: "bg-[#ffd9df] text-[#b31f56]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-h0MnvO1cpTI0LqXcO0mE0u5xfnQf0TOHFwJa_XWmMiFuKpOuQd29ybh7xbsXvETPywd1evUyCA-s1Y_dSLICJFuhwVxNDM85mzkXRaUEfK2z59bGseKpM3-e7PDO0bUxRCbvxG2lM0Fd55mmQTC8Eb-c2Rk7Vb4oxT-5Ar4LGPlzaefeMBaLa6yd_50-ghqa4LuLo1HXUR_ruGmG3scoa2-Ov6dNKnf3CXeDmQxPjA9L_0HKsOzlWeYt4sA9MLksLkumYj7aw6ev",
  },
  {
    id: "2",
    name: "Marcus Henderson",
    detail: "Joined Mar 2023 • 8 Orders",
    total: "$1,892.00",
    badge: "VIP Member",
    badgeColor: "bg-[#ffd9df] text-[#b31f56]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2IvsGZjc0G_RFjaHrDbmGH2uUonViheyF7phXBtglKpHkAgQUDLglxiMbkmoCz6pEWTx7ZSgm4L6SBlJBJgVKnx2EY0tCONxklIbVyZLn7uz7hGUkl-kGeyLxqkqRfmdBP3Z_W9rRgzgQpCBn1rZZRcdqFEkGhSz3TkrVC1l0U2ZpNu6H5CZVTLiaZee_X9rGmyTLpyZYlA797KcSF6ceBUQ4IRzFodjdS9Ja5HrmvxI9xybNCUr-OqfGhKwhg0N1ixNb-yTO18i",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    detail: "Joined June 2022 • 15 Orders",
    total: "$1,450.20",
    badge: "Platinum",
    badgeColor: "bg-[#00a4ca]/10 text-[#006780]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDywZhcG9Uj4c4uEnDWX8EU_M5MwDefFw3qpnbMh2j7k6dHpzk7tD80mRjKtY0D5Tphy-EdA715kQOWhJ_uesFfYC7rAzz5Mv9572FXSW3dwseIo51odV1H4YfAP8FX9Nwf4f3lsLslOr6bNMu172FEt-AXa6f0rhM3QhFC88KlMFhtqrb53PaJhYCG1kGVYZN_h6GKWzihqIDHIym-CibCLQny0FR9KjD1mII_jO-Mjcar8gukxEeENeh5k2v88uYJKvY-odbWj3qD",
  },
];

const activityList: ActivityItem[] = [
  {
    title: "New Order Resolved",
    description: "Eleanor Mason spent $142.00",
    time: "2 minutes ago",
    icon: <MdShoppingBag className="w-4 h-4" />,
    iconColor: "bg-[#ffd9df] text-[#b31f56]",
  },
  {
    title: "New Registration",
    description: "David Smith joined KiddoStyle",
    time: "1 hour ago",
    icon: <MdPersonAdd className="w-4 h-4" />,
    iconColor: "bg-[#ffd167]/30 text-[#785a00]",
  },
  {
    title: "5-Star Review",
    description: '"Best quality fabric for kids!" - Maya',
    time: "3 hours ago",
    icon: <MdStar className="w-4 h-4" />,
    iconColor: "bg-[#b7eaff] text-[#006780]",
  },
  {
    title: "Milestone Reached",
    description: "Sophia Rodriguez moved to Platinum",
    time: "5 hours ago",
    icon: <MdLoyalty className="w-4 h-4" />,
    iconColor: "bg-[#f2f3ff] text-[#584045]",
  },
];

export const TopSpendersActivity: React.FC = () => {
  const navigate = useNavigate();
  const { data: customers = [] } = useCustomers();

  // Sort by spent desc to display top spenders dynamically
  const displaySpenders: SpenderItem[] =
    customers.length > 0
      ? [...customers]
          .sort((a, b) => b.totalSpent - a.totalSpent)
          .slice(0, 3)
          .map((c) => ({
            id: c.id || "",
            name: c.name,
            detail: `Joined ${new Date(c.joinedDate || Date.now()).toLocaleDateString("en-US", { month: "short", year: "numeric" })} • Active`,
            total: `$${c.totalSpent.toLocaleString()}`,
            badge: c.totalSpent > 1000 ? "VIP Member" : "Verified Customer",
            badgeColor:
              c.totalSpent > 1000
                ? "bg-[#ffd9df] text-[#b31f56]"
                : "bg-[#00a4ca]/10 text-[#006780]",
            image:
              c.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          }))
      : fallbackSpenders;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch select-none">
      {/* Top spenders card details */}
      <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Top Spenders
          </h4>
          <button
            onClick={() => navigate("/customers")}
            className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {displaySpenders.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/customers/${user.id}`)}
              className="flex items-center justify-between p-4 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/10 hover:bg-[#f2f3ff]/40 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white bg-white">
                  <img
                    className="w-full h-full object-cover"
                    src={user.image}
                    alt={user.name}
                  />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#131b2e] group-hover:text-[#b31f56] transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-[#584045]/60 font-semibold mt-0.5">
                    {user.detail}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-sm font-extrabold text-[#131b2e]">
                  {user.total}
                </p>
                <span
                  className={`inline-block text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1.5 ${user.badgeColor}`}
                >
                  {user.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity timeline cards */}
      <div className="lg:col-span-1 bg-white p-6 rounded-[2rem] border border-[#dfbec4]/30 shadow-sm flex flex-col select-none">
        <h4 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Recent Activity
        </h4>

        <div className="space-y-6 flex-grow">
          {activityList.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start relative">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${item.iconColor} z-10`}
                >
                  {item.icon}
                </div>
                {idx < activityList.length - 1 && (
                  <div className="w-0.5 h-10 bg-[#dfbec4]/20 absolute top-8 left-4 -translate-x-1/2" />
                )}
              </div>

              <div>
                <p className="font-bold text-xs text-[#131b2e]">{item.title}</p>
                <p className="text-[10px] text-[#584045]/70 font-semibold mt-0.5 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-[9px] text-[#b31f56] font-bold mt-1.5">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
