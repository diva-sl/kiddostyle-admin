import React from 'react';
import { MdDownload, MdAdd } from 'react-icons/md';

export const OrdersHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-[#131b2e] mb-2">Order Management</h2>
        <div className="flex items-center gap-2 text-[#584045]/80">
          <span className="text-sm">Manage and track your customer shipments.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#785a00]"></span>
          <span className="text-xs font-bold text-[#785a00]">24 Active Shipments</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
          <MdDownload className="w-4 h-4" />
          Export CSV
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer">
          <MdAdd className="w-4 h-4" />
          Manual Order
        </button>
      </div>
    </div>
  );
};
