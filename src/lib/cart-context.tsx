"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  brand: string;
  name: string;
  grade: string | null;
  price: number | null;
  currency: string | null;
  price_display: string | null;
  image_url: string | null;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (brand: string, name: string, size: string) => void;
  updateQuantity: (brand: string, name: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "judostore-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage once on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes, but only after initialization
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qty = item.quantity ?? 1;
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.brand === item.brand && i.name === item.name && i.size === item.size
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + qty,
        };
        return newItems;
      }

      return [...prevItems, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (brand: string, name: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => !(i.brand === brand && i.name === name && i.size === size))
    );
  };

  const updateQuantity = (brand: string, name: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(brand, name, size);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.brand === brand && i.name === name && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price ?? 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
