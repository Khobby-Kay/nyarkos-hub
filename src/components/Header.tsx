"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useShop } from "@/lib/store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/10 bg-[#faf8f6] ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div className="grid h-14 grid-cols-3 items-center px-4 sm:h-16 sm:px-8">
        <div className="flex items-center">
          <button
            type="button"
            className="text-[11px] font-medium uppercase tracking-[0.22em] lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            Menu
          </button>
          <Link
            href="/search"
            className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-black/70 transition hover:text-black lg:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </Link>
        </div>

        <Link
          href="/"
          className="justify-self-center text-center font-display text-[1.15rem] font-semibold uppercase tracking-[0.28em] sm:text-xl sm:tracking-[0.34em]"
        >
          Nyarko&apos;s
        </Link>

        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <Link
            href="/search"
            className="lg:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/account"
            className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-black/70 transition hover:text-black sm:inline-flex sm:items-center sm:gap-2"
          >
            <User className="h-3.5 w-3.5" />
            Account
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]"
            aria-label={`Bag, ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Bag</span>
            <span>{cartCount}</span>
          </Link>
        </div>
      </div>

      <nav
        className="hidden justify-center gap-8 border-t border-black/10 py-2.5 lg:flex"
        aria-label="Main"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-black/70 transition hover:text-black"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#faf8f6] lg:hidden"
          >
            <div className="flex h-14 items-center justify-between px-4">
              <span className="text-[11px] uppercase tracking-[0.22em]">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-black/10 py-4 font-display text-3xl font-semibold tracking-tight"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="mt-8 text-[11px] uppercase tracking-[0.22em]"
              >
                Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}