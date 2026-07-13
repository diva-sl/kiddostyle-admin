import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./pages/Login";
import { ProfilePage } from "./pages/Profile";
import { DashboardPage } from "./pages/Dashboard";
import { ProductsPage } from "./pages/Products";
import { AddProductPage } from "./pages/AddProduct";
import { ProductDetailsPage } from "./pages/ProductDetails";
import { OrdersPage } from "./pages/Orders";
import { InventoryPage } from "./pages/Inventory";
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
import { AddCategoryPage } from "./pages/AddCategory";
import { AddBrandPage } from "./pages/AddBrand";
import { AddCouponPage } from "./pages/AddCoupon";
import { AddOrderPage } from "./pages/AddOrder";
import { OrderDetailsPage } from "./pages/OrderDetails";
import { AddCustomerPage } from "./pages/AddCustomer";
import { ReturnDetailsPage } from "./pages/ReturnDetails";
import { BlogDetailsPage } from "./pages/BlogDetails";
import { AddBlogPostPage } from "./pages/AddBlogPost";
import { AddBannerPage } from "./pages/AddBanner";
import { AddLandingPage } from "./pages/AddLandingPage";

export default function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#faf8ff]">
        <Sidebar />

        <main className="ml-64 min-h-screen flex flex-col">
          {/* Header/Navbar routing block */}
          <Routes>
            <Route path="/" element={<Navbar title="CMS Dashboard" />} />
            <Route path="/profile" element={<Navbar title="My Profile" />} />
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
            />
            <Route
              path="/products/edit/:id"
              element={<Navbar title="Edit Product Details" />}
            />
            <Route
              path="/categories"
              element={<Navbar title="Categories Management" />}
            />
            <Route
              path="/categories/new"
              element={<Navbar title="Add New Category" />}
            />
            <Route
              path="/categories/edit/:id"
              element={<Navbar title="Edit Category Details" />}
            />
            <Route
              path="/brands"
              element={<Navbar title="Brands Management" />}
            />
            <Route
              path="/brands/new"
              element={<Navbar title="Add New Brand" />}
            />
            <Route
              path="/brands/edit/:id"
              element={<Navbar title="Edit Brand Details" />}
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
              path="/orders/new"
              element={<Navbar title="Create New Order" />}
            />
            <Route
              path="/orders/:id"
              element={<Navbar title="Order Invoice Details" />}
            />
            <Route
              path="/customers"
              element={<Navbar title="Customers Registry" />}
            />
            <Route
              path="/customers/new"
              element={<Navbar title="Add New Customer" />}
            />
            <Route
              path="/customers/edit/:id"
              element={<Navbar title="Edit Customer Profile" />}
            />
            <Route
              path="/coupons"
              element={<Navbar title="Discounts & Coupons" />}
            />
            <Route
              path="/coupons/new"
              element={<Navbar title="Add New Coupon" />}
            />
            <Route
              path="/coupons/edit/:id"
              element={<Navbar title="Edit Coupon Details" />}
            />
            <Route
              path="/reviews"
              element={<Navbar title="Customer Reviews" />}
            />
            <Route path="/returns" element={<Navbar title="Returns Log" />} />
            <Route
              path="/returns/:id"
              element={<Navbar title="Return Request Details" />}
            />
            <Route path="/blog" element={<Navbar title="Blog Content" />} />
            <Route
              path="/blog/new"
              element={<Navbar title="Create Blog Post" />}
            />
            <Route
              path="/blog/edit/:id"
              element={<Navbar title="Edit Blog Post" />}
            />
            <Route
              path="/blog/:id"
              element={<Navbar title="Blog Post Details" />}
            />
            <Route
              path="/banner/new"
              element={<Navbar title="Add New Banner" />}
            />
            <Route
              path="/banner/edit/:id"
              element={<Navbar title="Edit Banner Details" />}
            />

            <Route
              path="/landing-pages/new"
              element={<Navbar title="Create Landing Page" />}
            />
            <Route
              path="/landing-pages/edit/:id"
              element={<Navbar title="Edit Landing Page Details" />}
            />
            <Route
              path="/analytics"
              element={<Navbar title="Analytics Overview" />}
            />
            <Route path="*" element={<Navbar title="CMS Dashboard" />} />
          </Routes>

          {/* Main content body routing block */}
          <div className="p-8 space-y-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/new" element={<AddProductPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/products/edit/:id" element={<AddProductPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/new" element={<AddOrderPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              {/* Category Page Forms mapping */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/new" element={<AddCategoryPage />} />
              <Route
                path="/categories/edit/:id"
                element={<AddCategoryPage />}
              />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/brands/new" element={<AddBrandPage />} />
              <Route path="/brands/edit/:id" element={<AddBrandPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/seller/orders" element={<SellerOrdersPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/customers/new" element={<AddCustomerPage />} />
              <Route path="/customers/edit/:id" element={<AddCustomerPage />} />
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
              <Route path="/coupons/new" element={<AddCouponPage />} />
              <Route path="/coupons/edit/:id" element={<AddCouponPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/returns/:id" element={<ReturnDetailsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/new" element={<AddBlogPostPage />} />
              <Route path="/blog/edit/:id" element={<AddBlogPostPage />} />
              <Route path="/blog/:id" element={<BlogDetailsPage />} />
              <Route path="/banner" element={<BannerPage />} />
              <Route path="/banner/new" element={<AddBannerPage />} />
              <Route path="/banner/edit/:id" element={<AddBannerPage />} />
              <Route path="/landing-pages" element={<LandingPagesPage />} />
              <Route path="/landing-pages/new" element={<AddLandingPage />} />
              <Route
                path="/landing-pages/edit/:id"
                element={<AddLandingPage />}
              />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
