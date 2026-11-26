export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyarkos-hub.vercel.app";

export const SITE_NAME = "Nyarko's Hub";

export const SITE_DESCRIPTION =
  "Men's premium short-sleeve knit polos. Quarter-zip and classic styles, six exclusive pieces, delivery across Ghana.";

export const SITE_OG_IMAGE = {
  url: "/hero/lifestyle.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}. Premium knit polos in Ghana.`,
} as const;