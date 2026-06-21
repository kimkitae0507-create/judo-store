import { NextResponse } from "next/server";
import { getProductsGroupedByBrand, getBrands } from "@/lib/supabase/queries";

export async function GET() {
  try {
    const [grouped, brands] = await Promise.all([
      getProductsGroupedByBrand(),
      getBrands(),
    ]);

    const summary = grouped.map((g) => ({
      brand: g.brand,
      count: g.products.length,
      grades: [...new Set(g.products.map((p) => p.grade).filter(Boolean))],
    }));

    return NextResponse.json({
      success: true,
      total: grouped.reduce((sum, g) => sum + g.products.length, 0),
      brands,
      summary,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
