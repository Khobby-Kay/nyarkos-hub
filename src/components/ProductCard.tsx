"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const image = product.image;
  const discount =
    product.compareAt &&
    Math.round((1 - product.price / product.compareAt) * 100);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e8ecf0]">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-contain p-3 transition duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {product.tag}
          </span>
        )}
        {discount ? (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-1 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        ) : null}
        <button
          type="button"
          className="absolute bottom-14 right-3 hidden rounded-full bg-surface/90 p-2 shadow transition hover:bg-white group-hover:block"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
          Quick add
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{formatPrice(product.price)}</span>
          {product.compareAt ? (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compareAt)}
            </span>
          ) : null}
        </div>
        <div className="flex gap-1.5 pt-0.5">
          {product.colors.map((c) => (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-border"
              style={{ backgroundColor: c }}
              title="Color option"
            />
          ))}
        </div>
      </div>
    </article>
  );
}