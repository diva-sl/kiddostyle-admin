import React, { useState } from "react";
import {
  MdChevronRight,
  MdCalendarToday,
  MdExpandMore,
  MdFileDownload,
} from "react-icons/md";
import { FinancialMetrics } from "../components/FinancialMetrics";
import { DailySalesMix } from "../components/DailySalesMix";
import { FinancialTransactions } from "../components/FinancialTransactions";
import { useOrders } from "../hooks/useOrders";

const fallbackTxns = [
  {
    orderNumber: "94021",
    customer: { name: "Maria Anders", email: "m.anders@email.com" },
    totalAmount: 248.0,
    status: "delivered",
    createdAt: "2026-10-24T12:00:00.000Z",
  },
  {
    orderNumber: "94020",
    customer: { name: "David Lee", email: "d.lee@email.com" },
    totalAmount: 1210.5,
    status: "pending",
    createdAt: "2026-10-23T12:00:00.000Z",
  },
];

export const FinancialOverviewPage: React.FC = () => {
  const { data: orders = [] } = useOrders();

  // Dropdown States
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [showTimeframe, setShowTimeframe] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Combine query lists or fall back
  const getExportData = () => {
    const list = orders.length > 0 ? orders : fallbackTxns;
    return list.map((o) => ({
      txnId: `TXN-${o.orderNumber}`,
      customer: o.customer?.name || "Guest Customer",
      email: o.customer?.email || "N/A",
      amount: o.totalAmount || 0,
      status: o.status === "delivered" ? "Paid" : "Pending",
      date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "N/A",
    }));
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Transaction ID",
      "Customer",
      "Email Address",
      "Gross Amount ($)",
      "Status",
      "Date",
    ];
    const rows = data.map((t) => [
      `"${t.txnId}"`,
      `"${t.customer}"`,
      `"${t.email}"`,
      t.amount,
      `"${t.status}"`,
      `"${t.date}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_financials_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Excel XLS Exporter
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Financials</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Transaction ID</th><th>Customer</th><th>Email</th><th>Gross Amount ($)</th><th>Status</th><th>Date</th>`;
    html += `</tr>`;

    data.forEach((t) => {
      html += `<tr>`;
      html += `<td>${t.txnId}</td>`;
      html += `<td>${t.customer}</td>`;
      html += `<td>${t.email}</td>`;
      html += `<td>${t.amount}</td>`;
      html += `<td>${t.status}</td>`;
      html += `<td>${t.date}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_financials_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // PDF Exporter Summary
  const handleExportPDF = () => {
    const data = getExportData();
    const totalRevenue = data.reduce((sum, t) => sum + t.amount, 0);
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Executive Revenue Auditing Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; }
            p.sub { font-size: 12px; color: #584045; font-weight: bold; margin-bottom: 30px; }
            .total-banner { border: 1.5px solid #dfbec4; background-color: #faf8ff; padding: 20px; border-radius: 12px; font-size: 14px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Financial Overview</h1>
          <p class="sub">Auditing Transactions &mdash; Generated on ${new Date().toLocaleDateString()} (${timeframe})</p>
          
          <div class="total-banner">
            <strong>Aggregate Sales Revenue Volume:</strong> $${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>

          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Email Address</th>
                <th>Gross Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (t) => `
                <tr>
                  <td><strong>${t.txnId}</strong></td>
                  <td>${t.customer}</td>
                  <td>${t.email}</td>
                  <td>$${t.amount.toFixed(2)}</td>
                  <td>${t.status}</td>
                  <td>${t.date}</td>
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
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Title & Action Row Breadcrumbs banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold mb-1.5 select-none">
            <span>Dashboard</span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">Sales & Revenue</span>
          </nav>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Financial Overview
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Real-time performance tracking for KiddoStyle retail channels.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Timeframe selector dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTimeframe(!showTimeframe);
                setShowExport(false);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-2xl font-bold text-xs text-[#584045] hover:bg-[#faf8ff] transition-all cursor-pointer"
            >
              <MdCalendarToday className="w-4 h-4 text-[#584045]/70" />
              {timeframe}
              <MdExpandMore className="w-4 h-4 text-[#584045]/60 ml-1" />
            </button>

            {showTimeframe && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowTimeframe(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-white border border-[#dfbec4]/30 rounded-2xl shadow-xl z-50 overflow-hidden text-xs py-1">
                  {[
                    "Last 7 Days",
                    "Last 30 Days",
                    "Last 90 Days",
                    "Year to Date",
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTimeframe(t);
                        setShowTimeframe(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#f2f3ff] text-[#584045] font-semibold"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export Selector dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowExport(!showExport);
                setShowTimeframe(false);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-2xl font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
            >
              <MdFileDownload className="w-4.5 h-4.5" />
              Export Data
              <MdExpandMore className="w-4 h-4 ml-1" />
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
                    CSV Format (.csv)
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

      {/* Metrics bento cards stats */}
      <FinancialMetrics orders={orders} />

      {/* Daily sales Performance charts progress bar mix */}
      <DailySalesMix orders={orders} />

      {/* Transaction billing list index logs */}
      <FinancialTransactions orders={orders} />
    </div>
  );
};

export default FinancialOverviewPage;
