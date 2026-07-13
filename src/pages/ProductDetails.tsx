import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdCheck,
  MdOutlineVisibility,
  MdEdit,
  MdArchive,
  MdChevronRight,
  MdArrowBack,
} from "react-icons/md";
import { ProductDetailsGallery } from "../components/ProductDetailsGallery";
import { ProductDetailsStats } from "../components/ProductDetailsStats";
import { ProductSpecifications } from "../components/ProductSpecifications";
import { ProductStockBreakdown } from "../components/ProductStockBreakdown";
import { ProductRecentAdminActivity } from "../components/ProductRecentAdminActivity";
import { useProductDetails } from "../hooks/useProducts";

// Static mock catalog fallback database
const mockCatalog: Record<string, any> = {
  "KS-ORG-2309": {
    name: "Organic Cotton Romper",
    price: 34.0,
    description:
      "Our signature Organic Cotton Romper is crafted from GOTS-certified 100% organic cotton. Features a breathable waffle knit texture, snap closures, and tagless labels.",
    category: "Newborn",
    stock: 142,
    status: "active",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpbt01cFJnRHiQjVabTou3I4JYtIvzhFA0WjgucebTz3AgDITPGbPPkESjeqE1lgydYnCP36nEEExJBuINQwoTnOLitkUVtTSB80dADjluaE9gMN_3ytAHcolJbNA0og_nOL4Bov9LygTVrqwEqPO0ip6QqQqV2_z9pg92m1ihVaBV3T_USX2_oh-KBhxPaUGW8kukJmiPIDon9McHD4guVWJ6PApEPkbx6XHpbouarN_j2FMJrf7_E1qU7rIWhXcTgR-PiywzPvs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTl8wuyY0o-tFT8Goy9jGgYG95c1ja8qZK1tHHB5Uuw16v9YFGV11KQHCOKIzOclyJEMZpF3ZHDWa2SMN6SIr2tpoGzNcCL-bWG87EcVmE9NRtwVdWCmXMK80xi0j-NJSJSbToqd_bWFfhHrVuH_GaMZmtLf1yFZJvU74RSQE2c3FWTrRGr5MCcxFZmc_wPBbuuL11BId0uaB4x3Ve5lsublg6oI95M_-MKdsLO1bWWDgBfJsE2O5-TVzMrVb_TwOE5HVNC-rlzfgk",
    ],
  },
  "KS-DEN-4412": {
    name: "Denim Sunflower Overalls",
    price: 48.5,
    description:
      "Premium sunflower overall dungarees built with vintage raw denim patches and convenient button straps.",
    category: "Toddler Girl",
    stock: 8,
    status: "draft",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqI2ccda9usxE0wyfj3M6v6RFSxeiMJ3zHazztmeZrwAhECADf1SvooBk98_XI8O6SZxEqcq9pw7Rjmsx9KxoDFAtOqIuAEkKhyjO21EqOo9gjwoz7IYSBCXlJ8kyH3gFLtHoR-wUzxk9jSrSY6P1D2BhRc51Z5YZumXvBQOG0LDvEr532dMoEqj8zEp-q14oe9eKRQWRbx9xU1_ogigPJ7fH-N8IsVE30xU9OfckQhtn-Lv2xT1ZA-SEOgpd30b1aO7ZfnZrnhX1Z",
    ],
  },
  "KS-SHOE-0091": {
    name: "Cognac Chelsea Boots",
    price: 62.0,
    description:
      "Genuine leather boots featuring elastic side panels, back pull loops, and soft traction rubber outsoles.",
    category: "Shoes",
    stock: 0,
    status: "archived",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTl8wuyY0o-tFT8Goy9jGgYG95c1ja8qZK1tHHB5Uuw16v9YFGV11KQHCOKIzOclyJEMZpF3ZHDWa2SMN6SIr2tpoGzNcCL-bWG87EcVmE9NRtwVdWCmXMK80xi0j-NJSJSbToqd_bWFfhHrVuH_GaMZmtLf1yFZJvU74RSQE2c3FWTrRGr5MCcxFZmc_wPBbuuL11BId0uaB4x3Ve5lsublg6oI95M_-MKdsLO1bWWDgBfJsE2O5-TVzMrVb_TwOE5HVNC-rlzfgk",
    ],
  },
  "KS-TEE-1182": {
    name: "Striped Pocket Tee",
    price: 22.0,
    description:
      "Classic crewneck pocket tee made of 100% slub cotton featuring navy and white horizontal stripes.",
    category: "Toddler Boy",
    stock: 256,
    status: "scheduled",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmSBRPCHIL6yjotTqoJZWW0Ou-Fra0Jugjzepd8V786XgPuDdxmtZ9GOO5Pu7hWbuya6UXZYx70PTOmK2oHy-0bwZ4JWo35jyLZGvPsZgcAIGWYvnV0o-6if3mvT8IfY6vZK0Yd2zh53XaAw7-vwdzS44xjtDUEAC5PqfYgDSLaQzSbqxv6DV-jQNY5PPqSglo-ML3yXAlWLTaruRCbYWkMg55rU746mnPZI5sxsPF0iPxY7NcmFOAmaM350vBztq_PzDcBTckYa0O",
    ],
  },
};

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch live product details from backend database
  const { data: product, isLoading } = useProductDetails(id || "");

  // Detect which fallback info to display based on the ID parameter
  const fallback = mockCatalog[id || ""] || mockCatalog["KS-ORG-2309"];

  const productName = product ? product.name : fallback.name;
  const productPrice = product ? product.price : fallback.price;
  const productDescription = product
    ? product.description
    : fallback.description;
  const productCategory = product ? product.category : fallback.category;
  const productStock =
    product !== undefined && product !== null ? product.stock : fallback.stock;
  const productStatus = product
    ? (product as any).status || "active"
    : fallback.status;

  const productImages =
    product?.images && product.images.length > 0
      ? product.images
      : fallback.images;

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#584045]/70">
        Loading product details from database...
      </div>
    );
  }

  // Map status display labels & styles
  const statusColors: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
    scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    archived: "bg-gray-50 text-gray-500 border-gray-200",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top action bar greetings */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4 select-none">
        <div>
          {/* Clickable Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#584045]/60 font-semibold select-none mb-3">
            <span
              onClick={() => navigate("/products")}
              className="hover:text-[#b31f56] cursor-pointer transition-colors"
            >
              Products
            </span>
            <MdChevronRight className="w-4 h-4" />
            <span className="text-[#b31f56] font-bold">Product Details</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/products")}
              className="w-8 h-8 rounded-full border border-[#dfbec4] flex items-center justify-center text-[#584045]/70 hover:bg-[#f2f3ff] transition-all cursor-pointer"
              title="Back to products list"
            >
              <MdArrowBack className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-1 border px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${statusColors[productStatus] || "bg-yellow-50 text-yellow-700 border-yellow-200"}`}
              >
                <MdCheck className="w-3.5 h-3.5" />
                {productStatus}
              </span>
              <span className="text-[10px] font-bold text-[#584045]/60">
                SKU: {id ? id.substring(0, 8).toUpperCase() : "OC-ROMP-001"}
              </span>
            </div>
          </div>

          <h2 className="font-display text-2xl font-extrabold text-[#131b2e] mt-2">
            {productName}
          </h2>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#dfbec4] rounded-full font-bold text-xs text-[#584045] hover:bg-[#f2f3ff] transition-all active:scale-[0.98] cursor-pointer">
            <MdOutlineVisibility className="w-4 h-4 text-[#584045]/70" />
            View Storefront
          </button>

          <button
            onClick={() => navigate(`/products/edit/${id || "KS-ORG-2309"}`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#b31f56] text-white rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer"
          >
            <MdEdit className="w-4 h-4" />
            Edit Product
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-full transition-all cursor-pointer">
            <MdArchive className="w-4 h-4" />
            Archive
          </button>
        </div>
      </header>

      {/* Main product layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image previews, total sales overview */}
        <div className="lg:col-span-4 space-y-6">
          <ProductDetailsGallery images={productImages} />
          <ProductDetailsStats price={productPrice} />
        </div>

        {/* Right Column: Spec grid, breakdowns tables, history logs */}
        <div className="lg:col-span-8 space-y-6">
          <ProductSpecifications
            description={productDescription}
            price={productPrice}
            category={productCategory}
          />
          <ProductStockBreakdown stock={productStock} />
          <ProductRecentAdminActivity />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
