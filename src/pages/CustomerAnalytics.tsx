import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdCalendarToday,
  MdDownload,
  MdPersonAdd,
  MdExpandMore,
} from "react-icons/md";
import { AnalyticsKpiGrid } from "../components/AnalyticsKpiGrid";
import { GrowthSegmentation } from "../components/GrowthSegmentation";
import { TopSpendersActivity } from "../components/TopSpendersActivity";
import { useCustomers } from "../hooks/useCustomers";

const sampleFallbackCustomers = [
  {
    id: "1",
    name: "Eleanor Mason",
    email: "eleanor.m@example.com",
    phone: "+1 555-0192",
    status: "active",
    totalSpent: 1240.5,
    joinedDate: "2023-10-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@techflow.io",
    phone: "+1 555-0188",
    status: "active",
    totalSpent: 4102.0,
    joinedDate: "2022-05-05T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Sophia Liang",
    email: "sophia.l@me.com",
    phone: "+1 555-0175",
    status: "suspended",
    totalSpent: 89.99,
    joinedDate: "2024-01-18T12:00:00.000Z",
  },
];

export const CustomerAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbCustomers } = useCustomers();

  // Dropdown states
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Combine lists for export calculations
  const getExportData = () => {
    const list =
      dbCustomers && dbCustomers.length > 0
        ? dbCustomers
        : sampleFallbackCustomers;
    return list.map((c) => ({
      name: c.name,
      email: c.email,
      phone: c.phone || "N/A",
      status: c.status,
      totalSpent: c.totalSpent || 0,
      joinedDate: c.joinedDate
        ? new Date(c.joinedDate).toLocaleDateString()
        : "N/A",
    }));
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Customer Name",
      "Email Address",
      "Phone",
      "Status",
      "Total Spent ($)",
      "Joined Date",
    ];
    const rows = data.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.status}"`,
      c.totalSpent,
      `"${c.joinedDate}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_customer_analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExportDropdown(false);
  };

  // Excel XLS Exporter
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Analytics</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Customer Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Total Spent ($)</th><th>Joined Date</th>`;
    html += `</tr>`;

    data.forEach((c) => {
      html += `<tr>`;
      html += `<td>${c.name}</td>`;
      html += `<td>${c.email}</td>`;
      html += `<td>${c.phone}</td>`;
      html += `<td>${c.status}</td>`;
      html += `<td>${c.totalSpent}</td>`;
      html += `<td>${c.joinedDate}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_customer_analytics_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExportDropdown(false);
  };

  // PDF Executive Report Exporter
  const handleExportPDF = () => {
    const data = getExportData();
    const totalSpent = data.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgSpent = data.length > 0 ? totalSpent / data.length : 0;
    const activeCount = data.filter((c) => c.status === "active").length;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Executive Customer Analytics Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; margin-bottom: 5px; }
            p.subtitle { font-size: 12px; color: #584045; margin-bottom: 30px; font-weight: bold; }
            .kpi-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
            .kpi-card { border: 1px solid #dfbec4; padding: 20px; border-radius: 12px; background-color: #faf8ff; }
            .kpi-val { font-size: 20px; font-weight: bold; color: #b31f56; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Community Analytics</h1>
          <p class="subtitle">Executive Cohorts & Growth Report &mdash; Generated on ${new Date().toLocaleDateString()} (${timeframe})</p>
          
          <div class="kpi-container">
            <div class="kpi-card">
              <div>Total Segment Spends</div>
              <div class="kpi-val">$${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="kpi-card">
              <div>Average Lifetime Value</div>
              <div class="kpi-val">$${avgSpent.toFixed(2)}</div>
            </div>
            <div class="kpi-card">
              <div>Active Accounts</div>
              <div class="kpi-val">${activeCount} Users</div>
            </div>
          </div>

          <h3>Customer Segmentation Breakdown</h3>
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>Status</th>
                <th>Total Spent</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (c) => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td>${c.email}</td>
                  <td style="text-transform: uppercase; font-weight: bold;">${c.status}</td>
                  <td>$${c.totalSpent.toFixed(2)}</td>
                  <td>${c.joinedDate}</td>
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
    setShowExportDropdown(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Customer Analytics
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Deep dive into your community's engagement and growth.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Timeframe Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTimeframeDropdown(!showTimeframeDropdown);
                setShowExportDropdown(false);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer"
            >
              <MdCalendarToday className="w-4 h-4 text-[#584045]/70" />
              {timeframe}
              <MdExpandMore className="w-4 h-4" />
            </button>

            {showTimeframeDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowTimeframeDropdown(false)}
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
                        setShowTimeframeDropdown(false);
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

          {/* Export Report Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowExportDropdown(!showExportDropdown);
                setShowTimeframeDropdown(false);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
            >
              <MdDownload className="w-4.5 h-4.5" />
              Export Report
              <MdExpandMore className="w-4 h-4" />
            </button>

            {showExportDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowExportDropdown(false)}
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
                    Executive PDF Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Summary KPI Bento Grid Metrics */}
      <AnalyticsKpiGrid />

      {/* Month Growth Trend charts and segment lists */}
      <GrowthSegmentation />

      {/* Lower level Spenders list & event activity widgets */}
      <TopSpendersActivity />

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 group flex items-center z-50">
        <span className="bg-[#131b2e] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold mr-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Add New Customer
        </span>

        <button
          onClick={() => navigate("/customers/new")}
          className="w-14 h-14 bg-[#b31f56] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <MdPersonAdd className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CustomerAnalyticsPage;
