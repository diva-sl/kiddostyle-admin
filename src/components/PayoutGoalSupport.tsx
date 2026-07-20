import React, { useState } from "react";
import {
  MdEdit,
  MdStars,
  MdSupportAgent,
  MdArrowForward,
  MdClose,
  MdCheckCircle,
  MdAccountBalance,
  MdCreditCard,
  MdPayments,
} from "react-icons/md";
import {
  sellerPaymentService,
  type PayoutMethod,
} from "../services/sellerPaymentService";

export const PayoutGoalSupport: React.FC = () => {
  const [goal, setGoal] = useState(15000);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutType, setPayoutType] = useState<"bank" | "card" | "paypal">(
    "bank",
  );
  const [saving, setSaving] = useState(false);

  // Form states
  const [accountHolder, setAccountHolder] = useState("Chloe Bennett");
  const [bankName, setBankName] = useState("Chase Bank N.A.");
  const [accountNumber, setAccountNumber] = useState("**** 9821");
  const [routingCode, setRoutingCode] = useState("021000021");

  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/26");

  const [paypalEmail, setPaypalEmail] = useState("chloe.b@petitboutique.com");

  const handleSetGoal = () => {
    const input = prompt(
      "Enter your new monthly revenue goal ($):",
      goal.toString(),
    );
    if (input && !isNaN(Number(input))) {
      setGoal(Number(input));
    }
  };

  const handleSavePayoutMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: PayoutMethod = {
      type: payoutType,
      accountHolder,
      bankName,
      accountNumber,
      routingCode,
      cardNumber,
      cardExpiry,
      paypalEmail,
    };

    try {
      await sellerPaymentService.savePayoutMethod(payload);
      alert("Payout account preferences saved successfully!");
      setShowPayoutModal(false);
    } catch (err: any) {
      alert(
        "Failed to save payout method: " +
          (err.response?.data?.error || err.message),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 select-none relative">
      {/* Payout default visa method card */}
      <div className="bg-[#f2f3ff]/40 rounded-[24px] p-6 border border-[#dfbec4]/30 space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="font-display text-sm font-extrabold text-[#131b2e]">
            Default Payout Method
          </h5>
          <button
            onClick={() => setShowPayoutModal(true)}
            className="text-[#b31f56] cursor-pointer hover:scale-105 transition-transform border-none bg-none"
            title="Configure Payout Account"
          >
            <MdEdit className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-[#dfbec4]/20">
          <div className="w-12 h-8 bg-[#1A1F71] rounded-md flex items-center justify-center text-white text-[8px] font-extrabold shrink-0">
            {payoutType === "paypal"
              ? "PAYPAL"
              : payoutType === "bank"
                ? "BANK"
                : "VISA"}
          </div>
          <div className="flex-grow text-xs font-semibold text-[#131b2e]">
            <p className="font-bold">
              {payoutType === "bank"
                ? bankName
                : payoutType === "paypal"
                  ? paypalEmail
                  : "**** 4242"}
            </p>
            <p className="text-[10px] text-[#584045]/50 font-bold mt-0.5">
              {payoutType === "bank"
                ? `Acc: ${accountNumber}`
                : payoutType === "paypal"
                  ? "Instant Transfer"
                  : `Expires ${cardExpiry}`}
            </p>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
        </div>

        <p className="text-[10px] text-[#584045]/60 font-bold leading-relaxed">
          Funds are automatically transferred every Monday to your configured
          account.
        </p>
      </div>

      {/* Target goals progress bar */}
      <div className="bg-[#ffd167]/20 text-[#765900] rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-[#dfbec4]/10">
        <div className="z-10 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs">
            <MdStars className="w-4.5 h-4.5 text-[#765900]" />
            <span>Monthly Goal</span>
          </div>
          <h5 className="text-xl font-extrabold text-[#765900]">
            ${goal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h5>
        </div>

        <div className="z-10 mt-6 space-y-1.5 text-xs font-semibold">
          <div className="flex justify-between text-[10px] font-bold">
            <span>Progress (85%)</span>
            <span>On track!</span>
          </div>
          <div className="w-full bg-[#765900]/10 rounded-full h-3.5 p-0.5">
            <div className="bg-[#785a00] h-full rounded-full w-[85%]" />
          </div>
        </div>

        <button
          onClick={handleSetGoal}
          className="z-10 mt-6 w-full bg-[#785a00] text-white rounded-full py-2.5 font-bold text-xs hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer shadow-md border-none"
        >
          Set New Goal
        </button>

        <div className="absolute -right-8 -bottom-8 opacity-5 text-[#785a00] pointer-events-none">
          <MdStars className="text-[100px]" />
        </div>
      </div>

      {/* Support card details */}
      <div className="bg-[#e2e7ff]/30 rounded-[24px] p-6 border border-[#dfbec4]/30 flex gap-4 items-start select-none">
        <div className="w-9 h-9 rounded-full bg-[#00a4ca] text-white flex items-center justify-center shrink-0">
          <MdSupportAgent className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-bold text-xs text-[#131b2e]">Payment issue?</h5>
          <p className="text-[10px] text-[#584045]/70 font-semibold mt-1 leading-relaxed">
            Our seller support team is here to help you 24/7 with any financial
            queries.
          </p>
          <a
            className="text-[#006780] font-bold text-[10px] flex items-center gap-0.5 mt-3 hover:underline cursor-pointer"
            href="mailto:support@kiddostyle.com"
          >
            Contact Support <MdArrowForward className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Production Level Payout Form Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#dfbec4]/30 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-[#dfbec4]/20">
              <h3 className="font-display text-base font-extrabold text-[#131b2e]">
                Configure Payout Account
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#584045]/60 hover:bg-[#f2f3ff] transition-colors border-none bg-none cursor-pointer"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            {/* Payout Method Type Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/20">
              <button
                type="button"
                onClick={() => setPayoutType("bank")}
                className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border-none cursor-pointer ${
                  payoutType === "bank"
                    ? "bg-[#b31f56] text-white shadow-sm"
                    : "text-[#584045]/70 bg-none"
                }`}
              >
                <MdAccountBalance className="w-4 h-4" /> Bank
              </button>
              <button
                type="button"
                onClick={() => setPayoutType("card")}
                className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border-none cursor-pointer ${
                  payoutType === "card"
                    ? "bg-[#b31f56] text-white shadow-sm"
                    : "text-[#584045]/70 bg-none"
                }`}
              >
                <MdCreditCard className="w-4 h-4" /> Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPayoutType("paypal")}
                className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border-none cursor-pointer ${
                  payoutType === "paypal"
                    ? "bg-[#b31f56] text-white shadow-sm"
                    : "text-[#584045]/70 bg-none"
                }`}
              >
                <MdPayments className="w-4 h-4" /> PayPal
              </button>
            </div>

            <form
              onSubmit={handleSavePayoutMethod}
              className="space-y-4 text-xs font-semibold text-[#131b2e]"
            >
              {payoutType === "bank" && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                        Account Number / IBAN
                      </label>
                      <input
                        type="text"
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                        Routing / SWIFT Code
                      </label>
                      <input
                        type="text"
                        required
                        value={routingCode}
                        onChange={(e) => setRoutingCode(e.target.value)}
                        className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {payoutType === "card" && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                        Debit Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                        Expiration
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {payoutType === "paypal" && (
                <div>
                  <label className="block text-[10px] font-bold text-[#584045]/70 uppercase mb-1">
                    PayPal Account Email
                  </label>
                  <input
                    type="email"
                    required
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full bg-[#f2f3ff] rounded-xl p-3 border-none outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-[#dfbec4]/10">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#dfbec4] font-bold text-xs text-[#584045] bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-[#b31f56] text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-1.5 border-none cursor-pointer"
                >
                  <MdCheckCircle className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Payout Method"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
