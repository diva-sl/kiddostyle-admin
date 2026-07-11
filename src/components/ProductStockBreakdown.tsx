import React from "react";
import { MdRefresh, MdMoreHoriz } from "react-icons/md";

interface StockRow {
  variant: string;
  warehouse: number;
  store: number;
  status: string;
  statusColor: string;
  isLow: boolean;
}

const stockData: StockRow[] = [
  {
    variant: "0-3 Months",
    warehouse: 120,
    store: 15,
    status: "Healthy",
    statusColor: "bg-[#b7eaff] text-[#004e61]",
    isLow: false,
  },
  {
    variant: "3-6 Months",
    warehouse: 8,
    store: 2,
    status: "Low Stock",
    statusColor: "bg-[#ffdf9b] text-[#5b4300]",
    isLow: true,
  },
  {
    variant: "6-12 Months",
    warehouse: 85,
    store: 12,
    status: "Healthy",
    statusColor: "bg-[#b7eaff] text-[#004e61]",
    isLow: false,
  },
  {
    variant: "12-18 Months",
    warehouse: 156,
    store: 14,
    status: "Healthy",
    statusColor: "bg-[#b7eaff] text-[#004e61]",
    isLow: false,
  },
];

export const ProductStockBreakdown: React.FC = () => {
  return (
    <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      {/* Title block */}
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e]">
          Stock Breakdown
        </h3>

        <div className="flex items-center gap-3">
          <span className="bg-[#f2f3ff] px-3 py-1.5 rounded-full font-bold text-[10px] text-[#584045]">
            Total: 412 Units
          </span>
          <button className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045] transition-colors cursor-pointer">
            <MdRefresh className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid list details */}
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
            {stockData.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#faf8ff] transition-colors">
                <td className="p-3 font-bold">{row.variant}</td>
                <td
                  className={`p-3 ${row.isLow ? "text-[#ba1a1a] font-extrabold" : ""}`}
                >
                  {row.warehouse}
                </td>
                <td className="p-3">{row.store}</td>
                <td className="p-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold ${row.statusColor}`}
                  >
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
