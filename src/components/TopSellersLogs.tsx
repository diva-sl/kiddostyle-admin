import React from "react";
import {
  MdCheckCircle,
  MdPersonAdd,
  MdStar,
  MdInventory,
} from "react-icons/md";

interface BestProduct {
  title: string;
  sold: string;
  amount: string;
  growth: string;
  image: string;
}

interface ActivityLog {
  title: string;
  detail: string;
  icon: React.ReactNode;
  iconBg: string;
}

const bestProductsList: BestProduct[] = [
  {
    title: "Organic Cotton Ribbed Tee",
    sold: "342 units sold",
    amount: "$8,550",
    growth: "+18%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe2e68A8wtsS7BbJGhjJtHCZUTGX6KzAzREhCfucqAqtrsjE56GTjIecP835BXq3jxGUxTD6r5snuSHeRn_HXITDmzrOLrIe2xwJuOcO20MVeL4wvLp7mg5xKPSzBOkiXX-VbsVhPeGVbh8ljuUSLFOGC3yBiT0Wch5Fqo9np4wL-CJLfZOHd4EL8bQIszHupVWn3P3XTD-XPeFOpG4lTzTPsCNssIJ2-zY4RoGNl2ru7oS96s-mvCiq1ms2tkziqMfLIxwwZgjsea",
  },
  {
    title: "Playground Active Sneakers",
    sold: "289 units sold",
    amount: "$12,427",
    growth: "+12%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHId2Ft5P_Gu4knSMr8IIdtXBVLYxLlTEUKJRM4bjZW2y98oTUWiB9uA0aMje60nKsaFnbTeMkViUkXZp4I_aUzMAsZrh-c_PDwR5Zmi9Zzgi3QCQLHpkL1kFzvlpczT8Oh0KV3KkFNZYbHQtqZkuuxQptvodPGz1SVS4Ss4iLfgC0CBdH-wUNXDB-6itzSIr0PmKFfvl9oJNrKw2D5_kls3sjzDIREt6j0I_9uljqfArBUuW8P9P__U3RxF1MpMRFXjTY2BYxzJxQ",
  },
  {
    title: "Embroidered Denim Jacket",
    sold: "215 units sold",
    amount: "$15,050",
    growth: "-4%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCibXIdhbTPxVG8fgGDwt9XXX0CaBKrUtMEcVrOKDtzp0vVIl5-ylav1TLLyJr50AwSbghEouAnkP_7dCTO7k2YoW-olNL3GCaUAjpmvGwAwA0Q_eo9pgCVvGy1aUka6HGbBYwJQRBq838cwelR3tqrY9kACqrNWdW4CaGkEpwY4qnNIkM5zCtTWFBulUQlX9cSKODfeFyn92LoI0c-aWu_wcaeQ52Znn2QCE2dsbrKEaS8CXLNJaxS5IHS0E9fnh3YjVd66v1CDN1n",
  },
];

const logsList: ActivityLog[] = [
  {
    title: "New Order #4829 placed by James Wilson",
    detail: "2 minutes ago • $142.00",
    icon: <MdCheckCircle className="w-5 h-5" />,
    iconBg: "bg-green-50 text-green-700",
  },
  {
    title: "New Customer account created: Emily Chen",
    detail: "15 minutes ago",
    icon: <MdPersonAdd className="w-5 h-5" />,
    iconBg: "bg-[#b7eaff] text-[#006780]",
  },
  {
    title: "New Review received for 'Ribbed Tee' (5 stars)",
    detail: "42 minutes ago",
    icon: <MdStar className="w-5 h-5" />,
    iconBg: "bg-[#ffd167]/30 text-[#785a00]",
  },
  {
    title: "Low Stock Alert: Active Sneakers (3 left)",
    detail: "1 hour ago",
    icon: <MdInventory className="w-5 h-5" />,
    iconBg: "bg-[#ffdad6] text-[#ba1a1a]",
  },
];

export const TopSellersLogs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch select-none">
      {/* Top products seller card */}
      <div className="bg-white p-6 rounded-[40px] border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
            Top Selling Products
          </h4>
          <button className="text-[#b31f56] font-bold text-xs hover:underline cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {bestProductsList.map((prod, idx) => {
            const isNegative = prod.growth.startsWith("-");
            return (
              <div
                key={idx}
                className="flex items-center justify-between group cursor-pointer border-b border-[#dfbec4]/10 pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#dfbec4]/20 bg-[#faf8ff]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={prod.image}
                      alt={prod.title}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#131b2e] group-hover:text-[#b31f56] transition-colors">
                      {prod.title}
                    </p>
                    <p className="text-[10px] text-[#584045]/60 font-semibold mt-0.5">
                      {prod.sold}
                    </p>
                  </div>
                </div>

                <div className="text-right select-none">
                  <p className="font-bold text-xs text-[#b31f56]">
                    {prod.amount}
                  </p>
                  <p
                    className={`text-[10px] font-bold mt-0.5 ${isNegative ? "text-[#ba1a1a]" : "text-green-700"}`}
                  >
                    {prod.growth}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Event activity timeline */}
      <div className="bg-white p-6 rounded-[40px] border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <h4 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Recent Activity
        </h4>

        <div className="space-y-5">
          {logsList.map((log, idx) => (
            <div
              key={idx}
              className="flex gap-3 items-start border-b border-[#dfbec4]/10 pb-3 last:border-b-0 last:pb-0"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${log.iconBg}`}
              >
                {log.icon}
              </div>

              <div>
                <p className="text-xs font-semibold text-[#131b2e] leading-relaxed">
                  {log.title}
                </p>
                <p className="text-[10px] text-[#584045]/60 font-semibold mt-1">
                  {log.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
