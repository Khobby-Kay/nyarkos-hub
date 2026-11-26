"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formatPrice, products } from "@/lib/data";

const featured = products[0];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-10 lg:py-24 xl:px-14"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Nyarko&apos;s Hub — knit polos only
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold leading-[0.95] tracking-tight">
            Quiet luxury.
            <br />
            <span className="text-muted">Loud knit.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Premium short-sleeve knitted polos — quarter-zips and classics.
            Studio-shot pieces, limited drops, made for the hub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Shop all polos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/shop/quarter-zip"
              className="inline-flex items-center rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-semibold transition hover:border-foreground/30"
            >
              Quarter zip styles
            </Link>
          </div>
          <div className="mt-10 flex gap-8 border-t border-border pt-8 text-sm">
            <div>
              <p className="font-display text-2xl font-bold">6</p>
              <p className="text-muted">Exclusive styles</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold">100%</p>
              <p className="text-muted">Knit polos</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold">GH</p>
              <p className="text-muted">Nationwide delivery</p>
            </div>
          </div>
        </motion.div>

        <div className="relative aspect-[4/5] min-h-[420px] bg-[#e8ecf0] lg:aspect-auto lg:min-h-[min(85vh,720px)]">
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            priority
            className="object-contain object-center p-6 sm:p-10"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border bg-surface/95 p-4 shadow-lg backdrop-blur-md sm:left-auto sm:right-8 sm:max-w-xs"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Featured knit
            </p>
            <p className="mt-1 font-display text-lg font-bold text-ink">
              {featured.name.split("—")[0].trim()} — {formatPrice(featured.price)}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}