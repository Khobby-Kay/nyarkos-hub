"use client";

import { useMemo, useState } from "react";
import { products, sizes, stockFor, type Size } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  heading: string;
  intro?: string;
  category?: string;
};

export function Catalogue({ heading, intro, category }: Props) {
  const [size, setSize] = useState<Size | "all">("all");
  const [maxPrice, setMaxPrice] = useState(600);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("newest");

  const list = useMemo(() => {
    let next = products.filter((product) =>
      category ? product.category === category : true,
    );
    next = next.filter((product) => product.price <= maxPrice);
    if (size !== "all") {
      next = next.filter((product) => stockFor(product.id, size) > 0);
    }
    if (inStock) {
      next = next.filter((product) =>
        sizes.some((item) => stockFor(product.id, item) > 0),
      );
    }
    if (sort === "price-asc") next = [...next].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") next = [...next].sort((a, b) => b.price - a.price);
    if (sort === "name") next = [...next].sort((a, b) => a.name.localeCompare(b.name));
    return next;
  }, [category, inStock, maxPrice, size, sort]);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{heading}</h1>
        {intro ? <p className="mt-2 max-w-xl text-muted">{intro}</p> : null}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton active={size === "all"} onClick={() => setSize("all")}>
              All sizes
            </FilterButton>
            {sizes.map((item) => (
              <FilterButton
                key={item}
                active={size === item}
                onClick={() => setSize(item)}
              >
                {item}
              </FilterButton>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              Up to GH₵{maxPrice}
              <input
                type="range"
                min={400}
                max={600}
                step={10}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(event) => setInStock(event.target.checked)}
              />
              In stock
            </label>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-border bg-background px-3 py-2"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">{list.length} styles</p>
      </div>
      <section className="pb-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-4 gap-y-8 px-4 sm:gap-x-5 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {list.length === 0 ? (
          <p className="px-4 text-center text-muted">
            Nothing matches those filters. Clear a size or raise the price.
          </p>
        ) : null}
      </section>
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm ${
        active ? "bg-ink text-white" : "border border-border bg-background"
      }`}
    >
      {children}
    </button>
  );
}