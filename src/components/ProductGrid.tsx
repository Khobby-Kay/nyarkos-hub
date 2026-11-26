import Link from "next/link";
import { products, type Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";

type Props = {
  title?: string;
  eyebrow?: string;
  limit?: number;
  filterCategory?: string;
  ids?: string[];
};

export function ProductGrid({
  title = "Trending now",
  eyebrow = "Nyarko's picks",
  limit = 8,
  filterCategory,
  ids,
}: Props) {
  let list = products;
  if (ids) {
    list = ids
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => product != null);
  } else if (filterCategory === "sale") {
    list = products.filter((p) => p.compareAt);
  } else if (filterCategory) {
    list = products.filter((p) => p.category === filterCategory);
  }

  const shown = list.slice(0, limit);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              {title}
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold hover:text-accent sm:inline"
          >
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}