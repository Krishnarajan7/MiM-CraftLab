import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Zap, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Product images for rotation
const heroProducts = [
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    alt: "Geometric desk organizer",
    label: "Desk Organizer",
  },
  {
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop",
    alt: "Modern plant pots",
    label: "Plant Pots",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    alt: "Custom night light",
    label: "Night Light",
  },
  {
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=600&fit=crop",
    alt: "Personalized frame",
    label: "Photo Frame",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Premium background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Full-width hero content */}
      <div className="w-full">
        <div className="container-page py-10 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl order-2 lg:order-1"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-5"
              >
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Handcrafted 3D Prints</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-foreground"
              >
                <span className="block text-sm md:text-base text-muted-foreground font-normal mb-2">
                  Welcome to MimCraft Lab
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Unique Creations for Your
                </span>
                <span className="relative inline-block mt-2">
                  <span className="font-brand text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Home</span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30 rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="mt-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                Discover handcrafted 3D printed gifts, desk accessories, and home decor — each piece made with precision and care.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 mt-6 py-4 border-y border-border/40"
              >
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">500+</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Happy Customers</p>
                </div>
                <div className="w-px h-8 sm:h-10 bg-border/60" />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 sm:h-3.5 w-3 sm:w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <div>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-foreground">4.9</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
                <div className="w-px h-8 sm:h-10 bg-border/60 hidden sm:block" />
                <div className="hidden sm:block">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">UK</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Made & Shipped</p>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
              >
                <Button asChild size="lg" className="rounded-full px-6 sm:px-7 h-11 sm:h-12 text-sm shadow-lg shadow-primary/20 group">
                  <Link to="/shop">
                    Browse Collection
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-4 sm:px-5 h-11 sm:h-12 text-sm group border-border/60">
                  <Link to="/courses" className="flex items-center justify-center gap-2">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-200">
                      <Play className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-primary ml-0.5" />
                    </span>
                    Explore Courses
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image with Rotation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative order-1 lg:order-2"
            >
              {/* Main image container */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-foreground/8">
                <div className="aspect-[4/3] lg:aspect-[5/4]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                      key={currentIndex}
                      src={heroProducts[currentIndex].image}
                      alt={heroProducts[currentIndex].alt}
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </AnimatePresence>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {heroProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "w-6 bg-white" 
                          : "w-1.5 bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`View product ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Current product label */}
                <motion.div
                  key={`label-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-12 left-4 sm:left-6 bg-background/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-foreground shadow-lg"
                >
                  {heroProducts[currentIndex].label}
                </motion.div>
              </div>


              {/* Floating badge - New Arrivals */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 bg-primary text-primary-foreground rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg flex items-center gap-1.5"
              >
                <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] sm:text-xs font-semibold">New Arrivals</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
