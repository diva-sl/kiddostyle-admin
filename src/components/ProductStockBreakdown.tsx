import React from "react";
import { MdRefresh, MdMoreHoriz } from "react-icons/md";

interface BreakdownProps {
  stock?: number;
}

export const ProductStockBreakdown: React.FC<BreakdownProps> = ({ stock }) => {
  const displayStock = stock !== undefined ? stock : 412;

  // Dynamically partition stock units across sizes
  const stockRows = [
    {
      variant: "0-3 Months",
      warehouse: Math.floor(displayStock * 0.3),
      store: Math.floor(displayStock * 0.05),
      status: "Healthy",
      statusColor: "bg-[#b7eaff] text-[#004e61]",
      isLow: false,
    },
    {
      variant: "3-6 Months",
      warehouse: Math.floor(displayStock * 0.02),
      store: Math.floor(displayStock * 0.01),
      status: displayStock <= 10 ? "Low Stock" : "Healthy",
      statusColor: displayStock <= 10 ? "bg-[#ffdf9b] text-[#5b4300]" : "bg-[#b7eaff] text-[#004e61]",
      isLow: displayStock <= 10,
    },
    {
      variant: "6-12 Months",
      warehouse: Math.floor(displayStock * 0.2),
      store: Math.floor(displayStock * 0.03),
      status: "Healthy",
      statusColor: "bg-[#b7eaff] text-[#004e61]",
      isLow: false,
    },
    {
      variant: "12-18 Months",
      warehouse: Math.floor(displayStock * 0.4),
      store: Math.floor(displayStock * 0.04),
      status: "Healthy",
      statusColor: "bg-[#b7eaff] text-[#004e61]",
      isLow: false,
    },
  ];

  return (
    <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e]">
          Stock Breakdown
        </h3>

        <div className="flex items-center gap-3">
          <span className="bg-[#f2f3ff] px-3 py-1.5 rounded-full font-bold text-[10px] text-[#584045]">
            Total: {displayStock} Units
          </span>
          <button className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045] transition-colors cursor-pointer">
            <MdRefresh className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 font-bold text-[10px] text-[#584045]/60 uppercase tracking-wider">
              <th className="p-3">Size Variant</th>
              <th className="p-3">Main Warehouse</th>
              <th className="p-3">Retail Store</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {stockRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#faf8ff] transition-colors">
                <td className="p-3 font-bold">{row.variant}</td>
                <td className={`p-3 ${row.isLow ? "text-[#ba1a1a] font-extrabold" : ""}`}>
                  {row.warehouse}
                </td>
                <td className="p-3">{row.store}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {row.isLow ? (
                    <button className="text-xs font-extrabold text-[#b31f56] hover:underline cursor-pointer">
                      Restock
                    </button>
                  ) : (
                    <button className="text-[#584045]/60 hover:text-[#b31f56] transition-colors cursor-pointer">
                      <MdMoreHoriz className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
