import { Star, Truck, Shield, HeartHandshake } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const indicators = [
  {
    icon: Star,
    title: "4.9 Star Rating",
    description: "From 500+ reviews",
  },
  {
    icon: Truck,
    title: "Fast UK Shipping",
    description: "3-5 business days",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% satisfaction",
  },
  {
    icon: HeartHandshake,
    title: "Made with Care",
    description: "Handcrafted pieces",
  },
];

export function TrustIndicators() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-6 bg-muted/30">
      <div className="container-page">
        <motion.div 
          ref={ref}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-16"
        >
          {indicators.map((indicator, index) => (
            <motion.div 
              key={indicator.title} 
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors duration-200">
                <indicator.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {indicator.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {indicator.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
