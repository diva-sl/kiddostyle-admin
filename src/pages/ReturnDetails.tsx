import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdArrowBack, MdCheckCircle } from "react-icons/md";
import { useReturns, useUpdateReturn } from "../hooks/useReturns";

const fallbackReturnsList = [
  {
    id: "1",
    orderNumber: "KD-89210",
    customerName: "Sarah Miller",
    reason: "Wrong Size",
    refundAmount: 145.0,
    status: "pending",
    requestedAt: "2026-10-24T12:00:00.000Z",
    items: [{ name: "Organic Cotton Knit Sweater", qty: 1, price: 145.0 }],
  },
  {
    id: "2",
    orderNumber: "KD-89195",
    customerName: "James Brown",
    reason: "Damaged",
    refundAmount: 89.5,
    status: "approved",
    requestedAt: "2026-10-23T12:00:00.000Z",
    items: [{ name: "Artisan Leather Boots", qty: 1, price: 89.5 }],
  },
  {
    id: "3",
    orderNumber: "KD-89182",
    customerName: "Emma Lee",
    reason: "Changed Mind",
    refundAmount: 210.0,
    status: "refunded",
    requestedAt: "2026-10-22T12:00:00.000Z",
    items: [{ name: "Midnight Wool Dress", qty: 2, price: 105.0 }],
  },
  {
    id: "4",
    orderNumber: "KD-89170",
    customerName: "David Wilson",
    reason: "Wrong Item",
    refundAmount: 56.0,
    status: "rejected",
    requestedAt: "2026-10-21T12:00:00.000Z",
    items: [{ name: "Cotton Peony Top", qty: 1, price: 56.0 }],
  },
];

export const ReturnDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: returns = [] } = useReturns();
  const updateMutation = useUpdateReturn();

  const [returnReq, setReturnReq] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [refundAmount, setRefundAmount] = useState(0);

  // Search profile lists or fall back
  useEffect(() => {
    let matched: any = returns.find((r) => r.id === id);
    if (!matched) {
      matched = fallbackReturnsList.find((r) => r.id === id);
    }
    if (matched) {
      setReturnReq(matched);
      setStatus(matched.status);
      setRefundAmount(matched.refundAmount);
    }
  }, [id, returns]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnReq) return;

    updateMutation.mutate(
      { id: returnReq.id, payload: { status, refundAmount } },
      {
        onSuccess: () => {
          alert("Return request updated successfully!");
          navigate("/returns");
        },
        onError: (err: any) => {
          alert("Failed to update return request: " + err.message);
        },
      },
    );
  };

  if (!returnReq) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Locating return request documents...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/returns")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Returns
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            #{returnReq.orderNumber} Details
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/returns")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Return request details for Order #{returnReq.orderNumber}
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-3">
            Line Items Returned
          </h3>

          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-[#f2f3ff] text-[#584045]/80">
              <tr>
                <th className="p-3 rounded-l-xl">Product Name</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right rounded-r-xl">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfbec4]/10 text-[#131b2e]">
              {(returnReq.items || []).map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="p-3 font-bold">{item.name}</td>
                  <td className="p-3 text-center">
                    {item.quantity || item.qty}
                  </td>
                  <td className="p-3 text-right">
                    ${(item.price || returnReq.refundAmount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-[#faf8ff] p-4 rounded-2xl border border-[#dfbec4]/20 space-y-2">
            <p className="text-xs font-bold text-[#131b2e]">
              Reason for Return:
            </p>
            <p className="text-xs text-[#584045]/85 italic">
              "{returnReq.reason}"
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
              Resolve Request
            </h3>

            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Change Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer outline-none"
              >
                <option value="pending">Pending CMS Validation</option>
                <option value="approved">
                  Approved (Awaiting Return Arrival)
                </option>
                <option value="refunded">Refunded (Amount Transferred)</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Approved Refund Value ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={refundAmount}
                onChange={(e) => setRefundAmount(Number(e.target.value))}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#131b2e] outline-none"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
              Customer Context
            </h3>
            <p className="text-xs font-bold text-[#131b2e]">
              {returnReq.customerName}
            </p>
            <p className="text-[10px] text-[#584045]/70 font-semibold">
              Requested:{" "}
              {new Date(
                returnReq.requestedAt || Date.now(),
              ).toLocaleDateString()}
            </p>
          </section>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MdCheckCircle className="w-4 h-4" />
              Save Resolution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
