import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdFilterList,
  MdDownload,
  MdEdit,
  MdDelete,
  MdChevronLeft,
  MdChevronRight,
  MdExpandMore,
} from "react-icons/md";
import { useCoupons, useDeleteCoupon } from "../hooks/useCoupons";
import type { Coupon } from "../services/couponService";

const sampleFallbackCoupons = [
  {
    id: "1",
    code: "KIDDO25",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 50,
    expiryDate: "2026-10-24T12:00:00.000Z",
    active: true,
    usageLimit: 500,
    usageCount: 325,
  },
  {
    id: "2",
    code: "WELCOME50",
    discountType: "fixed",
    discountValue: 50,
    minPurchase: 100,
    expiryDate: "2026-12-31T12:00:00.000Z",
    active: true,
    usageLimit: 1000,
    usageCount: 12,
  },
  {
    id: "3",
    code: "BACK2SCHOOL",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 30,
    expiryDate: "2026-08-30T12:00:00.000Z",
    active: false,
    usageLimit: 1000,
    usageCount: 1000,
  },
];

export const CouponsTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbCoupons, isLoading } = useCoupons();
  const deleteMutation = useDeleteCoupon();

  // Tabs & Trays State
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Expired">(
    "All",
  );
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Active Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [discountTypeFilter, setDiscountTypeFilter] = useState("All");
  const [minPurchaseFilter, setMinPurchaseFilter] = useState("All");

  // Pagination states
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this coupon campaign?")
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Map backend query results or fall back
  const displayList: Coupon[] =
    dbCoupons && dbCoupons.length > 0
      ? dbCoupons
      : sampleFallbackCoupons.map((c) => ({
          id: c.id,
          code: c.code,
          discountType: c.discountType,
          discountValue: c.discountValue,
          minPurchase: c.minPurchase,
          expiryDate: c.expiryDate,
          active: c.active,
          usageLimit: c.usageLimit,
          usageCount: c.usageCount,
        }));

  // Perform Advanced Live Filtering
  const filteredList = displayList.filter((c) => {
    // 1. Tab Status constraints
    const isExpired = new Date(c.expiryDate).getTime() < Date.now();
    const isActive = c.active && !isExpired;

    if (activeTab === "Active" && !isActive) return false;
    if (activeTab === "Expired" && isActive) return false;

    // 2. Search query constraints
    if (
      searchQuery &&
      !c.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // 3. Discount Type constraints
    if (discountTypeFilter !== "All" && c.discountType !== discountTypeFilter)
      return false;

    // 4. Min Purchase constraints
    if (minPurchaseFilter === "> $50" && c.minPurchase <= 50) return false;
    if (minPurchaseFilter === "> $100" && c.minPurchase <= 100) return false;

    return true;
  });

  // Pagination bounds
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startIdx =
    totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  // CSV Exporter
  const handleExportCSV = () => {
    const data = filteredList;
    const headers = [
      "Coupon Code",
      "Discount Type",
      "Value",
      "Usage Status",
      "Expiry Date",
      "Status",
    ];
    const rows = data.map((c) => [
      `"${c.code}"`,
      `"${c.discountType}"`,
      c.discountValue,
      `"${c.usageCount}/${c.usageLimit}"`,
      `"${new Date(c.expiryDate).toLocaleDateString()}"`,
      c.active ? "Active" : "Inactive",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_coupons_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Excel XLS Exporter
  const handleExportXLS = () => {
    const data = filteredList;
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Coupons</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Coupon Code</th><th>Discount Type</th><th>Value</th><th>Usage Limit</th><th>Expiry Date</th><th>Status</th>`;
    html += `</tr>`;

    data.forEach((c) => {
      const displayType =
        c.discountType === "percentage" ? "Percentage" : "Fixed Amount";
      const displayValue =
        c.discountType === "percentage"
          ? `${c.discountValue}% OFF`
          : `$${c.discountValue.toFixed(2)}`;
      html += `<tr>`;
      html += `<td>${c.code}</td>`;
      html += `<td>${displayType}</td>`;
      html += `<td>${displayValue}</td>`;
      html += `<td>${c.usageCount} / ${c.usageLimit}</td>`;
      html += `<td>${new Date(c.expiryDate).toLocaleDateString()}</td>`;
      html += `<td>${c.active ? "Active" : "Inactive"}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_coupons_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // PDF Exporter (Print Mode layout)
  const handleExportPDF = () => {
    const data = filteredList;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>KiddoStyle Active Coupons Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; margin-bottom: 5px; }
            p.subtitle { font-size: 12px; color: #584045; margin-bottom: 30px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
            .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: bold; border-radius: 9999px; text-transform: uppercase; }
            .active { background-color: #e8f5e9; color: #2e7d32; }
            .expired { background-color: #ffebee; color: #c62828; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Marketing</h1>
          <p class="subtitle">Coupon Campaigns Catalog &mdash; Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Type</th>
                <th>Discount Value</th>
                <th>Usage Count</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
    `;

    data.forEach((c) => {
      const isExpired = new Date(c.expiryDate).getTime() < Date.now();
      const statusLabel = c.active && !isExpired ? "active" : "expired";
      const displayType =
        c.discountType === "percentage" ? "Percentage" : "Fixed Amount";
      const displayValue =
        c.discountType === "percentage"
          ? `${c.discountValue}% OFF`
          : `$${c.discountValue.toFixed(2)}`;

      html += `
        <tr>
          <td><strong>${c.code}</strong></td>
          <td>${displayType}</td>
          <td>${displayValue}</td>
          <td>${c.usageCount} of ${c.usageLimit} uses</td>
          <td>${new Date(c.expiryDate).toLocaleDateString()}</td>
          <td><span class="badge ${statusLabel}">${statusLabel}</span></td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    setShowExport(false);
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70">
        Loading active coupon campaigns...
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#dfbec4]/30 rounded-[32px] overflow-hidden shadow-sm">
      <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#dfbec4]/20">
        <div className="flex gap-2">
          {(["All", "Active", "Expired"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#ffd167] text-[#765900]"
                  : "text-[#584045]/80 hover:bg-[#f2f3ff]"
              }`}
            >
              {tab === "All" ? "All Coupons" : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Filter Trigger Button */}
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full font-bold text-xs transition-all cursor-pointer ${
              showFilterDrawer
                ? "bg-[#b31f56] text-white border-[#b31f56]"
                : "border-[#dfbec4]/30 text-[#584045] hover:bg-[#f2f3ff]"
            }`}
          >
            <MdFilterList className="w-4 h-4" />
            {showFilterDrawer ? "Hide Filters" : "Filter"}
          </button>

          {/* Export Dropdown Button Menu */}
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-2 px-4 py-2 border border-[#dfbec4]/30 text-[#584045] rounded-full font-bold text-xs hover:bg-[#f2f3ff] transition-all cursor-pointer"
            >
              <MdDownload className="w-4 h-4 text-[#584045]/70" />
              Export
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
                    CSV File (.csv)
                  </button>
                  <button
                    onClick={handleExportXLS}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f2f3ff] text-[#584045] font-semibold"
                  >
                    Excel Spreadsheet (.xls)
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f2f3ff] text-[#584045] font-semibold"
                  >
                    PDF Document (.pdf)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filter Drawer Tray */}
      {showFilterDrawer && (
        <div className="px-6 py-4 bg-[#faf8ff] border-b border-[#dfbec4]/20 flex flex-wrap items-center gap-4 select-none">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search coupon code..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-[#dfbec4]/30 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#b31f56]/15 text-[#131b2e]"
            />
          </div>

          <div className="relative">
            <select
              value={discountTypeFilter}
              onChange={(e) => {
                setDiscountTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-[#dfbec4]/30 rounded-xl px-3 py-2 text-xs font-bold text-[#584045] outline-none cursor-pointer"
            >
              <option value="All">All Discount Types</option>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount ($)</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={minPurchaseFilter}
              onChange={(e) => {
                setMinPurchaseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-[#dfbec4]/30 rounded-xl px-3 py-2 text-xs font-bold text-[#584045] outline-none cursor-pointer"
            >
              <option value="All">All Spend Minimums</option>
              <option value="> $50">Min Purchase &gt; $50</option>
              <option value="> $100">Min Purchase &gt; $100</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setDiscountTypeFilter("All");
              setMinPurchaseFilter("All");
              setCurrentPage(1);
            }}
            className="text-xs font-bold text-[#b31f56] hover:underline cursor-pointer ml-auto"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#f2f3ff]/50 border-b border-[#dfbec4]/25">
              <th className="px-8 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Coupon Code
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Usage Limit
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider">
                Status
              </th>
              <th className="px-8 py-4 font-bold text-xs text-[#584045]/70 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {paginatedList.map((row) => {
              const isExpired = new Date(row.expiryDate).getTime() < Date.now();
              const displayType =
                row.discountType === "percentage"
                  ? "Percentage"
                  : "Fixed Amount";
              const displayValue =
                row.discountType === "percentage"
                  ? `${row.discountValue}% OFF`
                  : `$${row.discountValue.toFixed(2)}`;

              const percentage = Math.round(
                (row.usageCount / row.usageLimit) * 100,
              );

              return (
                <tr
                  key={row.id}
                  className={`group hover:bg-[#f2f3ff]/30 transition-colors ${isExpired ? "opacity-60" : ""}`}
                >
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span
                        className={`font-bold text-sm ${isExpired ? "text-[#131b2e]" : "text-[#b31f56]"}`}
                      >
                        {row.code}
                      </span>
                      <span className="text-[9px] text-[#584045]/50 uppercase tracking-wider font-extrabold mt-0.5">
                        Min Purchase: ${row.minPurchase || 0}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-[#584045]">{displayType}</td>
                  <td className="px-6 py-5 font-bold text-sm text-[#131b2e]">
                    {displayValue}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-[#f2f3ff] rounded-full overflow-hidden border border-[#dfbec4]/20">
                        <div
                          className={`h-full rounded-full ${isExpired ? "bg-[#584045]/40" : "bg-[#b31f56]"}`}
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#584045]/80 select-none">
                        {row.usageCount}/{row.usageLimit}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-[#584045]">
                    {new Date(row.expiryDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-5">
                    {isExpired || !row.active ? (
                      <span className="px-3 py-1 bg-[#f2f3ff] text-[#584045]/60 text-[10px] font-extrabold uppercase rounded-full tracking-wide">
                        Expired
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00a4ca]/10 text-[#006780] text-[10px] font-extrabold uppercase rounded-full tracking-wide">
                        <span className="w-1.5 h-1.5 bg-[#006780] rounded-full animate-pulse" />
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => navigate(`/coupons/edit/${row.id}`)}
                        className="p-2 hover:bg-[#faf8ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-all cursor-pointer"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(row.id || "")}
                        className="p-2 hover:bg-[#ffdad6] text-[#ba1a1a] rounded-full transition-all cursor-pointer"
                      >
                        <MdDelete className="w-4 h-4" />
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
      <div className="p-6 flex justify-between items-center bg-[#f2f3ff]/30 select-none">
        <p className="text-xs text-[#584045]/70 font-bold">
          Showing {startIdx} to {endIdx} of {totalItems} campaigns
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#faf8ff] border border-[#dfbec4]/20 transition-all text-[#584045] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <MdChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-3.5 py-1.5 rounded-lg bg-[#b31f56] text-white font-bold text-xs select-none">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2f3ff] transition-all text-[#131b2e] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <MdChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
