import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdChevronRight,
  MdArrowBack,
  MdCheckCircle,
  MdCloudUpload,
} from "react-icons/md";
import {
  MdCheckCircle as CheckIcon,
  MdCloudUpload as UploadIcon,
} from "react-icons/md";
import {
  useArticles,
  useCreateArticle,
  useUpdateArticle,
} from "../hooks/useBlog";
import { apiClient } from "../services/apiClient";

const sampleArticles = [
  {
    id: "1",
    title: "Summer 2024 Kids Trends",
    slug: "summer-2024-kids-trends",
    summary: "Discover what little ones will be wearing this season.",
    content: "Full summer guide details...",
    author: "Sarah Jenkins",
    status: "published",
    image: "",
  },
];

export const AddBlogPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: articles = [] } = useArticles();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Sarah Jenkins");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Generate slug dynamically from title
  useEffect(() => {
    if (!isEditMode) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
    }
  }, [title, isEditMode]);

  // Prefill details on edit mode
  useEffect(() => {
    if (isEditMode && id) {
      let matched = articles.find((a) => a.id === id);
      if (!matched) {
        matched = sampleArticles.find((a) => a.id === id) as any;
      }
      if (matched) {
        setTitle(matched.title);
        setSlug(matched.slug);
        setSummary(matched.summary || "");
        setContent(matched.content || "");
        setAuthor(matched.author || "Sarah Jenkins");
        setImage(matched.image || "");
        setTags(matched.tags?.join(", ") || "");
        setStatus(matched.status);
      }
    }
  }, [isEditMode, id, articles]);

  // S3 Cover image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "blog");

      try {
        const { data } = await apiClient.post<{ url: string }>(
          "/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setImage(data.url);
      } catch (err) {
        alert("Upload failed. Try copy-pasting a public image URL instead.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug,
      summary,
      content,
      author,
      image,
      status,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: () => {
            alert("Blog article updated!");
            navigate("/blog");
          },
          onError: (err: any) => alert("Failed to save: " + err.message),
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Blog article published!");
          navigate("/blog");
        },
        onError: (err: any) => alert("Failed to post: " + err.message),
        onSettled: () => setSaving(false),
      });
    }
  };

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
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Article" : "Write Article"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/blog")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode
              ? "Configure Article details"
              : "Publish Fashion Article"}
          </h2>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Article Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Summer 2024 Kids Trends"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Slug URL
            </label>
            <input
              type="text"
              required
              placeholder="summer-2024-trends"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
            Brief Summary
          </label>
          <textarea
            rows={2}
            required
            placeholder="A brief snippet showing in the card list catalog..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
            Full Markdown Content
          </label>
          <textarea
            rows={8}
            required
            placeholder="Write full blog HTML/text description content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Author
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Tags (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. style, summer, fashion"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
            Cover Image
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="https://example.com/cover.png"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="flex-grow bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
            <input
              type="file"
              id="cover-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() =>
                document.getElementById("cover-image-upload")?.click()
              }
              className="p-3.5 bg-[#e2e7ff] hover:bg-[#dfbec4]/30 rounded-xl text-[#584045] transition-all cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <UploadIcon className="w-5 h-5 text-[#b31f56]" />
              {uploading ? "Uploading..." : "Upload Cover"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-bold cursor-pointer"
          >
            <option value="draft">Draft (Save offline)</option>
            <option value="published">Published (Live on storefront)</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="px-6 py-3 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-7 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <CheckIcon className="w-4 h-4" />
            {saving
              ? "Publishing..."
              : isEditMode
                ? "Update Article"
                : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
};
