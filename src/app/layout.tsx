import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShopProvider } from "@/lib/store";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Knit Polos`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Knit Polos`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-GH">
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
        <ShopProvider>
          <AnnouncementBar />
          <Header />
          <main className="min-h-screen pb-24 lg:pb-0">{children}</main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}