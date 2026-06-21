"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import type { Product } from "@/types/product";

export interface ProductSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <div className="grid-responsive">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="flex flex-col h-[400px] justify-between overflow-hidden border border-zinc-100 dark:border-zinc-850">
          {/* Image Area Skeleton */}
          <div className="relative w-full aspect-square animate-shimmer rounded-xl mb-4"></div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div>
              {/* Brand and Badge Skeleton */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="h-3 w-16 animate-shimmer rounded"></div>
                <div className="h-4.5 w-12 animate-shimmer rounded-full"></div>
              </div>

              {/* Title Skeleton */}
              <div className="h-4 w-5/6 animate-shimmer rounded mb-2"></div>
              <div className="h-4 w-2/3 animate-shimmer rounded"></div>
            </div>

            {/* Price Skeleton */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
              <div className="h-5 w-24 animate-shimmer rounded"></div>
              <div className="h-7 w-20 animate-shimmer rounded-lg"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

import { useWishlist } from "@/lib/wishlist-context";
import { Heart } from "lucide-react";

export interface ProductCardProps {
  brand: string;
  name: string;
  grade: string | null;
  price: number | null;
  currency: string | null;
  price_display: string | null;
  image_url: string | null;
  onClick?: () => void;
  onQuickView?: () => void;
}

/** 실제 사용 가능한 이미지 URL인지 확인 (플레이스홀더 제외) */
function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    // YOUR_PROJECT_REF 같은 플레이스홀더 도메인 제외
    if (hostname.toLowerCase().includes("your_project_ref")) return false;
    if (hostname.toLowerCase().includes("example")) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * price(숫자) + currency(통화코드)로 올바른 가격 문자열 생성
 * price가 null이거나 0이면 "가격 문의" 반환
 */
function formatPrice(price: number | null, currency: string | null): string {
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
}

export function ProductCard({ brand, name, grade, price, currency, price_display, image_url, onClick, onQuickView }: ProductCardProps) {
  const hasImage = isValidImageUrl(image_url);
  const priceLabel = formatPrice(price, currency);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wish = isWishlisted(brand, name);

  return (
    <Card 
      interactive 
      onClick={onClick}
      className="flex flex-col h-[400px] justify-between overflow-hidden group relative"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-900/60 rounded-lg overflow-hidden mb-4 border border-zinc-100 dark:border-zinc-900">
        {hasImage ? (
          <div className="relative w-full h-full p-4 transition-transform duration-500 group-hover:scale-105">
            <Image
              src={image_url}
              alt={name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-350 dark:text-zinc-700">
            <svg
              className="h-12 w-12 mb-2 stroke-[1.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L4 7v11l8 4 8-4V7z" />
              <path d="M12 22V12" />
              <path d="M17 13l-5-5-5 5" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Wishlist Heart Icon overlay (Top-Right of Image) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({ brand, name, grade, price_display, image_url });
          }}
          className="absolute top-2.5 right-2.5 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-550 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <Heart className={`h-4 w-4 ${wish ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      {/* Info Container */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
              {brand}
            </span>
            {grade && (
              <Badge
                variant={grade === "IJF" ? "primary" : "outline"}
                className={`text-[9px] px-2 py-0.5 font-bold ${
                  grade === "IJF" 
                    ? "!bg-red-50 dark:!bg-red-950/30 !text-red-600 dark:!text-red-400 border border-red-100 dark:border-red-900/50" 
                    : ""
                }`}
              >
                {grade}
              </Badge>
            )}
          </div>

          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-red-650 dark:group-hover:text-red-500 transition-colors duration-200">
            {name}
          </h3>
        </div>

        <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between gap-1.5">
          <span className="font-black text-sm sm:text-base text-zinc-900 dark:text-white">
            {priceLabel}
          </span>
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onQuickView) onQuickView();
              }}
              className="text-[10px] font-bold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white bg-zinc-55 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            >
              퀵뷰
            </button>
            <button className="text-[10px] font-bold text-zinc-900 dark:text-white bg-zinc-100 hover:bg-zinc-900 hover:text-white dark:bg-zinc-800 dark:hover:bg-white dark:hover:text-zinc-950 px-2 py-1.5 rounded-lg transition-all duration-200">
              상세보기
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export interface ProductListProps {
  title?: string;
  products: Product[];
  isLoading?: boolean;
  onProductSelect?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const BRANDS = ["All", "Mizuno", "KuSakura", "Fighting Films", "Essimo", "DAX Sports"];

const BRAND_ORDER = ["Mizuno", "KuSakura", "Fighting Films", "Essimo", "DAX Sports"];
const GRADE_ORDER = ["IJF", "Premium", "Competition", "Training", "Beginner", "Accessory"];

type SortOption = "price-asc" | "price-desc" | "brand-asc" | "grade-asc";

export default function ProductList({ title = "추천 상품 목록", products, isLoading = false, onProductSelect, onQuickView }: ProductListProps) {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("brand-asc");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const { wishlistItems } = useWishlist();

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      const b = p.brand;
      const key = BRANDS.find((brand) => brand.toLowerCase() === b.toLowerCase()) || b;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    // 1. Filter by wishlist only if toggle is on
    let baseList = products;
    if (showWishlistOnly) {
      baseList = products.filter((p) => 
        wishlistItems.some((w) => w.brand === p.brand && w.name === p.name)
      );
    }

    // 2. Filter by brand & search query
    const filtered = baseList.filter((p) => {
      const matchBrand = selectedBrand === "All" || p.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchSearch;
    });

    // 3. Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") {
        const priceA = a.price ?? 0;
        const priceB = b.price ?? 0;
        return priceA - priceB;
      }
      if (sortBy === "price-desc") {
        const priceA = a.price ?? 0;
        const priceB = b.price ?? 0;
        return priceB - priceA;
      }
      if (sortBy === "brand-asc") {
        const idxA = BRAND_ORDER.indexOf(a.brand);
        const idxB = BRAND_ORDER.indexOf(b.brand);
        const finalA = idxA === -1 ? 999 : idxA;
        const finalB = idxB === -1 ? 999 : idxB;
        if (finalA !== finalB) return finalA - finalB;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "grade-asc") {
        const idxA = GRADE_ORDER.indexOf(a.grade ?? "");
        const idxB = GRADE_ORDER.indexOf(b.grade ?? "");
        const finalA = idxA === -1 ? 999 : idxA;
        const finalB = idxB === -1 ? 999 : idxB;
        if (finalA !== finalB) return finalA - finalB;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [products, selectedBrand, searchQuery, sortBy, showWishlistOnly, wishlistItems]);

  if (isLoading) {
    return (
      <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="container-custom">
          {title && (
            <div className="mb-8">
              <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-2"></div>
              <div className="h-1 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
          )}
          <ProductSkeleton count={8} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-900">
          {/* Title with Wishlist Status */}
          {title && (
            <div>
              <h2 className="text-h2 font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                {showWishlistOnly ? "내 즐겨찾기 상품" : title}
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md ml-1.5">
                  {filteredProducts.length}
                </span>
              </h2>
              <div className="h-1 w-12 bg-red-650 mt-2.5 rounded-full"></div>
            </div>
          )}

          {/* Filters & Search Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full md:w-auto">
            
            {/* Wishlist Toggle Button & Brand Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Heart Toggle Button */}
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`h-9 px-3.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                  showWishlistOnly
                    ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950/20 dark:border-red-900/50"
                    : "bg-zinc-50 border-zinc-200 text-zinc-650 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${showWishlistOnly ? "fill-red-500" : ""}`} />
                <span>즐겨찾기만</span>
              </button>

              <div className="flex flex-wrap gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-fit max-w-full overflow-x-auto">
                {BRANDS.map((brand) => {
                  const isActive = selectedBrand === brand;
                  const countVal = brandCounts[brand] ?? 0;
                  return (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-white dark:bg-zinc-850 text-zinc-950 dark:text-white shadow-sm"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                    >
                      {brand} ({countVal})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions: Search Input & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1 sm:w-60 min-w-[180px]">
                <input
                  type="text"
                  placeholder="결과 내 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 pl-9 text-xs outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all duration-300"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Sort Dropdown Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-3 pr-8 text-xs font-bold outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all duration-300 appearance-none cursor-pointer text-zinc-850 dark:text-zinc-200"
                >
                  <option value="brand-asc">브랜드순 정렬</option>
                  <option value="grade-asc">등급순 정렬</option>
                  <option value="price-asc">가격 낮은순</option>
                  <option value="price-desc">가격 높은순</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-zinc-400">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <svg
              className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3 stroke-[1.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
              {showWishlistOnly ? "즐겨찾기한 상품이 없습니다. 하트 버튼을 눌러 추가해보세요!" : "검색 또는 정렬 조건에 맞는 상품이 없습니다."}
            </p>
          </div>
        ) : (
          <div className="grid-responsive">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={`${product.brand}-${product.name}-${idx}`}
                brand={product.brand}
                name={product.name}
                grade={product.grade}
                price={product.price}
                currency={product.currency}
                price_display={product.price_display}
                image_url={product.image_url}
                onClick={() => onProductSelect && onProductSelect(product)}
                onQuickView={() => onQuickView && onQuickView(product)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
