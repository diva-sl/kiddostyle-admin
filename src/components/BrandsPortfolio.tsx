import React from "react";
import { MdMoreVert } from "react-icons/md";

interface BrandRow {
  name: string;
  category: string;
  categoryColor: string;
  products: number;
  status: "active" | "inactive";
  logo: string;
}

const portfolioBrands: BrandRow[] = [
  {
    name: "MiniMe",
    category: "Apparel",
    categoryColor: "bg-[#ff5c8d]/20 text-[#8f003f]",
    products: 142,
    status: "active",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_dsP1UyfN8cL2do72OaSasMaebaIuifE_yX5rNRN9aYeu6q0JGygaovILkVoFhyH-p0cHBBJFx7-O5-6z13Ey9zkXfxptS4ZQApUgmivIsTIZj8m_x111fxYkHnI2x2cxVa38RfCWtTMGnHXPRlrIHky49I6YqvCJaylY534yqPRqL49FwQDgFGBYatV2-jFIYRSb8H2Vnae_Ntov-1qAgg10NNmmG_s8EwSdZ5_AjZQj551q90TNqx_wNX7QwKRc3RiWmSOoYEs",
  },
  {
    name: "TinyTots",
    category: "Accessories",
    categoryColor: "bg-[#b7eaff] text-[#004e61]",
    products: 56,
    status: "active",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxkvCmV2U4iFnGM64y9QJimfBN34CyOf754Pq3zyDb66a8wY-lhppX1Sa6rQleWYtxQMxAN-QZ-_22xWc6GPadu6fE3Fxe6nqUpWDhr9v5oaHjITpoRfNFkdHHrN8RWT5Dgtusk6xyAPS95MZezRGbBKfrEes8FwHMHIN_I8CSbFoNb-nMHU2U4u25V6FP0C2ppU6ZMgZxyiiVgy8nJJWFjZszGcIkXLaLO5c0g02_exIGVpMXujkrIFcEBqav3cJgbaUuaPfr2u8x",
  },
  {
    name: "KiddyStep",
    category: "Footwear",
    categoryColor: "bg-[#e2e7ff] text-[#584045]",
    products: 88,
    status: "inactive",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6nT6omZFug61QTJCO1zJllv9VQv2Na_IByw5-8Etxg4AN7PshGcPj0CFFcGb0yCGFuSRAoxx-onb8IEohzGBJY_5JrDj1ZthYvEa1ygUIzYH4duE9ksGRg_qvsOzqSMXgvVhy1o06nM8xoQzi5uyMJMsQ5m4PBBNHq7zxE0bK7CCPUIbjeDhYDiWFhubeRnezRktd1EbyQJSIqFYq3NXQDSePwiKm5W_Enng9D9PE_jWH6eHkF1zxiSvkkDnZYy9MvHuL0PY72Tav",
  },
  {
    name: "PlayPals",
    category: "Apparel",
    categoryColor: "bg-[#ff5c8d]/20 text-[#8f003f]",
    products: 210,
    status: "active",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt-HFjT9VUTVw9CtV8WPemfHi7IdbSzvhmXOKZ_Wm0eBXTnsYRSFga6LbztnNqLVui1qB09mO8nTn9bDpEriqJcZEkbS_nxLAwp8fSOEdkf9-kX08f_tedEF8ePufaWaJAqwR8fNWAj4SjhUY3pYqGFlIBHNEwiLjnXpkYFniZ9N6fJ-bgCYvV1UNr89RZ3EEo7Ak1HvUoGgqLZWBDzHNzbXT3yKWlR5ReSDZdPsrwDSOmbrQdxCZAxOpKybIZ9y_MlcruD6eKtz4S",
  },
];

export const BrandsPortfolio: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#dfbec4]/30 overflow-hidden h-full">
      {/* Header title */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex items-center justify-between">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Active Portfolio
        </h3>
        <button className="text-xs font-bold text-[#b31f56] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      {/* Grid portfolio list */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff] text-xs font-bold text-[#584045]/70 border-b border-[#dfbec4]/20">
              <th className="p-4">Brand</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Products</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {portfolioBrands.map((brand, idx) => {
              const isActive = brand.status === "active";
              return (
                <tr
                  key={idx}
                  className="hover:bg-[#faf8ff] transition-colors group"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f2f3ff] overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-[#dfbec4]/20 shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={brand.logo}
                        alt={brand.name}
                      />
                    </div>
                    <span className="font-bold text-[#131b2e]">
                      {brand.name}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase ${brand.categoryColor}`}
                    >
                      {brand.category}
                    </span>
                  </td>

                  <td className="p-4 text-center text-[#584045]/80">
                    {brand.products}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-[#dfbec4]"}`}
                      />
                      <span
                        className={
                          isActive ? "text-[#131b2e]" : "text-[#584045]/60"
                        }
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <button className="p-1 hover:bg-[#f2f3ff] rounded-full text-[#584045]/60 transition-colors cursor-pointer">
                      <MdMoreVert className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
