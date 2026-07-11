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

- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Material Design Pack)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)

---

## 📂 Project Directory Structure

```
src/
├── components/          # Reusable UI widgets (Sidebar, Navbar, Stats grids)
├── pages/               # Functional view controllers (Products, Orders, Roles, SellerPortal)
├── App.tsx              # Application routing declaration
├── index.css            # Custom Tailwind and premium scrollbar styles
└── main.tsx             # Entrypoint bootstrap script
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository, navigate into the directory, and install project dependencies:
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
Compile optimized assets for hosting:
```bash
npm run build
```
The output will be available in the `dist/` directory.

---

## 🎨 Theme Variables & Styling
The system uses curated custom colors for a luxury look:
- **Primary**: `#b31f56` (Vibrant Magenta)
- **Secondary**: `#785a00` (Classic Gold)
- **Background**: `#faf8ff` (Light Violet/White surface)
- **Outline**: `#dfbec4` (Soft Pink Variant border)
