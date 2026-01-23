import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

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
    <div className="container-page py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-foreground">Our <span className="font-brand text-primary">Shop</span></h1>
        <p className="mt-2 text-muted-foreground">
          Discover our collection of handcrafted 3D printed products
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        {/* Desktop Category Filters */}
        <div className="hidden md:flex items-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="font-medium"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Personalised Toggle */}
          <label className="hidden sm:flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={personalisedOnly}
              onChange={(e) => setPersonalisedOnly(e.target.checked)}
              className="rounded border-input"
            />
            <span className="text-muted-foreground">Customisable only</span>
          </label>

          {/* Sort Dropdown */}
          <div className="relative">
            <Button variant="outline" size="sm" className="gap-2">
              {selectedSort}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {showFilters && (
        <div className="md:hidden mb-6 p-4 bg-card border border-border rounded-lg animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-foreground">Filters</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={personalisedOnly}
                onChange={(e) => setPersonalisedOnly(e.target.checked)}
                className="rounded border-input"
              />
              <span className="text-muted-foreground">Customisable only</span>
            </label>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredProducts.length} products
      </p>

      {/* Products Grid */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard {...product} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium text-foreground">No products found</p>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedCategory("All");
              setPersonalisedOnly(false);
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
