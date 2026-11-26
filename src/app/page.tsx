import { Hero } from "@/components/Hero";
import { SocialMarquee } from "@/components/SocialMarquee";
import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { Lookbook } from "@/components/Lookbook";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialMarquee />
      <CategoryStrip />
      <ProductGrid title="All knit polos" limit={6} />
      <PromoBanner />
      <Lookbook />
      <Newsletter />
    </>
  );
}