import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdChevronRight,
  MdArrowBack,
  MdCheckCircle,
  MdAdd,
  MdDelete,
} from "react-icons/md";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useCreateOrder } from "../hooks/useOrders";
import type { OrderItem } from "../services/orderService";

// Fallback mockup products list if DB is currently empty
const fallbackProducts = [
  {
    id: "p1",
    name: "Cotton Peony Jumpsuit",
    price: 62.25,
    category: "Newborn",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa4AvJgh8w0evhKQIZRY4v46-uHuxq3zbk5qVdJ_BDqSi9_7GCNv8Zz4dDbveE574IMzVewAip46OwNZvbJ4EavYkKMd6e2i5F2_iX4sMJQu5e8J3tSdhpmXay8rwozgRJjqf2EcyquXWFE1wc7d0Y2B-QBBngdRrR4oUwRQn_hPpS92fsf0yL35NiI3_yRwUKwsqF8MzDh0HQzQAH-TSa52jeUwLYMFeG6v0ir5OimxUjujkiGIh1aEcNq8b8bgCImIq4mR_4Eggb",
    ],
  },
  {
    id: "p2",
    name: "Heritage Leather Boots",
    price: 89.0,
    category: "Shoes",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYX6k3A9g3O4F9w-7da5RFPUlgDV0QrKcxOpALU8oOQuwUCg6qwDtNdXKii2shRB1XXnFQr_j-OorMWmny7m1iZOZVvQRZ2VSswTRrO-Gsbm8wawzFrK5dw4UFHXxAYw_U9nbEJp-RcgG6yE3ykutIiIrb-ZlWcJ2QGqWQlzG_RtBF0k1CyBPp1mP8Js5cAriI83vbnb4RpLYZ-MgaR0yyRs0Wuv0UQmdowMLJiOMBmMWGc7khdJEPlu0C5rPzwNRjIaUYPDtGR0W",
    ],
  },
  {
    id: "p3",
    name: "Midnight Wool Sweater",
    price: 128.37,
    category: "Toddler Boy",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEufj19w_dLjq6nijczUpkemHKT7_f-2eb5RvSKE8P024u32Hp8crUfDG-YRpnzYsLn6AWAwYWD5EGVrOZTit4pqPbLpG8KVYlkBrZCQB6C7r4TXTyqrzhQCdpnTxzGvdh1sgR-e6pbnjTRj8OKNlovWRtpYoZu-Agvz3CUQSsmQoqSCvDUAuPwRNm2zB3CoDe72BhJ_jS9-ypbfRB95g5VD4-j7M4wSW3GTfovyQrlmqN7FjFZA1NujVa0ZnxawQ-9ReUsX7lESL",
    ],
  },
  {
    id: "p4",
    name: "Artisan Animal Blocks",
    price: 45.2,
    category: "Toddler Girl",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqg1F1M8g62rcZi5Nc6gcYTjlQJzk32agX_pjg1XR338SXH3q5cAIyYw1hgjoEh4OxtzhDz1i9IDmA-VsENtm9qzomwMfHFqEwEaTDHBAotCwUUQYYCz-TUfIWqL7AvmFfiAtEVArTkygqzDnj8jp7nXock1Hjn8aX27VsdrbnCTMn3y4e02Eh4-9hqVQHHqs4TtGYdn5zAz7mEgKMHrlSvNgvUG8PM_YpbLRH2tjQEJb15iGDdhLpaNmHLKx82kbrMgwB8mOgyQy8",
    ],
  },
];

// Fallback mockup categories list if DB is currently empty
const fallbackCategories = [
  { id: "1", name: "Newborn" },
  { id: "2", name: "Toddler Boy" },
  { id: "3", name: "Toddler Girl" },
  { id: "4", name: "Shoes" },
];

export const AddOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateOrder();

  // Customer State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Line Item Filters State
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [items, setItems] = useState<OrderItem[]>([]);

  // Settings State
  const [status, setStatus] = useState("pending");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [saving, setSaving] = useState(false);

  // Combine live and fallback lists
  const displayProducts = products.length > 0 ? products : fallbackProducts;
  const displayCategories =
    categories.length > 0 ? categories : fallbackCategories;

  // Filter products by selected category
  const filteredProducts = displayProducts.filter(
    (p) =>
      selectedCategory === "All Categories" ||
      p.category.toLowerCase() === selectedCategory.toLowerCase(),
  );

  // Add Item to Order list
  const handleAddItem = () => {
    const prod = displayProducts.find((p) => p.id === selectedProductId);
    if (!prod) return;

    // Check if item already exists, increment qty
    const existing = items.find((i) => i.productId === selectedProductId);
    if (existing) {
      setItems(
        items.map((i) =>
          i.productId === selectedProductId
            ? { ...i, quantity: i.quantity + selectedQty }
            : i,
        ),
      );
    } else {
      setItems([
        ...items,
        {
          productId: prod.id || "",
          name: prod.name,
          price: prod.price,
          quantity: selectedQty,
          image: prod.images?.[0] || "",
        },
      ]);
    }
    setSelectedQty(1);
    setSelectedProductId("");
  };

  const handleRemoveItem = (prodId: string) => {
    setItems(items.filter((i) => i.productId !== prodId));
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Please add at least one product item to the transaction order.");
      return;
    }
    setSaving(true);

    const payload = {
      orderNumber: `KS-${Math.floor(10000 + Math.random() * 90000)}`,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
      items,
      totalAmount,
      status,
      paymentMethod,
      paymentStatus,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        alert("Transaction order recorded successfully!");
        navigate("/orders");
      },
      onError: (err: any) => {
        alert("Failed to record order: " + err.message);
      },
      onSettled: () => setSaving(false),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      {/* Clickable Header Breadcrumbs */}
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/orders")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Orders
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">New Order</span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <MdArrowBack className="w-4 h-4" />
          </button>
          <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
            Record Manual Customer Sale
          </h2>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Profile Section */}
        <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
            Customer Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1">
                Customer Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#b31f56]/15 text-[#131b2e]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#b31f56]/15 text-[#131b2e]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. +1 555-0199"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#b31f56]/15 text-[#131b2e]"
              />
            </div>
          </div>
        </section>

        {/* Line Items Selection & Filtering */}
        <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
            Line Items
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            {/* 1. Category Filter Dropdown */}
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1">
                Filter Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedProductId(""); // Reset product select on category change
                }}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] outline-none cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                {displayCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Product Selector (shows filtered products) */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1">
                Select Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] outline-none cursor-pointer"
              >
                <option value="">-- Choose Product --</option>
                {filteredProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - ${p.price}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Quantity input and Add Line trigger */}
            <div className="flex gap-2">
              <div className="w-20 shrink-0">
                <input
                  type="number"
                  min="1"
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(Number(e.target.value))}
                  className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#131b2e] outline-none text-center"
                />
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex-grow p-3 bg-[#e2e7ff] hover:bg-[#dfbec4]/30 rounded-xl text-[#b31f56] transition-all cursor-pointer flex items-center justify-center font-bold text-xs"
              >
                <MdAdd className="w-5 h-5 mr-1" />
                Add
              </button>
            </div>
          </div>

          {/* Line Items Table listing */}
          {items.length > 0 && (
            <div className="border border-[#dfbec4]/20 rounded-2xl overflow-hidden mt-4">
              <table className="w-full text-left text-xs font-semibold">
                <thead className="bg-[#f2f3ff] text-[#584045]/80">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3 text-right">Subtotal</th>
                    <th className="p-3 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dfbec4]/10 text-[#131b2e]">
                  {items.map((item) => (
                    <tr key={item.productId}>
                      <td className="p-3 font-bold">{item.name}</td>
                      <td className="p-3 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right font-extrabold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-[#ba1a1a] hover:bg-[#ffdad6] p-1.5 rounded-full cursor-pointer"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#f2f3ff]/50 font-extrabold text-sm border-t border-[#dfbec4]/30">
                    <td colSpan={3} className="p-3 text-right">
                      Total Amount:
                    </td>
                    <td className="p-3 text-right text-[#b31f56]">
                      ${totalAmount.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Configurations details */}
        <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
            Configurations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Order Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Stripe">Stripe API</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-widest mb-1.5">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 border-t border-[#dfbec4]/10 pt-4">
          <button
            type="button"
            onClick={() => navigate("/orders")}
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
            {saving ? "Processing..." : "Publish Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};
