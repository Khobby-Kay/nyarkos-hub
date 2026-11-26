import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nyarko's Hub | Premium Knit Polos",
  description:
    "Shop Nyarko's Hub — men's premium short-sleeve knit polos. Quarter-zip and button styles, limited collection, delivery across Ghana.",
  openGraph: {
    title: "Nyarko's Hub",
    description: "Premium knit polos — the full hub collection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700&family=Syne:wght@500..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain antialiased">
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
