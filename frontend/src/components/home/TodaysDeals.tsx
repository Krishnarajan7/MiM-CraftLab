import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

const dealProducts = [
  {
    id: "deal-1",
    name: "Handcrafted Wooden Photo Frame - Premium Oak",
    price: 24.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=400&fit=crop",
    category: "Home Decor",
    isPersonalised: true,
  },
  {
    id: "deal-2",
    name: "Personalized Family Name Sign - Rustic Style",
    price: 32.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop",
    category: "Wall Art",
    isPersonalised: true,
  },
  {
    id: "deal-3",
    name: "Custom Engraved Wooden Jewelry Box",
    price: 28.99,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    category: "Gifts",
    isPersonalised: true,
  },
  {
    id: "deal-4",
    name: "Artisan Crafted Ceramic Vase Set",
    price: 39.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
    category: "Home Decor",
  },
  {
    id: "deal-5",
    name: "Hand-Painted Canvas Art - Abstract",
    price: 54.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=400&fit=crop",
    category: "Wall Art",
  },
  {
    id: "deal-6",
    name: "Premium Leather Journal - Handbound",
    price: 19.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    category: "Stationery",
    isPersonalised: true,
  },
];

// Memoized timer component to prevent re-renders from carousel
const CountdownTimer = React.memo(function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Calculate time until midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex flex-col items-center">
        <div className="bg-foreground text-background rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-lg sm:text-xl">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Hours</span>
      </div>
      <span className="text-foreground font-bold text-xl mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-foreground text-background rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-lg sm:text-xl">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Mins</span>
      </div>
      <span className="text-foreground font-bold text-xl mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-foreground text-background rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-lg sm:text-xl">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <span className="text-xs text-muted-foreground mt-1">Secs</span>
      </div>
    </div>
  );
});

export function TodaysDeals() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Title */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-destructive/10 p-2 rounded-full"
              >
                <Flame className="h-6 w-6 text-destructive" />
              </motion.div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Today's Big Deals
                </h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Clock className="h-3.5 w-3.5" />
                  Limited time offers - Don't miss out!
                </p>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3 pl-0 sm:pl-6 sm:border-l border-border">
              <CountdownTimer />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="h-10 w-10 rounded-full border-border hover:bg-accent disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="h-10 w-10 rounded-full border-border hover:bg-accent disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products Slider with Embla */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {dealProducts.map((product) => (
              <div 
                key={product.id} 
                className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
