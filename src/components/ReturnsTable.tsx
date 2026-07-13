import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheck, MdClose, MdVisibility, MdInfo } from "react-icons/md";
import { useReturns, useUpdateReturn } from "../hooks/useReturns";

interface ReturnsTableProps {
  statusFilter: string;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  selectedIds: string[];
  onSelectedIdsChange: (ids: string[]) => void;
  onTotalFilteredChange: (count: number) => void;
}

const fallbackReturnsList = [
  {
    id: "1",
    orderNumber: "KD-89210",
    customerName: "Sarah Miller",
    reason: "Wrong Size",
    amount: "$145.00",
    status: "pending",
    date: "Oct 24, 2023",
  },
  {
    id: "2",
    orderNumber: "KD-89195",
    customerName: "James Brown",
    reason: "Damaged",
    amount: "$89.50",
    status: "approved",
    date: "Oct 23, 2023",
  },
  {
    id: "3",
    orderNumber: "KD-89182",
    customerName: "Emma Lee",
    reason: "Changed Mind",
    amount: "$210.00",
    status: "refunded",
    date: "Oct 22, 2023",
  },
  {
    id: "4",
    orderNumber: "KD-89170",
    customerName: "David Wilson",
    reason: "Wrong Item",
    amount: "$56.00",
    status: "rejected",
    date: "Oct 21, 2023",
  },
];

export const ReturnsTable: React.FC<ReturnsTableProps> = ({
  statusFilter,
  searchQuery,
  currentPage,
  itemsPerPage,
  selectedIds,
  onSelectedIdsChange,
  onTotalFilteredChange,
}) => {
  const navigate = useNavigate();
  const { data: dbReturns, isLoading } = useReturns();
  const updateMutation = useUpdateReturn();

  // Map backend query results or fall back
  const displayList: any[] =
    dbReturns && dbReturns.length > 0
      ? dbReturns
      : fallbackReturnsList.map((r) => ({
          id: r.id,
          orderNumber: r.orderNumber,
          customerName: r.customerName,
          reason: r.reason,
          refundAmount: parseFloat(r.amount.replace("$", "")),
          status: r.status,
          requestedAt: new Date().toISOString(),
        }));

  // Filter list by status & search keyword
  const filteredList = displayList.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (searchQuery) {
      const matchOrder = r.orderNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchCust = r.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchReason = r.reason
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchOrder && !matchCust && !matchReason) return false;
    }
    return true;
  });

  useEffect(() => {
    onTotalFilteredChange(filteredList.length);
  }, [filteredList.length, onTotalFilteredChange]);

  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    updateMutation.mutate({ id, payload: { status: newStatus } });
  };

  // Row check selections
  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedList.length) {
      onSelectedIdsChange([]);
    } else {
      onSelectedIdsChange(paginatedList.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectedIdsChange(
        selectedIds.filter((selectedId) => selectedId !== id),
      );
    } else {
      onSelectedIdsChange([...selectedIds, id]);
    }
  };

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending")
      return "bg-[#ffd167]/20 text-[#765900] border border-[#ffd167]/30";
    if (s === "approved")
      return "bg-[#00a4ca]/10 text-[#006780] border border-[#00a4ca]/20";
    if (s === "refunded")
      return "bg-[#faf8ff] text-[#584045]/80 border border-[#dfbec4]/30";
    return "bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/20";
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70 select-none">
        Loading return requests...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#dfbec4]/30 shadow-sm overflow-hidden select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff]/50 font-bold text-xs text-[#584045]/70 border-b border-[#dfbec4]/25">
              <th className="px-6 py-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={
                    paginatedList.length > 0 &&
                    selectedIds.length === paginatedList.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]"
                />
              </th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Requested Date</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
            {paginatedList.map((row) => {
              const initials = row.customerName
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={row.id}
                  className="hover:bg-[#faf8ff] transition-colors"
                >
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                      className="rounded border-[#dfbec4] text-[#b31f56] focus:ring-[#b31f56]"
                    />
                  </td>

                  <td
                    onClick={() => navigate(`/returns/${row.id}`)}
                    className="px-6 py-4 font-bold text-[#b31f56] cursor-pointer hover:underline"
                  >
                    #{row.orderNumber}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 bg-[#ffd167]/30 text-[#765900]">
                        {initials}
                      </div>
                      <span className="font-bold text-[#131b2e]">
                        {row.customerName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[#584045]/80">
                    {new Date(
                      row.requestedAt || Date.now(),
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] bg-[#f2f3ff] text-[#131b2e]">
                      {row.reason}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-extrabold text-[#131b2e]">
                    ${row.refundAmount.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${getStatusStyle(row.status)}`}
                    >
                      {row.status === "pending" && (
                        <span className="w-1.5 h-1.5 bg-[#785a00] rounded-full animate-pulse" />
                      )}
                      <span className="capitalize">{row.status}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {row.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(row.id, "approved")
                            }
                            className="w-8 h-8 rounded-full bg-[#006780]/10 text-[#006780] flex items-center justify-center hover:bg-[#006780] hover:text-white transition-all cursor-pointer border-none"
                            title="Approve"
                          >
                            <MdCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(row.id, "rejected")
                            }
                            className="w-8 h-8 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] flex items-center justify-center hover:bg-[#ba1a1a] hover:text-white transition-all cursor-pointer border-none"
                            title="Reject"
                          >
                            <MdClose className="w-4 h-4" />
                          </button>
                        </>
                      ) : row.status === "rejected" ? (
                        <button
                          onClick={() => navigate(`/returns/${row.id}`)}
                          className="text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer border-none bg-none"
                        >
                          <MdInfo className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/returns/${row.id}`)}
                          className="text-[#584045]/70 hover:text-[#b31f56] transition-colors cursor-pointer border-none bg-none"
                        >
                          <MdVisibility className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
