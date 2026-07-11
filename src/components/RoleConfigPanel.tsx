import React, { useState } from "react";
import { MdInventory, MdShoppingCart, MdPerson } from "react-icons/md";

export const RoleConfigPanel: React.FC = () => {
  const [permissions, setPermissions] = useState({
    products: true,
    orders: true,
    customers: false,
  });

  const handleToggle = (key: "products" | "orders" | "customers") => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Role status summary card */}
      <div className="bg-[#b31f56] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <h3 className="font-display text-base font-extrabold">Role Status</h3>
          <p className="text-xs text-white/80 font-semibold mb-6">
            Overview of active permissions across defined roles.
          </p>

          <div className="space-y-3 pt-6">
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-2xl">
              <span className="text-xs font-bold">Total Roles</span>
              <span className="text-xl font-extrabold">12</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-2xl">
              <span className="text-xs font-bold">Active Admins</span>
              <span className="text-xl font-extrabold">4</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-2xl">
              <span className="text-xs font-bold">Open Invites</span>
              <span className="text-xl font-extrabold">2</span>
            </div>
          </div>
        </div>

        {/* Abstract shape glow */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#ffd167] rounded-full opacity-10 blur-2xl pointer-events-none" />
      </div>

      {/* Permission Switch togglers */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#dfbec4]/30 space-y-6">
        <div>
          <h3 className="font-display text-sm font-extrabold text-[#131b2e]">
            Quick Config
          </h3>
          <p className="text-[10px] text-[#584045]/60 font-bold">
            Adjust standard Editor permissions
          </p>
        </div>

        <div className="space-y-4">
          {/* Toggle: Products */}
          <div className="flex items-center justify-between p-4 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/20 hover:border-[#b31f56]/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff5c8d]/10 flex items-center justify-center text-[#b31f56]">
                <MdInventory className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#131b2e]">Products</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.products}
                onChange={() => handleToggle("products")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
            </label>
          </div>

          {/* Toggle: Orders */}
          <div className="flex items-center justify-between p-4 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/20 hover:border-[#b31f56]/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffd167]/20 flex items-center justify-center text-[#785a00]">
                <MdShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#131b2e]">Orders</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.orders}
                onChange={() => handleToggle("orders")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
            </label>
          </div>

          {/* Toggle: Customers */}
          <div className="flex items-center justify-between p-4 bg-[#faf8ff] rounded-2xl border border-[#dfbec4]/20 hover:border-[#b31f56]/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b7eaff] flex items-center justify-center text-[#006780]">
                <MdPerson className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#131b2e]">
                Customers
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.customers}
                onChange={() => handleToggle("customers")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#dfbec4] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#b31f56]/20 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#b31f56]" />
            </label>
          </div>
        </div>

        <button className="w-full mt-6 py-2.5 rounded-full border-2 border-[#785a00] text-[#785a00] font-bold text-xs hover:bg-[#785a00] hover:text-white transition-all cursor-pointer">
          Update Role Set
        </button>
      </div>
    </div>
  );
};
