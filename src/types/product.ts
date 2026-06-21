// Supabase table: judostore-v1

// Canonical brand display order
export const BRAND_ORDER = [
  "Mizuno",
  "KuSakura",
  "Fighting Films",
  "Essimo",
  "DAX Sports",
] as const;

export type BrandName = (typeof BRAND_ORDER)[number];

// Canonical grade display order
export const GRADE_ORDER = [
  "IJF",
  "Premium",
  "Competition",
  "Training",
  "Beginner",
  "Accessory",
] as const;

export type GradeName = (typeof GRADE_ORDER)[number];

// Products grouped by brand, sorted by BRAND_ORDER
export interface BrandGroup {
  brand: string;
  products: Product[];
}
export interface Product {
  brand: string;
  name: string;
  grade: string | null;
  price: number | null;
  currency: string | null;
  price_display: string | null;
  image_url: string | null;
  description: string | null;
  stock: number | null;
  size: string | null;
  color: string | null;
  source_note: string | null;
  image_file_name: string | null;
  storage_path: string | null;
  upload_memo: string | null;
}

// Filter/query types
export interface ProductFilters {
  brand?: string;
  grade?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
}
