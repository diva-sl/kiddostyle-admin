import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MdChevronRight, MdArrowBack, MdCheckCircle } from "react-icons/md";
import {
  useCoupons,
  useCreateCoupon,
  useUpdateCoupon,
} from "../hooks/useCoupons";

const sampleFallbackCoupons = [
  {
    id: "1",
    code: "KIDDO25",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 50,
    expiryDate: "2026-10-24T12:00:00.000Z",
    active: true,
    usageLimit: 500,
    usageCount: 325,
  },
  {
    id: "2",
    code: "WELCOME50",
    discountType: "fixed",
    discountValue: 50,
    minPurchase: 100,
    expiryDate: "2026-12-31T12:00:00.000Z",
    active: true,
    usageLimit: 1000,
    usageCount: 12,
  },
  {
    id: "3",
    code: "BACK2SCHOOL",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 30,
    expiryDate: "2026-08-30T12:00:00.000Z",
    active: false,
    usageLimit: 1000,
    usageCount: 1000,
  },
];

export const AddCouponPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEditMode = !!id;

  const { data: coupons = [] } = useCoupons();
  const createMutation = useCreateCoupon();
  const updateMutation = useUpdateCoupon();

  // Form Fields State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState(100);
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);

  // Prefill details if editing OR if creating with a preset (e.g. tiered)
  useEffect(() => {
    if (isEditMode && id) {
      let matched = coupons.find((c) => c.id === id);
      if (!matched) {
        matched = sampleFallbackCoupons.find((c) => c.id === id) as any;
      }
      if (matched) {
        setCode(matched.code);
        setDiscountType(matched.discountType);
        setDiscountValue(matched.discountValue);
        setMinPurchase(matched.minPurchase || 0);
        setExpiryDate(
          matched.expiryDate
            ? new Date(matched.expiryDate).toISOString().slice(0, 16)
            : "",
        );
        setUsageLimit(matched.usageLimit || 100);
        setActive(matched.active);
      }
    } else if (!isEditMode && location.state?.preset === "tiered") {
      // Prefill tiered promotion defaults
      setCode("TIERED100");
      setDiscountType("percentage");
      setDiscountValue(20);
      setMinPurchase(100);
      setUsageLimit(500);
      // Set default expiry to 30 days from now in localized format for datetime-local
      const date = new Date(Date.now() + 30 * 24 * 3600 * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      setExpiryDate(`${year}-${month}-${day}T${hours}:${minutes}`);
      setActive(true);
    }
  }, [isEditMode, id, coupons, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      code: code.toUpperCase().trim(),
      discountType,
      discountValue: Number(discountValue),
      minPurchase: Number(minPurchase),
      expiryDate: expiryDate
        ? new Date(expiryDate).toISOString()
        : new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
      usageLimit: Number(usageLimit),
      active,
      usageCount: isEditMode ? undefined : 0,
    } as any;

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, data: payload },
        {
          onSuccess: () => {
            alert("Coupon campaign updated successfully!");
            navigate("/coupons");
          },
          onError: (err: any) => {
            alert("Failed to update coupon: " + err.message);
          },
          onSettled: () => setSaving(false),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Coupon campaign created successfully!");
          navigate("/coupons");
        },
        onError: (err: any) => {
          alert("Failed to create coupon: " + err.message);
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
            onClick={() => navigate("/coupons")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Promotions &amp; Coupons
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            {isEditMode ? "Edit Details" : "New Campaign"}
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/coupons")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
            title="Back to coupon catalog list"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            {isEditMode
              ? "Configure Coupon Details"
              : "Create Promotional Campaign"}
          </h2>
        </div>
      </header>

      {/* Form Container */}
      <section className="bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Coupon Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. KIDDO25"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-bold cursor-pointer"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Discount Value
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="e.g. 25"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Minimum Purchase ($)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50"
                value={minPurchase}
                onChange={(e) => setMinPurchase(Number(e.target.value))}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Usage Limit (Total uses)
              </label>
              <input
                type="number"
                required
                min="1"
                value={usageLimit}
                onChange={(e) => setUsageLimit(Number(e.target.value))}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Expiry Date &amp; Time
            </label>
            <input
              type="datetime-local"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3.5 focus:ring-4 focus:ring-[#b31f56]/10 outline-none text-[#131b2e] text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
              Campaign Active Status
            </label>
            <div className="flex items-center gap-2.5 mt-2 select-none">
              <input
                type="checkbox"
                id="coupon-active-chk"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]/20 w-5 h-5 cursor-pointer"
              />
              <label
                htmlFor="coupon-active-chk"
                className="text-xs font-semibold text-[#131b2e] cursor-pointer"
              >
                Enable this coupon code immediately on checkout storefront
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-[#dfbec4]/10">
            <button
              type="button"
              onClick={() => navigate("/coupons")}
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
                ? "Publishing..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Campaign"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
