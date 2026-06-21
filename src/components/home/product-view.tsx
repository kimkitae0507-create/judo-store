"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import HeroBanner from "@/components/home/hero-banner";
import ProductList from "@/components/home/product-list";
import ProductDetail from "@/components/home/product-detail";
import QuickViewModal from "@/components/home/quick-view-modal";

function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    if (hostname.toLowerCase().includes("your_project_ref")) return false;
    if (hostname.toLowerCase().includes("example")) return false;
    return true;
  } catch {
    return false;
  }
}

interface ProductViewProps {
  products: Product[];
}

export default function ProductView({ products }: ProductViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("judostore-recently-viewed");
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => !(p.brand === product.brand && p.name === product.name));
      const updated = [product, ...filtered].slice(0, 5);
      try {
        localStorage.setItem("judostore-recently-viewed", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const formatPrice = (price: number | null, currency: string | null) => {
    if (!price || price <= 0) return "가격 문의";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency ?? "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(price);
    } catch {
      return `${price}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          allProducts={products}
          onProductSelect={handleProductSelect}
        />
      ) : (
        <>
          <HeroBanner products={products} onProductSelect={handleProductSelect} />
          <ProductList
            title="신규 및 추천 상품"
            products={products}
            onProductSelect={handleProductSelect}
            onQuickView={(p) => setQuickViewProduct(p as Product)}
          />

          {/* Recently Viewed Products */}
          {recentlyViewed.length > 0 && (
            <section className="py-12 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
              <div className="container-custom">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">최근 본 상품</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {recentlyViewed.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleProductSelect(p)}
                      className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-hidden mb-3">
                        {isValidImageUrl(p.image_url) ? (
                          <Image src={p.image_url} alt={p.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" sizes="120px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-350"><span className="text-[8px] font-bold uppercase">No Image</span></div>
                        )}
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-zinc-400 uppercase block">{p.brand}</span>
                        <h4 className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 mt-0.5 group-hover:text-red-500 transition-colors">{p.name}</h4>
                        <span className="text-[11px] font-black text-zinc-900 dark:text-white block mt-1">
                          {formatPrice(p.price, p.currency)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
