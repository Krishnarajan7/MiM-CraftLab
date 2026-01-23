import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Minus, Plus, Truck, RotateCcw, Shield, Star, ShoppingCart } from "lucide-react";

// Mock product data
const productData = {
  id: "1",
  name: "Geometric Desk Organizer",
  price: 34.99,
  images: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
  ],
  category: "Desk Items",
  isPersonalised: true,
  description: "Keep your workspace tidy with our beautifully designed geometric desk organizer. Crafted with precision 3D printing technology, this organizer features multiple compartments perfect for pens, paperclips, sticky notes, and other office essentials.",
  details: [
    "Dimensions: 15cm x 10cm x 8cm",
    "Material: Premium PLA plastic",
    "Weight: 180g",
    "Available in 6 colors",
  ],
  colors: ["Matte White", "Charcoal", "Terracotta", "Forest Green", "Navy Blue", "Blush Pink"],
  reviews: [
    { author: "Sarah M.", rating: 5, text: "Beautiful quality and perfect size for my desk!" },
    { author: "James K.", rating: 5, text: "The geometric design is stunning. Highly recommend." },
    { author: "Emma L.", rating: 4, text: "Great organizer, shipping was fast too." },
  ],
};

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [customText, setCustomText] = useState("");

  return (
    <div className="container-page py-8 md:py-12">
      {/* Breadcrumb */}
      <Link
        to="/shop"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={productData.images[selectedImage]}
              alt={productData.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {productData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg bg-muted border-2 transition-colors ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-border"
                }`}
              >
                <img
                  src={image}
                  alt={`${productData.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            {productData.category}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
            {productData.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({productData.reviews.length} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold text-foreground mt-4">
            £{productData.price.toFixed(2)}
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            {productData.description}
          </p>

          {/* Color Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {productData.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                    selectedColor === color
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Text (if personalised) */}
          {productData.isPersonalised && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Add custom text (optional)
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your text here"
                maxLength={20}
                className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Max 20 characters
              </p>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-muted transition-colors rounded-l-lg"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-muted transition-colors rounded-r-lg"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button size="lg" className="rounded-full px-8 h-12 flex-1 sm:flex-none">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart — £{(productData.price * quantity).toFixed(2)}
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="mt-8 grid gap-3 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Free shipping over £50</p>
                <p className="text-sm text-muted-foreground">Estimated delivery: 3-5 business days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Easy returns</p>
                <p className="text-sm text-muted-foreground">30-day return policy for unused items</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Quality guaranteed</p>
                <p className="text-sm text-muted-foreground">Handcrafted with premium materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b border-border bg-transparent h-auto p-0 rounded-none">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Reviews ({productData.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {productData.description}
            </p>
          </TabsContent>
          <TabsContent value="details" className="pt-6">
            <ul className="space-y-2 max-w-md">
              {productData.details.map((detail, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6 max-w-2xl">
              {productData.reviews.map((review, index) => (
                <div key={index} className="pb-6 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-foreground text-sm">
                      {review.author}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
