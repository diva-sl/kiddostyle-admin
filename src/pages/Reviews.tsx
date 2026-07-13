import React, { useState } from "react";
import {
  MdFilterList,
  MdDownload,
  MdAddComment,
  MdChevronLeft,
  MdChevronRight,
  MdExpandMore,
} from "react-icons/md";
import { ReviewsStats } from "../components/ReviewsStats";
import { ReviewsFeed } from "../components/ReviewsFeed";
import { useReviews } from "../hooks/useReviews";

const fallbackReviews = [
  {
    id: "1",
    productName: "Organic Cotton Knit Sweater",
    rating: 5,
    comment:
      "The quality is absolutely incredible! My daughter finds it so soft.",
    status: "approved",
    customerName: "Sarah Mitchell",
    createdAt: "2026-10-23T10:45:00.000Z",
  },
  {
    id: "2",
    productName: "Honey Leather Boots",
    rating: 4,
    comment:
      "Stunning little boots. The leather is very supple. Sizing runs slightly large.",
    status: "pending",
    customerName: "James Kessler",
    createdAt: "2026-10-22T14:15:00.000Z",
  },
  {
    id: "3",
    productName: "Summer Denim Overalls",
    rating: 1,
    comment: "This took forever to arrive and customer service was rude.",
    status: "rejected",
    customerName: "Unverified User",
    createdAt: "2026-10-20T11:15:00.000Z",
  },
];

export const ReviewsPage: React.FC = () => {
  const { data: dbReviews } = useReviews();

  // Filter States
  const [showFilterTray, setShowFilterTray] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Export State
  const [showExport, setShowExport] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getExportData = () => {
    const list =
      dbReviews && dbReviews.length > 0 ? dbReviews : fallbackReviews;
    return list.map((r) => ({
      product: r.productName,
      rating: `${r.rating} Stars`,
      customer: r.customerName,
      comment: r.comment,
      status: r.status,
      date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A",
    }));
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Product Name",
      "Rating",
      "Customer",
      "Comment",
      "Status",
      "Date",
    ];
    const rows = data.map((r) => [
      `"${r.product}"`,
      `"${r.rating}"`,
      `"${r.customer}"`,
      `"${r.comment.replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${r.date}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_reviews_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Excel Spreadsheet Exporter
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Reviews</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#ffd167; color:#765900; font-weight:bold;">`;
    html += `<th>Product Name</th><th>Rating</th><th>Customer</th><th>Comment</th><th>Status</th><th>Date</th>`;
    html += `</tr>`;

    data.forEach((r) => {
      html += `<tr>`;
      html += `<td>${r.product}</td>`;
      html += `<td>${r.rating}</td>`;
      html += `<td>${r.customer}</td>`;
      html += `<td>${r.comment}</td>`;
      html += `<td>${r.status}</td>`;
      html += `<td>${r.date}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_reviews_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // PDF Summary Print Exporter
  const handleExportPDF = () => {
    const data = getExportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Catalog Feedback Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; }
            p.sub { font-size: 12px; color: #584045; font-weight: bold; margin-bottom: 35px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Reviews Report</h1>
          <p class="sub">Catalog Feedback Listing &mdash; Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Rating</th>
                <th>Customer</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (r) => `
                <tr>
                  <td><strong>${r.product}</strong></td>
                  <td>${r.rating}</td>
                  <td>${r.customer}</td>
                  <td>"${r.comment}"</td>
                  <td style="text-transform:uppercase; font-weight:bold;">${r.status}</td>
                  <td>${r.date}</td>
                </tr>
              `,
                )
                .join("")}
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

  const startIdx =
    totalFiltered === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalFiltered);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 select-none">
      {/* Page Headers Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 select-none">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Reviews Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Oversee and respond to customer feedback across your catalog.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setShowFilterTray(!showFilterTray)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer"
          >
            <MdFilterList className="w-4 h-4 text-[#584045]/70" />
            Filter
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
            >
              <MdDownload className="w-4 h-4" />
              Export Options
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
                    PDF Report Document
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Advanced Filters Drawer Tray */}
      {showFilterTray && (
        <div className="bg-white border border-[#dfbec4]/30 p-6 rounded-3xl shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Search Keywords
            </label>
            <input
              type="text"
              placeholder="Search products or comments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#b31f56]/15"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Rating stars
            </label>
            <select
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Filter Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer"
            >
              <option value="all">All Reviews</option>
              <option value="approved">Approved / Published</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected / Flagged</option>
            </select>
          </div>
        </div>
      )}

      {/* Summary KPI Stats cards */}
      <ReviewsStats />

      {/* Reviews feed item layout lists */}
      <ReviewsFeed
        ratingFilter={ratingFilter}
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        onTotalFilteredChange={setTotalFiltered}
      />

      {/* Pagination Footer */}
      <div className="flex justify-between items-center select-none pt-4">
        <p className="text-xs text-[#584045]/70 font-bold">
          Showing {startIdx} to {endIdx} of {totalFiltered} reviews
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <MdChevronLeft className="w-5 h-5 text-[#584045]" />
          </button>
          <span className="px-4 py-2.5 rounded-full bg-[#b31f56] text-white font-bold text-xs select-none">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <MdChevronRight className="w-5 h-5 text-[#584045]" />
          </button>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#ffd167] text-[#765900] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer border-none">
        <MdAddComment className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ReviewsPage;
