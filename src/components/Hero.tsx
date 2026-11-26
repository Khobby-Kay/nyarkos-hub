"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] overflow-hidden">
      <Image
        src="/hero/lifestyle.jpg"
        alt="A man and a woman in knit polos talking beside a black car"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-3xl text-white"
        >
          <h1 className="font-display text-[clamp(3.4rem,8.5vw,7rem)] font-extrabold leading-[0.88] tracking-tight">
            Pull up
            <br />
            proper.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/85 sm:text-lg">
            Knit polos for the car and the rest of the night. Six styles.
            That&apos;s the whole shop.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              Shop the polos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/shop/quarter-zip"
              className="inline-flex items-center rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Quarter zips
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
