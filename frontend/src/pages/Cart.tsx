import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

// Mock cart data
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Geometric Desk Organizer",
    price: 34.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    category: "Desk Items",
  },
  {
    id: "2",
    name: "Custom Name Night Light",
    price: 29.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    category: "Gifts",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container-page py-8 md:py-12">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Shopping <span className="font-brand text-primary">Cart</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </ScrollReveal>

        {cartItems.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-16 md:py-24">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Start exploring our collection!
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/shop">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <StaggerItem key={item.id}>
                      <motion.div
                        layout
                        exit={{ opacity: 0, x: -50 }}
                        className="flex gap-4 md:gap-6 p-4 md:p-5 bg-card rounded-xl border border-border/60 hover:border-primary/20 transition-colors duration-200"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {item.category}
                              </p>
                              <h3 className="font-medium text-foreground line-clamp-2 text-sm md:text-base">
                                {item.name}
                              </h3>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 bg-muted/50 rounded-full px-1 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="text-base md:text-lg font-bold text-foreground">
                              £{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </AnimatePresence>
              </StaggerContainer>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Button asChild variant="ghost" className="group">
                  <Link to="/shop">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={0.2}>
                <div className="sticky top-24 bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-foreground">
                        {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal < 50 && (
                      <p className="text-xs text-primary bg-primary/8 rounded-lg px-3 py-2">
                        Add £{(50 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    )}
                    <div className="border-t border-border/60 pt-4 mt-4">
                      <div className="flex justify-between text-base">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-foreground text-lg">£{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mt-6 rounded-full h-12 text-sm shadow-lg shadow-primary/20">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-border/60">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-[10px] text-muted-foreground leading-tight">Free UK Shipping</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-[10px] text-muted-foreground leading-tight">Secure Payment</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <RotateCcw className="h-4 w-4 text-primary" />
                        <span className="text-[10px] text-muted-foreground leading-tight">Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;