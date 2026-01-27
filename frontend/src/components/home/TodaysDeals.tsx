import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { motion } from "framer-motion";

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

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
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
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div 
        key={value}
        initial={{ y: -5, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-foreground text-background rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-lg sm:text-xl"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-foreground font-bold text-xl mb-4">:</span>
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <span className="text-foreground font-bold text-xl mb-4">:</span>
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

export function TodaysDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Number of products to show based on screen size
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      return 2;
    }
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, dealProducts.length - visibleCount);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = dealProducts.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="h-10 w-10 rounded-full border-border hover:bg-accent disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="h-10 w-10 rounded-full border-border hover:bg-accent disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
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