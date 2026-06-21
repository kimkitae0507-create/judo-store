"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 dark:bg-zinc-950 dark:text-zinc-500 border-t border-zinc-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white font-bold text-base shadow-sm">
                柔
              </div>
              <span className="font-bold text-md text-white tracking-wider">JUDO STORE</span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              유도 도복 및 용품 전문점. 공인 공식 인증 도복부터 연습용 도복까지 최고의 퀄리티와 퍼포먼스를 제공합니다.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors duration-200" aria-label="Instagram">
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors duration-200" aria-label="Youtube">
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors duration-200" aria-label="Facebook">
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Categories</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">선수용 IJF 공인 도복</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">일반 연습용 도복</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">주니어 및 어린이 도복</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">유도 띠 & 벨트</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">악세서리 & 보호대</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">자주 묻는 질문 (FAQ)</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">도복 사이즈 가이드</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">배송 및 교환/반품 안내</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-150">단체 도복/자수 문의</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Newsletter</h3>
            <p className="text-xs text-zinc-400">신제품 입고 및 세일 소식을 가장 빠르게 받아보세요.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-xs text-white outline-none focus:border-white transition-colors duration-200"
              />
              <button className="h-9 px-4 rounded-lg bg-white text-zinc-900 font-medium text-xs hover:bg-zinc-200 transition-colors duration-200 whitespace-nowrap">
                구독하기
              </button>
            </div>
            <div className="pt-2 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>1544-0000 (평일 10:00 - 17:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <span>support@judostore.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Area */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center md:flex md:items-center md:justify-between text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Judo Store. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex justify-center gap-4">
            <Link href="#" className="hover:underline">이용약관</Link>
            <Link href="#" className="hover:underline">개인정보처리방침</Link>
            <Link href="#" className="hover:underline">사업자정보확인</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
