import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { ToastProvider } from "@/lib/toast-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Judo Store | 프리미엄 유도 도복 전문점",
  description: "미즈노, 쿠사쿠라, 아디다스 등 공식 IJF 공인 유도복 및 용품 전문 쇼핑몰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300`}
      >
        <WishlistProvider>
          <CartProvider>
            <ToastProvider>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
