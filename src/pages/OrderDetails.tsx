import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdArrowBack, MdDownload } from "react-icons/md";
import { useOrders, useUpdateOrder } from "../hooks/useOrders";

const fallbackOrdersList = [
  {
    id: "1",
    orderNumber: "KS-8892",
    customer: {
      name: "Emily Morrison",
      email: "emily@example.com",
      phone: "+1 555-0192",
    },
    totalAmount: 124.5,
    status: "shipped",
    createdAt: "2026-10-22T10:45:00.000Z",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    items: [
      {
        productId: "p1",
        name: "Cotton Peony Jumpsuit",
        price: 62.25,
        quantity: 2,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBa4AvJgh8w0evhKQIZRY4v46-uHuxq3zbk5qVdJ_BDqSi9_7GCNv8Zz4dDbveE574IMzVewAip46OwNZvbJ4EavYkKMd6e2i5F2_iX4sMJQu5e8J3tSdhpmXay8rwozgRJjqf2EcyquXWFE1wc7d0Y2B-QBBngdRrR4oUwRQn_hPpS92fsf0yL35NiI3_yRwUKwsqF8MzDh0HQzQAH-TSa52jeUwLYMFeG6v0ir5OimxUjujkiGIh1aEcNq8b8bgCImIq4mR_4Eggb",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "KS-8891",
    customer: {
      name: "James Wilson",
      email: "james@example.com",
      phone: "+1 555-0189",
    },
    totalAmount: 89.0,
    status: "delivered",
    createdAt: "2026-10-21T14:30:00.000Z",
    paymentMethod: "Stripe",
    paymentStatus: "paid",
    items: [
      {
        productId: "p2",
        name: "Heritage Leather Boots",
        price: 89.0,
        quantity: 1,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYX6k3A9g3O4F9w-7da5RFPUlgDV0QrKcxOpALU8oOQuwUCg6qwDtNdXKii2shRB1XXnFQr_j-OorMWmny7m1iZOZVvQRZ2VSswTRrO-Gsbm8wawzFrK5dw4UFHXxAYw_U9nbEJp-RcgG6yE3ykutIiIrb-ZlWcJ2QGqWQlzG_RtBF0k1CyBPp1mP8Js5cAriI83vbnb4RpLYZ-MgaR0yyRs0Wuv0UQmdowMLJiOMBmMWGc7khdJEPlu0C5rPzwNRjIaUYPDtGR0W",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "KS-8890",
    customer: {
      name: "Sophia Chen",
      email: "sophia@example.com",
      phone: "+1 555-0175",
    },
    totalAmount: 256.75,
    status: "pending",
    createdAt: "2026-10-21T11:15:00.000Z",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    items: [
      {
        productId: "p3",
        name: "Midnight Wool Sweater",
        price: 128.37,
        quantity: 2,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEufj19w_dLjq6nijczUpkemHKT7_f-2eb5RvSKE8P024u32Hp8crUfDG-YRpnzYsLn6AWAwYWD5EGVrOZTit4pqPbLpG8KVYlkBrZCQB6C7r4TXTyqrzhQCdpnTxzGvdh1sgR-e6pbnjTRj8OKNlovWRtpYoZu-Agvz3CUQSsmQoqSCvDUAuPwRNm2zB3CoDe72BhJ_jS9-ypbfRB95g5VD4-j7M4wSW3GTfovyQrlmqN7FjFZA1NujVa0ZnxawQ-9ReUsX7lESL",
      },
    ],
  },
  {
    id: "4",
    orderNumber: "KS-8889",
    customer: {
      name: "Marcus Bennett",
      email: "marcus@example.com",
      phone: "+1 555-0160",
    },
    totalAmount: 45.2,
    status: "cancelled",
    createdAt: "2026-10-20T09:20:00.000Z",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    items: [
      {
        productId: "p4",
        name: "Artisan Animal Blocks",
        price: 45.2,
        quantity: 1,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDqg1F1M8g62rcZi5Nc6gcYTjlQJzk32agX_pjg1XR338SXH3q5cAIyYw1hgjoEh4OxtzhDz1i9IDmA-VsENtm9qzomwMfHFqEwEaTDHBAotCwUUQYYCz-TUfIWqL7AvmFfiAtEVArTkygqzDnj8jp7nXock1Hjn8aX27VsdrbnCTMn3y4e02Eh4-9hqVQHHqs4TtGYdn5zAz7mEgKMHrlSvNgvUG8PM_YpbLRH2tjQEJb15iGDdhLpaNmHLKx82kbrMgwB8mOgyQy8",
      },
    ],
  },
  {
    id: "5",
    orderNumber: "KS-8888",
    customer: {
      name: "Laura O'Connell",
      email: "laura@example.com",
      phone: "+1 555-0155",
    },
    totalAmount: 312.0,
    status: "processing",
    createdAt: "2026-10-19T16:55:00.000Z",
    paymentMethod: "Stripe",
    paymentStatus: "paid",
    items: [
      {
        productId: "p1",
        name: "Cotton Peony Jumpsuit",
        price: 156.0,
        quantity: 2,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBa4AvJgh8w0evhKQIZRY4v46-uHuxq3zbk5qVdJ_BDqSi9_7GCNv8Zz4dDbveE574IMzVewAip46OwNZvbJ4EavYkKMd6e2i5F2_iX4sMJQu5e8J3tSdhpmXay8rwozgRJjqf2EcyquXWFE1wc7d0Y2B-QBBngdRrR4oUwRQn_hPpS92fsf0yL35NiI3_yRwUKwsqF8MzDh0HQzQAH-TSa52jeUwLYMFeG6v0ir5OimxUjujkiGIh1aEcNq8b8bgCImIq4mR_4Eggb",
      },
    ],
  },
];

export const OrderDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: orders = [] } = useOrders();
  const updateMutation = useUpdateOrder();

  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let matched = orders.find((o) => o.id === id);
    if (!matched) {
      matched = fallbackOrdersList.find((o) => o.id === id);
    }
    if (matched) {
      setOrder(matched);
      setStatus(matched.status);
    }
  }, [id, orders]);

  const handleStatusChange = (newStatus: string) => {
    if (!order || !order.id) return;
    setStatus(newStatus);
    updateMutation.mutate(
      { id: order.id, data: { status: newStatus } },
      {
        onSuccess: () => alert("Order transaction status updated!"),
        onError: (err: any) => alert("Failed to modify status: " + err.message),
      },
    );
  };

  const handlePrintInvoice = () => {
    if (!order) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let html = `
      <html>
        <head>
          <title>Invoice - ${order.orderNumber}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #131b2e; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #dfbec4; padding-bottom: 20px; }
            .bill-to { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 40px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #dfbec4; font-size: 13px; }
            th { background-color: #f2f3ff; font-weight: bold; }
            .total { text-align: right; margin-top: 30px; font-size: 16px; font-weight: bold; color: #b31f56; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>KIDDOSTYLE INVOICE</h1>
              <p>Order Reference: <strong>#${order.orderNumber}</strong></p>
            </div>
            <div style="text-align: right;">
              <p>Generated: ${new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
              <p>Payment: ${order.paymentMethod} (${order.paymentStatus})</p>
            </div>
          </div>
          <div class="bill-to">
            <div>
              <h3>Bill To:</h3>
              <p><strong>${order.customer?.name}</strong></p>
              <p>Email: ${order.customer?.email}</p>
              <p>Phone: ${order.customer?.phone}</p>
            </div>
            <div style="text-align: right;">
              <h3>Shipment Status:</h3>
              <p style="text-transform: uppercase; font-weight: bold; color: #b31f56;">${order.status}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Description</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${(order.items || [])
                .map(
                  (item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          <div class="total">
            Total Amount Due: $${order.totalAmount.toFixed(2)}
          </div>
          <script>
            window.onload = function() { window.print(); window.onafterprint = function() { window.close(); } }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (!order) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Locating invoice documents...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 select-none">
      <header>
        <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-2">
          <span
            onClick={() => navigate("/orders")}
            className="hover:text-[#b31f56] cursor-pointer transition-colors"
          >
            Orders
          </span>
          <MdChevronRight className="w-4 h-4" />
          <span className="text-[#b31f56] font-bold">
            #{order.orderNumber} Details
          </span>
        </nav>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
            >
              <MdArrowBack className="w-4 h-4" />
            </button>
            <h2 className="font-display text-2xl font-extrabold text-[#131b2e]">
              Invoice details: #{order.orderNumber}
            </h2>
          </div>

          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-105 cursor-pointer"
          >
            <MdDownload className="w-4.5 h-4.5" />
            Print Invoice PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-3">
            Line Items
          </h3>

          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-[#f2f3ff] text-[#584045]/80">
              <tr>
                <th className="p-3 rounded-l-xl">Product</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right rounded-r-xl">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfbec4]/10 text-[#131b2e]">
              {(order.items || []).map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=80&q=80"
                      }
                      className="w-10 h-10 object-cover rounded-lg"
                      alt=""
                    />
                    <span className="font-bold">{item.name}</span>
                  </td>
                  <td className="p-3 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right font-extrabold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="font-extrabold text-sm border-t border-[#dfbec4]/30">
                <td colSpan={3} className="p-3 text-right">
                  Total Amount:
                </td>
                <td className="p-3 text-right text-[#b31f56]">
                  ${order.totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
              Delivery Status
            </h3>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full bg-[#f2f3ff] border-none rounded-xl p-3 text-xs font-bold text-[#584045] cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
              Customer Profile
            </h3>
            <p className="text-xs font-bold text-[#131b2e]">
              {order.customer?.name}
            </p>
            <p className="text-xs font-semibold text-[#584045]/70">
              Email: {order.customer?.email}
            </p>
            <p className="text-xs font-semibold text-[#584045]/70">
              Phone: {order.customer?.phone}
            </p>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-[#dfbec4]/30 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#131b2e] border-b border-[#dfbec4]/10 pb-2">
              Payment Details
            </h3>
            <p className="text-xs font-semibold text-[#584045]/70">
              Method: {order.paymentMethod}
            </p>
            <p className="text-xs font-semibold text-[#584045]/70">
              Status:{" "}
              <span className="uppercase font-bold text-[#b31f56]">
                {order.paymentStatus}
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
