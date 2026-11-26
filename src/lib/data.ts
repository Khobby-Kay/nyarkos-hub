export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string;
  tag?: string;
  image: string;
  colors: string[];
  description: string;
};

export type Category = {
  slug: string;
  title: string;
  image: string;
  count: number;
};

export const categories: Category[] = [
  {
    slug: "quarter-zip",
    title: "Quarter Zip",
    image: "/products/polo-navy-stripe-zip.jpg",
    count: 3,
  },
  {
    slug: "striped",
    title: "Striped",
    image: "/products/polo-grey-chevron.jpg",
    count: 1,
  },
  {
    slug: "classic",
    title: "Button Polos",
    image: "/products/polo-resort-stripe.jpg",
    count: 1,
  },
  {
    slug: "textures",
    title: "Textured Knit",
    image: "/products/polo-diamond-cream.jpg",
    count: 1,
  },
];

export const products: Product[] = [
  {
    id: "diamond-cream-zip",
    name: "Diamond Cable Quarter Zip — Cream",
    price: 420,
    category: "textures",
    tag: "Bestseller",
    image: "/products/polo-diamond-cream.jpg",
    colors: ["#f5f0eb", "#0c0c0c"],
    description:
      "Cream knit with embossed diamond cable texture, ribbed collar, and silver quarter-zip hardware.",
  },
  {
    id: "navy-resort-zip",
    name: "Navy Resort Stripe Quarter Zip",
    price: 450,
    category: "quarter-zip",
    tag: "New",
    image: "/products/polo-navy-stripe-zip.jpg",
    colors: ["#1e3a5f", "#87ceeb", "#ffffff"],
    description:
      "Vertical navy, white, and sky-blue stripes with herringbone knit shoulders and quarter zip.",
  },
  {
    id: "grey-chevron-polo",
    name: "Grey Chevron Stripe Polo",
    price: 400,
    category: "striped",
    image: "/products/polo-grey-chevron.jpg",
    colors: ["#9ca3af", "#ffffff"],
    description:
      "Grey and white vertical stripes with zigzag knit texture, classic button placket.",
  },
  {
    id: "resort-pointelle-polo",
    name: "Resort Pointelle Stripe Polo",
    price: 430,
    category: "classic",
    tag: "Limited",
    image: "/products/polo-resort-stripe.jpg",
    colors: ["#f5f0eb", "#1e3a5f", "#87ceeb"],
    description:
      "Cream pointelle knit with navy and sky stripes, ribbed cuffs with dual navy lines.",
  },
  {
    id: "forest-band-zip",
    name: "Forest Band Quarter Zip",
    price: 460,
    compareAt: 520,
    category: "quarter-zip",
    tag: "Sale",
    image: "/products/polo-forest-stripe-zip.jpg",
    colors: ["#1b4332", "#0c0c0c", "#ffffff"],
    description:
      "Forest green, black, and perforated white horizontal bands with gold zip and black rib trim.",
  },
  {
    id: "heritage-colorblock-zip",
    name: "Heritage Colorblock Quarter Zip",
    price: 480,
    category: "quarter-zip",
    image: "/products/polo-colorblock-zip.jpg",
    colors: ["#1b4332", "#5c4033", "#ffffff"],
    description:
      "Green, brown, and pointelle white panels with chocolate ribbing and gold zipper.",
  },
];

export const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Quarter Zip", href: "/shop/quarter-zip" },
  { label: "Striped", href: "/shop/striped" },
  { label: "Button Polos", href: "/shop/classic" },
];

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}