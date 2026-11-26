import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/lib/data";

export const metadata = {
  title: "Cart | Nyarko's Hub",
};

export default function CartPage() {
  const cartItems = products.slice(0, 2);
  const subtotal = cartItems.reduce((s, p) => s + p.price, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Your bag</h1>
      <p className="mt-1 text-sm text-muted">{cartItems.length} items</p>

      <ul className="mt-10 divide-y divide-border">
        {cartItems.map((item) => (
          <li key={item.id} className="flex gap-4 py-6">
            <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-border">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted">Size M · Qty 1</p>
              </div>
              <p className="font-bold">{formatPrice(item.price)}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">
          Shipping and taxes calculated at checkout.
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-ink py-4 text-sm font-semibold text-white sm:max-w-sm"
        >
          Checkout
        </button>
        <Link
          href="/shop"
          className="mt-4 inline-block text-sm font-semibold text-accent"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}