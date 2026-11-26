import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata = {
  title: "Shop All | Nyarko's Hub",
};

export default function ShopPage() {
  return (
    <div className="pt-4">
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Shop all
        </h1>
        <p className="mt-2 text-muted">
          Six knit polos — quarter-zip, striped, classic, and textured.
        </p>
      </div>
      <CategoryStrip />
      <ProductGrid title="All styles" limit={8} />
    </div>
  );
}