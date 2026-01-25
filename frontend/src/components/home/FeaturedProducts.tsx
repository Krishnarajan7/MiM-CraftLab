import { Link } from "react-router-dom";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

// Sample product data
const featuredProducts = [
  {
    id: "1",
    name: "Geometric Desk Organizer",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Desk Items",
    isPersonalised: false,
  },
  {
    id: "2",
    name: "Custom Name Night Light",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Gifts",
    isPersonalised: true,
  },
  {
    id: "3",
    name: "Modern Plant Pot Set",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Home Decor",
    isPersonalised: false,
  },
  {
    id: "4",
    name: "Personalized Photo Frame",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=400&fit=crop",
    category: "Gifts",
    isPersonalised: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="section-spacing w-full">
      {/* Full-width background */}
      <div className="w-full bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container-page py-2">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
              <div>
                <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">Shop Our Collection</span>
                <h2 className="text-foreground mt-2 text-xl sm:text-2xl md:text-3xl">
                  Featured <span className="font-brand text-primary">Products</span>
                </h2>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-md">
                  Our most popular 3D printed creations, handcrafted with love and precision
                </p>
              </div>
              <motion.div whileHover={{ x: 5 }}>
                <Button asChild variant="ghost" className="hidden sm:inline-flex group">
                  <Link to="/shop">
                    View all products
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6" staggerDelay={0.1}>
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard {...product} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3} className="mt-8 md:mt-10 text-center sm:hidden">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/shop">
                View all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
