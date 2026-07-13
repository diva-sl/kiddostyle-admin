import React, { useContext } from "react";
import { ProductFormContext } from "../context/ProductFormContext";
import { MdCalendarToday } from "react-icons/md";

export const ProductPublicationStatus: React.FC = () => {
  const context = useContext(ProductFormContext);
  if (!context) return null;

  const { formState, setFormState } = context;
  const currentStatus = formState.status || "draft";

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as any;
    setFormState((prev) => ({
      ...prev,
      status,
      publishedAt: status === "scheduled" ? prev.publishedAt : "",
    }));
  };

  const statusLabel =
    currentStatus === "active"
      ? "Active Mode"
      : currentStatus === "scheduled"
        ? "Scheduled Mode"
        : currentStatus === "archived"
          ? "Archived Mode"
          : "Draft Mode";

  const descriptionText =
    currentStatus === "active"
      ? "This product is published and active to shoppers on the storefront."
      : currentStatus === "scheduled"
        ? "This product will publish automatically at the scheduled launch date."
        : currentStatus === "archived"
          ? "This product is archived and hidden from catalog listings."
          : "This product is not currently visible to customers on the storefront.";

  return (
    <section className="bg-[#dae2fd]/30 p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-4 text-[#131b2e]">
      {/* Header Status Indicator */}
      <div className="flex items-center justify-between border-b border-[#dfbec4]/10 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 bg-[#785a00] rounded-full animate-pulse" />
          <span className="text-sm font-bold">{statusLabel}</span>
        </div>

        {/* Status Dropdown */}
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          className="bg-white border border-[#dfbec4]/30 rounded-lg px-2 py-1 text-[11px] font-bold text-[#131b2e] outline-none cursor-pointer"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <p className="text-xs text-[#584045]/70 leading-relaxed font-semibold">
        {descriptionText}
      </p>

      {/* Date-time picker showing only if Scheduled is chosen */}
      {currentStatus === "scheduled" && (
        <div className="space-y-2 pt-2 border-t border-[#dfbec4]/10">
          <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest flex items-center gap-1">
            <MdCalendarToday className="w-3.5 h-3.5 text-[#b31f56]" />
            Publication Date &amp; Time
          </label>
          <input
            type="datetime-local"
            value={formState.publishedAt}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, publishedAt: e.target.value }))
            }
            className="w-full bg-white border border-[#dfbec4]/30 rounded-xl p-2.5 text-xs font-semibold text-[#131b2e] outline-none"
          />
        </div>
      )}

      {/* Original Dark Styled Button */}
      <button
        type="button"
        onClick={() => {
          if (currentStatus !== "scheduled") {
            setFormState((prev) => ({ ...prev, status: "scheduled" }));
          }
        }}
        className="w-full bg-[#283044] text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#131b2e] transition-all cursor-pointer"
      >
        Schedule Launch
      </button>
    </section>
  );
};
