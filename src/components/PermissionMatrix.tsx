import React, { useState } from "react";
import { MdSecurity, MdCheck } from "react-icons/md";

export const PermissionMatrix: React.FC = () => {
  const [matrix, setMatrix] = useState({
    bulkEdit: true,
    wastageReport: true,
    priceAdjust: false,
    bannerMgmt: true,
    blogPublish: true,
    seoMetadata: true,
    taxConfig: false,
    refundProcess: false,
    viewRevenue: true,
  });

  const toggle = (key: keyof typeof matrix) => {
    setMatrix((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#f2f3ff] rounded-3xl p-8 border border-[#dfbec4]/30 overflow-hidden relative select-none">
      {/* Title Headers */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
          <MdSecurity className="text-[#b31f56] w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display text-base font-extrabold text-[#131b2e]">
            Granular Permission Matrix
          </h3>
          <p className="text-xs text-[#584045]/70 font-semibold mt-0.5">
            Manage refined access for each team role across systemic operations.
          </p>
        </div>
      </div>

      {/* Permission Modules Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-[#584045]/90">
        {/* Module 1 */}
        <div className="bg-white/60 p-6 rounded-2xl border border-white/40 space-y-3.5">
          <h4 className="text-sm font-extrabold text-[#131b2e] mb-4">
            Inventory Operations
          </h4>
          <div
            onClick={() => toggle("bulkEdit")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.bulkEdit ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.bulkEdit && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Bulk Edit Stock</span>
          </div>

          <div
            onClick={() => toggle("wastageReport")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.wastageReport ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.wastageReport && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Wastage Reporting</span>
          </div>

          <div
            onClick={() => toggle("priceAdjust")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.priceAdjust ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.priceAdjust && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Price Adjustment</span>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-white/60 p-6 rounded-2xl border border-white/40 space-y-3.5">
          <h4 className="text-sm font-extrabold text-[#131b2e] mb-4">
            Content Strategy
          </h4>
          <div
            onClick={() => toggle("bannerMgmt")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.bannerMgmt ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.bannerMgmt && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Banner Management</span>
          </div>

          <div
            onClick={() => toggle("blogPublish")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.blogPublish ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.blogPublish && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Blog Publishing</span>
          </div>

          <div
            onClick={() => toggle("seoMetadata")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.seoMetadata ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.seoMetadata && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>SEO Metadata</span>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-white/60 p-6 rounded-2xl border border-white/40 space-y-3.5">
          <h4 className="text-sm font-extrabold text-[#131b2e] mb-4">
            Financial Data
          </h4>
          <div
            onClick={() => toggle("taxConfig")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.taxConfig ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.taxConfig && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Tax Configuration</span>
          </div>

          <div
            onClick={() => toggle("refundProcess")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.refundProcess ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.refundProcess && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>Refund Processing</span>
          </div>

          <div
            onClick={() => toggle("viewRevenue")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${matrix.viewRevenue ? "border-[#b31f56] bg-[#b31f56] text-white" : "border-[#dfbec4]"}`}
            >
              {matrix.viewRevenue && <MdCheck className="w-3.5 h-3.5" />}
            </span>
            <span>View Revenue Reports</span>
          </div>
        </div>
      </div>
    </div>
  );
};
