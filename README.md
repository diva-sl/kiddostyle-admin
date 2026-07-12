# KiddoStyle CMS - Admin & Seller Portal

A premium children's boutique management dashboard, CMS, and multi-tenant Seller Portal. Designed with a sleek aesthetic, dynamic visualizations, and fine-grained administrative controls.

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
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Brand logos & background illustrations
│   ├── components/         # Reusable UI widgets
│   ├── hooks/              # Custom query fetching states
│   ├── pages/              # Functional view controllers
│   ├── services/           # Axios client configurations
│   ├── App.tsx             # Main router configurations
│   ├── index.css           # Tailwind custom styles
│   └── main.tsx            # View bootstrap configuration
└── package.json            # Scripts & dependencies
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
