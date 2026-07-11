import React from "react";
import { MdAdd, MdMail, MdSupportAgent, MdPayments } from "react-icons/md";

interface NoteItem {
  text: string;
  meta: string;
  accent?: boolean;
}

interface ActivityLogItem {
  title: string;
  detail: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const notesList: NoteItem[] = [
  {
    text: '"Prefer non-scented packaging. Mentioned she buys for her twin boys (age 4)."',
    meta: "Added by Sarah J. • 2 days ago",
    accent: true,
  },
  {
    text: "Highly responsive to seasonal sale emails. Prefers early access.",
    meta: "Added by System • 1 month ago",
  },
];

const logsList: ActivityLogItem[] = [
  {
    title: "Promotional Email Sent",
    detail: "Winter Collection Preview - Opened 3 times",
    time: "Today at 10:24 AM",
    icon: <MdMail className="w-4 h-4" />,
    iconBg: "bg-[#ffd9df] text-[#b31f56]",
  },
  {
    title: "Support Ticket Resolved",
    detail: "Inquiry about shipping times to NY.",
    time: "Oct 28, 2023",
    icon: <MdSupportAgent className="w-4 h-4" />,
    iconBg: "bg-[#b7eaff] text-[#006780]",
  },
  {
    title: "Order #KS-90124 Placed",
    detail: "Payment successful via Visa ending in 4242",
    time: "Oct 24, 2023",
    icon: <MdPayments className="w-4 h-4" />,
    iconBg: "bg-[#ffdf9b] text-[#785a00]",
  },
];

export const CustomerNotesActivity: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch select-none">
      {/* Left Column: Notes Details */}
      <div className="bg-white rounded-3xl p-6 border border-[#dfbec4]/30 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-base font-extrabold text-[#131b2e]">
            Internal Notes
          </h3>
          <button className="w-9 h-9 rounded-full bg-[#f2f3ff] hover:bg-[#b31f56] hover:text-white text-[#b31f56] flex items-center justify-center transition-all cursor-pointer">
            <MdAdd className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 flex-grow">
          {notesList.map((note, i) => (
            <div
              key={i}
              className={`p-4 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/10 ${
                note.accent ? "border-l-4 border-l-[#ffd167]" : ""
              }`}
            >
              <p
                className={`text-xs font-semibold text-[#131b2e] leading-relaxed mb-2 ${note.accent ? "italic" : ""}`}
              >
                {note.text}
              </p>
              <p className="text-[10px] text-[#584045]/60 font-bold">
                {note.meta}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Activity log details */}
      <div className="bg-white rounded-3xl p-6 border border-[#dfbec4]/30 shadow-sm">
        <h3 className="font-display text-base font-extrabold text-[#131b2e] mb-6">
          Activity Log
        </h3>

        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dfbec4]/20">
          {logsList.map((log, i) => (
            <div key={i} className="relative pl-10 flex flex-col gap-0.5">
              <div
                className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center ${log.iconBg} z-10`}
              >
                {log.icon}
              </div>

              <p className="font-bold text-xs text-[#131b2e]">{log.title}</p>
              <p className="text-[10px] text-[#584045]/70 font-semibold mt-0.5">
                {log.detail}
              </p>
              <p className="text-[9px] text-[#584045]/50 font-bold mt-1">
                {log.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
