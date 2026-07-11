import React, { useState } from "react";
import {
  MdWarning,
  MdBlock,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface InventoryItemProps {
  id: string;
  name: string;
  category: string;
  sku: string;
  warehouse: string;
  totalStock: number;
  committed: number;
  available: number;
  statusText: string;
  statusType: "healthy" | "low" | "out" | "active";
  isHighDemand?: boolean;
  image: string;
}

const inventoryRows: InventoryItemProps[] = [
  {
    id: "1",
    name: "Cotton Peony Jumpsuit",
    category: "Kids / Apparel",
    sku: "PJ-2024-PNK-S",
    warehouse: "SEATTLE-01",
    totalStock: 12,
    committed: 4,
    available: 8,
    statusText: "Low Stock",
    statusType: "low",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa4AvJgh8w0evhKQIZRY4v46-uHuxq3zbk5qVdJ_BDqSi9_7GCNv8Zz4dDbveE574IMzVewAip46OwNZvbJ4EavYkKMd6e2i5F2_iX4sMJQu5e8J3tSdhpmXay8rwozgRJjqf2EcyquXWFE1wc7d0Y2B-QBBngdRrR4oUwRQn_hPpS92fsf0yL35NiI3_yRwUKwsqF8MzDh0HQzQAH-TSa52jeUwLYMFeG6v0ir5OimxUjujkiGIh1aEcNq8b8bgCImIq4mR_4Eggb",
  },
  {
    id: "2",
    name: "Heritage Leather Boots",
    category: "Kids / Footwear",
    sku: "BT-772-TAN-24",
    warehouse: "LONDON-H",
    totalStock: 452,
    committed: 28,
    available: 424,
    statusText: "Healthy",
    statusType: "healthy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYX6k3A9g3O4F9w-7da5RFPUlgDV0QrKcxOpALU8oOQuwUCg6qwDtNdXKii2shRB1XXnFQr_j-OorMWmny7m1iZOZVvQRZ2VSswTRrO-Gsbm8wawzFrK5dw4UFHXxAYw_U9nbEJp-RcgG6yE3ykutIiIrb-ZlWcJ2QGqWQlzG_RtBF0k1CyBPp1mP8Js5cAriI83vbnb4RpLYZ-MgaR0yyRs0Wuv0UQmdowMLJiOMBmMWGc7khdJEPlu0C5rPzwNRjIaUYPDtGR0W",
  },
  {
    id: "3",
    name: "Midnight Wool Sweater",
    category: "Kids / Knitwear",
    sku: "SW-991-NVY-M",
    warehouse: "NEWJERSEY-H",
    totalStock: 0,
    committed: 0,
    available: 0,
    statusText: "Out of Stock",
    statusType: "out",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEufj19w_dLjq6nijczUpkemHKT7_f-2eb5RvSKE8P024u32Hp8crUfDG-YRpnzYsLn6AWAwYWD5EGVrOZTit4pqPbLpG8KVYlkBrZCQB6C7r4TXTyqrzhQCdpnTxzGvdh1sgR-e6pbnjTRj8OKNlovWRtpYoZu-Agvz3CUQSsmQoqSCvDUAuPwRNm2zB3CoDe72BhJ_jS9-ypbfRB95g5VD4-j7M4wSW3GTfovyQrlmqN7FjFZA1NujVa0ZnxawQ-9ReUsX7lESL",
  },
  {
    id: "4",
    name: "Artisan Animal Blocks",
    category: "Toys / Wooden",
    sku: "TY-404-WDN-S",
    warehouse: "SEATTLE-01",
    totalStock: 1200,
    committed: 450,
    available: 750,
    statusText: "Active",
    statusType: "active",
    isHighDemand: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqg1F1M8g62rcZi5Nc6gcYTjlQJzk32agX_pjg1XR338SXH3q5cAIyYw1hgjoEh4OxtzhDz1i9IDmA-VsENtm9qzomwMfHFqEwEaTDHBAotCwUUQYYCz-TUfIWqL7AvmFfiAtEVArTkygqzDnj8jp7nXock1Hjn8aX27VsdrbnCTMn3y4e02Eh4-9hqVQHHqs4TtGYdn5zAz7mEgKMHrlSvNgvUG8PM_YpbLRH2tjQEJb15iGDdhLpaNmHLKx82kbrMgwB8mOgyQy8",
  },
];

interface InventoryTableProps {
  onSelectionChange: (count: number) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  onSelectionChange,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = inventoryRows.map((r) => r.id);
      setSelectedIds(allIds);
      onSelectionChange(allIds.length);
    } else {
      setSelectedIds([]);
      onSelectionChange(0);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    let updated: string[];
    if (checked) {
      updated = [...selectedIds, id];
    } else {
      updated = selectedIds.filter((item) => item !== id);
    }
    setSelectedIds(updated);
    onSelectionChange(updated.length);
  };

  const isAllSelected = selectedIds.length === inventoryRows.length;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-[#dfbec4]/30 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 text-[#584045]/60 uppercase text-[10px] tracking-widest font-bold border-b border-[#dfbec4]/20">
              <th className="py-5 px-6 w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]/20 cursor-pointer w-5 h-5"
                />
              </th>
              <th className="py-5 px-4">Product</th>
              <th className="py-5 px-4">SKU</th>
              <th className="py-5 px-4">Warehouse</th>
              <th className="py-5 px-4 text-right">Total Stock</th>
              <th className="py-5 px-4 text-right">Committed</th>
              <th className="py-5 px-4 text-right">Available</th>
              <th className="py-5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {inventoryRows.map((row) => {
              const isChecked = selectedIds.includes(row.id);
              const isOut = row.statusType === "out";
              const isLow = row.statusType === "low";

              return (
                <tr
                  key={row.id}
                  className="hover:bg-[#faf8ff] transition-colors group"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleRowSelect(row.id, e.target.checked)
                      }
                      className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]/20 cursor-pointer w-5 h-5"
                    />
                  </td>

                  {/* Product image layout */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#dfbec4]/20 shrink-0">
                        <img
                          className={`w-full h-full object-cover ${isOut ? "grayscale opacity-50" : ""}`}
                          src={row.image}
                          alt={row.name}
                        />
                        {isOut && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <MdBlock className="text-[#ba1a1a] w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className={isOut ? "opacity-60" : ""}>
                        <p className="font-bold text-[#131b2e] text-sm">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-[#584045]/60 mt-0.5">
                          {row.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-[#584045]/80 font-bold">
                    {row.sku}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#f2f3ff] rounded-lg text-[9px] font-bold text-[#584045]/80">
                      {row.warehouse}
                    </span>
                  </td>

                  <td
                    className={`py-4 px-4 text-right font-bold text-sm ${
                      isOut
                        ? "text-[#ba1a1a]"
                        : isLow
                          ? "text-[#785a00]"
                          : "text-[#131b2e]"
                    }`}
                  >
                    {row.totalStock.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-right text-[#584045]/80">
                    {row.committed}
                  </td>

                  {/* Available count and alert indicators */}
                  <td
                    className={`py-4 px-4 text-right font-extrabold text-sm ${
                      isOut
                        ? "text-[#ba1a1a]"
                        : isLow
                          ? "text-[#785a00]"
                          : "text-[#131b2e]"
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {row.available.toLocaleString()}
                      {isLow && (
                        <MdWarning className="text-[#ffd167] w-4 h-4 animate-pulse" />
                      )}
                    </div>
                  </td>

                  {/* Status tags */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                          isOut
                            ? "bg-[#ffdad6] text-[#ba1a1a]"
                            : isLow
                              ? "bg-[#ffd167]/30 text-[#765900]"
                              : row.statusType === "healthy"
                                ? "bg-[#b7eaff] text-[#004e61]"
                                : "bg-[#b7eaff]/60 text-[#004e61]"
                        }`}
                      >
                        {row.statusText}
                      </span>
                      {row.isHighDemand && (
                        <span className="text-[9px] text-[#006780] font-extrabold mt-1 uppercase tracking-wider">
                          High Demand
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 bg-[#f2f3ff]/50 border-t border-[#dfbec4]/20 flex items-center justify-between select-none">
        <p className="text-xs text-[#584045]/80 font-semibold">
          Showing 1-10 of 2,480 products
        </p>
        <div className="flex gap-1">
          <button className="p-2 rounded-lg hover:bg-[#faf8ff] border border-[#dfbec4]/20 transition-colors cursor-pointer">
            <MdChevronLeft className="w-4 h-4 text-[#584045]" />
          </button>
          <button className="px-3.5 py-1.5 rounded-lg bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="px-3.5 py-1.5 rounded-lg hover:bg-white transition-colors font-bold text-xs cursor-pointer">
            2
          </button>
          <button className="px-3.5 py-1.5 rounded-lg hover:bg-white transition-colors font-bold text-xs cursor-pointer">
            3
          </button>
          <button className="p-2 rounded-lg hover:bg-[#faf8ff] border border-[#dfbec4]/20 transition-colors cursor-pointer">
            <MdChevronRight className="w-4 h-4 text-[#584045]" />
          </button>
        </div>
      </div>
    </div>
  );
};
