"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface TossPaymentData {
  orderName?: string;
  totalAmount?: number;
  method?: string;
  approvedAt?: string;
  orderId?: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<TossPaymentData | null>(null);

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setError("필수 결제 정보(paymentKey, orderId, amount)가 누락되었습니다.");
      setLoading(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || data.error || "결제 승인에 실패했습니다.");
        }

        setPaymentData(data);
        clearCart();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "결제 확인 중 예상치 못한 오류가 발생했습니다.";
        console.error("Payment confirmation failed:", err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [paymentKey, orderId, amount, clearCart]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Loader2 className="h-12 w-12 text-red-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">결제 승인 요청 중...</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
          안전하게 결제 승인을 진행하고 있습니다. 잠시만 기다려주세요.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 max-w-md mx-auto">
        <div className="h-16 w-16 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mb-6">
          <XCircleIcon className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 text-center">결제 승인 실패</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-center text-sm mb-8 leading-relaxed">
          {error}
        </p>
        <div className="w-full space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const formattedAmount = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(paymentData?.totalAmount || Number(amount));

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-8 sm:p-12 border border-zinc-100 dark:border-zinc-800/60 shadow-xl dark:shadow-black/20 backdrop-blur-md text-center">
        <div className="inline-flex h-16 w-16 bg-emerald-50 dark:bg-emerald-950/20 rounded-full items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-500 animate-pulse" />
        </div>

        <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">결제가 완료되었습니다!</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
          성공적으로 주문이 접수되었습니다. 주문 상세 정보는 아래와 같습니다.
        </p>

        {/* Payment Summary */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-6 text-left space-y-4 mb-8 border border-zinc-100 dark:border-zinc-800/40">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">주문명</span>
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{paymentData?.orderName || "유도 용품"}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">결제 금액</span>
            <span className="text-base font-black text-red-600 dark:text-red-500">{formattedAmount}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">주문 번호</span>
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 select-all">{orderId}</span>
          </div>

          {paymentData?.method && (
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">결제 수단</span>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{paymentData.method}</span>
            </div>
          )}

          {paymentData?.approvedAt && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">승인 일시</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                {new Date(paymentData.approvedAt).toLocaleString("ko-KR")}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg shadow-black/5 dark:shadow-white/5"
          >
            <ShoppingBag className="h-4 w-4" />
            계속 쇼핑하기
          </Link>
        </div>
      </div>
    </div>
  );
}

function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <Loader2 className="h-12 w-12 text-red-600 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">페이지 로드 중...</h2>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
