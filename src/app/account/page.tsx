"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { useShop } from "@/lib/store";

export default function AccountPage() {
  const { ready, orders } = useShop();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Your orders</h1>
      <p className="mt-3 text-muted">
        Orders placed on this browser are listed here. Guest checkout does not
        need an account.
      </p>
      <div className="mt-6 flex gap-4 text-sm font-semibold">
        <Link href="/wishlist" className="text-accent">
          Saved polos
        </Link>
        <Link href="/track" className="text-accent">
          Track an order
        </Link>
      </div>
      {!ready ? <p className="mt-8 text-sm text-muted">Loading…</p> : null}
      {ready && orders.length === 0 ? (
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white"
        >
          Start shopping
        </Link>
      ) : null}
      <ul className="mt-8 divide-y divide-border">
        {orders.map((order) => (
          <li key={order.reference} className="flex items-center justify-between py-4">
            <div>
              <Link href={`/order/${order.reference}`} className="font-semibold">
                {order.reference}
              </Link>
              <p className="text-sm text-muted">
                {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                {order.paymentStatus.replace(/_/g, " ")}
              </p>
            </div>
            <span className="font-bold">{formatPrice(order.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}