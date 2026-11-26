"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
      <Image
        src="/hero/lifestyle-portrait.jpg"
        alt="A man and a woman in knit polos standing beside a luxury car"
        fill
        priority
        className="object-cover object-center lg:hidden"
        sizes="100vw"
      />
      <Image
        src="/hero/lifestyle-wide.jpg"
        alt="A man and a woman in knit polos standing beside a luxury car"
        fill
        priority
        className="hidden object-cover object-center lg:block"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-end px-4 py-12 sm:min-h-[92vh] sm:px-6 sm:py-16 lg:justify-center lg:px-10 lg:py-20 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-xl text-white"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Nyarko&apos;s Hub. Knit polos only
          </p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.25rem)] font-extrabold leading-[0.92] tracking-tight">
            Quiet luxury.
            <br />
            <span className="text-white/80">Loud knit.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Premium short-sleeve knitted polos. Quarter-zips and classics.
            Limited drops, made for the evening and the drive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              Shop all polos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/shop/quarter-zip"
              className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Quarter zip styles
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-white/20 pt-6 text-sm sm:gap-8 sm:pt-8">
            <div>
              <p className="font-display text-2xl font-bold">6</p>
              <p className="text-xs text-white/70 sm:text-sm">Exclusive styles</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold">100%</p>
              <p className="text-xs text-white/70 sm:text-sm">Knit polos</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold">GH</p>
              <p className="text-xs text-white/70 sm:text-sm">Nationwide</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
