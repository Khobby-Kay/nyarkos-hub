"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  fabricNote,
  formatPrice,
  getProduct,
  relatedProducts,
  sizeGuide,
  sizes,
  stockFor,
  type Product,
  type Size,
} from "@/lib/data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, viewProduct, recent } = useShop();
  const [size, setSize] = useState<Size>("M");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const available = stockFor(product.id, size);
  const saved = wishlist.includes(product.id);
  const discount =
    product.compareAt &&
    Math.round((1 - product.price / product.compareAt) * 100);

  useEffect(() => {
    viewProduct(product.id);
  }, [product.id, viewProduct]);

  function handleAdd() {
    const error = addToCart(product.id, size, qty);
    setMessage(error ?? `${product.name} (${size}) added to your bag.`);
  }

  const viewed = recent
    .filter((id) => id !== product.id)
    .map((id) => getProduct(id))
    .filter((item): item is Product => Boolean(item));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm text-muted">
        <Link href="/shop" className="hover:text-accent">
          Shop
        </Link>{" "}
        / {product.name}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#e8ecf0]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-contain p-6 sm:p-10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          {product.tag ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {product.tag}
            </p>
          ) : null}
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
            {product.compareAt ? (
              <p className="text-muted line-through">{formatPrice(product.compareAt)}</p>
            ) : null}
            {discount ? (
              <span className="rounded-full bg-accent px-2 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            ) : null}
          </div>
          <p className="mt-4 max-w-lg text-muted">{product.description}</p>
          <p className="mt-3 text-sm text-muted">{fabricNote}</p>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-semibold">Size</p>
            <button
              type="button"
              onClick={() => setGuideOpen((open) => !open)}
              className="text-sm font-semibold text-accent"
            >
              Size guide
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            {sizes.map((item) => {
              const left = stockFor(product.id, item);
              return (
                <button
                  key={item}
                  type="button"
                  disabled={left === 0}
                  onClick={() => {
                    setSize(item);
                    setQty(1);
                  }}
                  className={`h-11 w-12 rounded-full text-sm font-semibold ${
                    size === item
                      ? "bg-ink text-white"
                      : "border border-border bg-surface"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-muted">
            {available > 0 ? `${available} in stock` : "Out of stock in this size"}
          </p>
          {guideOpen ? (
            <ul className="mt-3 space-y-1 rounded-2xl border border-border p-4 text-sm">
              {sizeGuide.map((row) => (
                <li key={row.size} className="flex justify-between">
                  <span>{row.size}</span>
                  <span className="text-muted">Chest {row.chest}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-semibold" htmlFor="qty">
              Qty
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              max={Math.max(available, 1)}
              value={qty}
              onChange={(event) => setQty(Number(event.target.value) || 1)}
              className="w-20 rounded-full border border-border px-3 py-2"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={available === 0}
              onClick={handleAdd}
              className="rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {available === 0 ? "Out of stock" : "Add to bag"}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold"
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
          {message ? <p className="mt-3 text-sm">{message}</p> : null}
          <p className="mt-6 text-sm text-muted">
            Free Accra delivery on orders GH₵500+. Returns within 7 days if unworn.
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {relatedProducts(product.id).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
      {viewed.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Recently viewed</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {viewed.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}