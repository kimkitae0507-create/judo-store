"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, Plus, Minus, Star } from "lucide-react";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";

export interface ProductDetailProps {
  product: {
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
  };
  onBack?: () => void;
  allProducts?: any[];
  onProductSelect?: (product: any) => void;
}

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

export default function ProductDetail({ product, onBack, allProducts, onProductSelect }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size || "170");

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.brand, product.name);
  const { showToast } = useToast();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [product]);

  const recommendedProducts = React.useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((p) => p.brand === product.brand && p.name !== product.name)
      .slice(0, 4);
  }, [allProducts, product]);

  const hasValidImage = (() => {
    if (!product.image_url) return false;
    try {
      const { hostname } = new URL(product.image_url);
      return !hostname.toLowerCase().includes("your_project_ref") &&
             !hostname.toLowerCase().includes("example");
    } catch { return false; }
  })();

  const sizes = ["150", "160", "170", "180", "190"];

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="py-8 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb & Back Action */}
        <nav className="flex items-center gap-2 mb-6 text-xs text-zinc-500 dark:text-zinc-400">
          <Link href="/" onClick={(e) => { if (onBack) { e.preventDefault(); onBack(); } }} className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
            홈
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 cursor-pointer">
            {product.brand}
          </span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-900 dark:text-white font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Back Button (Floating on Mobile/Top) */}
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
          >
            ← 목록으로 돌아가기
          </button>
        )}

        {/* Main Product Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm">
          {/* Left: Product Images Column (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-900">
              {hasValidImage ? (
                <Image
                  src={product.image_url!}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-800">
                  <svg className="h-20 w-20 stroke-[1]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L4 7v11l8 4 8-4V7z" />
                    <path d="M12 22V12" />
                    <path d="M17 13l-5-5-5 5" />
                  </svg>
                  <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 mt-4">No Image Available</span>
                </div>
              )}

              {/* Top Left Badge Overlay */}
              {product.grade && (
                <div className="absolute top-4 left-4">
                  <Badge variant={product.grade === "IJF" ? "primary" : "dark"} className="text-[10px] px-3 py-1 font-extrabold tracking-wider shadow-sm">
                    {product.grade} GRADE
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Spec Info Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand Label */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-650 dark:text-red-500 uppercase tracking-widest">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-xs font-extrabold text-zinc-900 dark:text-white">4.9</span>
                  <span className="text-xs text-zinc-450 dark:text-zinc-500">(128개의 리뷰)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-h2 font-extrabold text-zinc-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 py-2 border-y border-zinc-100 dark:border-zinc-800">
                <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
                  {(() => {
                    if (!product.price || product.price <= 0) return "가격 문의";
                    try {
                      return new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: product.currency ?? "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(product.price);
                    } catch { return `${product.price}`; }
                  })()}
                </span>
              </div>

              {/* Product Description */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest block">상품 설명</span>
                <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                  {product.description || 
                    "IJF 신규 규정을 완벽하게 만족하는 프로페셔널 유도복입니다. 최상급 방축 코튼 원사를 사용하여 세탁 후 수축을 최소화하고 내구성을 한 차원 끌어올렸습니다. 국가대표 및 엘리트 선수들이 검증한 고밀도 직조 기술로 최고의 매트 지배력을 선물합니다."}
                </p>
              </div>

              {/* Info Matrix Card */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 text-xs">
                <div className="space-y-1">
                  <span className="text-zinc-400 dark:text-zinc-500 block uppercase font-bold text-[9px] tracking-wider">재고 상태</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-200">
                    {product.stock && product.stock > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-500">재고 있음 ({product.stock}개 남음)</span>
                    ) : (
                      <span className="text-red-500">품절 임박</span>
                    )}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-400 dark:text-zinc-500 block uppercase font-bold text-[9px] tracking-wider">기본 색상</span>
                  <span className="font-bold text-zinc-855 dark:text-zinc-200">
                    {product.color || "백색 (White)"}
                  </span>
                </div>
              </div>

              {/* Size Select Button Group */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">사이즈 선택 (cm)</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 underline font-bold cursor-pointer">실측 가이드</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-9 px-4 rounded-lg font-bold text-xs cursor-pointer transition-all duration-200 ${
                        selectedSize === s
                          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                          : "bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest block">구매 수량</span>
                <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg w-fit p-1 bg-zinc-50 dark:bg-zinc-950">
                  <button onClick={handleDecrease} className="h-8 w-8 flex items-center justify-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-zinc-900 dark:text-white">
                    {quantity}
                  </span>
                  <button onClick={handleIncrease} className="h-8 w-8 flex items-center justify-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-850">
              <div className="flex gap-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-1 gap-2 shadow-lg shadow-red-500/10 active:scale-[0.99]"
                  onClick={() => {
                    addToCart({
                      brand: product.brand,
                      name: product.name,
                      grade: product.grade,
                      price: product.price,
                      currency: product.currency,
                      price_display: product.price_display,
                      image_url: product.image_url,
                      size: selectedSize,
                      color: product.color ?? "",
                      quantity,
                    });
                    showToast("장바구니에 상품이 담겼습니다.", "success");
                  }}
                >
                  <ShoppingBag className="h-5 w-5" />
                  장바구니 담기
                </Button>
                <button
                  onClick={() => {
                    toggleWishlist({
                      brand: product.brand,
                      name: product.name,
                      grade: product.grade,
                      price_display: product.price_display,
                      image_url: product.image_url,
                    });
                    showToast(
                      wished ? "즐겨찾기에서 제거되었습니다." : "즐겨찾기에 추가되었습니다.",
                      "success"
                    );
                  }}
                  className={`h-12 w-12 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 ${
                    wished 
                      ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-500" 
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-500"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Small Benefits Info List */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase py-2">
                <div className="flex items-center gap-1.5 justify-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
                  <span>100% 정품 보증</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <Truck className="h-3.5 w-3.5 text-zinc-500" />
                  <span>무료 회원 배송</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
                  <span>7일 이내 환불</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">추천 상품</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">같은 브랜드의 다른 인기 상품들을 만나보세요.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((p, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onProductSelect && onProductSelect(p)}
                  className="bg-white dark:bg-zinc-900/60 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 hover:border-zinc-250 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer group"
                >
                  <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-hidden mb-3">
                    {isValidImageUrl(p.image_url) ? (
                      <Image src={p.image_url} alt={p.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" sizes="150px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-350"><span className="text-[9px] font-bold tracking-widest uppercase">No Image</span></div>
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">{p.brand}</span>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 mt-0.5 group-hover:text-red-500 transition-colors">{p.name}</h4>
                  <span className="text-xs font-black text-zinc-900 dark:text-white block mt-1">
                    {formatPrice(p.price, p.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
