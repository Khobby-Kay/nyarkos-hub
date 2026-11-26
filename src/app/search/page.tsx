"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

function SearchResults() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((product) =>
      `${product.name} ${product.description} ${product.category}`
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold">Search</h1>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search knit polos"
        className="field mt-6 max-w-xl"
        aria-label="Search products"
      />
      <p className="mt-4 text-sm text-muted">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>
      {results.length === 0 ? (
        <p className="mt-8 text-muted">No polos match that search.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-sm text-muted">Loading search…</div>}>
      <SearchResults />
    </Suspense>
  );
}