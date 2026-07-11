import React from "react";
import { MdFilterList, MdDownload, MdEdit, MdDelete } from "react-icons/md";

interface BlogPost {
  title: string;
  meta: string;
  author: string;
  category: string;
  categoryColor: string;
  status: "published" | "scheduled" | "draft";
  statusText: string;
  statusColor: string;
  image: string;
}

const postsList: BlogPost[] = [
  {
    title: "Summer 2024 Kids Trends",
    meta: "Published: Oct 24, 2023",
    author: "Sarah Jenkins",
    category: "Style Tips",
    categoryColor: "bg-[#00a4ca]/10 text-[#006780]",
    status: "published",
    statusText: "Published",
    statusColor: "bg-green-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdfh8XxKcr8q57Mgd7G846hlqg9-qq-FWFC1j0MTk4HkgCZVX4kHvG0Y2-ebI4f2bkFjDON31TXeI8iBofsinogQJkgAr9gXhWUE6Te-FpU_ZNtnECLjS4TxFYmrocFetZmkmeyIqgsgzs5t2JQlQ2pUloP4TNBYFQP2hnjWhLd9L0DoIECHWQkPvgUoRlYxWlnqiJsKKkr--kCN3-MtlfHCS7RfK3I8HPvU4yHV3ndUKO4zhYkW3QJKpOIKvSRJpjJp-hyQrx0YO-",
  },
  {
    title: "Rainy Day Essentials",
    meta: "Scheduled: Nov 05, 2023",
    author: "Leo Maxwell",
    category: "Product News",
    categoryColor: "bg-[#ffd167]/30 text-[#765900]",
    status: "scheduled",
    statusText: "Scheduled",
    statusColor: "bg-[#785a00]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOcNNuOwGFD2kcrT-NQ1GUJrK2SlAXOoSg04UXuGDU875unv4kZ31EtKIPdU-YTdRxKogmKquKk2K1zIzLQ2bxw_JCNbLL6j-5bZ3YTw8H1uHP3xQXTMhtO5IEb9lrW9KnxMAj7pWDNbY-pGj74fau-vJKygP__8rz2m0gU_J3we8i7LLz_L7J4-2TQybud3krTOyFm5Kf2O1zrMz_4FTJoQANmHeijylEN3v75Zg2dWHUA0HiwZsS68Ylhqg45JMxB6AWzgsUBIGf",
  },
  {
    title: "Warm Knits for Winter",
    meta: "Status: Draft",
    author: "Sarah Jenkins",
    category: "Fashion",
    categoryColor: "bg-[#ff5c8d]/20 text-[#b31f56]",
    status: "draft",
    statusText: "Draft",
    statusColor: "bg-[#584045]/60",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChOfGlzBxeARgRqNB-_QtGETSQ2oK0tivGi0YaPHY_qCReMztEwLuCiiw7MfhbPqEfxTayfzZg7aRZNCxNYffOIjHroB5XP_hh-mkPxjdO0tV2XKStzW6WwX-C69i9aCxvsGoyk_hd5IDl2wmdz_EKYHcfObNWgNHBDbAkSXmPEMb8jtaVrfSkYPLUBNZ9bba5cXAFU1fCeP7CC6xc9SkkisEoF4HP7Xrt2WPNjgfcysau6JXyWVRlr1NYRlYeopXwHUBnJXZ1dkuj",
  },
];

export const RecentBlogPosts: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl shadow-sm overflow-hidden border border-[#dfbec4]/30 bg-white/40">
      {/* Header controls */}
      <div className="p-6 border-b border-[#dfbec4]/30 flex justify-between items-center bg-white/40">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Recent Posts
        </h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors cursor-pointer">
            <MdFilterList className="w-5 h-5 text-[#584045]/70" />
          </button>
          <button className="p-2 rounded-full border border-[#dfbec4]/30 hover:bg-[#f2f3ff] transition-colors cursor-pointer">
            <MdDownload className="w-5 h-5 text-[#584045]/70" />
          </button>
        </div>
      </div>

      {/* Grid table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 font-bold text-xs text-[#584045]/70 border-b border-[#dfbec4]/20">
              <th className="px-6 py-4">Post Details</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {postsList.map((post, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#ff5c8d]/5 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 rounded-xl bg-[#f2f3ff] overflow-hidden shrink-0 border border-[#dfbec4]/20">
                      <img
                        className="w-full h-full object-cover"
                        src={post.image}
                        alt={post.title}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#131b2e] group-hover:text-[#b31f56] transition-colors">
                        {post.title}
                      </div>
                      <div className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
                        {post.meta}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-[#131b2e]">{post.author}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${post.categoryColor}`}
                  >
                    {post.category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 font-bold text-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${post.statusColor}`}
                    />
                    {post.statusText}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button className="p-1 hover:text-[#b31f56] transition-colors cursor-pointer">
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-[#ba1a1a] transition-colors cursor-pointer">
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination indicators */}
      <div className="p-6 bg-[#f2f3ff]/30 border-t border-[#dfbec4]/20 flex items-center justify-between select-none">
        <span className="text-xs font-bold text-[#584045]/70">
          Showing 3 of 32 posts
        </span>
        <div className="flex gap-1.5">
          <button className="px-3.5 py-1.5 rounded-lg border border-[#dfbec4]/30 hover:bg-white text-xs font-bold text-[#584045] transition-colors cursor-pointer">
            Prev
          </button>
          <button className="px-3.5 py-1.5 rounded-lg bg-[#b31f56] text-white font-extrabold text-xs shadow-sm">
            1
          </button>
          <button className="px-3.5 py-1.5 rounded-lg border border-[#dfbec4]/30 hover:bg-white text-xs font-bold text-[#584045] transition-colors cursor-pointer">
            2
          </button>
          <button className="px-3.5 py-1.5 rounded-lg border border-[#dfbec4]/30 hover:bg-white text-xs font-bold text-[#584045] transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
