import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Truck, Home, BookOpen, Palette, Info, Mail,Package, Gift,Sparkles,Star, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SearchModal, SearchItem } from "@/components/ui/search-modal";

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
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex h-9 w-9" aria-label="Account">
                <User className="h-4 w-4" />
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-full h-9 w-9" aria-label="Cart">
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center ring-2 ring-background">
                  2
                </span>
              </Button>
            </Link>

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