import React, { useState, useEffect } from "react";
import { SellerPaymentsHeader } from "../components/SellerPaymentsHeader";
import { RecentPaymentsTable } from "../components/RecentPaymentsTable";
import { PayoutGoalSupport } from "../components/PayoutGoalSupport";

export const SellerPaymentsPage: React.FC = () => {
  const [sellerId, setSellerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.role === "seller") {
          setSellerId(user.id || user._id);
        }
      } catch (e) {}
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Page Header Actions banner */}
      <section className="flex justify-between items-end gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Payments &amp; Balance Statements
          </h2>
          <p className="text-xs text-[#584045]/70 font-semibold mt-1">
            Configure your default payout methods and view balance statements.
          </p>
        </div>
      </section>

      {/* Available Balance payboards & mix progress stats */}
      <SellerPaymentsHeader sellerId={sellerId} />

      {/* Main split details grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recent payouts tables (col-span-8) */}
        <div className="lg:col-span-8">
          <RecentPaymentsTable sellerId={sellerId} />
        </div>

        {/* Right Side: default visa methods & Monthly goals progress (col-span-4) */}
        <div className="lg:col-span-4">
          <PayoutGoalSupport />
        </div>
      </div>
    </div>
  );
};

export default SellerPaymentsPage;
