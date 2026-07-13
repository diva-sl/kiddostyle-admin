import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdArrowBack, MdCheckCircle } from "react-icons/md";
import {
  useLandingPages,
  useCreateLandingPage,
  useUpdateLandingPage,
} from "../hooks/useLandingPages";

const sampleLandingPages = [
  {
    id: "1",
    title: "Summer Sale 2024",
    slug: "/promos/summer-sale-2024",
    active: true,
    metaTitle: "Summer Sale",
    metaDescription: "Discover hot deals",
    content: {},
  },
];

export const AddLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: pages = [] } = useLandingPages();
  const createMutation = useCreateLandingPage();
  const updateMutation = useUpdateLandingPage();

  // Form Fields state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [active, setActive] = useState(true);
  const [rawJson, setRawJson] = useState('{\n  "sections": []\n}');
  const [saving, setSaving] = useState(false);

  // Generate slug dynamically
  useEffect(() => {
    if (!isEditMode) {
      setSlug(
        `/promos/${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`,
      );
    }
  }, [title, isEditMode]);

  // Prefill details on edit mode
  useEffect(() => {
    if (isEditMode && id) {
      let matched = pages.find((p) => p.id === id);
      if (!matched) {
        matched = sampleLandingPages.find((p) => p.id === id) as any;
      }
      if (matched) {
        setTitle(matched.title);
        setSlug(matched.slug);
        setMetaTitle(matched.metaTitle || "");
        setMetaDescription(matched.metaDescription || "");
        setActive(matched.active);
        setRawJson(
          JSON.stringify(matched.content || { sections: [] }, null, 2),
        );
      }
    }
  }, [isEditMode, id, pages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let parsedContent = {};
    try {
      parsedContent = JSON.parse(rawJson);
    } catch (err) {
      alert("Invalid JSON format in the layout content field.");
      setSaving(false);
      return;
    }

    const payload = {
      title,
      slug,
      metaTitle,
      metaDescription,
      active,
      content: parsedContent,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: () => {
            alert("Landing Page updated successfully!");
            navigate("/landing-pages");
          },
          onError: (err: any) =>
            alert("Failed to save landing page: " + err.message),
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Landing Page created successfully!");
          navigate("/landing-pages");
        },
        onError: (err: any) =>
          alert("Failed to create landing page: " + err.message),
        onSettled: () => setSaving(false),
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/landing-pages")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Landing Pages
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Configure Layout" : "Create Landing Page"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/landing-pages")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode
              ? "Configure Destination Layout"
              : "Design New Destination Page"}
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
              Page Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Summer Sale 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              SEO Path / Slug
            </label>
            <input
              type="text"
              required
              placeholder="/promos/summer-sale-2024"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              SEO Meta Title
            </label>
            <input
              type="text"
              required
              placeholder="Meta Title tag for browser tabs"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              SEO Meta Description
            </label>
            <input
              type="text"
              required
              placeholder="Brief description snippet for Google index search results"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
            JSON Layout Design Configurations
          </label>
          <textarea
            rows={8}
            required
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
            className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-mono"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="page-active-checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56] w-4.5 h-4.5"
          />
          <label
            htmlFor="page-active-checkbox"
            className="text-xs font-bold text-[#131b2e] cursor-pointer"
          >
            Set active immediately on storefront
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
          <button
            type="button"
            onClick={() => navigate("/landing-pages")}
            className="px-6 py-3 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-7 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <MdCheckCircle className="w-4 h-4" />
            {saving
              ? "Publishing..."
              : isEditMode
                ? "Save details"
                : "Launch Destination"}
          </button>
        </div>
      </form>
    </div>
  );
};
