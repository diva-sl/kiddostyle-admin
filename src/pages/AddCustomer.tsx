import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdChevronRight,
  MdArrowBack,
  MdCheckCircle,
  MdCloudUpload,
} from "react-icons/md";
import {
  useCustomers,
  useCreateCustomer,
  useUpdateCustomer,
} from "../hooks/useCustomers";
import { apiClient } from "../services/apiClient";

const sampleFallbackCustomers = [
  {
    id: "1",
    name: "Eleanor Mason",
    email: "eleanor.m@example.com",
    phone: "+1 555-0192",
    status: "active",
    totalSpent: 1240.5,
    avatar: "",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@techflow.io",
    phone: "+1 555-0188",
    status: "active",
    totalSpent: 4102.0,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmg4YZ3QB7-iwd3TSQVj8mRUPyeSAxVE9D5OjvF8-zR87_Q5sAlsFk5dd55zVdax_yfPI7ovYv05o_dPKhTlqgBdQu2o9WM6w4driqllutcKgWM6niK5ETpNBM-2Qq0f9VecqbbT6VzrnsmNkPdqb68OhliDYiI5pOXaHyKxUkoBP5Z_i4Id8SIOKZzw3t3vc1oCdZoUm4V3TNrw0u-C5x3ubyYiwKQVGQkHM3a-1z0on8Gjo0h6FuakOoSODfSNagBV_3IC928_83",
  },
  {
    id: "3",
    name: "Sophia Liang",
    email: "sophia.l@me.com",
    phone: "+1 555-0175",
    status: "suspended",
    totalSpent: 89.99,
    avatar: "",
  },
];

export const AddCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: customers = [] } = useCustomers();
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState("active");
  const [totalSpent, setTotalSpent] = useState(0);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Prefill details if editing
  useEffect(() => {
    if (isEditMode && id) {
      let matched = customers.find((c) => c.id === id);
      if (!matched) {
        matched = sampleFallbackCustomers.find((c) => c.id === id) as any;
      }
      if (matched) {
        setName(matched.name);
        setEmail(matched.email);
        setPhone(matched.phone || "");
        setAvatar(matched.avatar || "");
        setStatus(matched.status);
        setTotalSpent(matched.totalSpent || 0);
      }
    }
  }, [isEditMode, id, customers]);

  // S3 Avatar image upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "avatars");

      try {
        const { data } = await apiClient.post<{ url: string }>(
          "/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setAvatar(data.url);
      } catch (err) {
        alert("Upload failed. Using fallback URL instead.");
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
      email,
      phone,
      avatar,
      status,
      totalSpent: Number(totalSpent),
      password: isEditMode ? undefined : password || "DefaultPassword123!", // only required on create
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, data: payload },
        {
          onSuccess: () => {
            alert("Customer profile updated!");
            navigate("/customers");
          },
          onError: (err: any) => {
            alert("Failed to update customer: " + err.message);
          },
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Customer registered successfully!");
          navigate("/customers");
        },
        onError: (err: any) => {
          alert("Failed to create customer: " + err.message);
        },
        onSettled: () => setSaving(false),
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      {/* Breadcrumbs */}
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/customers")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Customers
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Profile" : "Register Customer"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/customers")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode ? "Configure Customer Profile" : "Onboard New Customer"}
          </h2>
        </div>
      </header>

      {/* Form Container */}
      <section className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Mason"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="eleanor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="e.g. +1 555-0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Total Spent Amount ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={totalSpent}
                onChange={(e) => setTotalSpent(Number(e.target.value))}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>
          </div>

          {!isEditMode && (
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Customer Password (Storefront Credentials)
              </label>
              <input
                type="password"
                placeholder="Create storefront login password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Profile Avatar
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="https://example.com/avatar.png"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="flex-grow bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
              <input
                type="file"
                id="avatar-form-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() =>
                  document.getElementById("avatar-form-upload")?.click()
                }
                className="p-3.5 bg-[#e2e7ff] hover:bg-[#dfbec4]/30 rounded-xl text-[#584045] transition-all cursor-pointer text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <MdCloudUpload className="w-5 h-5 text-[#b31f56]" />
                {uploading ? "Uploading..." : "Upload Photo"}
              </button>
            </div>
            {avatar && (
              <div className="mt-3 w-16 h-16 rounded-full overflow-hidden border border-[#dfbec4]/20 bg-white">
                <img
                  src={avatar}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Registry Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-bold cursor-pointer"
            >
              <option value="active">Active (Verified)</option>
              <option value="suspended">Suspended (Blocked)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
            <button
              type="button"
              onClick={() => navigate("/customers")}
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
                  ? "Save Profile"
                  : "Register Customer"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
