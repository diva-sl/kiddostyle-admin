import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdFilterList,
  MdDownload,
  MdVisibility,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
  MdExpandMore,
} from "react-icons/md";
import { useProducts } from "../hooks/useProducts";

const fallbackCatalog = [
  {
    id: "1",
    name: "Sunny Smiles Organic Tee",
    sku: "KD-00124-YL",
    category: "T-Shirts",
    price: 32.0,
    stock: 142,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    name: "Dusty Rose Linen Overalls",
    sku: "KD-09882-RS",
    category: "Outerwear",
    price: 54.5,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "3",
    name: "Explorer Leather Boots",
    sku: "KD-44109-NV",
    category: "Footwear",
    price: 78.0,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80",
  },
];

interface ProductCatalogTableProps {
  sellerId?: string;
}

export const ProductCatalogTable: React.FC<ProductCatalogTableProps> = ({
  sellerId,
}) => {
  const navigate = useNavigate();
  const { data: rawProducts, isLoading } = useProducts(
    sellerId ? { sellerId } : undefined,
  );
  const dbProducts = Array.isArray(rawProducts) ? rawProducts : [];

  // Filter & Search states
  const [showFilterTray, setShowFilterTray] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExport, setShowExport] = useState(false);

  // Pagination states
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Map to unified structure
  const displayList =
    dbProducts.length > 0
      ? dbProducts.map((p) => ({
          id: p.id || "",
          name: p.name,
          sku: p.sku || `KD-${Math.floor(1000 + Math.random() * 9000)}`,
          category:
            typeof p.category === "object"
              ? (p.category as any)?.name || "Fashion"
              : p.category || "Fashion",
          price: p.price || 0,
          stock: p.stock || 0,
          image: Array.isArray(p.images)
            ? p.images[0] ||
              p.image ||
              "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80"
            : p.image ||
              "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
        }))
      : fallbackCatalog;

  const filteredList = displayList.filter((item) => {
    if (!searchQuery) return true;
    const matchName = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCat = item.category
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchSku = item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchName || matchCat || matchSku;
  });

  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getStockStatus = (stock: number) => {
    if (stock > 20)
      return {
        text: `Healthy (${stock})`,
        color: "bg-green-500",
        textColor: "text-green-700",
      };
    if (stock > 0)
      return {
        text: `Low (${stock})`,
        color: "bg-[#ffd167]",
        textColor: "text-[#765900]",
      };
    return {
      text: "Out (0)",
      color: "bg-[#ba1a1a]",
      textColor: "text-[#ba1a1a]",
    };
  };

  // Exporters
  const handleExportCSV = () => {
    const headers = [
      "Product Name",
      "SKU",
      "Category",
      "Price ($)",
      "Stock Qty",
    ];
    const rows = filteredList.map((p) => [
      `"${p.name}"`,
      `"${p.sku}"`,
      `"${p.category}"`,
      p.price,
      p.stock,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inventory_catalog_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 bg-white rounded-3xl border border-[#dfbec4]/30">
        Loading inventory catalog...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden select-none">
      {/* Table Header Filter options */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#f2f3ff]/30">
        <div>
          <h3 className="font-display text-base font-extrabold text-[#131b2e]">
            Product Catalog ({totalItems})
          </h3>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
            Manage and monitor your children's fashion inventory
          </p>
        </div>

        <div className="flex gap-2.5 w-full md:w-auto relative">
          <button
            onClick={() => setShowFilterTray(!showFilterTray)}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 border border-[#dfbec4] hover:bg-[#faf8ff] px-4 py-2 rounded-full font-bold text-xs text-[#584045] cursor-pointer"
          >
            <MdFilterList className="w-4.5 h-4.5 text-[#584045]/70" /> Filter
          </button>

          <div className="relative flex-1 md:flex-none">
            <button
              onClick={() => setShowExport(!showExport)}
              className="w-full flex items-center justify-center gap-1.5 border border-[#dfbec4] hover:bg-[#faf8ff] px-4 py-2 rounded-full font-bold text-xs text-[#584045] cursor-pointer"
            >
              <MdDownload className="w-4.5 h-4.5 text-[#584045]/70" /> Export{" "}
              <MdExpandMore className="w-4 h-4" />
            </button>

            {showExport && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowExport(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#dfbec4]/30 rounded-2xl shadow-xl z-50 overflow-hidden text-xs py-1">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f2f3ff] text-[#584045] font-semibold"
                  >
                    CSV Spreadsheet (.csv)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showFilterTray && (
        <div className="p-4 border-b border-[#dfbec4]/20 bg-[#faf8ff]">
          <input
            type="text"
            placeholder="Search catalog by product name, SKU or category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full max-w-md bg-white border border-[#dfbec4]/30 rounded-xl p-3 text-xs font-semibold outline-none"
          />
        </div>
      )}

      {/* Grid listing Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70">
              <th className="py-4 px-6">Product Details</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Stock Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {paginatedList.map((row) => {
              const status = getStockStatus(row.stock);
              return (
                <tr
                  key={row.id}
                  className="hover:bg-[#faf8ff] transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => navigate(`/products/${row.id}`)}
                        className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#dfbec4]/20 bg-[#faf8ff] cursor-pointer"
                      >
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={row.image}
                          alt={row.name}
                        />
                      </div>
                      <div>
                        <p
                          onClick={() => navigate(`/products/${row.id}`)}
                          className="font-bold text-sm text-[#131b2e] leading-snug hover:text-[#b31f56] cursor-pointer"
                        >
                          {row.name}
                        </p>
                        <p className="text-[10px] text-[#584045]/50 font-bold mt-1">
                          {row.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="px-3.5 py-1 bg-[#f2f3ff] text-[#584045] rounded-full text-[10px] font-bold">
                      {row.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-extrabold text-sm text-[#131b2e]">
                    ${row.price.toFixed(2)}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span
                        className={`w-2 h-2 rounded-full ${status.color}`}
                      />
                      <span className={status.textColor}>{status.text}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/products/${row.id}`)}
                        className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#b31f56] transition-colors cursor-pointer border-none bg-none"
                        title="View Details"
                      >
                        <MdVisibility className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => navigate(`/products/edit/${row.id}`)}
                        className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#785a00] transition-colors cursor-pointer border-none bg-none"
                        title="Edit Item"
                      >
                        <MdEdit className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex justify-between items-center bg-[#f2f3ff]/10">
        <p className="text-[10px] font-extrabold text-[#584045]/60">
          Showing {paginatedList.length} of {totalItems} products
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] transition-colors disabled:opacity-30 cursor-pointer border-none bg-none"
          >
            <MdChevronLeft className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>

          <span className="px-3 py-1 rounded-full bg-[#b31f56] text-white font-bold text-xs">
            {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] transition-colors disabled:opacity-30 cursor-pointer border-none bg-none"
          >
            <MdChevronRight className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
