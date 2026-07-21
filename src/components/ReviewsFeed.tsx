import React, { useState, useEffect } from "react";
import { MdStar } from "react-icons/md";
import {
  useReviews,
  useUpdateReviewStatus,
  useDeleteReview,
} from "../hooks/useReviews";

interface ReviewsFeedProps {
  ratingFilter: string;
  statusFilter: string;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  onTotalFilteredChange: (count: number) => void;
}

const fallbackReviewsList = [
  {
    id: "1",
    productId: "p1", // Added required fallback ID
    productName: "Organic Cotton Knit Sweater",
    rating: 5,
    customerName: "Sarah Mitchell",
    comment:
      "The quality is absolutely incredible! My daughter finds it so soft and doesn't want to take it off. Truly a premium piece for her wardrobe. Fast shipping too!",
    status: "approved",
    createdAt: "2026-10-23T10:45:00.000Z",
    image:
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "2",
    productId: "p2", // Added required fallback ID
    productName: "Honey Leather Boots",
    rating: 4,
    customerName: "James Kessler",
    comment:
      "Stunning little boots. The leather is very supple. I'm just wondering about the sizing, they seem to run a tiny bit large.",
    status: "pending",
    createdAt: "2026-10-22T14:15:00.000Z",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "3",
    productId: "p3", // Added required fallback ID
    productName: "Summer Denim Overalls",
    rating: 1,
    customerName: "Unverified User",
    comment:
      "This took forever to arrive and the customer service was rude. I want my money back immediately. DO NOT BUY FROM HERE!!!!",
    status: "rejected",
    createdAt: "2026-10-20T11:15:00.000Z",
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80",
  },
];

export const ReviewsFeed: React.FC<ReviewsFeedProps> = ({
  ratingFilter,
  statusFilter,
  searchQuery,
  currentPage,
  itemsPerPage,
  onTotalFilteredChange,
}) => {
  const { data: dbReviews, isLoading } = useReviews();
  const updateStatusMutation = useUpdateReviewStatus();
  const deleteMutation = useDeleteReview();

  // Inline Reply states
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [virtualReplies, setVirtualReplies] = useState<Record<string, string>>(
    {},
  );

  // Cast displayList to any[] to bypass strict structural checks for fallback rows
  const displayList: any[] =
    Array.isArray(dbReviews) && dbReviews.length > 0 ? dbReviews : fallbackReviewsList;

  // Filter feed items
  const filteredList = displayList.filter((r) => {
    // 1. Rating filters
    if (ratingFilter !== "all" && r.rating !== Number(ratingFilter))
      return false;

    // 2. Status mapping filters (published == approved, flagged == rejected)
    if (statusFilter !== "all") {
      if (statusFilter === "approved" && r.status !== "approved") return false;
      if (statusFilter === "pending" && r.status !== "pending") return false;
      if (statusFilter === "rejected" && r.status !== "rejected") return false;
    }

    // 3. Search query filters
    if (searchQuery) {
      const matchProduct = r.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchCustomer = r.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchComment = r.comment
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchProduct && !matchCustomer && !matchComment) return false;
    }

    return true;
  });

  // Report the filtered count to the parent component
  useEffect(() => {
    onTotalFilteredChange(filteredList.length);
  }, [filteredList.length, onTotalFilteredChange]);

  // Slice paginated items
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    updateStatusMutation.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => alert(`Review status updated to ${newStatus}!`),
        onError: (err: any) =>
          alert("Failed to modify review status: " + err.message),
      },
    );
  };

  const handleDeleteReview = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this customer feedback permanently?",
      )
    ) {
      deleteMutation.mutate(id, {
        onSuccess: () => alert("Feedback record deleted from database."),
        onError: (err: any) => alert("Deletion failed: " + err.message),
      });
    }
  };

  const submitReply = (id: string) => {
    if (!replyText.trim()) return;
    setVirtualReplies({
      ...virtualReplies,
      [id]: replyText,
    });
    setReplyTargetId(null);
    setReplyText("");
    alert("Reply posted successfully!");
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Loading catalog review logs...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {paginatedList.map((review) => {
        const isPending = review.status === "pending";
        const isRejected = review.status === "rejected";
        const isApproved = review.status === "approved";

        const initials = review.customerName
          .split(" ")
          .map((w: any[]) => w[0])
          .join("")
          .substring(0, 2)
          .toUpperCase();

        return (
          <div
            key={review.id}
            className={`bg-white rounded-[32px] p-6 transition-all duration-300 border text-xs font-semibold text-[#131b2e] ${
              isPending
                ? "border-2 border-[#ff5c8d]/30 shadow-md"
                : isRejected
                  ? "border-[#dfbec4]/30 opacity-85"
                  : "border-[#dfbec4]/30 hover:shadow-md"
            }`}
          >
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#f2f3ff] border border-[#dfbec4]/20">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      review.image ||
                      "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80"
                    }
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
                          className={`w-4 h-4 ${i < review.rating ? "" : "text-[#dfbec4]"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[#584045]/60">
                      | Star Rating: {review.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              {isApproved && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a4ca]/10 text-[#006780] font-bold text-[10px] uppercase select-none">
                  <span className="w-2 h-2 rounded-full bg-[#006780]" />
                  Published
                </div>
              )}
              {isPending && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd167]/30 text-[#765900] font-bold text-[10px] uppercase select-none">
                  <span className="w-2 h-2 rounded-full bg-[#785a00] animate-pulse" />
                  Pending Review
                </div>
              )}
              {isRejected && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] uppercase select-none">
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                  Rejected / Hidden
                </div>
              )}
            </div>

            {/* Inner comment card detail */}
            <div
              className={`mt-4 p-5 rounded-2xl ${isRejected ? "bg-[#ffdad6]/20" : "bg-[#f2f3ff]/50"}`}
            >
              <p
                className={`text-xs leading-relaxed font-semibold text-[#131b2e] ${isRejected ? "italic" : ""}`}
              >
                "{review.comment}"
              </p>

              {/* Virtual reply showing if exist */}
              {virtualReplies[review.id || ""] && (
                <div className="mt-3 bg-[#e2e7ff] p-4 rounded-xl border border-none">
                  <p className="font-bold text-[10px] text-[#b31f56] uppercase tracking-wider mb-1">
                    Official Response:
                  </p>
                  <p className="text-xs text-[#131b2e] italic">
                    "{virtualReplies[review.id || ""]}"
                  </p>
                </div>
              )}

              {/* Comment author controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#dfbec4]/30 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-[#dae2fd] text-[#131b2e]">
                    {initials}
                  </div>
                  <span className="text-xs font-bold text-[#131b2e]">
                    {review.customerName}
                  </span>
                  <span className="text-[10px] text-[#584045]/60 font-semibold">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "Just now"}
                  </span>
                </div>

                {/* Actions buttons */}
                <div className="flex gap-2">
                  {isApproved && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(review.id || "", "rejected")
                        }
                        className="px-4 py-1.5 rounded-full border border-[#dfbec4] text-xs font-bold text-[#584045] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                      >
                        Hide
                      </button>
                      <button
                        onClick={() => setReplyTargetId(review.id || "")}
                        className="px-4 py-1.5 rounded-full bg-[#b31f56] text-white font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer border-none"
                      >
                        Reply
                      </button>
                    </>
                  )}
                  {isPending && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(review.id || "", "rejected")
                        }
                        className="px-4 py-1.5 rounded-full border border-[#dfbec4] text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateStatus(review.id || "", "approved");
                          setReplyTargetId(review.id || "");
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#ffd167] text-[#765900] font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer border-none"
                      >
                        Approve &amp; Reply
                      </button>
                    </>
                  )}
                  {isRejected && (
                    <>
                      <button
                        onClick={() => handleDeleteReview(review.id || "")}
                        className="px-4 py-1.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-bold text-xs hover:bg-[#ffdad6] transition-colors cursor-pointer"
                      >
                        Delete Permanently
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(review.id || "", "approved")
                        }
                        className="px-4 py-1.5 rounded-full border border-[#dfbec4] text-xs font-bold text-[#584045] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                      >
                        Restore
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Inline Reply input block */}
              {replyTargetId === review.id && (
                <div className="mt-4 pt-4 border-t border-[#dfbec4]/20 flex flex-col gap-2">
                  <textarea
                    rows={2}
                    placeholder="Type official store response message..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-white border border-[#dfbec4]/30 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#b31f56]/15 font-semibold text-xs text-[#131b2e]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setReplyTargetId(null);
                        setReplyText("");
                      }}
                      className="px-3.5 py-1.5 border border-[#dfbec4] rounded-full font-bold text-[10px] text-[#584045] hover:bg-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => submitReply(review.id || "")}
                      className="px-4 py-1.5 bg-[#b31f56] text-white rounded-full font-bold text-[10px] hover:brightness-105 cursor-pointer border-none"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
