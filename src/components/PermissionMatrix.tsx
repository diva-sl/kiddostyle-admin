import React from "react";
import { MdSecurity, MdCheck } from "react-icons/md";

export const PermissionMatrix: React.FC = () => {
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
        <div className="bg-white/60 p-6 rounded-2xl border border-white/40">
          <h4 className="text-sm font-extrabold text-[#131b2e] mb-4">
            Inventory Operations
          </h4>
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56] text-white shrink-0">
                <MdCheck className="w-3.5 h-3.5" />
              </span>
              <span>Bulk Edit Stock</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56] text-white shrink-0">
                <MdCheck className="w-3.5 h-3.5" />
              </span>
              <span>Wastage Reporting</span>
            </div>
            <div className="flex items-center gap-2.5 opacity-50">
              <span className="w-5 h-5 rounded border-2 border-[#dfbec4] shrink-0" />
              <span>Price Adjustment</span>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-white/60 p-6 rounded-2xl border border-white/40">
          <h4 className="text-sm font-extrabold text-[#131b2e] mb-4">
            Content Strategy
          </h4>
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56] text-white shrink-0">
                <MdCheck className="w-3.5 h-3.5" />
              </span>
              <span>Banner Management</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56] text-white shrink-0">
                <MdCheck className="w-3.5 h-3.5" />
              </span>
              <span>Blog Publishing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56] text-white shrink-0">
                <MdCheck className="w-3.5 h-3.5" />
              </span>
              <span>SEO Metadata</span>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-white/60 p-6 rounded-2xl border border-white/40">
          <h4 className="text-sm font-extrabold text-[#131b2e] mb-4">
            Financial Data
          </h4>
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 opacity-50">
              <span className="w-5 h-5 rounded border-2 border-[#dfbec4] shrink-0" />
              <span>Tax Configuration</span>
            </div>
            <div className="flex items-center gap-2.5 opacity-50">
              <span className="w-5 h-5 rounded border-2 border-[#dfbec4] shrink-0" />
              <span>Refund Processing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded border-2 border-[#b31f56] flex items-center justify-center bg-[#b31f56] text-white shrink-0">
                <MdCheck className="w-3.5 h-3.5" />
              </span>
              <span>View Revenue Reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
