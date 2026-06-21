"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useToast } from "@/lib/toast-context";

interface QuickViewModalProps {
  product: {
    brand: string;
    name: string;
    grade: string | null;
    price: number | null;
    currency: string | null;
    price_display: string | null;
    image_url: string | null;
    description: string | null;
    size: string | null;
    color: string | null;
  } | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("170");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (product?.size) {
      setSelectedSize(product.size);
    }
  }, [product]);

  if (!product) return null;

  const wished = isWishlisted(product.brand, product.name);
  const sizes = ["150", "160", "170", "180", "190"];

  const hasValidImage = (() => {
    if (!product.image_url) return false;
    try {
      const { hostname } = new URL(product.image_url);
      return !hostname.toLowerCase().includes("your_project_ref") &&
             !hostname.toLowerCase().includes("example");
    } catch { return false; }
  })();

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

  const handleAddToCart = () => {
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
      quantity: 1,
    });
    showToast("장바구니에 추가되었습니다.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-150 dark:border-zinc-850 shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-500 dark:text-zinc-400"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-905">
          <div className="relative w-full h-64 md:h-80">
            {hasValidImage ? (
              <Image
                src={product.image_url!}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-350">
                <span className="text-xs uppercase font-bold tracking-widest text-zinc-400">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">{product.brand}</span>
                {product.grade && (
                  <Badge variant="primary" className="!bg-red-50 dark:!bg-red-950/20 !text-red-500 text-[8px] px-1.5 py-0.5">
                    {product.grade}
                  </Badge>
                )}
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">{product.name}</h2>
            </div>

            <p className="text-sm font-black text-zinc-900 dark:text-white text-xl">
              {formatPrice(product.price, product.currency)}
            </p>

            <div className="space-y-2">
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">사이즈</span>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-8 w-12 rounded-lg border text-xs font-bold transition-all duration-200 cursor-pointer ${
                      selectedSize === s
                        ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex gap-3">
              <Button variant="primary" size="lg" className="flex-1 gap-2 active:scale-98" onClick={handleAddToCart}>
                <ShoppingBag className="h-4.5 w-4.5" />
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
                  showToast(wished ? "즐겨찾기에서 제거되었습니다." : "즐겨찾기에 추가되었습니다.");
                }}
                className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all duration-250 cursor-pointer active:scale-95 ${
                  wished
                    ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-500"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-500"
                }`}
              >
                <Heart className={`h-4.5 w-4.5 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 text-[9px] text-zinc-400 font-bold uppercase text-center pt-2">
              <div className="flex items-center gap-1 justify-center">
                <ShieldCheck className="h-3 w-3 text-zinc-450" />
                <span>100% 정품</span>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <Truck className="h-3 w-3 text-zinc-450" />
                <span>무료 배송</span>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <RotateCcw className="h-3 w-3 text-zinc-455" />
                <span>7일 환불</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
