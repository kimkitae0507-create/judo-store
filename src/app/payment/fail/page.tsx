"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

function FailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "UNKNOWN_ERROR";
  const message = searchParams.get("message") || "알 수 없는 오류가 발생했습니다.";
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800/60 shadow-xl dark:shadow-black/20 backdrop-blur-md text-center">
        <div className="inline-flex h-16 w-16 bg-red-50 dark:bg-red-950/20 rounded-full items-center justify-center mb-6">
          <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
        </div>

        <h1 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">결제에 실패했습니다</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          결제 진행 중 오류가 발생했습니다. 아래 내용을 확인해 주세요.
        </p>

        {/* Error Details */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-5 text-left space-y-3 mb-8 border border-zinc-100 dark:border-zinc-800/40">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">에러 코드</span>
            <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">{code}</span>
          </div>

          <div className="pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">상세 사유</span>
            <span className="text-sm font-medium text-red-600 dark:text-red-400 leading-relaxed block">{message}</span>
          </div>

          {orderId && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">주문 번호</span>
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 select-all">{orderId}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 px-5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            다시 시도하기
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 px-5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
          >
            <Home className="h-4 w-4" />
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="h-10 w-10 text-red-600 animate-spin border-4 border-current border-t-transparent rounded-full mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">페이지 로드 중...</h2>
        </div>
      }
    >
      <FailContent />
    </Suspense>
  );
}
