"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Home, Search, ShoppingBag, Store, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useShop } from "@/lib/store";

const glass =
  "border border-white/70 bg-white/65 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={`pointer-events-auto mx-auto flex max-w-[1100px] items-center gap-2 rounded-full px-2 py-2 transition sm:px-3 ${glass} ${
            scrolled ? "bg-white/80" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full px-3 py-2 text-[13px] font-medium text-black/80 lg:hidden"
          >
            Menu
          </button>

          <Link
            href="/"
            className="min-w-0 flex-1 truncate px-1 text-center font-display text-[15px] font-semibold tracking-tight sm:text-base lg:flex-none lg:px-3 lg:text-left"
          >
            Nyarko&apos;s
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                    active ? "bg-black text-white" : "text-black/70 hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <IconLink href="/search" label="Search" className="hidden sm:inline-flex">
              <Search className="h-4 w-4" />
            </IconLink>
            <IconLink href="/account" label="Account" className="hidden sm:inline-flex">
              <User className="h-4 w-4" />
            </IconLink>
            <IconLink href="/cart" label={`Bag, ${cartCount} items`}>
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              ) : null}
            </IconLink>
          </div>
        </div>
      </header>

      <nav
        className={`fixed inset-x-3 z-50 grid grid-cols-4 rounded-full px-1 py-1 lg:hidden ${glass}`}
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        aria-label="Mobile"
      >
        <Tab href="/" label="Home" active={pathname === "/"}>
          <Home className="h-[18px] w-[18px]" />
        </Tab>
        <Tab href="/shop" label="Shop" active={pathname.startsWith("/shop") || pathname.startsWith("/product")}>
          <Store className="h-[18px] w-[18px]" />
        </Tab>
        <Tab href="/search" label="Search" active={pathname.startsWith("/search")}>
          <Search className="h-[18px] w-[18px]" />
        </Tab>
        <Tab href="/cart" label="Bag" active={pathname.startsWith("/cart")}>
          <span className="relative">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-1.5 text-[10px] font-semibold">{cartCount}</span>
            ) : null}
          </span>
        </Tab>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/25 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className={`absolute inset-x-3 rounded-[28px] p-4 ${glass}`}
              style={{ top: "4.5rem" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-sm font-medium">Browse</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-black/5 p-2"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-3 py-3 text-lg font-medium tracking-tight active:bg-black/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-3 py-3 text-lg font-medium tracking-tight"
                >
                  Account
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconLink({
  href,
  label,
  className = "",
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full text-black/80 transition hover:bg-black/5 ${className}`}
    >
      {children}
    </Link>
  );
}

function Tab({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-medium ${
        active ? "bg-black text-white" : "text-black/60"
      }`}
    >
      {children}
      {label}
    </Link>
  );
}