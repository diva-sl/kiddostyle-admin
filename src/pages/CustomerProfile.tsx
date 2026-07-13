import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdChevronRight,
  MdMail,
  MdEdit,
  MdChatBubble,
  MdArrowBack,
} from "react-icons/md";
import { CustomerProfileCard } from "../components/CustomerProfileCard";
import { CustomerOrderHistory } from "../components/CustomerOrderHistory";
import { CustomerNotesActivity } from "../components/CustomerNotesActivity";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer } from "../services/customerService";

const sampleFallbackCustomers: Customer[] = [
  {
    id: "1",
    name: "Eleanor Mason",
    email: "eleanor.m@example.com",
    phone: "+1 555-0192",
    status: "active",
    totalSpent: 1240.5,
    avatar: "",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@techflow.io",
    phone: "+1 555-0188",
    status: "active",
    totalSpent: 4102.0,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmg4YZ3QB7-iwd3TSQVj8mRUPyeSAxVE9D5OjvF8-zR87_Q5sAlsFk5dd55zVdax_yfPI7ovYv05o_dPKhTlqgBdQu2o9WM6w4driqllutcKgWM6niK5ETpNBM-2Qq0f9VecqbbT6VzrnsmNkPdqb68OhliDYiI5pOXaHyKxUkoBP5Z_i4Id8SIOKZzw3t3vc1oCdZoUm4V3TNrw0u-C5x3ubyYiwKQVGQkHM3a-1z0on8Gjo0h6FuakOoSODfSNagBV_3IC928_83",
  },
  {
    id: "3",
    name: "Sophia Liang",
    email: "sophia.l@me.com",
    phone: "+1 555-0175",
    status: "suspended",
    totalSpent: 89.99,
    avatar: "",
  },
];

export const CustomerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: customers = [] } = useCustomers();

  const [customer, setCustomer] = useState<Customer | null>(null);

  // Search profile list or fall back
  useEffect(() => {
    let matched = customers.find((c) => c.id === id);
    if (!matched) {
      matched = sampleFallbackCustomers.find((c) => c.id === id);
    }
    setCustomer(matched ?? null);
  }, [id, customers]);

  if (!customer) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Searching customer profile archives...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 select-none">
      {/* Title & Actions breadcrumbs banner */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-[#584045]/60 font-semibold mb-1.5 select-none">
            <span
              onClick={() => navigate("/customers")}
              className="hover:text-[#b31f56] cursor-pointer transition-colors"
            >
              Customers
            </span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">{customer.name}</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/customers")}
              className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] cursor-pointer"
            >
              <MdArrowBack className="w-4 h-4" />
            </button>
            <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
              {customer.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdMail className="w-4.5 h-4.5 text-[#584045]/70" />
            Send Email
          </button>

          <button
            onClick={() => navigate(`/customers/edit/${customer.id}`)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
          >
            <MdEdit className="w-4.5 h-4.5" />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column (col-span-4) */}
        <div className="lg:col-span-4">
          <CustomerProfileCard customer={customer} />
        </div>

        {/* Right column (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <CustomerOrderHistory customer={customer} />
          <CustomerNotesActivity customer={customer} />
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
