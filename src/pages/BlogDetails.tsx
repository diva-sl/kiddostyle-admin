import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdArrowBack, MdEdit } from "react-icons/md";
import { useArticles } from "../hooks/useBlog";

const sampleArticles = [
  {
    id: "1",
    title: "Summer 2024 Kids Trends",
    slug: "summer-2024-kids-trends",
    summary: "Discover what little ones will be wearing this season.",
    content:
      "We are thrilled to bring you the comprehensive style guide for the upcoming summer. Expect to see light fabrics, organic cotton weaves, pastel tones, and practical sizing for active kiddos.",
    author: "Sarah Jenkins",
    status: "published",
    tags: ["style", "summer"],
    publishedAt: "2026-10-24T12:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
  },
];

export const BlogDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: articles = [] } = useArticles();

  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    let matched = articles.find((a) => a.id === id);
    if (!matched) {
      matched = sampleArticles.find((a) => a.id === id);
    }
    setArticle(matched);
  }, [id, articles]);

  if (!article) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Reading blog archives...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/blog")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Blog
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">Article View</span>
        </nav>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/blog")}
              className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] cursor-pointer"
            >
              <MdArrowBack className="w-4 h-4" />
            </button>
            <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
              Article Details
            </h2>
          </div>

          <button
            onClick={() => navigate(`/blog/edit/${article.id}`)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 cursor-pointer"
          >
            <MdEdit className="w-4 h-4" />
            Edit Article
          </button>
        </div>
      </header>

      <article className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden p-8 space-y-6">
        {article.image && (
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-[#dfbec4]/10 bg-[#f2f3ff]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {(article.tags || []).map((t: string) => (
              <span
                key={t}
                className="bg-[#ffd9df] text-[#b31f56] px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full bg-[#f2f3ff] text-[#584045]/70 text-[9px] font-extrabold uppercase tracking-wider">
              {article.status}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold text-[#131b2e] leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#584045]/60 pt-2 border-b border-[#dfbec4]/10 pb-4">
            <span>
              By <strong>{article.author}</strong>
            </span>
            <span>•</span>
            <span>
              {new Date(article.publishedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-xs leading-relaxed text-[#131b2e] font-semibold space-y-4 whitespace-pre-line">
          {article.content}
        </div>
      </article>
    </div>
  );
};
