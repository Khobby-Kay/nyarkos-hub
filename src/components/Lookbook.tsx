import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

export function Lookbook() {
  return (
    <section className="bg-ink py-14 text-white sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              #NyarkosHub
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              From the studio
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            The full drop, shot the way it ships. Tap a frame to open the polo.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#1c2430]"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-3 transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-ink opacity-0 transition group-hover:opacity-100">
                {product.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}