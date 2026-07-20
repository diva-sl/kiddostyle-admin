import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useProducts } from "../hooks/useProducts";

const fallbackStockWarnings = [
  {
    id: "1",
    title: "Organic Cotton Ribbed Sweater",
    left: "2 units left",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    title: "Linen Overalls - Olive",
    left: "5 units left",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "3",
    title: "Leather T-Strap Shoes",
    left: "3 units left",
    image:
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80",
  },
];

export const SellerRevenueStock: React.FC = () => {
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const [tab, setTab] = useState<"week" | "month">("week");

  // Filter low stock items from live products collection
  const lowStockItems =
    products.length > 0
      ? products
          .filter((p) => (p.stock || 0) <= 5)
          .map((p) => ({
            id: p.id || "",
            title: p.name,
            left: `${p.stock} units left`,
            // p.images might be a string or an array of strings; ensure we pass a single string to img.src
            image: Array.isArray(p.images)
              ? p.images[0] ||
                "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80"
              : p.images ||
                "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
          }))
      : fallbackStockWarnings;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch select-none">
      {/* Weekly Revenue Columns Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
              Weekly Revenue
            </h3>
            <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
              Performance over the last 7 days
            </p>
          </div>
          <div className="flex bg-[#faf8ff] rounded-full p-1 border border-[#dfbec4]/20">
            <button
              onClick={() => setTab("week")}
              className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer border-none ${
                tab === "week"
                  ? "bg-[#ffd9df] text-[#b31f56]"
                  : "text-[#584045]/60 bg-none"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTab("month")}
              className={`px-4 py-1.5 rounded-full font-bold text-[10px] transition-all cursor-pointer border-none ${
                tab === "month"
                  ? "bg-[#ffd9df] text-[#b31f56]"
                  : "text-[#584045]/60 bg-none"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Vertical histograms list */}
        <div className="h-60 flex items-end justify-between gap-4 pt-6 px-2 relative border-b border-[#dfbec4]/20 pb-1">
          {[
            { day: "Mon", val: "$420", h: "40%" },
            { day: "Tue", val: "$680", h: "65%" },
            { day: "Wed", val: "$590", h: "55%" },
            { day: "Thu", val: "$1,100", h: "90%", peak: true },
            { day: "Fri", val: "$480", h: "45%" },
            { day: "Sat", val: "$820", h: "75%" },
            { day: "Sun", val: "$950", h: "85%" },
          ].map((bar, idx) => (
            <div
              key={idx}
              className="flex-grow flex flex-col items-center group relative h-full justify-end"
            >
              <div className="absolute -top-7 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {bar.val}
              </div>
              <div
                className={`w-full transition-all rounded-t-xl ${bar.peak ? "bg-[#ff5c8d]" : "bg-[#ffd9df] hover:bg-[#ff5c8d]/30"}`}
                style={{ height: bar.h }}
              />
              <span
                className={`text-[10px] mt-3.5 ${bar.peak ? "font-extrabold text-[#b31f56]" : "font-bold text-[#584045]/60"}`}
              >
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right stock alerts checklist panel */}
      <div className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <h3 className="font-display text-sm font-extrabold text-[#131b2e] mb-6">
          Low Stock Alerts ({lowStockItems.length})
        </h3>

        <div className="space-y-4">
          {lowStockItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 hover:bg-[#faf8ff] rounded-2xl transition-all border border-[#dfbec4]/10"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#dfbec4]/20">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-[#131b2e] truncate">
                  {item.title}
                </p>
                <p className="text-[10px] text-[#ba1a1a] font-extrabold mt-0.5">
                  {item.left}
                </p>
              </div>
              <button
                onClick={() => item.id && navigate(`/products/edit/${item.id}`)}
                className="w-7 h-7 rounded-full bg-[#f2f3ff] hover:bg-[#b31f56] hover:text-white text-[#b31f56] flex items-center justify-center transition-all cursor-pointer border-none"
                title="Restock Product"
              >
                <MdAdd className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/inventory")}
          className="mt-6 w-full py-2.5 border-2 border-[#dfbec4] hover:bg-[#faf8ff] text-[#584045] font-bold rounded-2xl transition-colors text-xs cursor-pointer border-none"
        >
          View All Inventory
        </button>
      </div>
    </div>
  );
};
