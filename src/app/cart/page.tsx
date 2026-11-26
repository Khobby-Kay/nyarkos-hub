"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/data";
import { useShop } from "@/lib/store";

export default function CartPage() {
  const { ready, cart, updateQty, removeFromCart, subtotal } = useShop();
  if (!ready) return <div className="px-4 py-16 text-sm text-muted">Loading bag…</div>;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Your bag</h1>
      {cart.length === 0 ? (
        <div className="mt-8">
          <p className="text-muted">Your bag is empty.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Shop polos
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-border">
            {cart.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 py-6"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#e8ecf0]"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                      sizes="96px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted">Size {item.size}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        aria-label={`Quantity for ${product.name}`}
                        onChange={(event) =>
                          updateQty(
                            item.productId,
                            item.size,
                            Number(event.target.value) || 1,
                          )
                        }
                        className="w-16 rounded-full border border-border px-2 py-1 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.size)}
                        className="text-sm text-muted hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">
                    {formatPrice(product.price * item.qty)}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 max-w-sm">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Delivery is added at checkout. Accra delivery is free from GH₵500.
            </p>
            <Link
              href="/checkout"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-ink py-4 text-sm font-semibold text-white"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}