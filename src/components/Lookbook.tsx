import Image from "next/image";
import { products } from "@/lib/data";

export function Lookbook() {
  const shots = products.slice(0, 4);

  return (
    <section className="bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            The collection
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Every style in the hub
          </h2>
          <p className="mt-3 text-muted">
            What you see is what Nyarko sells — knit polos, shot in-studio, no
            filler catalog.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((product) => (
            <div
              key={product.id}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e8ecf0]"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4 transition duration-700 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}