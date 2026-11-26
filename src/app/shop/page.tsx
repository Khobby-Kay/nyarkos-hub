import { Catalogue } from "@/components/Catalogue";

export const metadata = {
  title: "Shop All | Nyarko's Hub",
};

export default function ShopPage() {
  return (
    <Catalogue
      heading="Shop all"
      intro="Six knit polos. Filter by size, price, and what is still in stock."
    />
  );
}