"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  firstAvailableSize,
  getProduct,
  shippingPrice,
  stockFor,
  type Size,
} from "@/lib/data";

export type CartItem = {
  productId: string;
  size: Size;
  qty: number;
};

export type Order = {
  reference: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    region: string;
    city: string;
    address: string;
    notes: string;
  };
  shippingId: string;
  shippingCost: number;
  paymentMethod: "momo" | "card" | "cod";
  items: {
    productId: string;
    name: string;
    size: Size;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  total: number;
  paymentStatus: "pay_on_delivery" | "awaiting_payment";
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  recent: string[];
  orders: Order[];
};

type ShopContextValue = ShopState & {
  ready: boolean;
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, size?: Size, qty?: number) => string | null;
  updateQty: (productId: string, size: Size, qty: number) => void;
  removeFromCart: (productId: string, size: Size) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  viewProduct: (productId: string) => void;
  placeOrder: (input: {
    customer: Order["customer"];
    shippingId: string;
    paymentMethod: Order["paymentMethod"];
  }) => Order | null;
  findOrder: (reference: string, phone: string) => Order | undefined;
};

const STORAGE_KEY = "nyarkos-hub-shop-v1";
const empty: ShopState = { cart: [], wishlist: [], recent: [], orders: [] };

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShopState>(empty);
  const [ready, setReady] = useState(false);
  const cartRef = useRef(state.cart);
  cartRef.current = state.cart;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ShopState;
        setState({
          cart: parsed.cart ?? [],
          wishlist: parsed.wishlist ?? [],
          recent: parsed.recent ?? [],
          orders: parsed.orders ?? [],
        });
      }
    } catch {
      setState(empty);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const subtotal = useMemo(
    () =>
      state.cart.reduce((sum, item) => {
        const product = getProduct(item.productId);
        return sum + (product ? product.price * item.qty : 0);
      }, 0),
    [state.cart],
  );

  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = useCallback((productId: string, size?: Size, qty = 1) => {
    const chosen = size ?? firstAvailableSize(productId);
    if (!chosen) return "This polo is out of stock.";
    const available = stockFor(productId, chosen);
    const existing = cartRef.current.find(
      (item) => item.productId === productId && item.size === chosen,
    );
    const nextQty = (existing?.qty ?? 0) + qty;
    if (nextQty > available) return `Only ${available} left in size ${chosen}.`;
    setState((current) => {
      const already = current.cart.find(
        (item) => item.productId === productId && item.size === chosen,
      );
      const cart = already
        ? current.cart.map((item) =>
            item.productId === productId && item.size === chosen
              ? { ...item, qty: Math.min(item.qty + qty, available) }
              : item,
          )
        : [...current.cart, { productId, size: chosen, qty }];
      return { ...current, cart };
    });
    return null;
  }, []);

  const updateQty = useCallback((productId: string, size: Size, qty: number) => {
    setState((current) => ({
      ...current,
      cart:
        qty <= 0
          ? current.cart.filter(
              (item) => !(item.productId === productId && item.size === size),
            )
          : current.cart.map((item) =>
              item.productId === productId && item.size === size
                ? { ...item, qty: Math.min(qty, stockFor(productId, size)) }
                : item,
            ),
    }));
  }, []);

  const removeFromCart = useCallback(
    (productId: string, size: Size) => updateQty(productId, size, 0),
    [updateQty],
  );

  const clearCart = useCallback(() => {
    setState((current) => ({ ...current, cart: [] }));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setState((current) => ({
      ...current,
      wishlist: current.wishlist.includes(productId)
        ? current.wishlist.filter((id) => id !== productId)
        : [...current.wishlist, productId],
    }));
  }, []);

  const viewProduct = useCallback((productId: string) => {
    setState((current) => ({
      ...current,
      recent: [
        productId,
        ...current.recent.filter((id) => id !== productId),
      ].slice(0, 8),
    }));
  }, []);

  function placeOrder(input: {
    customer: Order["customer"];
    shippingId: string;
    paymentMethod: Order["paymentMethod"];
  }) {
    if (state.cart.length === 0) return null;
    const items = state.cart.flatMap((item) => {
      const product = getProduct(item.productId);
      if (!product) return [];
      return [
        {
          productId: item.productId,
          name: product.name,
          size: item.size,
          qty: item.qty,
          price: product.price,
        },
      ];
    });
    const orderSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const shippingCost = shippingPrice(input.shippingId, orderSubtotal);
    const reference = `NH-${Date.now().toString(36).toUpperCase()}`;
    const order: Order = {
      reference,
      createdAt: new Date().toISOString(),
      customer: input.customer,
      shippingId: input.shippingId,
      shippingCost,
      paymentMethod: input.paymentMethod,
      items,
      subtotal: orderSubtotal,
      total: orderSubtotal + shippingCost,
      paymentStatus:
        input.paymentMethod === "cod" ? "pay_on_delivery" : "awaiting_payment",
    };
    setState((current) => ({
      ...current,
      cart: [],
      orders: [order, ...current.orders],
    }));
    return order;
  }

  function findOrder(reference: string, phone: string) {
    const normalized = phone.replace(/\s+/g, "");
    return state.orders.find(
      (order) =>
        order.reference.toLowerCase() === reference.trim().toLowerCase() &&
        order.customer.phone.replace(/\s+/g, "") === normalized,
    );
  }

  const value: ShopContextValue = {
    ...state,
    ready,
    cartCount,
    subtotal,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    viewProduct,
    placeOrder,
    findOrder,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used within ShopProvider");
  return value;
}
