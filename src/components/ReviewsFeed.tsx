import React from "react";
import { MdStar, MdFlag } from "react-icons/md";

interface ReviewItem {
  id: string;
  productName: string;
  starsCount: number;
  orderNumber: string;
  status: "published" | "pending" | "flagged";
  statusText: string;
  comment: string;
  customerInitials: string;
  customerColor: string;
  customerName: string;
  timestamp: string;
  image: string;
}

const reviewsList: ReviewItem[] = [
  {
    id: "1",
    productName: "Organic Cotton Knit Sweater",
    starsCount: 5,
    orderNumber: "#KS-9283",
    status: "published",
    statusText: "Published",
    comment:
      "The quality is absolutely incredible! My daughter finds it so soft and doesn't want to take it off. The color is exactly like the photos—a beautiful dusty rose. Truly a premium piece for her wardrobe. Fast shipping too!",
    customerInitials: "SM",
    customerColor: "bg-[#ffd167]/30 text-[#765900]",
    customerName: "Sarah Mitchell",
    timestamp: "2 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAB3UkpbsxGHeM1T2X5QnUns4d433JzeulPF5iDc4EBP3lE3TpKexoM9wklruHfNbxgCUUuUPHLQ7LhRz2AXMKpiRctCO2CAu25m1VyHfGiiLJ5A4vc4_NjZF7dOiDQr6-cH9jVpqR7O_ewdwK1c4cufpFaFg-IkunuAHsQGZxyHOipeiDA1DfvHi91cvoyELX-FcSf5XMJB5S4cdItcG9flyAw3c_erxoAtKfpcr_jvPN9JL-ajeRArhN6RhCzux5INJzWvn-7XJjQ",
  },
  {
    id: "2",
    productName: "Honey Leather Boots",
    starsCount: 4,
    orderNumber: "#KS-9110",
    status: "pending",
    statusText: "Pending",
    comment:
      "Stunning little boots. The leather is very supple. I'm just wondering about the sizing, they seem to run a tiny bit large. Will they shrink slightly with wear or should I exchange for a smaller size?",
    customerInitials: "JK",
    customerColor: "bg-[#b7eaff] text-[#006780]",
    customerName: "James Kessler",
    timestamp: "Yesterday, 4:15 PM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1iNgCDcLTFK7xKfQMqKGggCUBMHXlE7gRcf7rrZy9vo6Z_TlDxypv10aRWq3mkk36AiOUchiIloB-PbFU-24okuBta7IqMSlB9hKNJfPokbttFDkIEvQGo8ca8UwKo8_i1hRzxuBLTq0edd-AqXHHQBE9rUTaaQp-1wq7prZ_ZmQq4kVAnYuJ-TKoiTXmsnW0YESRqCTQSOkEqSwd4n4RgEffWF-Qw3lFiI1dSGDZeciYxq1kgKBKN8uILR41z58lrhL3a-1gMY2",
  },
  {
    id: "3",
    productName: "Summer Denim Overalls",
    starsCount: 1,
    orderNumber: "#KS-8942",
    status: "flagged",
    statusText: "Flagged",
    comment:
      "This took forever to arrive and the customer service was rude. I want my money back immediately. DO NOT BUY FROM HERE!!!!",
    customerInitials: "U",
    customerColor: "bg-[#eaedff] text-[#584045]",
    customerName: "Unverified User",
    timestamp: "3 days ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnbxzbHmNVRjGfRrs9SLk0KxVdt3mPAvjV71OCra3AUrwnVE4C3cBx3jTjm02_CwO_WqqdJRlhuCLWtGflERMD-jmmdD_ChbqRFLfAUXA74gL1T0Do1PVdhzuDPlLbar9vexXka2skh0uWkWp-0jXb9YqR6QO92Q_ibkW7jvGFvIsVb3cW5RV6YBgik0_PoatLfT8q7F59uoAo35FVxRR8B-xMJnaok79oE890MWigjhKav8K5YX1lkHKJ4RnNqcm2LfbTaV42ujT1",
  },
];

export const ReviewsFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      {reviewsList.map((review) => {
        const isPending = review.status === "pending";
        const isFlagged = review.status === "flagged";
        const isPublished = review.status === "published";

        return (
          <div
            key={review.id}
            className={`bg-white rounded-[32px] p-6 transition-all duration-300 border ${
              isPending
                ? "border-2 border-[#ff5c8d]/30 shadow-md"
                : isFlagged
                  ? "border-[#dfbec4]/30 opacity-80 hover:opacity-100"
                  : "border-[#dfbec4]/30 hover:shadow-md"
            }`}
          >
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#f2f3ff] border border-[#dfbec4]/20">
                  <img
                    className="w-full h-full object-cover"
                    src={review.image}
                    alt={review.productName}
                  />
                </div>
                <div>
                  <h4 className="font-display text-sm font-extrabold text-[#131b2e]">
                    {review.productName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5 font-bold text-xs">
                    <div className="flex text-[#ffd167] shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <MdStar
                          key={i}
                          className={`w-4 h-4 ${i < review.starsCount ? "" : "text-[#dfbec4]"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[#584045]/60">
                      | Order {review.orderNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action badges status */}
              {isPublished && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a4ca]/10 text-[#006780] font-bold text-[10px] uppercase select-none">
                  <span className="w-2 h-2 rounded-full bg-[#006780]" />
                  Published
                </div>
              )}
              {isPending && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd167]/30 text-[#765900] font-bold text-[10px] uppercase select-none">
                  <span className="w-2 h-2 rounded-full bg-[#785a00] animate-pulse" />
                  Pending
                </div>
              )}
              {isFlagged && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] uppercase select-none">
                  <MdFlag className="w-3.5 h-3.5" />
                  Flagged
                </div>
              )}
            </div>

            {/* Inner comment card detail */}
            <div
              className={`mt-4 p-5 rounded-2xl ${isFlagged ? "bg-[#ffdad6]/20" : "bg-[#f2f3ff]/50"}`}
            >
              <p
                className={`text-xs leading-relaxed font-semibold text-[#131b2e] ${isFlagged ? "italic" : ""}`}
              >
                "{review.comment}"
              </p>

              {/* Comment author controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#dfbec4]/30 select-none">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${review.customerColor}`}
                  >
                    {review.customerInitials}
                  </div>
                  <span className="text-xs font-bold text-[#131b2e]">
                    {review.customerName}
                  </span>
                  <span className="text-[10px] text-[#584045]/60 font-semibold">
                    {review.timestamp}
                  </span>
                </div>

                {/* Actions buttons */}
                <div className="flex gap-2">
                  {isPublished && (
                    <>
                      <button className="px-4 py-1.5 rounded-full border border-[#dfbec4] text-xs font-bold text-[#584045] hover:bg-[#f2f3ff] transition-colors cursor-pointer">
                        Hide
                      </button>
                      <button className="px-4 py-1.5 rounded-full bg-[#b31f56] text-white font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer">
                        Reply
                      </button>
                    </>
                  )}
                  {isPending && (
                    <>
                      <button className="px-4 py-1.5 rounded-full border border-[#dfbec4] text-xs font-bold text-[#584045] hover:bg-[#f2f3ff] transition-colors cursor-pointer">
                        Reject
                      </button>
                      <button className="px-4 py-1.5 rounded-full bg-[#ffd167] text-[#765900] font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer">
                        Approve &amp; Reply
                      </button>
                    </>
                  )}
                  {isFlagged && (
                    <>
                      <button className="px-4 py-1.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-bold text-xs hover:bg-[#ffdad6] transition-colors cursor-pointer">
                        Delete Permanently
                      </button>
                      <button className="px-4 py-1.5 rounded-full border border-[#dfbec4] text-xs font-bold text-[#584045] hover:bg-[#f2f3ff] transition-colors cursor-pointer">
                        Investigate Order
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
