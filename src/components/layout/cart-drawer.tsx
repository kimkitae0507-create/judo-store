"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Button from "@/components/ui/button";
import { loadTossPayments } from "@tosspayments/payment-sdk";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const count = getCartCount();
  const total = getCartTotal();

  const handleCheckout = async () => {
    if (cartItems.length === 0 || isProcessing) return;
    setIsProcessing(true);
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_ck_jExPeJWYVQ4beLE6xppj349R5gvN";
      const tossPayments = await loadTossPayments(clientKey);

      const currency = cartItems[0]?.currency || "USD";
      let krwAmount = total;
      if (currency === "USD" || currency === "EUR" || currency === "GBP") {
        krwAmount = Math.round(total * 1400);
      } else if (currency === "JPY") {
        krwAmount = Math.round(total * 10);
      }
      
      const paymentAmount = krwAmount < 1000 ? 1000 : krwAmount;
      const orderId = `order-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const orderName = cartItems.length > 1 
        ? `${cartItems[0].name} 외 ${cartItems.length - 1}건` 
        : cartItems[0]?.name || "유도 용품";

      await tossPayments.requestPayment("카드", {
        amount: paymentAmount,
        orderId,
        orderName,
        customerName: "유도 매니아",
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "결제 중 오류가 발생했습니다.";
      console.error("Payment error:", err);
      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Prevent scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Cart Icon Button */}
      <button
        id="cart-drawer-btn"
        onClick={() => setIsOpen(true)}
        className="relative p-2.5 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all duration-200 group cursor-pointer"
        aria-label="장바구니 열기"
      >
        <ShoppingBag className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-950">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl border-l border-zinc-100 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            <h2 className="font-extrabold text-zinc-900 dark:text-white text-lg">장바구니</h2>
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400 dark:text-zinc-600 px-6">
              <ShoppingCart className="h-14 w-14 stroke-[1]" />
              <p className="text-sm font-medium text-center">
                장바구니가 비어 있습니다.<br />
                <span className="text-zinc-300 dark:text-zinc-700">상품을 추가해보세요.</span>
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold underline underline-offset-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer mt-1"
              >
                쇼핑 계속하기 →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-900 px-6">
              {cartItems.map((item) => (
                <li key={`${item.brand}-${item.name}-${item.size}`} className="py-5 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900 overflow-hidden shrink-0">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name} fill className="object-contain p-2" sizes="80px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <ShoppingBag className="h-6 w-6 stroke-[1]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      {item.brand}
                    </p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      사이즈: <span className="font-bold text-zinc-600 dark:text-zinc-400">{item.size}</span>
                      {item.color && (
                        <> · 색상: <span className="font-bold text-zinc-600 dark:text-zinc-400">{item.color}</span></>
                      )}
                    </p>
                    <p className="text-sm font-black text-zinc-900 dark:text-white pt-0.5">
                      {item.price && item.price > 0
                        ? (() => { try { return new Intl.NumberFormat("en-US", { style: "currency", currency: item.currency ?? "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(item.price); } catch { return `${item.price}`; } })()
                        : "가격 문의"}
                    </p>

                    {/* Quantity & Delete */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-900">
                        <button
                          onClick={() => updateQuantity(item.brand, item.name, item.size, item.quantity - 1)}
                          className="h-6 w-6 flex items-center justify-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-zinc-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.brand, item.name, item.size, item.quantity + 1)}
                          className="h-6 w-6 flex items-center justify-center rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.brand, item.name, item.size)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer: Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-900 px-6 py-5 space-y-4 bg-white dark:bg-zinc-950">
            {/* Subtotal */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>상품 합계 ({count}개)</span>
                <span>
                  {total > 0
                    ? (() => { try { const currencies = [...new Set(cartItems.map(i => i.currency).filter(Boolean))]; const cur = currencies.length === 1 ? currencies[0]! : "USD"; return new Intl.NumberFormat("en-US", { style: "currency", currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(total); } catch { return total.toLocaleString(); } })()
                    : "가격 문의"}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>배송비</span>
                <span className="text-emerald-600 dark:text-emerald-500 font-bold">무료</span>
              </div>
              <div className="flex justify-between font-black text-base text-zinc-900 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-900">
                <span>총 결제금액</span>
                <span>
                  {total > 0
                    ? (() => { try { const currencies = [...new Set(cartItems.map(i => i.currency).filter(Boolean))]; const cur = currencies.length === 1 ? currencies[0]! : "USD"; return new Intl.NumberFormat("en-US", { style: "currency", currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(total); } catch { return total.toLocaleString(); } })()
                    : "가격 문의"}
                </span>
              </div>
            </div>

             <Button
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-red-500/10"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? "처리 중..." : "결제하기"}
            </Button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              쇼핑 계속하기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
