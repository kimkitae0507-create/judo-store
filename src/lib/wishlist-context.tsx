"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  brand: string;
  name: string;
  grade: string | null;
  price_display: string | null;
  image_url: string | null;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (brand: string, name: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "judostore-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlistItems, isInitialized]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.brand === item.brand && i.name === item.name);
      if (exists) {
        showToast(`🖤 즐겨찾기에서 삭제되었습니다: ${item.name}`);
        return prev.filter((i) => !(i.brand === item.brand && i.name === item.name));
      } else {
        showToast(`❤️ 즐겨찾기에 추가되었습니다: ${item.name}`);
        return [...prev, item];
      }
    });
  };

  const isWishlisted = (brand: string, name: string) => {
    return wishlistItems.some((i) => i.brand === brand && i.name === name);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted }}>
      {children}
      {/* Toast Notification HUD */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold border border-zinc-800 dark:border-zinc-100 flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <span className="flex-1 truncate">{toastMessage}</span>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
