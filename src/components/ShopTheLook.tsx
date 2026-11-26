import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/data";

const looks = [
  {
    title: "Night studio",
    note: "Navy stripe with the cream cable knit.",
    ids: ["navy-resort-zip", "diamond-cream-zip"],
    image: "/products/polo-navy-stripe-zip.jpg",
  },
  {
    title: "Weekend green",
    note: "Forest band with the heritage colorblock.",
    ids: ["forest-band-zip", "heritage-colorblock-zip"],
    image: "/products/polo-forest-stripe-zip.jpg",
  },
];

export function ShopTheLook() {
  return (
    <section className="bg-[#f3efe9] py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Shop the look
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          Two ways to wear the drop
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {looks.map((look) => (
            <article
              key={look.title}
              className="grid overflow-hidden rounded-3xl bg-surface sm:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative min-h-[280px] bg-[#e8ecf0]">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold">{look.title}</h3>
                <p className="mt-2 text-sm text-muted">{look.note}</p>
                <ul className="mt-6 space-y-3">
                  {look.ids.map((id) => {
                    const product = getProduct(id);
                    if (!product) return null;
                    return (
                      <li key={id}>
                        <Link
                          href={`/product/${product.id}`}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-border px-3 py-2 text-sm transition hover:border-foreground/30"
                        >
                          <span className="font-medium">{product.name}</span>
                          <span className="shrink-0 font-semibold">
                            {formatPrice(product.price)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}