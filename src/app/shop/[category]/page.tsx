import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { categories } from "@/lib/data";

type Props = {
  params: Promise<{ category: string }>;
};

const titles: Record<string, string> = {
  "quarter-zip": "Quarter Zip",
  striped: "Striped",
  classic: "Button Polos",
  textures: "Textured Knit",
};

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const title = titles[category] ?? "Shop";
  return { title: `${title} | Nyarko's Hub` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const known = categories.some((c) => c.slug === category);

  if (!known) notFound();

  const title = titles[category] ?? "Collection";

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-muted">
          Curated knit polos — only what&apos;s in stock at the hub.
        </p>
      </div>
      <ProductGrid title={title} filterCategory={category} limit={6} />
    </div>
  );
}