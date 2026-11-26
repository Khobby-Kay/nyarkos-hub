import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
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