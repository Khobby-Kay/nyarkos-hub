import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Nyarko's",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#faf8f6",
    theme_color: "#141414",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}