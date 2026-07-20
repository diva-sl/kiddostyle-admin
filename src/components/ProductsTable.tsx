import React from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useProducts, useDeleteProduct } from "../hooks/useProducts";

interface ProductRow {
  id: string;
  name: string;
  subtitle: string;
  sku: string;
  category: string;
  categoryColor: string;
  price: string;
  stockText: string;
  stockType: "in" | "low" | "out";
  image: string;
  status: "draft" | "active" | "scheduled" | "archived";
}

interface ProductsTableProps {
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  publishFilter: string;
}

const sampleProductsList: ProductRow[] = [
  {
    id: "KS-ORG-2309",
    name: "Organic Cotton Romper",
    subtitle: "Sage Green, 12-18 Months",
    sku: "KS-ORG-2309",
    category: "Newborn",
    categoryColor: "bg-[#ffd167]/30 text-[#765900]",
    price: "$34.00",
    stockText: "In Stock (142)",
    stockType: "in",
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpbt01cFJnRHiQjVabTou3I4JYtIvzhFA0WjgucebTz3AgDITPGbPPkESjeqE1lgydYnCP36nEEExJBuINQwoTnOLitkUVtTSB80dADjluaE9gMN_3ytAHcolJbNA0og_nOL4Bov9LygTVrqwEqPO0ip6QqQqV2_z9pg92m1ihVaBV3T_USX2_oh-KBhxPaUGW8kukJmiPIDon9McHD4guVWJ6PApEPkbx6XHpbouarN_j2FMJrf7_E1qU7rIWhXcTgR-PiywzPvs",
  },
  {
    id: "KS-DEN-4412",
    name: "Denim Sunflower Overalls",
    subtitle: "Vintage Wash, 2T",
    sku: "KS-DEN-4412",
    category: "Toddler Girl",
    categoryColor: "bg-[#00a4ca]/10 text-[#006780]",
    price: "$48.50",
    stockText: "Low Stock (8)",
    stockType: "low",
    status: "draft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqI2ccda9usxE0wyfj3M6v6RFSxeiMJ3zHazztmeZrwAhECADf1SvooBk98_XI8O6SZxEqcq9pw7Rjmsx9KxoDFAtOqIuAEkKhyjO21EqOo9gjwoz7IYSBCXlJ8kyH3gFLtHoR-wUzxk9jSrSY6P1D2BhRc51Z5YZumXvBQOG0LDvEr532dMoEqj8zEp-q14oe9eKRQWRbx9xU1_ogigPJ7fH-N8IsVE30xU9OfckQhtn-Lv2xT1ZA-SEOgpd30b1aO7ZfnZrnhX1Z",
  },
  {
    id: "KS-SHOE-0091",
    name: "Cognac Chelsea Boots",
    subtitle: "Genuine Leather, Size 8",
    sku: "KS-SHOE-0091",
    category: "Shoes",
    categoryColor: "bg-[#dfbec4]/30 text-[#584045]",
    price: "$62.00",
    stockText: "Out of Stock",
    stockType: "out",
    status: "archived",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTl8wuyY0o-tFT8Goy9jGgYG95c1ja8qZK1tHHB5Uuw16v9YFGV11KQHCOKIzOclyJEMZpF3ZHDWa2SMN6SIr2tpoGzNcCL-bWG87EcVmE9NRtwVdWCmXMK80xi0j-NJSJSbToqd_bWFfhHrVuH_GaMZmtLf1yFZJvU74RSQE2c3FWTrRGr5MCcxFZmc_wPBbuuL11BId0uaB4x3Ve5lsublg6oI95M_-MKdsLO1bWWDgBfJsE2O5-TVzMrVb_TwOE5HVNC-rlzfgk",
  },
  {
    id: "KS-TEE-1182",
    name: "Striped Pocket Tee",
    subtitle: "Navy/White, 4T",
    sku: "KS-TEE-1182",
    category: "Toddler Boy",
    categoryColor: "bg-[#ffd167]/30 text-[#765900]",
    price: "$22.00",
    stockText: "In Stock (256)",
    stockType: "in",
    status: "scheduled",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmSBRPCHIL6yjotTqoJZWW0Ou-Fra0Jugjzepd8V786XgPuDdxmtZ9GOO5Pu7hWbuya6UXZYx70PTOmK2oHy-0bwZ4JWo35jyLZGvPsZgcAIGWYvnV0o-6if3mvT8IfY6vZK0Yd2zh53XaAw7-vwdzS44xjtDUEAC5PqfYgDSLaQzSbqxv6DV-jQNY5PPqSglo-ML3yXAlWLTaruRCbYWkMg55rU746mnPZI5sxsPF0iPxY7NcmFOAmaM350vBztq_PzDcBTckYa0O",
  },
];

export const ProductsTable: React.FC<ProductsTableProps> = ({
  searchTerm,
  categoryFilter,
  statusFilter,
  publishFilter,
}) => {
  const navigate = useNavigate();
  const { data: dbProducts, isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  // Populate dynamic database rows, fallback to sample data
  const baseList: ProductRow[] =
    dbProducts && dbProducts.length > 0
      ? dbProducts.map((p) => {
          const stockType = p.stock > 10 ? "in" : p.stock > 0 ? "low" : "out";
          const stockText =
            p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock";
          const idStr = p.id || "";
          return {
            id: idStr,
            name: p.name,
            subtitle: p.description
              ? p.description.substring(0, 45) + "..."
              : "No description",
            sku: (idStr || "KD000000").substring(0, 8).toUpperCase(),
            category: p.category,
            categoryColor: p.category.toLowerCase().includes("girl")
              ? "bg-[#00a4ca]/10 text-[#006780]"
              : p.category.toLowerCase().includes("shoes")
                ? "bg-[#dfbec4]/30 text-[#584045]"
                : "bg-[#ffd167]/30 text-[#765900]",
            price: `$${p.price.toFixed(2)}`,
            stockText,
            stockType,
            status: (p as any).status || "draft",
            image:
              p.images?.[0] ||
              "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80",
          };
        })
      : sampleProductsList;

  // Perform filtering
  const filteredProducts = baseList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" || p.category === categoryFilter;

    let matchesStock = true;
    if (statusFilter === "In Stock") matchesStock = p.stockType === "in";
    if (statusFilter === "Low Stock") matchesStock = p.stockType === "low";
    if (statusFilter === "Out of Stock") matchesStock = p.stockType === "out";

    let matchesPublish = true;
    if (publishFilter !== "All Statuses") {
      matchesPublish = p.status.toLowerCase() === publishFilter.toLowerCase();
    }

    return matchesSearch && matchesCategory && matchesStock && matchesPublish;
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70">
        Syncing catalog listings...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#dfbec4]/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 border-b border-[#dfbec4]/20">
              <th className="px-6 py-5 w-12">
                <input
                  type="checkbox"
                  className="rounded-md border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]/20 w-5 h-5 cursor-pointer"
                />
              </th>
              <th className="px-4 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                Stock Status
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider">
                Publish Status
              </th>
              <th className="px-6 py-5 font-semibold text-xs text-[#584045]/80 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/10 text-xs">
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[#b31f56]/5 transition-colors group text-[#131b2e] font-semibold"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded-md border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]/20 w-5 h-5 cursor-pointer"
                  />
                </td>

                <td
                  className="px-4 py-4 cursor-pointer"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <div className="w-14 h-14 bg-[#f2f3ff] rounded-2xl overflow-hidden border border-[#dfbec4]/20 shadow-sm transition-transform group-hover:scale-105 duration-300">
                    <img
                      className="w-full h-full object-cover"
                      src={p.image}
                      alt={p.name}
                    />
                  </div>
                </td>

                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <p className="font-bold text-sm text-[#131b2e]">{p.name}</p>
                  <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
                    {p.subtitle}
                  </p>
                </td>

                <td className="px-6 py-4 text-[#584045]">{p.sku}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase ${p.categoryColor}`}
                  >
                    {p.category}
                  </span>
                </td>

                <td className="px-6 py-4 font-extrabold text-sm text-[#131b2e]">
                  {p.price}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                      p.stockType === "in"
                        ? "bg-green-50 border-green-200 text-green-600"
                        : p.stockType === "low"
                          ? "bg-orange-50 border-orange-200 text-orange-600"
                          : "border-red-500 bg-red-50 text-red-600"
                    }`}
                  >
                    {p.stockText}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                      p.status === "active"
                        ? "bg-green-50 border-green-200 text-green-600"
                        : p.status === "scheduled"
                          ? "bg-blue-50 border-blue-200 text-blue-600"
                          : p.status === "archived"
                            ? "bg-gray-50 border-gray-200 text-gray-500"
                            : "bg-yellow-50 border-yellow-200 text-yellow-600"
                    }`}
                  >
                    {p.status || "draft"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`/products/edit/${p.id}`)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#584045]/70 hover:bg-[#ff5c8d]/20 hover:text-[#b31f56] transition-all cursor-pointer"
                    >
                      <MdEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#584045]/70 hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-all cursor-pointer"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-6 border-t border-[#dfbec4]/20 flex flex-col md:flex-row justify-between items-center gap-4 select-none">
        <p className="text-xs text-[#584045]/80 font-semibold">
          Showing{" "}
          <span className="font-bold text-[#131b2e]">
            1 to {filteredProducts.length}
          </span>{" "}
          of {filteredProducts.length} matching products
        </p>
      </div>
    </div>
  );
};
