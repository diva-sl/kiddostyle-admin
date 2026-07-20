import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useArticles, useDeleteArticle } from "../hooks/useBlog";

interface ChartBar {
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

const fallbackPosts = [
  {
    id: "1",
    title: "Summer 2024 Kids Trends",
    author: "Sarah Jenkins",
    tags: ["style"],
    status: "published",
    createdAt: "2026-10-24T12:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    title: "Rainy Day Essentials",
    author: "Leo Maxwell",
    tags: ["news"],
    status: "scheduled",
    createdAt: "2026-11-05T12:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "3",
    title: "Warm Knits for Winter",
    author: "Sarah Jenkins",
    tags: ["fashion"],
    status: "draft",
    createdAt: "2026-10-20T12:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80",
  },
];

export const RecentBlogPosts: React.FC = () => {
  const navigate = useNavigate();
  const { data: articles = [], isLoading } = useArticles();
  const deleteMutation = useDeleteArticle();

  // Pagination states
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog article permanently?",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  // Map to list elements or fall back
  const displayList: any[] =
    articles.length > 0
      ? articles
      : fallbackPosts.map((p) => ({
          id: p.id,
          title: p.title,
          author: p.author,
          tags: p.tags,
          status: p.status,
          createdAt: p.createdAt,
          image: p.image,
        }));

  // Slicing parameters
  const totalItems = displayList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedList = displayList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getStatusColor = (status: string) => {
    if (status === "published") return "bg-green-500";
    if (status === "scheduled") return "bg-[#785a00]";
    return "bg-[#584045]/60";
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none bg-white rounded-3xl border border-[#dfbec4]/30">
        Loading recent articles...
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl shadow-sm overflow-hidden border border-[#dfbec4]/30 bg-white/40 select-none">
      {/* Header controls */}
      <div className="p-6 border-b border-[#dfbec4]/30 flex justify-between items-center bg-white/40">
        <h3 className="font-display text-base font-extrabold text-[#131b2e]">
          Recent Posts
        </h3>
        <div className="flex gap-2 text-xs font-bold text-[#584045]/75">
          Showing {paginatedList.length} items
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
            {paginatedList.map((post) => {
              const categoryName = post.tags?.[0] || "Style Tips";

              return (
                <tr
                  key={post.id}
                  className="hover:bg-[#ff5c8d]/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="w-16 h-12 rounded-xl bg-[#f2f3ff] overflow-hidden shrink-0 border border-[#dfbec4]/20 cursor-pointer"
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={
                            post.image ||
                            "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80"
                          }
                          alt={post.title}
                        />
                      </div>
                      <div>
                        <div
                          onClick={() => navigate(`/blog/${post.id}`)}
                          className="font-bold text-sm text-[#131b2e] hover:text-[#b31f56] cursor-pointer transition-colors"
                        >
                          {post.title}
                        </div>
                        <div className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
                          Published:{" "}
                          {new Date(
                            post.createdAt || Date.now(),
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[#131b2e]">{post.author}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#00a4ca]/10 text-[#006780]">
                      {categoryName}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 font-bold text-xs capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${getStatusColor(post.status)}`}
                      />
                      {post.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/blog/edit/${post.id}`)}
                        className="p-1 hover:text-[#b31f56] transition-colors cursor-pointer border-none bg-none"
                        title="Edit Article"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1 hover:text-[#ba1a1a] transition-colors cursor-pointer border-none bg-none"
                        title="Delete Article"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination indicators */}
      <div className="p-6 bg-[#f2f3ff]/30 border-t border-[#dfbec4]/20 flex items-center justify-between select-none">
        <span className="text-xs font-bold text-[#584045]/70">
          Showing {paginatedList.length} of {totalItems} posts
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 rounded-lg border border-[#dfbec4]/30 hover:bg-white text-xs font-bold text-[#584045] disabled:opacity-30 transition-colors cursor-pointer"
          >
            Prev
          </button>
          <span className="px-3.5 py-1.5 rounded-lg bg-[#b31f56] text-white font-extrabold text-xs shadow-sm">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3.5 py-1.5 rounded-lg border border-[#dfbec4]/30 hover:bg-white text-xs font-bold text-[#584045] disabled:opacity-30 transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
