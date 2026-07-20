import React, { useState, useEffect } from "react";
import { MdCloudUpload, MdCheckCircle, MdLock } from "react-icons/md";
import { apiClient } from "../services/apiClient";

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch latest administrator session from backend
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await apiClient.get("/auth/me");
        setUser(data);
        setName(data.name || "");
        setProfilePic(data.profilePic || "");
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setName(parsed.name || "");
          setProfilePic(parsed.profilePic || "");
        }
      }
    };
    fetchSession();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
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
        alert("S3 upload unavailable. Converting image locally.");
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setProfilePic(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setUploading(false);
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

      // Update local session storage
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      alert("Administrator profile details updated successfully!");
    } catch (err: any) {
      alert(
        "Failed to update profile: " +
          (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Authenticating administrator session...
      </div>
    );
  }

  const firstLetter = name ? name.charAt(0).toUpperCase() : "A";

  return (
    <div className="max-w-2xl mx-auto space-y-6 select-none pb-20">
      <header>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
          My Profile Details
        </h2>
        <p className="text-xs text-[#584045]/70 font-semibold mt-1">
          Manage your administrator account credentials.
        </p>
      </header>

      <section className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar circle */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56]/10 shadow-sm select-none relative">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Avatar"
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
            type="button"
            disabled={uploading}
            onClick={() => document.getElementById("profile-upload")?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all cursor-pointer border-none bg-none"
          >
            <MdCloudUpload className="w-4 h-4 text-[#b31f56]" />
            {uploading ? "Uploading Image..." : "Upload Avatar Photo"}
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-4 pt-4 border-t border-[#dfbec4]/10"
        >
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Full Administrator Name
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
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <MdLock className="w-3.5 h-3.5 text-[#584045]/50" />
              Email Address (Protected Login ID)
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
              System Permission Role
            </label>
            <span className="inline-block px-3 py-1 bg-[#ffd167]/30 text-[#765900] rounded-full text-[10px] font-extrabold uppercase mt-1">
              {user.role || "Admin"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer border-none"
          >
            <MdCheckCircle className="w-4 h-4" />
            {loading ? "Saving Changes..." : "Save Profile Details"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
