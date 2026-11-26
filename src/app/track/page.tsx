"use client";

import { FormEvent, useState } from "react";
import { formatPrice } from "@/lib/data";
import { useShop, type Order } from "@/lib/store";

export default function TrackPage() {
  const { findOrder, ready } = useShop();
  const [order, setOrder] = useState<Order | null>(null);
  const [missing, setMissing] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const found = findOrder(
      String(form.get("reference") ?? ""),
      String(form.get("phone") ?? ""),
    );
    setOrder(found ?? null);
    setMissing(!found);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Track an order</h1>
      <p className="mt-2 text-sm text-muted">
        Use the reference from your confirmation and the phone number on the order.
        Tracking on this device uses the orders placed in this browser.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <input name="reference" required placeholder="Order reference" className="field" />
        <input name="phone" required placeholder="Phone number" className="field" />
        <button
          type="submit"
          disabled={!ready}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Find order
        </button>
      </form>
      {missing ? (
        <p className="mt-4 text-sm text-accent">No matching order in this browser.</p>
      ) : null}
      {order ? (
        <div className="mt-6 rounded-2xl border border-border p-4 text-sm">
          <p className="font-semibold">{order.reference}</p>
          <p className="text-muted">{order.paymentStatus.replace(/_/g, " ")}</p>
          <p className="mt-2">{formatPrice(order.total)}</p>
        </div>
      ) : null}
    </div>
  );
}