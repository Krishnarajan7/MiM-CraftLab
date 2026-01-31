import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, Share2, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
}

// Mock wishlist data
const initialWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Geometric Desk Organizer",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Desk Items",
    inStock: true,
  },
  {
    id: "2",
    name: "Custom Name Night Light",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Gifts",
    inStock: true,
  },
  {
    id: "3",
    name: "Architectural Model Stand",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1581092160607-ee67df9c8ed3?w=400&h=400&fit=crop",
    category: "Home Decor",
    inStock: false,
  },
  {
    id: "4",
    name: "Personalized Keychain Set",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: true,
  },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems);

  const removeItem = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast.success("Removed from wishlist");
  };

  const addToCart = (item: WishlistItem) => {
    toast.success(`${item.name} added to cart!`);
  };

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    toast.success(`${inStockItems.length} items added to cart!`);
  };

  const shareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Wishlist link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container-page relative">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  <Heart className="h-4 w-4 fill-current" />
                  Your Saved Items
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  My <span className="font-brand text-primary">Wishlist</span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
                </p>
              </div>

              {wishlistItems.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={shareWishlist} className="rounded-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Wishlist
                  </Button>
                  <Button onClick={addAllToCart} className="rounded-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add All to Cart
                  </Button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="container-page pb-16">
        {wishlistItems.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-16 md:py-24">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start adding items you love! They'll be saved here so you can find them easily later.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/shop">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.08}>
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-card rounded-2xl border border-border/60 overflow-hidden hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      {item.originalPrice && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
                          Sale
                        </div>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-destructive hover:bg-background transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-medium text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-foreground">
                            £{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              £{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          disabled={!item.inStock}
                          onClick={() => addToCart(item)}
                          className="rounded-full"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        )}

        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <ScrollReveal delay={0.3}>
            <div className="mt-16 pt-12 border-t border-border/60">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">You might also like</h2>
                  <p className="text-sm text-muted-foreground">Based on your wishlist</p>
                </div>
              </div>
              <div className="text-center py-8">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/shop">
                    Browse More Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
