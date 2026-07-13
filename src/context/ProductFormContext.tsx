import React, { createContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useCreateProduct, useUpdateProduct } from "../hooks/useProducts";

export interface ProductVariant {
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface ProductFormState {
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  variants: ProductVariant[];
  status: "draft" | "active" | "scheduled" | "archived";
  publishedAt: string; // ISO datetime string for picker
}

interface ProductFormContextType {
  formState: ProductFormState;
  setFormState: React.Dispatch<React.SetStateAction<ProductFormState>>;
  isEditMode: boolean;
  isLoading: boolean;
  submitForm: () => void;
}

export const ProductFormContext = createContext<
  ProductFormContextType | undefined
>(undefined);

// Complete mock product database matching the catalog table
const mockCatalogProducts = [
  {
    id: "KS-ORG-2309",
    name: "Organic Cotton Romper",
    description:
      "Sage Green, 12-18 Months. Ultra-soft breathable GOTS-certified organic cotton romper.",
    category: "Newborn",
    price: 34.0,
    stock: 142,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxpbt01cFJnRHiQjVabTou3I4JYtIvzhFA0WjgucebTz3AgDITPGbPPkESjeqE1lgydYnCP36nEEExJBuINQwoTnOLitkUVtTSB80dADjluaE9gMN_3ytAHcolJbNA0og_nOL4Bov9LygTVrqwEqPO0ip6QqQqV2_z9pg92m1ihVaBV3T_USX2_oh-KBhxPaUGW8kukJmiPIDon9McHD4guVWJ6PApEPkbx6XHpbouarN_j2FMJrf7_E1qU7rIWhXcTgR-PiywzPvs",
    ],
    variants: [
      { name: "Pink / 0-3M", sku: "KDS-001-P-03", price: 24.0, stock: 12 },
      { name: "Blue / 0-3M", sku: "KDS-001-B-03", price: 24.0, stock: 4 },
    ],
    status: "active" as const,
    publishedAt: "",
  },
  {
    id: "KS-DEN-4412",
    name: "Denim Sunflower Overalls",
    description:
      "Vintage Wash, 2T. Premium sunflower overall dungarees built with raw denim patches.",
    category: "Toddler Girl",
    price: 48.5,
    stock: 8,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqI2ccda9usxE0wyfj3M6v6RFSxeiMJ3zHazztmeZrwAhECADf1SvooBk98_XI8O6SZxEqcq9pw7Rjmsx9KxoDFAtOqIuAEkKhyjO21EqOo9gjwoz7IYSBCXlJ8kyH3gFLtHoR-wUzxk9jSrSY6P1D2BhRc51Z5YZumXvBQOG0LDvEr532dMoEqj8zEp-q14oe9eKRQWRbx9xU1_ogigPJ7fH-N8IsVE30xU9OfckQhtn-Lv2xT1ZA-SEOgpd30b1aO7ZfnZrnhX1Z",
    ],
    variants: [],
    status: "draft" as const,
    publishedAt: "",
  },
  {
    id: "KS-SHOE-0091",
    name: "Cognac Chelsea Boots",
    description:
      "Genuine leather boots featuring elastic side panels, back pull loops, and traction outsoles.",
    category: "Shoes",
    price: 62.0,
    stock: 0,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTl8wuyY0o-tFT8Goy9jGgYG95c1ja8qZK1tHHB5Uuw16v9YFGV11KQHCOKIzOclyJEMZpF3ZHDWa2SMN6SIr2tpoGzNcCL-bWG87EcVmE9NRtwVdWCmXMK80xi0j-NJSJSbToqd_bWFfhHrVuH_GaMZmtLf1yFZJvU74RSQE2c3FWTrRGr5MCcxFZmc_wPBbuuL11BId0uaB4x3Ve5lsublg6oI95M_-MKdsLO1bWWDgBfJsE2O5-TVzMrVb_TwOE5HVNC-rlzfgk",
    ],
    variants: [],
    status: "archived" as const,
    publishedAt: "",
  },
  {
    id: "KS-TEE-1182",
    name: "Striped Pocket Tee",
    description:
      "Classic pocket tee made of 100% slub cotton featuring navy and white horizontal stripes.",
    category: "Toddler Boy",
    price: 22.0,
    stock: 256,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmSBRPCHIL6yjotTqoJZWW0Ou-Fra0Jugjzepd8V786XgPuDdxmtZ9GOO5Pu7hWbuya6UXZYx70PTOmK2oHy-0bwZ4JWo35jyLZGvPsZgcAIGWYvnV0o-6if3mvT8IfY6vZK0Yd2zh53XaAw7-vwdzS44xjtDUEAC5PqfYgDSLaQzSbqxv6DV-jQNY5PPqSglo-ML3yXAlWLTaruRCbYWkMg55rU746mnPZI5sxsPF0iPxY7NcmFOAmaM350vBztq_PzDcBTckYa0O",
    ],
    variants: [],
    status: "scheduled" as const,
    publishedAt: "",
  },
];

export const ProductFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState<ProductFormState>({
    name: "",
    description: "",
    category: "",
    sku: "",
    price: 0,
    originalPrice: 0,
    stock: 0,
    images: [],
    variants: [],
    status: "draft",
    publishedAt: "",
  });

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  // Prefill details in edit mode (fetches from backend or falls back to preset mockup database)
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      productService
        .getProductById(id)
        .then((data) => {
          setFormState({
            name: data.name,
            description: data.description,
            category: data.category,
            sku: id.substring(0, 8).toUpperCase(),
            price: data.price,
            originalPrice: data.discount
              ? data.price - (data.price * data.discount) / 100
              : data.price,
            stock: data.stock,
            images: data.images || [],
            variants: (data as any).variants || [],
            status: (data as any).status || "draft",
            publishedAt: (data as any).publishedAt
              ? new Date((data as any).publishedAt).toISOString().slice(0, 16)
              : "",
          });
          setIsLoading(false);
        })
        .catch(() => {
          // Fallback static pre-population data
          const matched = mockCatalogProducts.find((p) => p.id === id);
          if (matched) {
            setFormState({
              name: matched.name,
              description: matched.description,
              category: matched.category,
              sku: matched.id,
              price: matched.price,
              originalPrice: matched.price,
              stock: matched.stock,
              images: matched.images,
              variants: matched.variants,
              status: matched.status,
              publishedAt: matched.publishedAt,
            });
          }
          setIsLoading(false);
        });
    } else {
      // Create mode - explicitly clear all fields
      setFormState({
        name: "",
        description: "",
        category: "",
        sku: "",
        price: 0,
        originalPrice: 0,
        stock: 0,
        images: [],
        variants: [],
        status: "draft",
        publishedAt: "",
      });
    }
  }, [isEditMode, id]);

  const submitForm = () => {
    const payload = {
      name: formState.name,
      description: formState.description,
      category: formState.category || "Newborn",
      price: Number(formState.price) || 0,
      stock: Number(formState.stock) || 0,
      images:
        formState.images.length > 0
          ? formState.images
          : [
              "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&q=80",
            ],
      variants: formState.variants,
      status: formState.status,
      publishedAt:
        formState.status === "scheduled" && formState.publishedAt
          ? new Date(formState.publishedAt).toISOString()
          : null,
    };

    if (isEditMode && id) {
      updateMutation.mutate(
        { id, data: payload },
        {
          onSuccess: () => {
            alert("Product updated successfully!");
            navigate("/products");
          },
          onError: (err: any) => {
            alert("Error updating product: " + err.message);
          },
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("Product published successfully!");
          navigate("/products");
        },
        onError: (err: any) => {
          alert("Error publishing product: " + err.message);
        },
      });
    }
  };

  return (
    <ProductFormContext.Provider
      value={{ formState, setFormState, isEditMode, isLoading, submitForm }}
    >
      {children}
    </ProductFormContext.Provider>
  );
};
