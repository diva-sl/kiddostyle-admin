import React, { useState, useEffect } from "react";
import { MdDownload, MdExpandMore } from "react-icons/md";
import { SellerOrdersKpiGrid } from "../components/SellerOrdersKpiGrid";
import { OrderDirectoryTable } from "../components/OrderDirectoryTable";
import { useOrders } from "../hooks/useOrders";

const fallbackOrdersList = [
  {
    orderNumber: "KD-8923",
    customer: { name: "Sarah Miller" },
    totalAmount: 124.5,
    status: "shipped",
    createdAt: "2026-10-24T12:00:00.000Z",
  },
  {
    orderNumber: "KD-8924",
    customer: { name: "James Davis" },
    totalAmount: 89.0,
    status: "pending",
    createdAt: "2026-10-24T12:00:00.000Z",
  },
];

export const SellerOrdersPage: React.FC = () => {
  const [sellerId, setSellerId] = useState<string | undefined>(undefined);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.role === "seller") {
          setSellerId(user.id || user._id);
        }
      } catch (e) {}
    }
  }, []);

  const { data: dbOrders = [] } = useOrders(
    sellerId ? { sellerId } : undefined,
  );

  const getExportData = () => {
    const list = dbOrders.length > 0 ? dbOrders : fallbackOrdersList;
    return list.map((o) => ({
      orderNumber: o.orderNumber,
      customer: o.customer?.name || "Guest Customer",
      amount: o.totalAmount || 0,
      status: o.status || "pending",
      date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "N/A",
    }));
  };

  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Order Number",
      "Customer Name",
      "Total Amount ($)",
      "Status",
      "Date",
    ];
    const rows = data.map((o) => [
      `"${o.orderNumber}"`,
      `"${o.customer}"`,
      o.amount,
      `"${o.status}"`,
      `"${o.date}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seller_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Orders</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1"><tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Order Number</th><th>Customer</th><th>Total Amount ($)</th><th>Status</th><th>Date</th></tr>`;
    data.forEach((o) => {
      html += `<tr><td>${o.orderNumber}</td><td>${o.customer}</td><td>${o.amount}</td><td>${o.status}</td><td>${o.date}</td></tr>`;
    });
    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seller_orders_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  const handleExportPDF = () => {
    const data = getExportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Seller Orders Report</title>
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
          <h1>KiddoStyle Seller Orders Report</h1>
          <p class="sub">Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Total Amount</th><th>Status</th><th>Order Date</th></tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (o) => `
                <tr>
                  <td><strong>#${o.orderNumber}</strong></td>
                  <td>${o.customer}</td>
                  <td>$${o.amount.toFixed(2)}</td>
                  <td style="text-transform:uppercase; font-weight:bold;">${o.status}</td>
                  <td>${o.date}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; };
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
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Order Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Manage your customer's requests and track shipments.
          </p>
        </div>

        {/* Multi-Format Exporter */}
        <div className="relative">
          <button
            onClick={() => setShowExport(!showExport)}
            className="bg-white border border-[#dfbec4] text-[#b31f56] hover:bg-[#faf8ff] font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <MdDownload className="w-4.5 h-4.5" />
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
                  CSV Spreadsheet (.csv)
                </button>
                <button
                  onClick={handleExportXLS}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#f2f3ff] text-[#584045] font-semibold"
                >
                  Excel Document (.xls)
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
      </section>

      {/* Summary Metrics boards */}
      <SellerOrdersKpiGrid sellerId={sellerId} />

      {/* Main transactions search listing tables */}
      <OrderDirectoryTable sellerId={sellerId} />
    </div>
  );
};

export default SellerOrdersPage;
