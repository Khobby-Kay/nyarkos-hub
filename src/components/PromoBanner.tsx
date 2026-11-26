import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#1e3a5f] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              Hub exclusive
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Forest Band
              <br />
              <span className="text-white/90">on sale now</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/70 sm:text-base">
              One style marked down while stock lasts. Every other piece is
              full price, full quality.
            </p>
            <Link
              href="/shop/quarter-zip"
              className="mt-8 inline-flex w-fit rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#1e3a5f] transition hover:bg-white/90"
            >
              Shop quarter zips
            </Link>
          </div>
          <div className="relative min-h-[280px] bg-[#e8ecf0] lg:min-h-[360px]">
            <Image
              src="/products/polo-forest-stripe-zip.jpg"
              alt="Forest Band Quarter Zip polo"
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}