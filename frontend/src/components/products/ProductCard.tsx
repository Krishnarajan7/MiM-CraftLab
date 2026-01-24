import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isPersonalised?: boolean;
  rating?: number;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isPersonalised,
  rating = 4.5 + Math.random() * 0.5,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1000);
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
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isLiked 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background/90 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

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
          <p className="text-sm sm:text-lg font-bold text-foreground">
            £{price.toFixed(2)}
          </p>
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant={isAddingToCart ? "default" : "outline"}
            className="h-7 sm:h-8 px-2 sm:px-3 rounded-full text-[10px] sm:text-xs"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <span className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">✓</span>
                <span className="hidden sm:inline">Added</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 sm:gap-1.5">
                <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">Add</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
