import { Hero } from "@/components/Hero";
import { SocialMarquee } from "@/components/SocialMarquee";
import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { ShopTheLook } from "@/components/ShopTheLook";
import { Reviews } from "@/components/Reviews";
import { Lookbook } from "@/components/Lookbook";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialMarquee />
      <CategoryStrip />
      <ProductGrid
        eyebrow="Just landed"
        title="New arrivals"
        ids={[
          "navy-resort-zip",
          "grey-chevron-polo",
          "resort-pointelle-polo",
          "heritage-colorblock-zip",
        ]}
      />
      <ProductGrid
        eyebrow="Most wanted"
        title="Best sellers"
        ids={["diamond-cream-zip", "forest-band-zip", "navy-resort-zip"]}
      />
      <PromoBanner />
      <ProductGrid
        eyebrow="This week"
        title="Trending now"
        ids={[
          "heritage-colorblock-zip",
          "grey-chevron-polo",
          "resort-pointelle-polo",
          "forest-band-zip",
        ]}
      />
      <ShopTheLook />
      <Reviews />
      <Lookbook />
      <Newsletter />
    </>
  );
}