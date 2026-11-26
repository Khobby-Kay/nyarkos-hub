import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nyarkos-hub.vercel.app";
  const staticRoutes = [
    "",
    "/shop",
    "/cart",
    "/checkout",
    "/track",
    "/wishlist",
    "/account",
    "/faq",
    "/about",
    "/contact",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...categories.map((category) => ({
      url: `${base}/shop/${category.slug}`,
      lastModified: new Date(),
    })),
    ...products.map((product) => ({
      url: `${base}/product/${product.id}`,
      lastModified: new Date(),
    })),
  ];
}