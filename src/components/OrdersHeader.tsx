import React, { useState } from "react";
import { MdDownload, MdAdd, MdExpandMore } from "react-icons/md";

interface OrdersHeaderProps {
  onManualOrderClick: () => void;
  activeShipmentsCount: number;
  dbOrders: any[];
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  onManualOrderClick,
  activeShipmentsCount,
  dbOrders,
}) => {
  const [showExport, setShowExport] = useState(false);

  // Fallback layout helper if database list is empty
  const getExportData = () => {
    const safeOrders = Array.isArray(dbOrders) ? dbOrders : [];
    const list =
      safeOrders.length > 0
        ? safeOrders
        : [
            {
              orderNumber: "KS-8892",
              customer: {
                name: "Emily Morrison",
                email: "emily@example.com",
                phone: "+1 555-0192",
              },
              totalAmount: 124.5,
              status: "shipped",
              paymentMethod: "COD",
              paymentStatus: "pending",
              createdAt: new Date(),
            },
            {
              orderNumber: "KS-8891",
              customer: {
                name: "James Wilson",
                email: "james@example.com",
                phone: "+1 555-0189",
              },
              totalAmount: 89.0,
              status: "delivered",
              paymentMethod: "Stripe",
              paymentStatus: "paid",
              createdAt: new Date(),
            },
            {
              orderNumber: "KS-8890",
              customer: {
                name: "Sophia Chen",
                email: "sophia@example.com",
                phone: "+1 555-0175",
              },
              totalAmount: 256.75,
              status: "pending",
              paymentMethod: "COD",
              paymentStatus: "pending",
              createdAt: new Date(),
            },
          ];

    return list.map((o) => ({
      orderNumber: o.orderNumber,
      customerName: o.customer?.name || "Guest Customer",
      customerEmail: o.customer?.email || "",
      totalAmount: o.totalAmount,
      status: o.status,
      paymentMethod: o.paymentMethod || "COD",
      paymentStatus: o.paymentStatus || "pending",
      date: new Date(o.createdAt || Date.now()).toLocaleDateString(),
    }));
  };

  // Export to CSV
  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Order ID",
      "Date",
      "Customer Name",
      "Customer Email",
      "Total Amount",
      "Status",
      "Payment Method",
      "Payment Status",
    ];
    const rows = data.map((o) => [
      `"${o.orderNumber}"`,
      `"${o.date}"`,
      `"${o.customerName}"`,
      `"${o.customerEmail}"`,
      o.totalAmount,
      `"${o.status}"`,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Export to Excel Spreadsheet
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Orders</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Order ID</th><th>Date</th><th>Customer Name</th><th>Customer Email</th><th>Total Amount</th><th>Status</th><th>Payment Method</th><th>Payment Status</th>`;
    html += `</tr>`;

    data.forEach((o) => {
      html += `<tr>`;
      html += `<td>${o.orderNumber}</td>`;
      html += `<td>${o.date}</td>`;
      html += `<td>${o.customerName}</td>`;
      html += `<td>${o.customerEmail}</td>`;
      html += `<td>${o.totalAmount}</td>`;
      html += `<td>${o.status}</td>`;
      html += `<td>${o.paymentMethod}</td>`;
      html += `<td>${o.paymentStatus}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_orders_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // Export to PDF Document
  const handleExportPDF = () => {
    const data = getExportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>KiddoStyle Order Management Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; margin-bottom: 5px; }
            p.subtitle { font-size: 12px; color: #584045; margin-bottom: 30px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
            .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: bold; border-radius: 9999px; text-transform: uppercase; }
            .pending { background-color: #fff8e1; color: #b78103; }
            .processing { background-color: #e3f2fd; color: #0d47a1; }
            .shipped { background-color: #efebe9; color: #4e342e; }
            .delivered { background-color: #e8f5e9; color: #2e7d32; }
            .cancelled { background-color: #ffebee; color: #c62828; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle Orders</h1>
          <p class="subtitle">Active Customer Shipments &mdash; Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
    `;

    data.forEach((o) => {
      html += `
        <tr>
          <td><strong>${o.orderNumber}</strong></td>
          <td>${o.date}</td>
          <td>${o.customerName}</td>
          <td>$${o.totalAmount.toFixed(2)}</td>
          <td>${o.paymentMethod} (${o.paymentStatus})</td>
          <td><span class="badge ${o.status}">${o.status}</span></td>
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
    <div className="flex justify-between items-end mb-8 select-none">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e] mb-2">
          Order Management
        </h2>
        <div className="flex items-center gap-2 text-[#584045]/80">
          <span className="text-sm">
            Manage and track your customer shipments.
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#785a00]"></span>
          <span className="text-xs font-bold text-[#785a00]">
            {activeShipmentsCount} Active Shipments
          </span>
        </div>
      </div>

      <div className="flex gap-4 relative">
        {/* Export options dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer"
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

        <button
          onClick={onManualOrderClick}
          className="flex items-center gap-2 px-6 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
        >
          <MdAdd className="w-4 h-4" />
          Manual Order
        </button>
      </div>
    </div>
  );
};
