import React, { useState, useEffect } from "react";
import { MdPerson, MdCloudUpload, MdCheckCircle } from "react-icons/md";
import { apiClient } from "../services/apiClient";

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setName(parsed.name || "");
      setProfilePic(parsed.profilePic || "");
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "profiles");

      try {
        const { data } = await apiClient.post<{ url: string }>(
          "/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setProfilePic(data.url);
      } catch (err: any) {
        alert("Upload failed. Converting to local Base64 display.");
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setProfilePic(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.put("/auth/profile", {
        name,
        profilePic,
      });

      // Update session storage
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (err: any) {
      alert(
        "Failed to update profile: " +
          (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const firstLetter = name ? name.charAt(0).toUpperCase() : "A";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
          My Profile Details
        </h2>
        <p className="text-xs text-[#584045]/70 font-semibold mt-1">
          Manage your administrator account.
        </p>
      </header>

      <section className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
        <div className="flex flex-col items-center gap-4">
          {/* Circular image or Initial Indicator */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56]/10 shadow-sm select-none">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-extrabold text-[#b31f56]">
                {firstLetter}
              </span>
            )}
          </div>

          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          <button
            onClick={() => document.getElementById("profile-upload")?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdCloudUpload className="w-4 h-4 text-[#b31f56]" />
            Upload Avatar Image
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-4 pt-4 border-t border-[#dfbec4]/10"
        >
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Email Address (Read-only)
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 text-[#584045]/70 text-xs font-semibold cursor-not-allowed opacity-70"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Assigned Role
            </label>
            <span className="inline-block px-3 py-1 bg-[#ffd167]/30 text-[#765900] rounded-full text-[10px] font-extrabold uppercase mt-1">
              {user.role}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <MdCheckCircle className="w-4 h-4" />
            {loading ? "Saving Changes..." : "Save Profile Details"}
          </button>
        </form>
      </section>
    </div>
  );
};
