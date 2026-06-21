"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Award, Zap } from "lucide-react";
import Badge from "@/components/ui/badge";
import type { Product } from "@/types/product";

interface HeroBannerProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
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

export default function HeroBanner({ products, onProductSelect }: HeroBannerProps) {
  const [showcaseProduct, setShowcaseProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products && products.length > 0) {
      // 높은 가격 순으로 10번째 도복까지 추출
      const top10 = [...products]
        .sort((a, b) => {
          const getKrw = (price: number | null, currency: string | null) => {
            if (!price) return 0;
            const cur = currency?.toUpperCase() || "USD";
            if (cur === "EUR") return price * 1500;
            if (cur === "GBP") return price * 1750;
            if (cur === "JPY") return price * 9;
            return price * 1400;
          };
          return getKrw(b.price, b.currency) - getKrw(a.price, a.currency);
        })
        .slice(0, 10);
      
      if (top10.length > 0) {
        const randomIdx = Math.floor(Math.random() * top10.length);
        setShowcaseProduct(top10[randomIdx]);
      }
    }
  }, [products]);

  const productToShow = showcaseProduct || {
    brand: "Mizuno",
    name: "미즈노 유도복 유사쿠 야하라 에디션",
    grade: "IJF APPROVED",
    price: 389000,
    currency: "KRW",
    image_url: null,
    description: "최상급 더블위브 코튼"
  };

  const hasValidImage = isValidImageUrl(productToShow.image_url);

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white py-20 lg:py-28">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-radial from-red-600/20 to-transparent blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-radial from-zinc-800/40 to-transparent blur-3xl"></div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5">
              <Badge variant="primary" className="gap-1 px-3 py-1 text-red-500">
                <Zap className="h-3 w-3 fill-red-500/20 animate-pulse" />
                NEW SEASON ARRIVAL
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-display font-extrabold text-white">
              매트 위에서 빛나는<br />
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                최상의 퍼포먼스
              </span>
            </h1>

            {/* Description */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
              Mizuno, Kusakura, Fighting Films 등 세계 정상급 브랜드의 IJF 공인 도복부터 데일리 트레이닝 기어까지, 유도인을 위한 완벽한 셀렉션을 만나보세요.
            </p>


            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900/60 max-w-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-red-500 shrink-0" />
                <span className="text-xs font-medium text-zinc-400">100% 정품 보증</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-red-500 shrink-0" />
                <span className="text-xs font-medium text-zinc-400">IJF 공식 인증</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-500 shrink-0" />
                <span className="text-xs font-medium text-zinc-400">빠른 전국 배송</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div 
              onClick={() => {
                if (showcaseProduct && onProductSelect) {
                  onProductSelect(showcaseProduct);
                }
              }}
              className={`relative w-full max-w-[380px] aspect-[4/5] rounded-3xl bg-zinc-900/90 border border-zinc-800/80 p-6 flex flex-col justify-between shadow-2xl shadow-red-950/20 overflow-hidden group animate-float ${
                showcaseProduct ? "cursor-pointer" : ""
              }`}
            >
              {/* Card visual gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-zinc-900/50 transition-opacity duration-300 group-hover:opacity-80"></div>
              
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {productToShow.brand}
                </span>
                {productToShow.grade && (
                  <Badge variant="primary" className="!bg-red-650 !text-white text-[9px] px-2 py-0.5">
                    {productToShow.grade}
                  </Badge>
                )}
              </div>

              {/* Central Abstract Judo Illustration (Sleek and Minimalist) */}
              <div className="my-auto py-8 flex flex-col items-center justify-center z-10">
                {hasValidImage ? (
                  <div className="relative h-44 w-44 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950/80 overflow-hidden group-hover:scale-105 transition-transform duration-300 animate-glow">
                    <Image
                      src={productToShow.image_url!}
                      alt={productToShow.name}
                      fill
                      className="object-contain p-4"
                      sizes="176px"
                    />
                  </div>
                ) : (
                  <div className="relative h-44 w-44 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950/80 shadow-inner group-hover:scale-105 transition-transform duration-300 animate-glow">
                    <div className="absolute inset-2 rounded-full border border-dashed border-red-500/20 animate-spin-slow"></div>
                    <svg className="h-24 w-24 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L4 7v11l8 4 8-4V7z" />
                      <path d="M12 22V12" />
                      <path d="M17 13l-5-5-5 5" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="space-y-1.5 z-10 text-left w-full">
                <h3 className="font-bold text-base text-white line-clamp-2 leading-snug">
                  {productToShow.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-xs truncate max-w-[180px]">
                    {productToShow.description || "프리미엄 IJF 공인 유도복"}
                  </span>
                  <span className="text-red-500 font-bold text-sm shrink-0 ml-2">
                    {productToShow.price 
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: productToShow.currency ?? "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }).format(productToShow.price)
                      : "가격 문의"}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
