import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, MessageSquare, Package, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const steps = [
  {
    icon: MessageSquare,
    title: "Share Your Idea",
    description: "Tell us about your vision and requirements",
  },
  {
    icon: Palette,
    title: "We Design",
    description: "Our team creates a custom 3D model",
  },
  {
    icon: Package,
    title: "You Receive",
    description: "High-quality print delivered to you",
  },
];

export function CustomOrderCTA() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-page">
        <ScrollReveal>
          <div className="relative bg-gradient-to-br from-card via-card to-accent/30 border border-border rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6"
                >
                  <Wand2 className="h-7 w-7 text-primary" />
                </motion.div>
                
                <h2 className="text-foreground">
                  Need Something <span className="font-brand text-primary">Custom?</span>
                </h2>
                <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                  Have a unique idea? We specialize in bringing your custom designs to life 
                  with high-quality 3D printing.
                </p>
              </div>

              <StaggerContainer className="mt-10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto" staggerDelay={0.1}>
                {steps.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <div className="text-center group">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border/60 shadow-sm mb-3 group-hover:border-primary/30 transition-colors duration-200">
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-xs font-bold text-primary mb-1">Step {index + 1}</div>
                      <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="mt-10 text-center"
              >
                <Button asChild size="lg" className="rounded-full px-8 h-12 shadow-lg shadow-primary/15 group">
                  <Link to="/custom-orders">
                    Start Custom Order
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
