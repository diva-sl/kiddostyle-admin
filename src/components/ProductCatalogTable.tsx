import React from "react";
import {
  MdFilterList,
  MdDownload,
  MdVisibility,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface ProductRow {
  name: string;
  sku: string;
  category: string;
  price: string;
  status: "healthy" | "low" | "out";
  statusText: string;
  statusColor: string;
  image: string;
}

const catalog: ProductRow[] = [
  {
    name: "Sunny Smiles Organic Tee",
    sku: "KD-00124-YL",
    category: "T-Shirts",
    price: "$32.00",
    status: "healthy",
    statusText: "Healthy (142)",
    statusColor: "bg-green-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClGxNcS2q0hdXF5bxwiCb9XFDkt37mfXOcdLyHS-_zkFRW9Wp5GgU2GrEoLnx3S5cXp5ntB2ZsS1dJ_f_9HgwTfK6rtIrF9cNCBW6QhMGwbSpBiPvXqE3FvZLNoUwX2NHhQhzajFZNxddEzHAtsEMVkv6CqxKUCenXQvE50-kU1HTxj0Cm5MHqpx8k2k-_Je75dFhgBHpMQ8FlfV005cOF7XnH6sajyAVgz0Z4F_5gumOJE16moEY6jk0IFL7N3IFKHtXw4KWfG_SZ",
  },
  {
    name: "Dusty Rose Linen Overalls",
    sku: "KD-09882-RS",
    category: "Outerwear",
    price: "$54.50",
    status: "low",
    statusText: "Low (12)",
    statusColor: "bg-[#ffd167]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5nwv431SwRzZ-9-MdZBIaCxGyeO05GcuStUsIO_GcEEr2JvLvELzPuxFu3ksX96jxqYrQpVCtZaRzrG29ijJ_MRAdixKtCIj0ZCItxpST3qJ3AgGcpsDk21yZ-4LUBVJ7LtbhXs0wCZUyONPMEaN9cJdAdn3oCkZW2RQjzkiVFxReLK6jRYfTQxZ3XkH8SjvGIhXnbxPC5T_ulCGsVX3yXKlpBaH_pZiaj-dqMDxZ1rLjMTVn-VEVh5TzHkRsdMB-5Y2XLCpJFqvv",
  },
  {
    name: "Explorer Leather Boots",
    sku: "KD-44109-NV",
    category: "Footwear",
    price: "$78.00",
    status: "out",
    statusText: "Out (0)",
    statusColor: "bg-[#ba1a1a]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDT38y8oi5maltaJfP4P8ID7xN1gyMs6TG37VegL8es2B5p4QvfY8RAtxHSzu08I9OVBvItFdy-D2_d6jQpoIJaFcyqtgqr1yLWhu960X3_MziBHtwbjTy-kgPfJjH82YORpe2ywdYW3kVmRI7CvCIYpEKIEBai5FEqHwi7VtanyVS8GiCVzA0O68LMj7GwoaCZtvUrTpJTQRB1UDKWm6lzWUYpxf_fC29JV5pYWuoHShzvUAD8BML5hWKZ1qMta8xXRpfl8SlQL-sE",
  },
  {
    name: "Midnight Dreamer Jammies",
    sku: "KD-11234-MN",
    category: "Sleepwear",
    price: "$28.00",
    status: "healthy",
    statusText: "Healthy (88)",
    statusColor: "bg-green-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1ze-eRKSySE-7bI78lov_lpDdGIorAUeqN0hd6loUq6ez6By5Dgns5d6Fw6eWZVrnc9Jm_uRpfmJcUZ4lcSdeKB3S7S1NImymsHZk4bjYZmHGMvHDHx71m4K0R59Po-OW7QzkM0UWEuV_MtQVQ1A3mREV2lhJm5wrKEcqOAjtFdNLnEjUuJafuj0dDxS3r6vGNqcGoknLvAZsOgz1OPQryVzTCjJSEdFoTEiZa4KkiW4mnMGP175NbUg-DCAzH4Beii5V8saQIMfK",
  },
];

export const ProductCatalogTable: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden select-none">
      {/* Table Header Filter options */}
      <div className="p-6 border-b border-[#dfbec4]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#f2f3ff]/30">
        <div>
          <h3 className="font-display text-base font-extrabold text-[#131b2e]">
            Product Catalog
          </h3>
          <p className="text-[10px] text-[#584045]/60 font-bold mt-0.5">
            Manage and monitor your children's fashion inventory
          </p>
        </div>

        <div className="flex gap-2.5 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 border border-[#dfbec4] hover:bg-[#faf8ff] px-4 py-2 rounded-full font-bold text-xs text-[#584045] cursor-pointer">
            <MdFilterList className="w-4.5 h-4.5 text-[#584045]/70" /> Filter
          </button>

          <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 border border-[#dfbec4] hover:bg-[#faf8ff] px-4 py-2 rounded-full font-bold text-xs text-[#584045] cursor-pointer">
            <MdDownload className="w-4.5 h-4.5 text-[#584045]/70" /> Export
          </button>
        </div>
      </div>

      {/* Grid listing Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/10 text-xs font-bold text-[#584045]/70">
              <th className="py-4 px-6">Product Details</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Stock Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/15 text-xs font-semibold text-[#131b2e]">
            {catalog.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#faf8ff] transition-colors group"
              >
                {/* Details */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#dfbec4]/20 bg-[#faf8ff]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={row.image}
                        alt={row.name}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#131b2e] leading-snug">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-[#584045]/50 font-bold mt-1">
                        {row.sku}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="px-3.5 py-1 bg-[#f2f3ff] text-[#584045] rounded-full text-[10px] font-bold">
                    {row.category}
                  </span>
                </td>

                <td className="py-4 px-6 font-extrabold text-sm text-[#131b2e]">
                  {row.price}
                </td>

                {/* Stock status dots */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span
                      className={`w-2 h-2 rounded-full ${row.statusColor}`}
                    />
                    <span
                      className={
                        row.status === "healthy"
                          ? "text-green-700"
                          : row.status === "low"
                            ? "text-[#765900]"
                            : "text-[#ba1a1a]"
                      }
                    >
                      {row.statusText}
                    </span>
                  </div>
                </td>

                {/* Actions quick edits */}
                <td className="py-4 px-6">
                  <div className="flex justify-center gap-2">
                    <button className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#b31f56] transition-colors cursor-pointer">
                      <MdVisibility className="w-4.5 h-4.5" />
                    </button>
                    <button className="p-1.5 hover:bg-[#f2f3ff] rounded-full text-[#785a00] transition-colors cursor-pointer">
                      <MdEdit className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-[#dfbec4]/20 flex justify-between items-center bg-[#f2f3ff]/10">
        <p className="text-[10px] font-extrabold text-[#584045]/60">
          Showing 4 of 1,284 products
        </p>

        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] transition-colors disabled:opacity-30 cursor-pointer">
            <MdChevronLeft className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>

          <button className="w-8 h-8 rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] text-[#584045] font-bold text-xs cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] text-[#584045] font-bold text-xs cursor-pointer">
            3
          </button>

          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] transition-colors cursor-pointer">
            <MdChevronRight className="w-4.5 h-4.5 text-[#584045]/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
