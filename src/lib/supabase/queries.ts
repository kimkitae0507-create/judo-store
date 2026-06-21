import { createAdminClient } from "@/lib/supabase/server";
import type { Product, ProductFilters, BrandGroup } from "@/types/product";
import { BRAND_ORDER, GRADE_ORDER } from "@/types/product";

const TABLE = "judostore-v1" as const;

/** Sort brands by canonical BRAND_ORDER; unknowns go at the end alphabetically. */
function sortByBrandOrder(brands: string[]): string[] {
  return brands.sort((a, b) => {
    const ia = BRAND_ORDER.indexOf(a as (typeof BRAND_ORDER)[number]);
    const ib = BRAND_ORDER.indexOf(b as (typeof BRAND_ORDER)[number]);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

/** Sort products by canonical GRADE_ORDER; unknowns go at the end, then by name. */
function sortByGradeOrder(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const ia = GRADE_ORDER.indexOf((a.grade ?? "") as (typeof GRADE_ORDER)[number]);
    const ib = GRADE_ORDER.indexOf((b.grade ?? "") as (typeof GRADE_ORDER)[number]);
    if (ia !== ib) {
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Fetch all products, optionally with filters.
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const supabase = createAdminClient();

  let query = supabase.from(TABLE).select("*");

  if (filters?.brand) {
    query = query.eq("brand", filters.brand);
  }
  if (filters?.grade) {
    query = query.eq("grade", filters.grade);
  }
  if (filters?.size) {
    query = query.eq("size", filters.size);
  }
  if (filters?.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters?.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data as Product[]) ?? [];
}

/**
 * Fetch a single product by brand + name (natural key).
 */
export async function getProduct(brand: string, name: string): Promise<Product | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("brand", brand)
    .eq("name", name)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(error.message);
  }

  return data as Product;
}

/**
 * Fetch unique brand names sorted by BRAND_ORDER.
 */
export async function getBrands(): Promise<string[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("brand");

  if (error) throw new Error(error.message);

  const unique = [...new Set((data ?? []).map((row: { brand: string }) => row.brand))];
  return sortByBrandOrder(unique);
}

/**
 * Fetch all products belonging to a specific brand, sorted by GRADE_ORDER then name.
 */
export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("brand", brand);

  if (error) throw new Error(error.message);
  return sortByGradeOrder((data as Product[]) ?? []);
}

/**
 * Fetch all products grouped by brand.
 * Brands are sorted by BRAND_ORDER; products within each brand sorted by GRADE_ORDER then name.
 */
export async function getProductsGroupedByBrand(filters?: ProductFilters): Promise<BrandGroup[]> {
  const products = await getProducts(filters);

  // Group by brand
  const map = new Map<string, Product[]>();
  for (const product of products) {
    const existing = map.get(product.brand) ?? [];
    existing.push(product);
    map.set(product.brand, existing);
  }

  // Sort brands by BRAND_ORDER
  const sortedBrands = sortByBrandOrder([...map.keys()]);

  return sortedBrands.map((brand) => ({
    brand,
    products: sortByGradeOrder(map.get(brand) ?? []),
  }));
}
