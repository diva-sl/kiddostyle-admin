import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdArrowBack, MdCheckCircle } from "react-icons/md";
import { useRoles, useCreateRole, useUpdateRole } from "../hooks/useRoles";

const sampleRoles = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all system modules",
    permissions: [
      "products:read",
      "products:write",
      "orders:read",
      "customers:read",
    ],
  },
  {
    id: "2",
    name: "Editor",
    description: "Can update catalog and posts",
    permissions: ["products:read", "products:write", "blog:publish"],
  },
  {
    id: "3",
    name: "Viewer",
    description: "Read-only access",
    permissions: ["products:read", "orders:read"],
  },
];

export const AddRolePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const { data: dbRoles = [] } = useRoles();
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([
    "products:read",
    "orders:read",
  ]);
  const [saving, setSaving] = useState(false);

  const availablePermissions = [
    { key: "products:read", label: "Read Products Catalog" },
    { key: "products:write", label: "Create & Edit Products" },
    { key: "orders:read", label: "View Customer Invoices" },
    { key: "orders:write", label: "Manage Order Status" },
    { key: "customers:read", label: "View CRM Registry" },
    { key: "inventory:manage", label: "Update Stock Levels" },
    { key: "blog:publish", label: "Publish Advice Articles" },
    { key: "banner:manage", label: "Schedule Site Banners" },
  ];

  useEffect(() => {
    if (isEditMode && id) {
      let matched = dbRoles.find((r) => r.id === id);
      if (!matched) {
        matched = sampleRoles.find((r) => r.id === id) as any;
      }
      if (matched) {
        setName(matched.name);
        setDescription(matched.description || "");
        setPermissions(matched.permissions || []);
      }
    }
  }, [isEditMode, id, dbRoles]);

  const togglePermission = (key: string) => {
    if (permissions.includes(key)) {
      setPermissions(permissions.filter((p) => p !== key));
    } else {
      setPermissions([...permissions, key]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name,
      description,
      permissions,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: () => {
            alert("Role configuration updated successfully!");
            navigate("/roles");
          },
          onError: (err: any) => alert("Failed to save role: " + err.message),
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("New Role created successfully!");
          navigate("/roles");
        },
        onError: (err: any) => alert("Failed to create role: " + err.message),
        onSettled: () => setSaving(false),
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/roles")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Roles
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Role Details" : "Create New Role"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/roles")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer border-none bg-none"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode
              ? `Edit Role: ${name}`
              : "Configure Staff Role & Permissions"}
          </h2>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Role Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Content Manager"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Description
            </label>
            <input
              type="text"
              required
              placeholder="Responsibilities and access scope..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-3">
            Module Access Permissions
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {availablePermissions.map((perm) => {
              const isChecked = permissions.includes(perm.key);
              return (
                <div
                  key={perm.key}
                  onClick={() => togglePermission(perm.key)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? "bg-[#b31f56]/5 border-[#b31f56]"
                      : "bg-[#faf8ff] border-[#dfbec4]/20"
                  }`}
                >
                  <span className="text-xs font-bold text-[#131b2e]">
                    {perm.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="w-4 h-4 text-[#b31f56] rounded cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="px-6 py-3 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-7 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5 border-none"
          >
            <MdCheckCircle className="w-4 h-4" />
            {saving ? "Saving..." : isEditMode ? "Save Changes" : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  );
};
