import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, ShippingAddress, ShippingOption } from '../types/shop';
import type { Product } from '../types/shop';
import { products as productCatalog, shippingOptions } from '../data/shopData';
import { useAuth } from '../auth/AuthContext';

const STORAGE_KEY = 'fluently_cart_v1';
const ADDRESS_KEY = 'fluently_shipping_v1';
const SHIPPING_KEY = 'fluently_shipping_method_v1';

interface CartCtx {
  products: Product[];
  items: CartItem[];
  addItem: (productId: string, qty?: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQty: (productId: string, qty: number, variantId?: string) => void;
  clearCart: () => void;

  itemCount: number;
  rawSubtotal: number;
  memberDiscount: number;
  subtotal: number;
  getProductDiscountPercent: (product: Product) => number;
  getProductPrice: (product: Product) => number;
  getCartItemUnitPrice: (product: Product, item: CartItem) => number;
  getCartItemBasePrice: (product: Product, item: CartItem) => number;
  getCartItemVariantName: (product: Product, item: CartItem) => string;

  address: ShippingAddress | null;
  setAddress: (a: ShippingAddress) => void;

  shippingMethod: ShippingOption | null;
  setShippingMethod: (s: ShippingOption | null) => void;

  shippingCost: number;
  total: number;
}

const CartContext = createContext<CartCtx | null>(null);

const loadJSON = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const cartLineMatches = (item: CartItem, productId: string, variantId?: string) =>
  item.productId === productId && (item.variantId || '') === (variantId || '');

const findVariant = (product: Product, variantId?: string) =>
  product.variants?.find((variant) => variant.id === variantId);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(productCatalog);
  const [items, setItems] = useState<CartItem[]>(() => loadJSON<CartItem[]>(STORAGE_KEY) ?? []);
  const [address, setAddressState] = useState<ShippingAddress | null>(() => loadJSON<ShippingAddress>(ADDRESS_KEY));
  const [shippingMethod, setShippingMethodState] = useState<ShippingOption | null>(() => {
    const saved = loadJSON<{ id: string }>(SHIPPING_KEY);
    return saved ? shippingOptions.find(s => s.id === saved.id) ?? null : null;
  });

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore quota */ }
  }, [items]);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/shop/products')
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        if (!cancelled && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        if (!cancelled) setProducts(productCatalog);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!address) return;
    try { window.localStorage.setItem(ADDRESS_KEY, JSON.stringify(address)); } catch { /* ignore quota */ }
  }, [address]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SHIPPING_KEY, shippingMethod ? JSON.stringify({ id: shippingMethod.id }) : '');
    } catch { /* ignore quota */ }
  }, [shippingMethod]);

  const addItem = useCallback((productId: string, qty = 1, variantId?: string) => {
    setItems(prev => {
      const existing = prev.find(i => cartLineMatches(i, productId, variantId));
      if (existing) {
        return prev.map(i => cartLineMatches(i, productId, variantId) ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { productId, variantId, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems(prev => prev.filter(i => !cartLineMatches(i, productId, variantId)));
  }, []);

  const updateQty = useCallback((productId: string, qty: number, variantId?: string) => {
    setItems(prev => {
      if (qty <= 0) return prev.filter(i => !cartLineMatches(i, productId, variantId));
      return prev.map(i => cartLineMatches(i, productId, variantId) ? { ...i, quantity: qty } : i);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const setAddress = useCallback((a: ShippingAddress) => setAddressState(a), []);
  const setShippingMethod = useCallback((s: ShippingOption | null) => setShippingMethodState(s), []);

  const getProductDiscountPercent = useCallback((product: Product) => {
    const plan = user?.plan ?? 'free';
    if (plan === 'lifetime') {
      if (product.lifetimeDiscountEnabled) {
        return Math.max(0, Math.min(100, Number(product.lifetimeDiscountPercent || 0)));
      }
      if (product.proDiscountEnabled) {
        return Math.max(0, Math.min(100, Number(product.proDiscountPercent || 0)));
      }
    }
    if (plan === 'pro' && product.proDiscountEnabled) {
      return Math.max(0, Math.min(100, Number(product.proDiscountPercent || 0)));
    }
    return 0;
  }, [user?.plan]);

  const getProductPrice = useCallback((product: Product) => {
    const discountPercent = getProductDiscountPercent(product);
    if (discountPercent <= 0) return product.price;
    return Math.max(0, Math.round(product.price * (100 - discountPercent) / 100));
  }, [getProductDiscountPercent]);

  const getCartItemBasePrice = useCallback((product: Product, item: CartItem) => {
    const variant = findVariant(product, item.variantId);
    return Number(variant?.price || product.price || 0);
  }, []);

  const getCartItemUnitPrice = useCallback((product: Product, item: CartItem) => {
    const basePrice = getCartItemBasePrice(product, item);
    const discountPercent = getProductDiscountPercent(product);
    if (discountPercent <= 0) return basePrice;
    return Math.max(0, Math.round(basePrice * (100 - discountPercent) / 100));
  }, [getCartItemBasePrice, getProductDiscountPercent]);

  const getCartItemVariantName = useCallback((product: Product, item: CartItem) => {
    return findVariant(product, item.variantId)?.name || '';
  }, []);

  const { itemCount, rawSubtotal, subtotal } = useMemo(() => {
    let count = 0;
    let rawSum = 0;
    let discountedSum = 0;
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) continue;
      count += item.quantity;
      rawSum += getCartItemBasePrice(product, item) * item.quantity;
      discountedSum += getCartItemUnitPrice(product, item) * item.quantity;
    }
    return { itemCount: count, rawSubtotal: rawSum, subtotal: discountedSum };
  }, [items, products, getCartItemBasePrice, getCartItemUnitPrice]);

  const memberDiscount = Math.max(0, rawSubtotal - subtotal);

  const shippingCost = shippingMethod?.cost ?? 0;
  const total = subtotal + shippingCost;

  const value = useMemo<CartCtx>(() => ({
    products,
    items, addItem, removeItem, updateQty, clearCart,
    itemCount, rawSubtotal, memberDiscount, subtotal,
    getProductDiscountPercent, getProductPrice, getCartItemUnitPrice, getCartItemBasePrice, getCartItemVariantName,
    address, setAddress,
    shippingMethod, setShippingMethod,
    shippingCost, total,
  }), [products, items, addItem, removeItem, updateQty, clearCart, itemCount, rawSubtotal, memberDiscount, subtotal, getProductDiscountPercent, getProductPrice, getCartItemUnitPrice, getCartItemBasePrice, getCartItemVariantName, address, setAddress, shippingMethod, setShippingMethod, shippingCost, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
