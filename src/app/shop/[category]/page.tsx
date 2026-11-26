import { notFound } from "next/navigation";
import { Catalogue } from "@/components/Catalogue";
import { categories } from "@/lib/data";

type Props = { params: Promise<{ category: string }> };

const titles: Record<string, string> = {
  "quarter-zip": "Quarter Zip",
  striped: "Striped",
  classic: "Button Polos",
  textures: "Textured Knit",
};

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return { title: `${titles[category] ?? "Shop"} | Nyarko's Hub` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!categories.some((item) => item.slug === category)) notFound();
  return (
    <Catalogue
      heading={titles[category] ?? "Collection"}
      intro="Curated knit polos from the hub."
      category={category}
    />
  );
}