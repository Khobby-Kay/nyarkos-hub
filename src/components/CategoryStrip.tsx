import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export function CategoryStrip() {
  return (
    <section className="border-y border-border bg-surface py-10 sm:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <Link
            href="/shop"
            className="text-sm font-semibold text-accent hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative min-w-[140px] flex-shrink-0 sm:min-w-[160px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-border">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-display text-sm font-bold sm:text-base">
                    {cat.title}
                  </p>
                  <p className="text-xs text-white/75">{cat.count} styles</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}