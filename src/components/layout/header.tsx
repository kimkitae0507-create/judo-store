"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, User, Heart } from "lucide-react";
import CartDrawer from "@/components/layout/cart-drawer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md">
                <span className="font-bold text-lg tracking-wider">柔</span>
                <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-600 dark:border-zinc-950"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white leading-none">JUDO STORE</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-widest mt-0.5">유도 도복 전문</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="#" 
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200 py-2">
                Products
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:block w-48 rounded-xl border border-zinc-100 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                <Link href="#" className="block rounded-lg px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50">
                  선수용 도복 (IJF인증)
                </Link>
                <Link href="#" className="block rounded-lg px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50">
                  연습용 도복
                </Link>
                <Link href="#" className="block rounded-lg px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50">
                  어린이용 도복
                </Link>
                <Link href="#" className="block rounded-lg px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50">
                  유도 띠 (Belt)
                </Link>
              </div>
            </div>
            <Link 
              href="#" 
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200"
            >
              Brands
            </Link>
            <Link 
              href="#" 
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200"
            >
              New Arrivals
            </Link>
          </nav>

          {/* Actions: Search, Wishlist, User, Cart */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Desktop */}
            <div className="relative hidden lg:block w-64">
              <input
                type="text"
                placeholder="도복 모델, 브랜드 검색..."
                className="w-full h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 pl-9 text-xs outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            </div>

            <button className="p-2 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200">
              <Search className="h-5 w-5 lg:hidden" />
            </button>

            <button className="hidden sm:flex p-2 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200">
              <Heart className="h-5 w-5" />
            </button>

            <button className="hidden sm:flex p-2 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200">
              <User className="h-5 w-5" />
            </button>

            <CartDrawer />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full md:hidden transition-colors duration-200"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 space-y-3 transition-all duration-300 ease-in-out">
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="도복 모델, 브랜드 검색..."
              className="w-full h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 px-4 pl-10 text-sm outline-none"
            />
            <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-zinc-400" />
          </div>
          <Link
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Home
          </Link>
          <div className="space-y-1">
            <span className="block px-3 py-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Products
            </span>
            <Link
              href="#"
              className="block px-6 py-2 rounded-lg text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              선수용 도복 (IJF인증)
            </Link>
            <Link
              href="#"
              className="block px-6 py-2 rounded-lg text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              연습용 도복
            </Link>
            <Link
              href="#"
              className="block px-6 py-2 rounded-lg text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              유도 띠 (Belt)
            </Link>
          </div>
          <Link
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Brands
          </Link>
          <Link
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            New Arrivals
          </Link>
        </div>
      )}
    </header>
  );
}
