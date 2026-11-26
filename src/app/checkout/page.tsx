"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice, shippingMethods, shippingPrice } from "@/lib/data";
import { useShop } from "@/lib/store";

export default function CheckoutPage() {
  const router = useRouter();
  const { ready, cart, subtotal, placeOrder } = useShop();
  const [shippingId, setShippingId] = useState("accra");
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "card" | "cod">(
    "momo",
  );
  const [error, setError] = useState<string | null>(null);
  const delivery = shippingPrice(shippingId, subtotal);
  const total = subtotal + delivery;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      region: String(form.get("region") ?? ""),
      city: String(form.get("city") ?? ""),
      address: String(form.get("address") ?? ""),
      notes: String(form.get("notes") ?? ""),
    };
    if (!customer.name || !customer.phone || !customer.address) {
      setError("Name, phone, and delivery address are required.");
      return;
    }
    const order = placeOrder({ customer, shippingId, paymentMethod });
    if (!order) {
      setError("Your bag is empty.");
      return;
    }
    sessionStorage.setItem("nyarkos-last-order", JSON.stringify(order));
    router.push(`/order/${order.reference}`);
  }

  if (!ready) return <div className="px-4 py-16 text-sm text-muted">Loading checkout…</div>;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Checkout</h1>
        <p className="mt-3 text-muted">Add a polo before checking out.</p>
        <Link href="/shop" className="mt-6 inline-flex text-sm font-semibold text-accent">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1100px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Checkout</h1>
          <p className="mt-2 text-sm text-muted">
            Guest checkout. No account required.
          </p>
        </div>
        <fieldset className="space-y-3">
          <legend className="font-semibold">Contact</legend>
          <input name="name" required placeholder="Full name" className="field" />
          <input name="email" type="email" required placeholder="Email" className="field" />
          <input name="phone" required placeholder="Phone" className="field" />
        </fieldset>
        <fieldset className="space-y-3">
          <legend className="font-semibold">Delivery address</legend>
          <input name="region" required placeholder="Region" className="field" />
          <input name="city" required placeholder="City or town" className="field" />
          <textarea name="address" required placeholder="Address" className="field min-h-24" />
          <textarea name="notes" placeholder="Delivery notes" className="field min-h-20" />
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="font-semibold">Delivery method</legend>
          {shippingMethods.map((method) => {
            const price = shippingPrice(method.id, subtotal);
            return (
              <label
                key={method.id}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-border px-4 py-3"
              >
                <span>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingId === method.id}
                    onChange={() => setShippingId(method.id)}
                    className="mr-2"
                  />
                  {method.name}
                  <span className="mt-1 block text-xs text-muted">{method.estimate}</span>
                </span>
                <span className="font-semibold">
                  {price === 0 ? "Free" : formatPrice(price)}
                </span>
              </label>
            );
          })}
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="font-semibold">Payment</legend>
          {(
            [
              ["momo", "Mobile Money"],
              ["card", "Card"],
              ["cod", "Cash on delivery"],
            ] as const
          ).map(([id, label]) => (
            <label key={id} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === id}
                onChange={() => setPaymentMethod(id)}
              />
              {label}
            </label>
          ))}
          <p className="text-xs text-muted">
            Mobile Money and card payments are confirmed by the hub before the
            order is packed. Cash on delivery is collected by the rider.
          </p>
        </fieldset>
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        <button
          type="submit"
          className="w-full rounded-full bg-ink py-4 text-sm font-semibold text-white"
        >
          Place order · {formatPrice(total)}
        </button>
      </form>
      <aside className="h-fit rounded-3xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl font-bold">Order summary</h2>
        <p className="mt-4 text-sm text-muted">{cart.length} line{cart.length === 1 ? "" : "s"}</p>
        <div className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row label="Delivery" value={delivery === 0 ? "Free" : formatPrice(delivery)} />
          <Row label="Total" value={formatPrice(total)} bold />
        </div>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-bold" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}