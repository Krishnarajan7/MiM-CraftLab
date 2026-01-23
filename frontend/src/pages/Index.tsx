import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { CustomOrderCTA } from "@/components/home/CustomOrderCTA";
import { TrustIndicators } from "@/components/home/TrustIndicators";

const Index = () => {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <FeaturedProducts />
      <FeaturedCourses />
      <CustomOrderCTA />
    </>
  );
};

export default Index;
