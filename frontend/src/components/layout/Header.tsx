import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Courses", href: "/courses" },
  { name: "Custom Orders", href: "/custom-orders" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Header = memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-sm border-b border-border/40"
          : "bg-background"
      )}
    >
      <div className="container-page">
        {/* Top bar - announcement */}
        <div className="hidden lg:flex items-center justify-center py-2 text-xs text-muted-foreground border-b border-border/30">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-primary" />
            Free shipping on orders over £50
            <span className="text-border mx-2">|</span>
            Handcrafted with love in UK
          </span>
        </div>

        <nav className="flex h-16 lg:h-[68px] items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-brand text-lg">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground tracking-tight leading-none flex items-center gap-1">
                MimCraft <span className="font-brand text-primary text-lg">Lab</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase hidden sm:block mt-0.5">
                3D Print Studio
              </span>
            </div>
          </Link>

          {/* Desktop navigation - centered */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full relative",
                  location.pathname === item.href
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-44 h-9 pl-9 pr-3 text-sm bg-muted/40 border border-transparent rounded-full placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/20 transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              </div>
            </div>

            {/* Mobile search */}
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-9 w-9" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex h-9 w-9" aria-label="Account">
              <User className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9" aria-label="Cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center ring-2 ring-background">
                0
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full ml-0.5 h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-3 space-y-1 border-t border-border/40">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
                      location.pathname === item.href
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </Link>
                ))}

                {/* Mobile-only account link */}
                <div className="pt-2 mt-2 border-t border-border/40">
                  <Link
                    to="/account"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
});
