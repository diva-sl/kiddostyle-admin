import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownload, MdPersonAdd, MdAdd, MdExpandMore } from "react-icons/md";
import { CustomersKpiGrid } from "../components/CustomersKpiGrid";
import { CustomersFilterTable } from "../components/CustomersFilterTable";
import { CustomerAutomationWidget } from "../components/CustomerAutomationWidget";
import { useCustomers } from "../hooks/useCustomers";

const sampleFallbackCustomers = [
  {
    id: "1",
    name: "Eleanor Mason",
    email: "eleanor.m@example.com",
    phone: "+1 555-0192",
    status: "active",
    totalSpent: 1240.5,
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@techflow.io",
    phone: "+1 555-0188",
    status: "active",
    totalSpent: 4102.0,
    joinedDate: "2024-02-03",
  },
  {
    id: "3",
    name: "Sophia Liang",
    email: "sophia.l@me.com",
    phone: "+1 555-0175",
    status: "suspended",
    totalSpent: 89.99,
    joinedDate: "2024-03-21",
  },
];

export const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: dbCustomers } = useCustomers();
  const [showExport, setShowExport] = useState(false);

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
    link.download = `kiddostyle_customers_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Excel XLS Exporter
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Customers</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
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
    link.download = `kiddostyle_customers_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // PDF Exporter
  const handleExportPDF = () => {
    const data = getExportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>KiddoStyle Customer Registry Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; margin-bottom: 5px; }
            p.subtitle { font-size: 12px; color: #584045; margin-bottom: 30px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
            .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: bold; border-radius: 9999px; text-transform: uppercase; }
            .active { background-color: #e8f5e9; color: #2e7d32; }
            .suspended { background-color: #ffebee; color: #c62828; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Customers</h1>
          <p class="subtitle">Registered User Database Summary &mdash; Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Total Spent</th>
                <th>Joined Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
    `;

    data.forEach((c) => {
      html += `
        <tr>
          <td><strong>${c.name}</strong></td>
          <td>${c.email}</td>
          <td>${c.phone}</td>
          <td>$${c.totalSpent.toFixed(2)}</td>
          <td>${c.joinedDate}</td>
          <td><span class="badge ${c.status}">${c.status}</span></td>
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

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Customer Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            View and manage your registered customer database.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer"
            >
              <MdDownload className="w-4.5 h-4.5 text-[#584045]/70" />
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

          <button
            onClick={() => navigate("/customers/new")}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
          >
            <MdPersonAdd className="w-4.5 h-4.5" />
            Add Customer
          </button>
        </div>
      </section>

      {/* Bento summary grids */}
      <CustomersKpiGrid />

      {/* Main Customers table list */}
      <CustomersFilterTable />

      {/* Journey automations suggestion segment */}
      <CustomerAutomationWidget />

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/customers/new")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#b31f56] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer"
      >
        <MdAdd className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CustomersPage;
