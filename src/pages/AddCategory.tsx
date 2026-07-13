import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdChevronRight,
  MdArrowBack,
  MdCloudUpload,
  MdCheckCircle,
} from "react-icons/md";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from "../hooks/useCategories";
import { apiClient } from "../services/apiClient";

// Sample categories database to support detail prefills when offline
const sampleFallbackCategories = [
  {
    id: "1",
    name: "Girls",
    subCategories: ["Dresses", "Tops", "Bottoms"],
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASU86zsEDz0pdsfgPQ_9IwTp2fSUW1XilC0ecy8kK-QStPX7hfl25iP696DTUjmI6HAVFigOipTaxvdNB_ZF3ewgcGWCJtxLVkL0xZeYec8feffmx5sgYpeUNNf1TZvbg9dVCjrYMV_mwDON41GbBYlusUdQm9koDdVcv1QWKh_lD56NJ2CP2uLL5h7snhK0mvr0JrA0WX0H-ql6rXgaWifG3Ad6LoocaN9sIEDePWENbFcObJwvBe5gThbkp2un1lgPhD2PVDGX1c",
  },
  {
    id: "2",
    name: "Boys",
    subCategories: ["Shirts", "Trousers"],
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_DboAgIGL3YnAtEDxOvIeN4U4RHmuCpcs25AP3zLHtJWaMJkpBBol0j8eqQqzmEJ8GHW3R_DhBm6S9y65t794tGufyr47JupEj1kGB7_aHl4jZaT10mMlkehAhc992SDxCiZ5QnUkF4MlJCiN04iU0ZlcjfWs6tZE0TQED0KpPP7e_ksDiVXfM6VtyEstWwoaj5UottAU4CMY1dHb781Fn2-33JCQ0-8Xxw8QLw6hF7fI17pL1bu_gtjS5jwsfZHA6ji2zi7gOYl",
  },
  {
    id: "3",
    name: "School Wear",
    subCategories: ["Uniforms", "Sportswear"],
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMR8Ix27MBie4Vw6ZCkDAyjska5HUX07pRxR0kyqzN1f7seOIlsqvEmY0aMH2W1X48rSNz6A9cICWWMgIjjY1TJbblHWVIOzq6JwW3pq4O7pClP_CbjQnO50j365N_btIPvrbVZhGr60m0j_iYBfIaqKzODJ7MHg3_IJ0qdusvCwiZ__Y3rg4nW4TS3LeY5ohKtbbGsnI61UpvaVSouErfqjxREmRHC8_htK6DHzQjNhcO2YiSZSuodDbUiN5RKVo8vxymNaZldeUY",
  },
  {
    id: "4",
    name: "Winter Collection",
    subCategories: ["Jackets", "Knits"],
    status: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSKsazBpi3D-W5UaOAtcVlSvz13j513KdRYV4xc5MuYU9tO_6BFBiwv9lw_VI-FdiPLzMlPPzevnDB98h3lleiMe3lTs5BStHUiOGVvR9HJc6iA5B7UcgYNrMS5RLpCLHP4QoCzeLUytEcTMVMSzVmF6Pb2hhOgb7U6JnB7NQOz9LuvtNnlavS6kFwotxjao4SGJxZ4Sp1siIciAzY40PNTbRBzWjxB2v_CJADfnmZaMlPNzJ_BV5zEenflsnumyJ2Pgl7MZKxHw-j",
  },
];

export const AddCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: categories = [] } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  // Form Fields State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [subCategoriesStr, setSubCategoriesStr] = useState("");
  const [status, setStatus] = useState("active");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Prefill details if editing (checks database list or falls back to sampleFallbackCategories)
  useEffect(() => {
    if (isEditMode && id) {
      // 1. Try to find in loaded database categories
      let matched = categories.find((c) => c.id === id);

      // 2. Fallback to static sample structure database if missing
      if (!matched) {
        matched = sampleFallbackCategories.find((c) => c.id === id) as any;
      }

      if (matched) {
        setName(matched.name);
        setSlug(
          matched.slug ||
            matched.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        );
        setDescription(
          matched.description || "Sample Fallback Category Description",
        );
        setImage(matched.image || "");
        setSubCategoriesStr(
          matched.subCategories ? matched.subCategories.join(", ") : "",
        );
        setStatus(matched.status);
      }
    }
  }, [isEditMode, id, categories]);

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

  // S3 image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "categories");

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
        alert("Upload failed. Using direct image link fallback.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const subCategories = subCategoriesStr
      ? subCategoriesStr
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const payload = {
      name,
      slug,
      description,
      image,
      status,
      subCategories,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, data: payload },
        {
          onSuccess: () => {
            alert("Category updated successfully!");
            navigate("/categories");
          },
          onError: (err: any) => {
            alert("Failed to update category: " + err.message);
          },
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Category created successfully!");
          navigate("/categories");
        },
        onError: (err: any) => {
          alert("Failed to create category: " + err.message);
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
            onClick={() => navigate("/categories")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Categories
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Details" : "New Category"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/categories")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
            title="Back to categories list"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode
              ? "Configure Category Details"
              : "Create New Catalog Category"}
          </h2>
        </div>
      </header>

      {/* Form Container */}
      <section className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Category Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Toddler Girl"
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
              placeholder="e.g. toddler-girl"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Sub-categories (Comma separated tags)
            </label>
            <input
              type="text"
              placeholder="e.g. Dresses, Tops, Rompers"
              value={subCategoriesStr}
              onChange={(e) => setSubCategoriesStr(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Description
            </label>
            <textarea
              placeholder="Write a brief category catalog description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Category Image
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-grow bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
              <input
                type="file"
                id="cat-form-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() =>
                  document.getElementById("cat-form-upload")?.click()
                }
                className="p-3.5 bg-[#e2e7ff] hover:bg-[#dfbec4]/30 rounded-xl text-[#584045] transition-all cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <MdCloudUpload className="w-5 h-5 text-[#b31f56]" />
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
            {image && (
              <div className="mt-3 w-20 h-20 rounded-xl overflow-hidden border border-[#dfbec4]/20">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Visibility Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-bold cursor-pointer"
            >
              <option value="active">Active (Visible)</option>
              <option value="inactive">Inactive (Hidden)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
            <button
              type="button"
              onClick={() => navigate("/categories")}
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
                  : "Create Category"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
