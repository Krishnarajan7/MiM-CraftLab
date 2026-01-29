import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Truck, Home, BookOpen, Palette,Phone, Info, Mail, UserPlus, Gift, Package, Sparkles, Star, LayoutGrid, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SearchModal, SearchItem } from "@/components/ui/search-modal";
import { IconTooltip } from "@/components/ui/icon-tooltip";


// Instagram Icon Component
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const navigation = [
  { name: "Shop", href: "/shop", icon: ShoppingCart },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Custom Orders", href: "/custom-orders", icon: Palette },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

const searchData: SearchItem[] = [
  {
    id: "1",
    title: "3D Parrot Sculpture",
    description: "Handcrafted colorful parrot art piece with detailed feathers",
    category: "3D Art Gifts",
    icon: Gift,
    href: "/products?category=3d-art-gifts",
  },
  {
    id: "2",
    title: "Wooden Animal Sculpture",
    description: "Premium hand-carved wooden decorative sculpture",
    category: "Wooden Gifts",
    icon: Package,
    href: "/products?category=wooden-gifts",
  },
  {
    id: "3",
    title: "Luxury Tabletop Showpiece",
    description: "Elegant 3D decorative showpiece for home & office",
    category: "Home Decor",
    icon: Home,
    href: "/products?category=home-decor",
  },
  {
    id: "4",
    title: "Artisan Bird Figurine",
    description: "Vibrant handcrafted bird figurine with modern finish",
    category: "Handmade Gifts",
    icon: Sparkles,
    href: "/products?category=handmade-gifts",
  },
  {
    id: "5",
    title: "Premium Collectible Sculpture",
    description: "Limited edition 3D collectible art sculpture",
    category: "Collectibles",
    icon: Star,
    href: "/products?category=collectibles",
  },
  {
    id: "6",
    title: "Designer Table Decor",
    description: "Modern artistic centerpiece for luxury interiors",
    category: "Interior Decor",
    icon: LayoutGrid,
    href: "/products?category=interior-decor",
  },
];


// Animated hamburger component
const AnimatedHamburger = memo(function AnimatedHamburger({ 
  isOpen, 
  onClick 
}: { 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden rounded-full ml-0.5 h-9 w-9 relative"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 flex flex-col justify-center items-center">
        <span
          className={cn(
            "block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ease-out",
            isOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-1"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ease-out",
            isOpen ? "opacity-0 scale-0" : "opacity-100"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 ease-out",
            isOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-1"
          )}
        />
      </div>
    </Button>
  );
});

export const Header = memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="hidden lg:flex items-center justify-between py-2 text-xs text-muted-foreground border-b border-border/30">
          {/* Left - Instagram */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <InstagramIcon className="h-3.5 w-3.5 text-primary" />
            <span>@mimcraftlab</span>
          </a>
          
          {/* Center - Shipping Info */}
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-primary" />
            Free shipping on orders over £50
            <span className="text-border mx-2">|</span>
            Handcrafted with love in UK
          </span>
          
          {/* Right - Phone */}
          <a 
            href="tel:+441onal234567890" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>+44 123 456 7890</span>
          </a>
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
  <SearchModal data={searchData}>
    <button
      type="button"
      className="relative w-44 h-9 text-left"
    >
      <div className="flex items-center w-full h-full pl-9 pr-3 text-sm bg-muted/40 border border-primary/40 rounded-full text-muted-foreground/50 hover:border-primary/80 transition-colors duration-200">

        <span className="text-sm">Search products...</span>
      </div>

      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
    </button>
  </SearchModal>
</div>
            

            {/* Mobile search */}
            {/* <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-9 w-9" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button> */}

            {/* Account */}
             <IconTooltip label="Account" className="hidden sm:flex">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" aria-label="Account">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </IconTooltip>

            {/* Cart */}
            <IconTooltip label="Cart">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9" aria-label="Cart">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center ring-2 ring-background">
                    2
                  </span>
                </Button>
              </Link>
            </IconTooltip>

            {/* Sign Up */}
            <IconTooltip label="Sign Up" className="hidden sm:flex">
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" aria-label="Sign Up">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </Link>
            </IconTooltip>

            {/* Mobile menu button with animation */}
            <AnimatedHamburger 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
          <SheetHeader className="p-6 pb-4 border-b border-border/40">
            <SheetTitle className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-brand text-base">M</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground tracking-tight leading-none flex items-center gap-1">
                  MimCraft <span className="font-brand text-primary">Lab</span>
                </span>
                <span className="text-[9px] text-muted-foreground tracking-widest uppercase mt-0.5">
                  3D Print Studio
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100%-88px)]">
            {/* Navigation Links */}
            <nav className="flex-1 py-4 px-3">
              <div className="space-y-1">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                    location.pathname === "/"
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted/60"
                  )}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-muted/60"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-border/40 space-y-3">
              {/* Account Link */}
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-muted/60 transition-all duration-200"
              >
                <User className="h-4 w-4" />
                My Account
              </Link>

              {/* Free Shipping Badge */}
              <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 rounded-xl">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Free shipping over £50
                </span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
});