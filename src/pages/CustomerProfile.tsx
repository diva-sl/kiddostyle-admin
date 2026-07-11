import React from "react";
import { MdChevronRight, MdMail, MdEdit, MdChatBubble } from "react-icons/md";
import { CustomerProfileCard } from "../components/CustomerProfileCard";
import { CustomerOrderHistory } from "../components/CustomerOrderHistory";
import { CustomerNotesActivity } from "../components/CustomerNotesActivity";

export const CustomerProfilePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Title & Actions breadcrumbs banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold mb-1.5 select-none">
            <span>Customers</span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">Eleanor Mason</span>
          </nav>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Eleanor Mason
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdMail className="w-4.5 h-4.5 text-[#584045]/70" />
            Send Email
          </button>

          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
            <MdEdit className="w-4.5 h-4.5" />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column (col-span-4) */}
        <div className="lg:col-span-4">
          <CustomerProfileCard />
        </div>

        {/* Right column (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <CustomerOrderHistory />
          <CustomerNotesActivity />
        </div>
      </div>

      {/* Sticky footer FAB action button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 rounded-full bg-[#131b2e] hover:bg-[#b31f56] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
          <MdChatBubble className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default CustomerProfilePage;
