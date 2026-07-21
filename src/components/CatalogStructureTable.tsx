import React from "react";
import {
  MdFilterList,
  MdSort,
  MdEdit,
  MdDelete,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import {
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import type { Category } from "../services/categoryService";

interface CatalogStructureTableProps {
  onEdit: (category: Category) => void;
}

const sampleFallbackCategories = [
  {
    id: "1",
    name: "Girls",
    createdAt: "12 Oct 2023",
    subCategories: ["Dresses", "Tops", "Bottoms"],
    totalProducts: 342,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASU86zsEDz0pdsfgPQ_9IwTp2fSUW1XilC0ecy8kK-QStPX7hfl25iP696DTUjmI6HAVFigOipTaxvdNB_ZF3ewgcGWCJtxLVkL0xZeYec8feffmx5sgYpeUNNf1TZvbg9dVCjrYMV_mwDON41GbBYlusUdQm9koDdVcv1QWKh_lD56NJ2CP2uLL5h7snhK0mvr0JrA0WX0H-ql6rXgaWifG3Ad6LoocaN9sIEDePWENbFcObJwvBe5gThbkp2un1lgPhD2PVDGX1c",
  },
  {
    id: "2",
    name: "Boys",
    createdAt: "15 Oct 2023",
    subCategories: ["Shirts", "Trousers"],
    totalProducts: 289,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_DboAgIGL3YnAtEDxOvIeN4U4RHmuCpcs25AP3zLHtJWaMJkpBBol0j8eqQqzmEJ8GHW3R_DhBm6S9y65t794tGufyr47JupEj1kGB7_aHl4jZaT10mMlkehAhc992SDxCiZ5QnUkF4MlJCiN04iU0ZlcjfWs6tZE0TQED0KpPP7e_ksDiVXfM6VtyEstWwoaj5UottAU4CMY1dHb781Fn2-33JCQ0-8Xxw8QLw6hF7fI17pL1bu_gtjS5jwsfZHA6ji2zi7gOYl",
  },
  {
    id: "3",
    name: "School Wear",
    createdAt: "01 Nov 2023",
    subCategories: ["Uniforms", "Sportswear"],
    totalProducts: 156,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMR8Ix27MBie4Vw6ZCkDAyjska5HUX07pRxR0kyqzN1f7seOIlsqvEmY0aMH2W1X48rSNz6A9cICWWMgIjjY1TJbblHWVIOzq6JwW3pq4O7pClP_CbjQnO50j365N_btIPvrbVZhGr60m0j_iYBfIaqKzODJ7MHg3_IJ0qdusvCwiZ__Y3rg4nW4TS3LeY5ohKtbbGsnI61UpvaVSouErfqjxREmRHC8_htK6DHzQjNhcO2YiSZSuodDbUiN5RKVo8vxymNaZldeUY",
  },
  {
    id: "4",
    name: "Winter Collection",
    createdAt: "20 Nov 2023",
    subCategories: ["Jackets", "Knits"],
    totalProducts: 112,
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSKsazBpi3D-W5UaOAtcVlSvz13j513KdRYV4xc5MuYU9tO_6BFBiwv9lw_VI-FdiPLzMlPPzevnDB98h3lleiMe3lTs5BStHUiOGVvR9HJc6iA5B7UcgYNrMS5RLpCLHP4QoCzeLUytEcTMVMSzVmF6Pb2hhOgb7U6JnB7NQOz9LuvtNnlavS6kFwotxjao4SGJxZ4Sp1siIciAzY40PNTbRBzWjxB2v_CJADfnmZaMlPNzJ_BV5zEenflsnumyJ2Pgl7MZKxHw-j",
  },
];

export const CatalogStructureTable: React.FC<CatalogStructureTableProps> = ({
  onEdit,
}) => {
  const { data: dbCategories, isLoading } = useCategories();
  const { data: products = [] } = useProducts();
  const deleteMutation = useDeleteCategory();
  const toggleMutation = useUpdateCategory();

  // Pagination State
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (row: Category) => {
    if (!row.id) return;
    const nextStatus = row.status === "active" ? "inactive" : "active";
    toggleMutation.mutate({ id: row.id, data: { status: nextStatus } });
  };

  // Map categories and compute product counts dynamically
  const safeProducts = Array.isArray(products) ? products : [];
  const displayList: Category[] =
    dbCategories && dbCategories.length > 0
      ? dbCategories.map((c) => {
          const total = safeProducts.filter(
            (p) => (p?.category || "").toLowerCase() === (c?.name || "").toLowerCase(),
          ).length;
          return { ...c, totalProducts: total };
        })
      : sampleFallbackCategories.map((c) => {
          const total = safeProducts.filter(
            (p) => (p?.category || "").toLowerCase() === (c?.name || "").toLowerCase(),
          ).length;
          return {
            id: c.id,
            name: c.name,
            slug: c.name.toLowerCase().replace(/ /g, "-"),
            description: "Sample Fallback Category Description",
            image: c.image,
            status: c.status,
            subCategories: c.subCategories,
            createdAt: c.createdAt,
            totalProducts: total || c.totalProducts,
          };
        });

  // Pagination Calculations
  const totalItems = displayList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = displayList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startIdx =
    totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70">
        Loading catalog structure categories...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden">
      {/* Title & Filters */}
      <div className="px-6 py-4 border-b border-[#dfbec4]/25 flex items-center justify-between">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Catalog Structure
        </h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-[#faf8ff] transition-colors text-[#584045]/70 cursor-pointer">
            <MdFilterList className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#faf8ff] transition-colors text-[#584045]/70 cursor-pointer">
            <MdSort className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 text-xs font-bold text-[#584045]/70 border-b border-[#dfbec4]/20 select-none">
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4">Sub-categories</th>
              <th className="px-6 py-4">Total Products</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {paginatedList.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#dfbec4]/20 bg-white shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          row.image ||
                          "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80"
                        }
                        alt={row.name}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#131b2e]">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
                        Slug: {row.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                    {row.subCategories && row.subCategories.length > 0 ? (
                      row.subCategories.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-[#ffd167]/30 text-[#765900] text-[9px] font-extrabold rounded-full select-none"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-[#584045]/40 italic">
                        No sub-categories
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5 font-bold text-sm text-[#131b2e]">
                  {row.totalProducts}
                </td>

                {/* Toggle Status switch */}
                <td className="px-6 py-5">
                  <div className="flex justify-center select-none">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.status === "active"}
                        onChange={() => handleToggleActive(row)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
                    </label>
                  </div>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(row)}
                      className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer"
                    >
                      <MdEdit className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id || "")}
                      className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#584045]/70 hover:text-[#ba1a1a] transition-colors cursor-pointer"
                    >
                      <MdDelete className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fully Functional Pagination Footer */}
      <div className="px-6 py-4 border-t border-[#dfbec4]/20 flex justify-between items-center text-xs font-bold text-[#584045]/70 select-none">
        <span>
          Showing {startIdx} to {endIdx} of {totalItems} categories
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-[#dfbec4]/25 hover:bg-[#faf8ff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <MdChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-[#dfbec4]/25 hover:bg-[#faf8ff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <MdChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
