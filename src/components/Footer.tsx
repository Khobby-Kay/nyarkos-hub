import Link from "next/link";
import { Instagram, Music2 } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All Polos", href: "/shop" },
      { label: "Quarter Zip", href: "/shop/quarter-zip" },
      { label: "Saved", href: "/wishlist" },
      { label: "Track order", href: "/track" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/policies/shipping" },
      { label: "Returns", href: "/policies/returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Privacy", href: "/policies/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-extrabold">
            Nyarko&apos;s<span className="text-[#87ceeb]">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Men&apos;s premium knit polos — quarter-zips and classics. Six
            styles, one hub, studio quality.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="rounded-full border border-white/20 p-2.5 transition hover:border-white/50"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-full border border-white/20 p-2.5 transition hover:border-white/50"
              aria-label="TikTok"
            >
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Nyarko&apos;s Hub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/policies/privacy" className="hover:text-white/70">
              Privacy
            </Link>
            <Link href="/policies/returns" className="hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}