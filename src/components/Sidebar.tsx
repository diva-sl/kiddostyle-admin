import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdDashboard,
  MdInventory,
  MdCategory,
  MdVerified,
  MdListAlt,
  MdLocalOffer,
  MdShoppingCart,
  MdPerson,
  MdRateReview,
  MdAssignmentReturn,
  MdArticle,
  MdViewCarousel,
  MdWeb,
  MdAnalytics,
  MdSecurity,
  MdSettings,
  MdStore,
  MdPayments,
  MdSupportAgent
} from 'react-icons/md';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors squish ${
        active 
          ? 'text-[#b31f56] font-bold border-r-4 border-[#785a00] bg-[#e2e7ff]' 
          : 'text-[#584045] hover:bg-[#e2e7ff] hover:text-[#b31f56]'
      }`}
    >
      <span className="w-5 h-5 shrink-0 flex items-center justify-center">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 overflow-y-auto bg-[#f2f3ff] border-r border-[#dfbec4]/30 shadow-sm flex flex-col justify-between premium-scroll">
      <style>{`
        /* Premium custom scrollbar styling */
        .premium-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .premium-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .premium-scroll::-webkit-scrollbar-thumb {
          background: #dfbec4;
          border-radius: 10px;
        }
        .premium-scroll::-webkit-scrollbar-thumb:hover {
          background: #b31f56;
        }
      `}</style>

      {/* Brand Header & Menu */}
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#dfbec4]/20 flex items-center mb-4 h-16 shrink-0">
          <div className="font-display text-2xl font-bold text-[#b31f56]">
            KiddoStyle
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 pb-6 space-y-1">
          <SidebarItem 
            to="/" 
            icon={<MdDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={currentPath === '/'} 
          />
          <SidebarItem 
            to="/products" 
            icon={<MdInventory className="w-5 h-5" />} 
            label="Products" 
            active={currentPath.startsWith('/products')} 
          />
          <SidebarItem 
            to="/categories" 
            icon={<MdCategory className="w-5 h-5" />} 
            label="Categories" 
            active={currentPath === '/categories'} 
          />
          <SidebarItem 
            to="/brands" 
            icon={<MdVerified className="w-5 h-5" />} 
            label="Brands" 
            active={currentPath === '/brands'} 
          />
          <SidebarItem 
            to="/inventory" 
            icon={<MdListAlt className="w-5 h-5" />} 
            label="Inventory" 
            active={currentPath === '/inventory'} 
          />
          <SidebarItem 
            to="/coupons" 
            icon={<MdLocalOffer className="w-5 h-5" />} 
            label="Coupons" 
            active={currentPath === '/coupons'} 
          />
          <SidebarItem 
            to="/orders" 
            icon={<MdShoppingCart className="w-5 h-5" />} 
            label="Orders" 
            active={currentPath.startsWith('/orders')} 
          />
          <SidebarItem 
            to="/customers" 
            icon={<MdPerson className="w-5 h-5" />} 
            label="Customers" 
            active={currentPath.startsWith('/customers') && !currentPath.includes('/customers/analytics')} 
          />
          <SidebarItem 
            to="/customers/analytics" 
            icon={<MdAnalytics className="w-5 h-5" />} 
            label="Customer Analytics" 
            active={currentPath === '/customers/analytics'} 
          />
          <SidebarItem 
            to="/reviews" 
            icon={<MdRateReview className="w-5 h-5" />} 
            label="Reviews" 
            active={currentPath === '/reviews'} 
          />
          <SidebarItem 
            to="/returns" 
            icon={<MdAssignmentReturn className="w-5 h-5" />} 
            label="Returns" 
            active={currentPath === '/returns'} 
          />
          <SidebarItem 
            to="/financial" 
            icon={<MdPayments className="w-5 h-5" />} 
            label="Financial Overview" 
            active={currentPath === '/financial'} 
          />
          
          <div className="pt-4 pb-1 px-4">
            <span className="text-[10px] text-[#584045]/60 font-bold uppercase tracking-widest">Content</span>
          </div>
          
          <SidebarItem 
            to="/blog" 
            icon={<MdArticle className="w-5 h-5" />} 
            label="Blog" 
            active={currentPath === '/blog'} 
          />
          <SidebarItem 
            to="/banner" 
            icon={<MdViewCarousel className="w-5 h-5" />} 
            label="Banners" 
            active={currentPath === '/banner'} 
          />
          <SidebarItem 
            to="/landing-pages" 
            icon={<MdWeb className="w-5 h-5" />} 
            label="Landing Pages" 
            active={currentPath === '/landing-pages'} 
          />

          <div className="pt-4 pb-1 px-4">
            <span className="text-[10px] text-[#584045]/60 font-bold uppercase tracking-widest">Management & Roles</span>
          </div>

          <SidebarItem 
            to="/analytics" 
            icon={<MdAnalytics className="w-5 h-5" />} 
            label="Analytics Overview" 
            active={currentPath === '/analytics'} 
          />
          <SidebarItem 
            to="/roles" 
            icon={<MdSecurity className="w-5 h-5" />} 
            label="Roles" 
            active={currentPath === '/roles'} 
          />
          <SidebarItem 
            to="/settings" 
            icon={<MdSettings className="w-5 h-5" />} 
            label="Settings" 
            active={currentPath === '/settings'} 
          />

          <div className="pt-4 pb-1 px-4">
            <span className="text-[10px] text-[#584045]/60 font-bold uppercase tracking-widest">Seller Portal</span>
          </div>

          <SidebarItem 
            to="/seller" 
            icon={<MdStore className="w-5 h-5" />} 
            label="Seller Dashboard" 
            active={currentPath === '/seller'} 
          />
          <SidebarItem 
            to="/seller/products" 
            icon={<MdInventory className="w-5 h-5" />} 
            label="Seller Inventory" 
            active={currentPath === '/seller/products'} 
          />
          <SidebarItem 
            to="/seller/orders" 
            icon={<MdShoppingCart className="w-5 h-5" />} 
            label="Seller Orders" 
            active={currentPath === '/seller/orders'} 
          />
          <SidebarItem 
            to="/seller/payments" 
            icon={<MdPayments className="w-5 h-5" />} 
            label="Seller Payments" 
            active={currentPath === '/seller/payments'} 
          />
        </nav>
      </div>

      {/* Footer Support Promo Card widget */}
      <div className="p-6 shrink-0">
        <div className="bg-[#ff5c8d] p-4 rounded-xl flex flex-col gap-2 shadow-sm text-white">
          <MdSupportAgent className="w-6 h-6 text-white" />
          <p className="font-semibold text-xs leading-normal">
            Need help with managing high volume orders?
          </p>
          <button className="bg-white text-[#b31f56] px-3.5 py-1.5 rounded-full font-bold text-xs w-fit shadow-sm hover:bg-[#faf8ff] transition-all cursor-pointer">
            View Guide
          </button>
        </div>
      </div>

    </aside>
  );
};
