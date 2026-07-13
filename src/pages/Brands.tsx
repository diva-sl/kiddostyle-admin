import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownload, MdAdd, MdExpandMore } from "react-icons/md";
import { BrandsKpiGrid } from "../components/BrandsKpiGrid";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import { BrandsDistribution } from "../components/BrandsDistribution";
import { useBrands } from "../hooks/useBrands";
import { useProducts } from "../hooks/useProducts";

const sampleFallbackBrands = [
  {
    id: "mini-me",
    slug: "mini-me",
    name: "MiniMe",
    products: 142,
    status: "active",
    description: "MiniMe Children Wear Co.",
  },
  {
    id: "tiny-tots",
    slug: "tiny-tots",
    name: "TinyTots",
    products: 56,
    status: "active",
    description: "Premium Newborn Accessories Brand.",
  },
  {
    id: "kiddy-step",
    slug: "kiddy-step",
    name: "KiddyStep",
    products: 88,
    status: "inactive",
    description: "Children Comfort Footwear.",
  },
  {
    id: "play-pals",
    slug: "play-pals",
    name: "PlayPals",
    products: 210,
    status: "active",
    description: "Toddler Boy play clothing.",
  },
];

export const BrandsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);

  const { data: dbBrands } = useBrands();
  const { data: products = [] } = useProducts();

  // Combine live and fallback lists with live product counts for export
  const getExportData = () => {
    const list =
      dbBrands && dbBrands.length > 0 ? dbBrands : sampleFallbackBrands;
    return list.map((b) => {
      const total = products.filter(
        (p) => p.brand?.toLowerCase() === b.name.toLowerCase(),
      ).length;
      return {
        name: b.name,
        slug: b.slug || b.id,
        description: b.description || "Partner brand profile.",
        status: b.status,
        products: total || (b as any).products || 0,
      };
    });
  };

  // CSV Downloader
  const handleExportCSV = () => {
    const data = getExportData();
    const headers = [
      "Brand Name",
      "Slug",
      "Description",
      "Status",
      "Products Count",
    ];
    const rows = data.map((b) => [
      `"${b.name}"`,
      `"${b.slug}"`,
      `"${b.description.replace(/"/g, '""')}"`,
      `"${b.status}"`,
      b.products,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_brands_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExport(false);
  };

  // Excel XLS Downloader (using native HTML table parsing format)
  const handleExportXLS = () => {
    const data = getExportData();
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
    html += `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Brands</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
    html += `<table border="1">`;
    html += `<tr style="background-color:#b31f56; color:white; font-weight:bold;">`;
    html += `<th>Brand Name</th><th>Slug</th><th>Description</th><th>Status</th><th>Products Count</th>`;
    html += `</tr>`;

    data.forEach((b) => {
      html += `<tr>`;
      html += `<td>${b.name}</td>`;
      html += `<td>${b.slug}</td>`;
      html += `<td>${b.description}</td>`;
      html += `<td>${b.status}</td>`;
      html += `<td>${b.products}</td>`;
      html += `</tr>`;
    });

    html += `</table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kiddostyle_brands_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    setShowExport(false);
  };

  // PDF Report Exporter (opens formatted print layout)
  const handleExportPDF = () => {
    const data = getExportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>KiddoStyle Brand Partners Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            h1 { color: #b31f56; margin-bottom: 5px; }
            p.subtitle { font-size: 12px; color: #584045; margin-bottom: 30px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #dfbec4; padding: 12px; text-align: left; font-size: 13px; }
            th { background-color: #f2f3ff; color: #131b2e; font-weight: bold; }
            .badge { display: inline-block; padding: 3px 8px; font-size: 10px; font-weight: bold; border-radius: 9999px; text-transform: uppercase; }
            .active { background-color: #e8f5e9; color: #2e7d32; }
            .inactive { background-color: #ffebee; color: #c62828; }
          </style>
        </head>
        <body>
          <h1>KiddoStyle</h1>
          <p class="subtitle">Partner Brands Portfolio &mdash; Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
                <th>Products Count</th>
              </tr>
            </thead>
            <tbody>
    `;

    data.forEach((b) => {
      html += `
        <tr>
          <td><strong>${b.name}</strong></td>
          <td>${b.slug}</td>
          <td>${b.description}</td>
          <td><span class="badge ${b.status}">${b.status}</span></td>
          <td>${b.products}</td>
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
    <div className="space-y-8 pb-12">
      {/* Page Header Actions banner */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Brand Management
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Monitor and curate partner relationships for KiddoStyle.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Export Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-1 px-4 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer"
            >
              <MdDownload className="w-4 h-4 text-[#584045]/70" />
              Export
              <MdExpandMore className="w-4 h-4" />
            </button>

            {showExport && (
              <>
                {/* Backdrop to close dropdown on click outside */}
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
            onClick={() => navigate("/brands/new")}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
          >
            <MdAdd className="w-4 h-4" />
            Add New Brand
          </button>
        </div>
      </section>

      {/* Summary Metrics bento boxes */}
      <BrandsKpiGrid />

      {/* Main Content Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <BrandsPortfolio />
        </div>

        <div className="lg:col-span-4">
          <BrandsDistribution />
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
