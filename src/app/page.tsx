import { getProducts } from "@/lib/supabase/queries";
import ProductView from "@/components/home/product-view";

export default async function Home() {
  const products = await getProducts();
  return <ProductView products={products} />;
}
