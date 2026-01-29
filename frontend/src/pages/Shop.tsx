import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, X, Sparkles, Grid3X3, LayoutGrid, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";

const categories = ["All", "Gifts", "Desk Items", "Home Decor"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"];

const allProducts = [
  {
    id: "1",
    name: "Geometric Desk Organizer",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Desk Items",
    isPersonalised: false,
  },
  {
    id: "2",
    name: "Custom Name Night Light",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Gifts",
    isPersonalised: true,
  },
  {
    id: "3",
    name: "Modern Plant Pot Set",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Home Decor",
    isPersonalised: false,
  },
  {
    id: "4",
    name: "Personalized Photo Frame",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=400&fit=crop",
    category: "Gifts",
    isPersonalised: true,
  },
  {
    id: "5",
    name: "Minimalist Pen Holder",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    category: "Desk Items",
    isPersonalised: false,
  },
  {
    id: "6",
    name: "Decorative Wall Hook Set",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    category: "Home Decor",
    isPersonalised: false,
  },
  {
    id: "7",
    name: "Custom Pet Portrait Stand",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1551887373-6edba6dacbb1?w=400&h=400&fit=crop",
    category: "Gifts",
    isPersonalised: true,
  },
  {
    id: "8",
    name: "Cable Management Box",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "Desk Items",
    isPersonalised: false,
  },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [showFilters, setShowFilters] = useState(false);
  const [personalisedOnly, setPersonalisedOnly] = useState(false);
  const [gridView, setGridView] = useState<"compact" | "spacious">("spacious");

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }
    if (personalisedOnly && !product.isPersonalised) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.1),transparent_50%)]" />
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-20 w-32 h-32 border border-secondary/20 rounded-full" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-primary rounded-full" />
        
        <div className="container-page relative py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Handcrafted 3D Printed Creations
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Discover Our
              <span className="block font-brand text-primary mt-1">Unique Collection</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Each piece is carefully designed and 3D printed with precision. 
              Find the perfect gift or add a touch of creativity to your space.
            </p>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">50+</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">1000+</p>
                <p className="text-xs text-muted-foreground">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-page py-8 md:py-12">
        {/* Category Pills - Horizontal Scroll on Mobile */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Browse Categories</h2>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={gridView === "compact" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setGridView("compact")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridView === "spacious" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setGridView("spacious")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="ml-2 text-xs opacity-80">
                    ({category === "All" ? allProducts.length : allProducts.filter(p => p.category === category).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
          {/* Left - Results & Filter Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 rounded-xl"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(personalisedOnly || selectedCategory !== "All") && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {(personalisedOnly ? 1 : 0) + (selectedCategory !== "All" ? 1 : 0)}
                </span>
              )}
            </Button>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Personalised Toggle */}
            <label className="hidden sm:flex items-center gap-2 text-sm cursor-pointer group">
              <div className={`relative w-10 h-5 rounded-full transition-colors ${personalisedOnly ? 'bg-primary' : 'bg-muted'}`}>
                <input
                  type="checkbox"
                  checked={personalisedOnly}
                  onChange={(e) => setPersonalisedOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${personalisedOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">Customisable</span>
            </label>

            {/* Sort Dropdown */}
            <div className="relative">
              <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                {selectedSort}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-5 bg-card border border-border rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-foreground">Filter Options</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-xl"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-foreground">Show customisable only</span>
                  <div className={`relative w-10 h-5 rounded-full transition-colors ${personalisedOnly ? 'bg-primary' : 'bg-muted'}`}>
                    <input
                      type="checkbox"
                      checked={personalisedOnly}
                      onChange={(e) => setPersonalisedOnly(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${personalisedOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <StaggerContainer className={`grid gap-4 md:gap-6 ${
          gridView === "compact" 
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" 
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}>
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-4"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-xl font-semibold text-foreground">No products found</p>
            <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
              Try adjusting your filters to discover more amazing 3D printed creations.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-xl"
              onClick={() => {
                setSelectedCategory("All");
                setPersonalisedOnly(false);
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-xl">
              Previous
            </Button>
            <Button variant="default" size="sm" className="rounded-xl min-w-[40px]">
              1
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl min-w-[40px]">
              2
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl min-w-[40px]">
              3
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              Next
            </Button>
          </div>
        )}

        {/* Custom Order CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/80 p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white/10,transparent_50%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                Can't find what you're looking for?
              </h3>
              <p className="mt-2 text-primary-foreground/80 max-w-md">
                We create custom 3D printed products tailored to your exact specifications.
              </p>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              className="rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              Request Custom Order
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}