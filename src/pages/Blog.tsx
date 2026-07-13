import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { BlogKpiGrid } from "../components/BlogKpiGrid";
import { RecentBlogPosts } from "../components/RecentBlogPosts";
import { ContentCalendar } from "../components/ContentCalendar";

export const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Blog &amp; Content
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Manage your brand voice and fashion tips.
          </p>
        </div>

        <button
          onClick={() => navigate("/blog/new")}
          className="flex items-center gap-1.5 bg-[#b31f56] text-white px-6 py-3 rounded-full font-bold text-xs shadow-lg hover:shadow-[#b31f56]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-none"
        >
          <MdAdd className="w-5 h-5" />
          Create New Post
        </button>
      </section>

      {/* Bento summary KPIs stats grids */}
      <BlogKpiGrid />

      {/* Main split portfolio content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <RecentBlogPosts />
        </div>

        <div className="lg:col-span-4">
          <ContentCalendar />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
