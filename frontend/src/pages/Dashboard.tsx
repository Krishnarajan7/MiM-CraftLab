import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User, Package, Heart, Settings, LogOut, 
  ShoppingBag, GraduationCap, Clock, ChevronRight,
  Mail, MapPin, Phone, Edit2, Award
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "courses", label: "My Courses", icon: GraduationCap },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 64.98,
    items: 2,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 42.99,
    items: 1,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop",
  },
];

const mockCourses = [
  {
    id: "1",
    title: "3D Printing Fundamentals",
    progress: 75,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=120&fit=crop",
  },
  {
    id: "2",
    title: "Material Mastery",
    progress: 30,
    image: "https://images.unsplash.com/photo-1563520240344-52b067aa5f84?w=200&h=120&fit=crop",
  },
];

const mockWishlist = [
  {
    id: "3",
    name: "Modern Plant Pot Set",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Personalized Photo Frame",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=200&h=200&fit=crop",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
                <p className="text-muted-foreground text-sm">Member since January 2024</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    <Award className="h-3 w-3" />
                    Loyal Customer
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">john.doe@example.com</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">+44 7700 900000</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium text-foreground">123 Creative Street, London, UK, W1A 1AA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 rounded-xl bg-card border border-border/40">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-1">Orders</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border/40">
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground mt-1">Courses</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border/40">
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground mt-1">Wishlist</p>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Order History</h2>
              <Button variant="outline" size="sm" className="rounded-full">
                View All
              </Button>
            </div>
            <StaggerContainer className="space-y-3" staggerDelay={0.1}>
              {mockOrders.map((order) => (
                <StaggerItem key={order.id}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted">
                      <img src={order.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-foreground text-sm">{order.id}</p>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          order.status === "Delivered" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-blue-500/10 text-blue-600"
                        )}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{order.items} items • {order.date}</p>
                    </div>
                    <p className="font-semibold text-foreground">£{order.total.toFixed(2)}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">My Courses</h2>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link to="/courses">Browse More</Link>
              </Button>
            </div>
            <StaggerContainer className="space-y-3" staggerDelay={0.1}>
              {mockCourses.map((course) => (
                <StaggerItem key={course.id}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
                    <div className="w-20 h-14 rounded-lg overflow-hidden bg-muted">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-1">{course.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{course.progress}%</span>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-full">Continue</Button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "wishlist":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">My Wishlist</h2>
            </div>
            <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {mockWishlist.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-colors">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-1">{item.name}</p>
                      <p className="text-lg font-bold text-foreground mt-1">£{item.price.toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Edit Profile</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Manage Addresses</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Notification Preferences</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 hover:border-destructive/30 transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Sign Out</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <div className="container-page py-8 md:py-12">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              My <span className="font-brand text-primary">Dashboard</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Manage your account, orders, and courses</p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <ScrollReveal className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border/60 p-2 lg:sticky lg:top-24">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </ScrollReveal>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-xl border border-border/60 p-6 md:p-8">
              {renderContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
