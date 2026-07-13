import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdChevronRight,
  MdArrowBack,
  MdCheckCircle,
  MdCloudUpload,
} from "react-icons/md";
import {
  useBanners,
  useCreateBanner,
  useUpdateBanner,
} from "../hooks/useBanners";
import { apiClient } from "../services/apiClient";

const sampleBanners = [
  {
    id: "1",
    title: "Summer Essentials 2024",
    subtitle: "Cool styles for kids",
    position: "hero",
    link: "/collection/summer",
    active: true,
    image: "",
  },
];

export const AddBannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: banners = [] } = useBanners();
  const createMutation = useCreateBanner();
  const updateMutation = useUpdateBanner();

  // Form Field states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState("hero");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Prefill fields on edit mode
  useEffect(() => {
    if (isEditMode && id) {
      let matched = banners.find((b) => b.id === id);
      if (!matched) {
        matched = sampleBanners.find((b) => b.id === id) as any;
      }
      if (matched) {
        setTitle(matched.title);
        setSubtitle(matched.subtitle || "");
        setLink(matched.link || "");
        setPosition(matched.position || "hero");
        setImage(matched.image || "");
        setActive(matched.active);
      }
    }
  }, [isEditMode, id, banners]);

  // S3 Banner upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "banners");

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
        alert("Upload failed. Fall back to copying an image URL.");
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
      subtitle,
      link,
      position,
      image,
      active,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: () => {
            alert("Banner campaign updated!");
            navigate("/banner");
          },
          onError: (err: any) =>
            alert("Failed to save banner details: " + err.message),
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Banner campaign created successfully!");
          navigate("/banner");
        },
        onError: (err: any) =>
          alert("Failed to save banner details: " + err.message),
        onSettled: () => setSaving(false),
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/banner")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Banners
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Banner" : "Schedule Banner"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/banner")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode
              ? "Configure Campaign Banner"
              : "Create Site-wide Promotional Asset"}
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
              Banner Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Summer Essentials 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Subtitle Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. Cool designs for little styles"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Redirect URL / Link
            </label>
            <input
              type="text"
              required
              placeholder="e.g. /collection/summer"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Layout Position Slot
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-bold cursor-pointer"
            >
              <option value="hero">Home Hero Banner</option>
              <option value="middle">Middle Promo Grid</option>
              <option value="footer">Footer Brand Placement</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
            Banner Image Asset
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="https://example.com/banner.png"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="flex-grow bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
            <input
              type="file"
              id="banner-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() =>
                document.getElementById("banner-image-upload")?.click()
              }
              className="p-3.5 bg-[#e2e7ff] hover:bg-[#dfbec4]/30 rounded-xl text-[#584045] transition-all cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <MdCloudUpload className="w-5 h-5 text-[#b31f56]" />
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="banner-active-checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56] w-4.5 h-4.5"
          />
          <label
            htmlFor="banner-active-checkbox"
            className="text-xs font-bold text-[#131b2e] cursor-pointer"
          >
            Set active immediately on storefront
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
          <button
            type="button"
            onClick={() => navigate("/banner")}
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
                : "Launch Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};
