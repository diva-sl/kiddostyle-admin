# KiddoStyle CMS - Admin & Seller Portal

A premium children's boutique management dashboard, CMS, and multi-tenant Seller Portal. Designed with a sleek aesthetic, dynamic visualizations, and fine-grained administrative controls.

---

## 🔗 Associated Storefront
🌐 **URL**: [https://kiddostyle.gcvdanta.com](https://kiddostyle.gcvdanta.com)

---

## ✨ Features

- **📊 CMS Dashboard**: Core KPI highlights, revenue mix trends, and recent transaction log tables.
- **📦 Catalog Management**: Comprehensive product registry, SKU creation, category management, and inventory control.
- **🛒 Order Operations**: Status-filtered order tracking logs with shipping labels, custom billing models, and return requests.
- **🔐 User Roles Matrix**: Fine-grained role hierarchy matrix (Admin, Manager, Editor, Seller) with read/write switch locks.
- **🏪 Multi-tenant Seller Portal**: Dedicated dashboard for boutiques featuring low-stock alerts, weekly revenue columns, and payouts/goal metrics.
- **⚙️ Global Settings**: Customize site theme variables, store metadata, currency parameters, logo branding, and social connections.

---

## 🛠️ Tech Stack

- **Build Tool**: Vite 8.1.1 & @vitejs/plugin-react 6.0.3
- **Core Library**: React 19.2.7 & React-DOM 19.2.7
- **Routing**: React Router DOM 7.18.1
- **State & Fetching**: React Query v5.101.2 & Axios 1.18.1
- **Styling**: Tailwind CSS v4.3.2 & Tailwind PostCSS v4.3.2 & Autoprefixer 10.5.2
- **Linter**: Oxlint 1.71.0
- **Icons**: React Icons 5.7.0 & Lucide React 1.23.0

---

## 📂 Project Directory Structure

```
kiddostyle-admin/
├── dist/                   # Production build assets directory
│   ├── assets/             # Bundled static chunks (JS/CSS)
│   ├── favicon.svg         # Tab shortcut icon
│   ├── icons.svg           # Icon sprites
│   └── index.html          # Entrypoint HTML template
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Brand logos & background illustrations
│   ├── components/         # Premium modular UI widgets
│   │   ├── ActivePromotions.tsx
│   │   ├── AnalyticsCharts.tsx
│   │   ├── AnalyticsKpiGrid.tsx
│   │   ├── AnalyticsMetrics.tsx
│   │   ├── AnalyticsOverviewKpis.tsx
│   │   ├── BannerKpiGrid.tsx
│   │   ├── BlogKpiGrid.tsx
│   │   ├── BrandingSettings.tsx
│   │   ├── BrandsDistribution.tsx
│   │   ├── BrandsKpiGrid.tsx
│   │   ├── BrandsPortfolio.tsx
│   │   ├── CampaignPerformance.tsx
│   │   ├── CatalogStructureTable.tsx
│   │   ├── CategoryInsights.tsx
│   │   ├── CategoryKpiGrid.tsx
│   │   ├── ContentCalendar.tsx
│   │   ├── CouponsKpiGrid.tsx
│   │   ├── CouponsTable.tsx
│   │   ├── CustomerAutomationWidget.tsx
│   │   ├── CustomerNotesActivity.tsx
│   │   ├── CustomerOrderHistory.tsx
│   │   ├── CustomerProfileCard.tsx
│   │   ├── CustomersFilterTable.tsx
│   │   ├── CustomersKpiGrid.tsx
│   │   ├── DailySalesMix.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── ExistingPagesList.tsx
│   │   ├── FinancialMetrics.tsx
│   │   ├── FinancialTransactions.tsx
│   │   ├── GrowthSegmentation.tsx
│   │   ├── InventoryFilters.tsx
│   │   ├── InventoryKpiGrid.tsx
│   │   ├── InventoryStatus.tsx
│   │   ├── InventoryTable.tsx
│   │   ├── LandingPerformanceStats.tsx
│   │   ├── Navbar.tsx
│   │   ├── OrderDirectoryTable.tsx
│   │   ├── OrdersFilter.tsx
│   │   ├── OrdersHeader.tsx
│   │   ├── OrdersTable.tsx
│   │   ├── PayoutGoalSupport.tsx
│   │   ├── PermissionMatrix.tsx
│   │   ├── ProductBasicInfo.tsx
│   │   ├── ProductCatalogTable.tsx
│   │   ├── ProductDetailsGallery.tsx
│   │   ├── ProductDetailsStats.tsx
│   │   ├── ProductFormFooter.tsx
│   │   ├── ProductMediaGallery.tsx
│   │   ├── ProductPricingInventory.tsx
│   │   ├── ProductPublicationStatus.tsx
│   │   ├── ProductRecentAdminActivity.tsx
│   │   ├── ProductsBentoSummary.tsx
│   │   ├── ProductsFilter.tsx
│   │   ├── ProductsHeader.tsx
│   │   ├── ProductShippingDetails.tsx
│   │   ├── ProductSpecifications.tsx
│   │   ├── ProductsTable.tsx
│   │   ├── ProductStockBreakdown.tsx
│   │   ├── ProductVariants.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── RecentBlogPosts.tsx
│   │   ├── RecentPaymentsTable.tsx
│   │   ├── RegionalContactSettings.tsx
│   │   ├── ReturnsInsights.tsx
│   │   ├── ReturnsKpiGrid.tsx
│   │   ├── ReturnsTable.tsx
│   │   ├── ReviewsFeed.tsx
│   │   ├── ReviewsStats.tsx
│   │   ├── RoleConfigPanel.tsx
│   │   ├── SalesTrendChart.tsx
│   │   ├── sellerInventoryKpiGrid.tsx
│   │   ├── SellerOrders.tsx
│   │   ├── SellerOrdersKpiGrid.tsx
│   │   ├── SellerPaymentsHeader.tsx
│   │   ├── SellerRevenueStock.tsx
 East  ├── SellerStatsGrid.tsx
│   │   ├── SeoHealthAudit.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StoreFeaturesConfig.tsx
│   │   ├── TeamDirectoryTable.tsx
│   │   ├── TopProducts.tsx
│   │   ├── TopSellersLogs.tsx
│   │   ├── TopSpendersActivity.tsx
│   │   └── UpcomingExpiredTabs.tsx
│   ├── hooks/              # Custom query fetching states
│   ├── pages/              # Functional view controllers
│   │   ├── AddProduct.tsx
│   │   ├── Analytics.tsx
│   │   ├── Banner.tsx
│   │   ├── Blog.tsx
│   │   ├── Brands.tsx
│   │   ├── Categories.tsx
│   │   ├── Coupons.tsx
│   │   ├── CustomerAnalytics.tsx
│   │   ├── CustomerProfile.tsx
│   │   ├── Customers.tsx
│   │   ├── Dashboard.tsx
│   │   ├── FinancialOverview.tsx
│   │   ├── Inventory.tsx
│   │   ├── LandingPages.tsx
│   │   ├── Orders.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── Products.tsx
│   │   ├── Returns.tsx
│   │   ├── Reviews.tsx
│   │   ├── Roles.tsx
│   │   ├── SellerDashboard.tsx
│   │   ├── SellerInventory.tsx
│   │   ├── SellerOrders.tsx
│   │   ├── SellerPayments.tsx
│   │   └── Settings.tsx
│   ├── services/           # Axios client configurations
│   ├── App.css             # Main stylesheet
│   ├── App.tsx             # Main router configurations
│   ├── index.css           # Tailwind custom styles
│   └── main.tsx            # View bootstrap configuration
├── index.html              # Entry HTML template
├── package.json            # Scripts & dependencies
├── postcss.config.js       # PostCSS config
├── tailwind.config.js      # Tailwind config variables
└── vite.config.ts          # Vite compilation settings
```

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Launch Dev Server
Launch Vite development environment:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the portal.

### 3. Production Build
Compile optimized production assets:
```bash
npm run build
```

### 4. Local Preview
Preview the production build locally:
```bash
npm run preview
```

---

## 👨‍💻 Developer
Developed by **Divakaran S**
