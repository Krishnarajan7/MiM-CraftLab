import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { CustomOrderCTA } from "@/components/home/CustomOrderCTA";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { TodaysDeals } from "@/components/home/TodaysDeals";
import Testimonials from "@/components/home/Testimonials";

const Index = () => {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <TodaysDeals />
      <FeaturedProducts />
      <FeaturedCourses />
      <Testimonials />
      <CustomOrderCTA />
    </>
  );
};

export default Index;
