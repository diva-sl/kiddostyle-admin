import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { DashboardPage } from "./pages/Dashboard";
import { ProductsPage } from "./pages/Products";
import { AddProductPage } from "./pages/AddProduct";
import { ProductDetailsPage } from "./pages/ProductDetails"; // Import Details Page
import { OrdersPage } from "./pages/Orders";
import { InventoryPage } from "./pages/Inventory"; // Import the Inventory Page
import { CouponsPage } from "./pages/Coupons";
import { BrandsPage } from "./pages/Brands";
import { ReviewsPage } from "./pages/Reviews";
import { ReturnsPage } from "./pages/Returns";
import { BlogPage } from "./pages/Blog";
import { CategoriesPage } from "./pages/Categories";
import { BannerPage } from "./pages/Banner";
import { LandingPagesPage } from "./pages/LandingPages";
import { CustomersPage } from "./pages/Customers";
import CustomerAnalyticsPage from "./pages/CustomerAnalytics";
import CustomerProfilePage from "./pages/CustomerProfile";
import { RolesPage } from "./pages/Roles";
import AnalyticsPage from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import FinancialOverviewPage from "./pages/FinancialOverview";
import SellerDashboardPage from "./pages/SellerDashboard";
import SellerInventoryPage from "./pages/SellerInventory";
import SellerOrdersPage from "./pages/SellerOrders";
import SellerPaymentsPage from "./pages/SellerPayments";



export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#faf8ff]">
        {/* Fixed Aside Navigation */}
        <Sidebar />

        {/* Main Content Area pushed to the right of Sidebar */}
        <main className="ml-64 min-h-screen flex flex-col">
          {/* Header titles mapping */}
          <Routes>
            <Route path="/" element={<Navbar title="CMS Dashboard" />} />
            <Route
              path="/products"
              element={<Navbar title="Products Catalog" />}
            />
            <Route
              path="/products/new"
              element={<Navbar title="Add New Product" />}
            />
            <Route
              path="/products/:id"
              element={<Navbar title="Product Details" />}
            />{" "}
            {/* Details Header title */}
            <Route
              path="/products/edit/:id"
              element={<Navbar title="Edit Product Details" />}
            />
            <Route
              path="/categories"
              element={<Navbar title="Categories Management" />}
            />
            <Route
              path="/brands"
              element={<Navbar title="Brands Management" />}
            />
            <Route
              path="/inventory"
              element={<Navbar title="Inventory Control" />}
            />
            <Route
              path="/orders"
              element={<Navbar title="Order Management" />}
            />
            <Route
              path="/customers"
              element={<Navbar title="Customers Registry" />}
            />
            <Route
              path="/coupons"
              element={<Navbar title="Discounts & Coupons" />}
            />
            <Route
              path="/reviews"
              element={<Navbar title="Customer Reviews" />}
            />
            <Route path="/returns" element={<Navbar title="Returns Log" />} />
            <Route path="/blog" element={<Navbar title="Blog Content" />} />
            <Route
              path="/analytics"
              element={<Navbar title="Analytics Overview" />}
            />
            <Route path="*" element={<Navbar title="CMS Dashboard" />} />
          </Routes>

          {/* Inner Canvas Area */}
          <div className="p-8 space-y-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/new" element={<AddProductPage />} />
              <Route
                path="/products/:id"
                element={<ProductDetailsPage />}
              />{" "}
              {/* View Details Page */}
              <Route path="/products/edit/:id" element={<AddProductPage />} />
              {/* Dynamic Pages */}
              <Route path="/orders" element={<OrdersPage />} />
              {/* Static Coming Soon placeholders */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/seller/orders" element={<SellerOrdersPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route
                path="/customers/analytics"
                element={<CustomerAnalyticsPage />}
              />
              <Route path="/customers/:id" element={<CustomerProfilePage />} />
              <Route path="/financial" element={<FinancialOverviewPage />} />
              <Route path="/seller" element={<SellerDashboardPage />} />
              <Route
                path="/seller/products"
                element={<SellerInventoryPage />}
              />
              <Route path="/seller/payments" element={<SellerPaymentsPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/coupons" element={<CouponsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/banner" element={<BannerPage />} />
              <Route path="/landing-pages" element={<LandingPagesPage />} />
              {/* Catch-all redirect to dashboard home */}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
