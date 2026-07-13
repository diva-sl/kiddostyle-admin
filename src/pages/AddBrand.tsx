import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdChevronRight,
  MdArrowBack,
  MdCloudUpload,
  MdCheckCircle,
} from "react-icons/md";
import { useBrands, useCreateBrand, useUpdateBrand } from "../hooks/useBrands";
import { apiClient } from "../services/apiClient";

const sampleFallbackBrands = [
  {
    id: "mini-me",
    name: "MiniMe",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_dsP1UyfN8cL2do72OaSasMaebaIuifE_yX5rNRN9aYeu6q0JGygaovILkVoFhyH-p0cHBBJFx7-O5-6z13Ey9zkXfxptS4ZQApUgmivIsTIZj8m_x111fxYkHnI2x2cxVa38RfCWtTMGnHXPRlrIHky49I6YqvCJaylY534yqPRqL49FwQDgFGBYatV2-jFIYRSb8H2Vnae_Ntov-1qAgg10NNmmG_s8EwSdZ5_AjZQj551q90TNqx_wNX7QwKRc3RiWmSOoYEs",
    description: "MiniMe Children Wear Co.",
    status: "active",
  },
  {
    id: "tiny-tots",
    name: "TinyTots",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxkvCmV2U4iFnGM64y9QJimfBN34CyOf754Pq3zyDb66a8wY-lhppX1Sa6rQleWYtxQMxAN-QZ-_22xWc6GPadu6fE3Fxe6nqUpWDhr9v5oaHjITpoRfNFkdHHrN8RWT5Dgtusk6xyAPS95MZezRGbBKfrEes8FwHMHIN_I8CSbFoNb-nMHU2U4u25V6FP0C2ppU6ZMgZxyiiVgy8nJJWFjZszGcIkXLaLO5c0g02_exIGVpMXujkrIFcEBqav3cJgbaUuaPfr2u8x",
    description: "Premium Newborn Accessories Brand.",
    status: "active",
  },
  {
    id: "kiddy-step",
    name: "KiddyStep",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6nT6omZFug61QTJCO1zJllv9VQv2Na_IByw5-8Etxg4AN7PshGcPj0CFFcGb0yCGFuSRAoxx-onb8IEohzGBJY_5JrDj1ZthYvEa1ygUIzYH4duE9ksGRg_qvsOzqSMXgvVhy1o06nM8xoQzi5uyMJMsQ5m4PBBNHq7zxE0bK7CCPUIbjeDhYDiWFhubeRnezRktd1EbyQJSIqFYq3NXQDSePwiKm5W_Enng9D9PE_jWH6eHkF1zxiSvkkDnZYy9MvHuL0PY72Tav",
    description: "Children Comfort Footwear.",
    status: "inactive",
  },
  {
    id: "play-pals",
    name: "PlayPals",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt-HFjT9VUTVw9CtV8WPemfHi7IdbSzvhmXOKZ_Wm0eBXTnsYRSFga6LbztnNqLVui1qB09mO8nTn9bDpEriqJcZEkbS_nxLAwp8fSOEdkf9-kX08f_tedEF8ePufaWaJAqwR8fNWAj4SjhUY3pYqGFlIBHNEwiLjnXpkYFniZ9N6fJ-bgCYvV1UNr89RZ3EEo7Ak1HvUoGgqLZWBDzHNzbXT3yKWlR5ReSDZdPsrwDSOmbrQdxCZAxOpKybIZ9y_MlcruD6eKtz4S",
    description: "Toddler Boy play clothing.",
    status: "active",
  },
];

export const AddBrandPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: brands = [] } = useBrands();
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand();

  // Form Fields State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [status, setStatus] = useState("active");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Prefill details if editing
  useEffect(() => {
    if (isEditMode && id) {
      let matched = brands.find((b) => b.id === id);
      if (!matched) {
        matched = sampleFallbackBrands.find((b) => b.id === id) as any;
      }
      if (matched) {
        setName(matched.name);
        setSlug(
          matched.slug ||
            matched.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        );
        setDescription(matched.description || "Partner brand profile details.");
        setLogo(matched.logo || "");
        setStatus(matched.status);
      }
    }
  }, [isEditMode, id, brands]);

  // Auto-slugify helper
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  // S3 Logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "brands");

      try {
        const { data } = await apiClient.post<{ url: string }>(
          "/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setLogo(data.url);
      } catch (err) {
        alert("Upload failed. Using direct image link fallback.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name,
      slug,
      description,
      logo,
      status,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, data: payload },
        {
          onSuccess: () => {
            alert("Brand updated successfully!");
            navigate("/brands");
          },
          onError: (err: any) => {
            alert("Failed to update brand: " + err.message);
          },
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Brand created successfully!");
          navigate("/brands");
        },
        onError: (err: any) => {
          alert("Failed to create brand: " + err.message);
        },
        onSettled: () => setSaving(false),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 select-none">
      {/* Clickable Header Breadcrumbs */}
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/brands")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Brands
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Details" : "New Brand"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/brands")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
            title="Back to brands list"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode ? "Configure Brand Details" : "Add Partner Brand"}
          </h2>
        </div>
      </header>

      {/* Form Container */}
      <section className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Brand Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MiniMe"
              value={name}
              onChange={handleNameChange}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Slug (Auto-generated)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. minime"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Description
            </label>
            <textarea
              placeholder="Write partner description details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Brand Logo
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="flex-grow bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
              <input
                type="file"
                id="brand-form-upload"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() =>
                  document.getElementById("brand-form-upload")?.click()
                }
                className="p-3.5 bg-[#e2e7ff] hover:bg-[#dfbec4]/30 rounded-xl text-[#584045] transition-all cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <MdCloudUpload className="w-5 h-5 text-[#b31f56]" />
                {uploading ? "Uploading..." : "Upload Logo"}
              </button>
            </div>
            {logo && (
              <div className="mt-3 w-16 h-16 rounded-xl overflow-hidden border border-[#dfbec4]/20 bg-[#f2f3ff] p-2 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Partnership Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-bold cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
            <button
              type="button"
              onClick={() => navigate("/brands")}
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
                ? "Saving..."
                : isEditMode
                  ? "Save Details"
                  : "Publish Brand"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
