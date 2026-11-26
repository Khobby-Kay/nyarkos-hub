"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { formatPrice, shippingMethods } from "@/lib/data";
import { useShop, type Order } from "@/lib/store";

export default function OrderPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  const { orders } = useShop();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const match = orders.find((item) => item.reference === reference);
    if (match) {
      setOrder(match);
      return;
    }
    const cached = sessionStorage.getItem("nyarkos-last-order");
    if (!cached) return;
    try {
      const parsed = JSON.parse(cached) as Order;
      if (parsed.reference === reference) setOrder(parsed);
    } catch {
      setOrder(null);
    }
  }, [orders, reference]);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Order not on this device</h1>
        <p className="mt-3 text-muted">
          Track it with your reference and phone number.
        </p>
        <Link href="/track" className="mt-6 inline-flex text-sm font-semibold text-accent">
          Track an order
        </Link>
      </div>
    );
  }

  const shipping = shippingMethods.find((method) => method.id === order.shippingId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Order placed
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold">{order.reference}</h1>
      <p className="mt-3 text-muted">
        {order.paymentStatus === "pay_on_delivery"
          ? "Pay the rider when the polo arrives."
          : "The hub will confirm your Mobile Money or card payment before packing."}
      </p>
      <div className="mt-8 space-y-3 rounded-3xl border border-border bg-surface p-6 text-sm">
        {order.items.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex justify-between">
            <span>
              {item.name} · {item.size} × {item.qty}
            </span>
            <span>{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-border pt-3">
          <span>Delivery · {shipping?.name}</span>
          <span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span>
        </div>
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted">
        {order.customer.name} · {order.customer.phone}
        <br />
        {order.customer.address}, {order.customer.city}
      </p>
      <Link href="/shop" className="mt-8 inline-flex text-sm font-semibold text-accent">
        Continue shopping
      </Link>
    </div>
  );
}