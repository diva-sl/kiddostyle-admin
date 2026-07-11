import React from "react";
import { MoreVertical } from "lucide-react";

interface ProductItem {
  id: number;
  name: string;
  price: string;
  sold: number;
  status: string;
  statusColor: string;
  image: string;
}

const sellingProducts: ProductItem[] = [
  {
    id: 1,
    name: "Pastel Dream Hoodie",
    price: "$45.00",
    sold: 245,
    status: "In Stock",
    statusColor: "bg-[#b7eaff] text-[#004e61]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgZKgAVjWGRAdJSSycnKhlyWe8D1uFdnLQn6v27cFoXMVlLDw3QJjlaBI0HQbhsMRZ5yYftsNL3Bld09h7-1sdfjOshbUbFGMTQ_S2e8V2jWR5KjA1JpxEc75X6Wpg-SZ3GDWOR6b0Erdqn5JElZ-W0KLZZvwTg15kX67qL8OpURPAPLqGnQnvGi2gKIvlCzO2MbBZFRb3tJA5MTP2QF1IxsKUUCDdkDdg6-mfv0t6kFtWAtB23xMZsjCk_JUpR5P8SDamqUZkeq1N",
  },
  {
    id: 2,
    name: "Adventure Denim Overalls",
    price: "$58.00",
    sold: 189,
    status: "Low Stock",
    statusColor: "bg-[#ffdf9b] text-[#5b4300]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8RPnyJz5MDjXl2KF5c3CDKH9uVd-LD-cwHQ9u_CeGxMbniyTunay1gPbNjSIw0HjnfjexjznVvoBscKjHAII96touVG1CUphTId3159MesNG41LrkD2ImyBy6lsHh83NPPl2TycWz456XCqu0QwA-bg2h5zmLzaGgmW5SsMhwzBJkunOy7o9UwvOm48aTV47lyNWKdjrhSkkOLfUIxfMmRUer_hDrdqBG5Epxhi6uuOYIWFntlEY8D1jp4i8r7nHRWu71i3IAhv-y",
  },
  {
    id: 3,
    name: "Sunny Day Rainboots",
    price: "$32.00",
    sold: 156,
    status: "In Stock",
    statusColor: "bg-[#b7eaff] text-[#004e61]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXUuv2llu5qPccmzG0QGQPHE-SSNPFlUNqkyw2VoNk_rUc8oUhYug9bKz_clzdC1sAd0Ydx7z2p78gOrOw-wc9Tx-tR8VFUJDRliMAttppraCtswFAdnqUOKUCinSZUS2y33OHmtIY9rjLHHZtvcod31rW1oUiICAd8tCTybIEiZQOPnY0TMznROG4TLtHSLZr4GY02FEqP5WlMRc0MpaD5YgO7iZQ5G9lsSPfKyl4Yo4NuO0ArFUF6jWZ3NSQ4gL7RHpE5ot0UQ5z",
  },
];

export const TopProducts: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#dfbec4]/30 overflow-hidden h-full">
      <div className="px-8 py-6 border-b border-[#dfbec4]/25 flex justify-between items-center">
        <h4 className="font-display text-base font-extrabold text-[#131b2e]">
          Top Selling Products
        </h4>
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] transition-all cursor-pointer">
          <MoreVertical className="w-4 h-4 text-[#584045]/60" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#f2f3ff] text-xs font-bold text-[#584045]/60">
            <tr>
              <th className="px-8 py-4">Product</th>
              <th className="px-8 py-4">Price</th>
              <th className="px-8 py-4">Sold</th>
              <th className="px-8 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs">
            {sellingProducts.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[#f2f3ff]/30 transition-colors cursor-pointer group text-[#131b2e] font-semibold"
              >
                <td className="px-8 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-[#dfbec4]/20">
                    <img
                      className="w-full h-full object-cover"
                      src={p.image}
                      alt={p.name}
                    />
                  </div>
                  <span className="font-bold group-hover:text-[#b31f56] transition-colors truncate max-w-[200px]">
                    {p.name}
                  </span>
                </td>
                <td className="px-8 py-4 font-bold text-[#b31f56]">
                  {p.price}
                </td>
                <td className="px-8 py-4">{p.sold}</td>
                <td className="px-8 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase ${p.statusColor}`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
