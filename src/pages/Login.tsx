import React, { useState } from "react";
import { apiClient } from "../services/apiClient";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await apiClient.post("/auth/login", { email, password });

      // Store JWT token and session user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to main panel
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Invalid login credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8ff] p-6 select-none">
      <div className="w-full max-w-[420px] bg-white p-8 rounded-[2.5rem] border border-[#dfbec4]/30 shadow-xl flex flex-col gap-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-extrabold text-[#b31f56] tracking-tight">
            KiddoStyle
          </h1>
          <p className="text-xs font-semibold text-[#584045]/60 mt-1.5">
            Management Control Panel
          </p>
        </div>

        {error && (
          <div className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold p-3 rounded-2xl border border-[#ba1a1a]/10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="diva@kiddostyle.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-lg shadow-[#b31f56]/20 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Access Dashboard"}
          </button>
        </form>

        <div className="text-center border-t border-[#dfbec4]/10 pt-4">
          <p className="text-[10px] font-bold text-[#584045]/50 uppercase">
            KiddoStyle CMS Security Guard
          </p>
        </div>
      </div>
    </div>
  );
};
