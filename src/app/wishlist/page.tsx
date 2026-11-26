"use client";

import Link from "next/link";
import { getProduct, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { ready, wishlist } = useShop();
  const products = wishlist
    .map((id) => getProduct(id))
    .filter((item): item is Product => item != null);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Saved</h1>
      {!ready ? <p className="mt-4 text-sm text-muted">Loading…</p> : null}
      {ready && products.length === 0 ? (
        <p className="mt-4 text-muted">
          Nothing saved yet.{" "}
          <Link href="/shop" className="font-semibold text-accent">
            Browse the polos
          </Link>
        </p>
      ) : null}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}