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
    <section className="w-full bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 border-y border-border/30 overflow-hidden">
      <div className="w-full py-4 sm:py-6 md:py-8">
        <div className="container-page">
          <motion.div 
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
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
                className="flex items-center gap-2 sm:gap-3 group p-2.5 sm:p-3 md:p-0 bg-background/60 md:bg-transparent rounded-xl md:rounded-none"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-colors duration-200 flex-shrink-0">
                  <indicator.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-[10px] sm:text-xs md:text-sm truncate">
                    {indicator.title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground truncate">
                    {indicator.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
