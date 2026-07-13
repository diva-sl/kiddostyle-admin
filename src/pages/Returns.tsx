import React, { useState } from "react";
// useNavigate removed as it's not used in this component
import {
  MdChevronRight,
  MdDownload,
  MdDoneAll,
  MdFilterList,
  MdExpandMore,
  MdChevronLeft,
} from "react-icons/md";
import { ReturnsKpiGrid } from "../components/ReturnsKpiGrid";
import { ReturnsTable } from "../components/ReturnsTable";
import { ReturnsInsights } from "../components/ReturnsInsights";
import { useReturns, useUpdateReturn } from "../hooks/useReturns";

const fallbackReturnsList = [
  {
    id: "1",
    orderNumber: "KD-89210",
    customerName: "Sarah Miller",
    reason: "Wrong Size",
    refundAmount: 145.0,
    status: "pending",
    requestedAt: "2026-10-24T12:00:00.000Z",
  },
  {
    id: "2",
    orderNumber: "KD-89195",
    customerName: "James Brown",
    reason: "Damaged",
    refundAmount: 89.5,
    status: "approved",
    requestedAt: "2026-10-23T12:00:00.000Z",
  },
];

export const ReturnsPage: React.FC = () => {
  const { data: dbReturns } = useReturns();
  const updateMutation = useUpdateReturn();

  // Advanced Filters
  const [showFilterTray, setShowFilterTray] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Checkbox selections state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Export State
  const [showExport, setShowExport] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Bulk approval execution
  const handleBulkApprove = () => {
    if (selectedIds.length === 0) {
      alert(
        "Please select at least one pending return request to bulk approve.",
      );
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to bulk approve the ${selectedIds.length} selected return requests?`,
      )
    ) {
      selectedIds.forEach((id) => {
        updateMutation.mutate({ id, payload: { status: "approved" } });
      });
      setSelectedIds([]);
      alert("Bulk approval executed successfully!");
    }
  };

  const getExportData = () => {
    const list =
      dbReturns && dbReturns.length > 0 ? dbReturns : fallbackReturnsList;
    return list.map((r) => ({
      order: r.orderNumber,
      customer: r.customerName,
      reason: r.reason,
      amount: r.refundAmount || 0,
      status: r.status,
      date: r.requestedAt
        ? new Date(r.requestedAt).toLocaleDateString()
        : "N/A",
    }));
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Order Number",
      "Customer Name",
      "Reason",
      "Refund Amount ($)",
      "Status",
      "Requested Date",
    ];
    const rows = data.map((r) => [
      `"${r.order}"`,
      `"${r.customer}"`,
      `"${r.reason}"`,
      r.amount,
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
    link.download = `kiddostyle_returns_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Excel Spreadsheet Exporter
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Returns</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Order ID</th><th>Customer Name</th><th>Reason</th><th>Refund Amount ($)</th><th>Status</th><th>Requested Date</th>`;
    html += `</tr>`;

    data.forEach((r) => {
      html += `<tr>`;
      html += `<td>${r.order}</td>`;
      html += `<td>${r.customer}</td>`;
      html += `<td>${r.reason}</td>`;
      html += `<td>${r.amount}</td>`;
      html += `<td>${r.status}</td>`;
      html += `<td>${r.date}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_returns_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // PDF Exporter print document
  const handleExportPDF = () => {
    const data = getExportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Returns & Refunds Summary Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; }
            p.sub { font-size: 12px; color: #584045; font-weight: bold; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Returns & Refunds</h1>
          <p class="sub">Auditing Report &mdash; Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Reason</th>
                <th>Refund Amount</th>
                <th>Status</th>
                <th>Requested Date</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (r) => `
                <tr>
                  <td><strong>#${r.order}</strong></td>
                  <td>${r.customer}</td>
                  <td>${r.reason}</td>
                  <td>$${r.amount.toFixed(2)}</td>
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

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none">
      {/* Title Breadcrumbs */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold select-none mb-1.5">
            <span>Dashboard</span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">
              Returns &amp; Refunds
            </span>
          </nav>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Returns &amp; Refunds
          </h2>
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
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer"
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

          <button
            onClick={handleBulkApprove}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer border-none"
          >
            <MdDoneAll className="w-4 h-4" />
            Bulk Approve ({selectedIds.length})
          </button>
        </div>
      </section>

      {/* Advanced Filter Drawer */}
      {showFilterTray && (
        <div className="bg-white border border-[#dfbec4]/30 p-5 rounded-3xl shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Search Keywords
            </label>
            <input
              type="text"
              placeholder="Search by order ID, name or reasons..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#b31f56]/15 text-xs text-[#131b2e]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Request Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer outline-none"
            >
              <option value="all">All Request Statuses</option>
              <option value="pending">Pending CMS Validation</option>
              <option value="approved">Approved</option>
              <option value="refunded">Refunded</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      )}

      {/* Bento summary KPIs grid stats */}
      <ReturnsKpiGrid />

      {/* Main Catalog Return request tables */}
      <ReturnsTable
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        onTotalFilteredChange={setTotalFiltered}
      />

      {/* Lower level charts breakdowns and loyalty response indicators */}
      <ReturnsInsights />

      {/* Pagination Footer */}
      <div className="flex justify-between items-center select-none pt-4 bg-[#f2f3ff]/10 p-6 rounded-2xl border border-[#dfbec4]/20">
        <p className="text-xs text-[#584045]/70 font-bold">
          Showing{" "}
          {totalFiltered === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalFiltered)} of{" "}
          {totalFiltered} entries
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

      {/* Footer Branding tag */}
      <footer className="text-center pt-8 text-[10px] text-[#584045]/50 font-bold select-none border-t border-[#dfbec4]/10 mt-12 pb-4">
        © 2026 KiddoStyle Premium CMS • Designed with care for little
        fashionistas.
      </footer>
    </div>
  );
};

export default ReturnsPage;
