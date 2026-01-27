import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isPersonalised?: boolean;
  rating?: number;
  originalPrice?: number;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isPersonalised,
  rating = 4.5 + Math.random() * 0.5,
  originalPrice,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      to={`/shop/${id}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <motion.img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        
        {/* Like button */}
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.85 }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isLiked 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background/90 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100'
          }`}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.div>
        </motion.button>

        {/* Badges */}
        {isPersonalised && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            Personalised
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </p>
        <h3 className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-0.5 sm:gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} 
            />
          ))}
          <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-2 sm:mt-3 flex items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-lg font-bold text-foreground">
              £{price.toFixed(2)}
            </p>
            {originalPrice && (
              <p className="text-xs sm:text-sm text-muted-foreground line-through">
                £{originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Animated Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full relative overflow-hidden transition-colors duration-300 ${
              isAddingToCart 
                ? 'bg-green-500 hover:bg-green-500' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            disabled={isAddingToCart}
          >
            <AnimatePresence mode="wait">
              {isAddingToCart ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    whileHover={{ 
                      x: [0, -2, 2, -2, 0],
                      transition: { duration: 0.4, repeat: Infinity }
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 text-primary-foreground" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </Link>
  );
}