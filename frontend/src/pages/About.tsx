import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Leaf, BookOpen, Sparkles, Users, Award, Package } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";

const values = [
  {
    icon: Palette,
    title: "Design Matters",
    description: "Every product we create is thoughtfully designed to be both beautiful and functional.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We use eco-friendly PLA materials and minimise waste in our production process.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description: "We believe in empowering others to learn and create through accessible education.",
  },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "10K+", label: "Products Shipped" },
  { value: "500+", label: "Custom Projects" },
  { value: "4.9★", label: "Customer Rating" },
];

const teamHighlights = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our designers and engineers bring years of industry experience to every project.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Every item undergoes rigorous quality checks before shipping to ensure perfection.",
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "UK-based production means faster turnaround and lower shipping costs for local customers.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner - Shop Style */}
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
              UK-Based 3D Printing Studio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              About MimCraft
              <span className="block font-brand text-primary mt-1">Lab</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              We're a passionate team of makers, designers, and 3D printing enthusiasts 
              dedicated to creating beautiful, functional objects for everyday life.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="h-8 w-px bg-border hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <section className="container-page py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  MimCraft Lab started in 2019 in a small garage workshop. What began as a
                  hobby quickly grew into a passion for exploring the possibilities of 
                  3D printing technology.
                </p>
                <p>
                  We noticed that while 3D printing was becoming more accessible, many 
                  people still didn't have access to quality printed products or the 
                  knowledge to create them. That's why we started offering both products 
                  and educational courses.
                </p>
                <p>
                  Today, we've shipped thousands of products to happy customers around 
                  the world and helped hundreds of students learn the craft of 3D printing 
                  through our courses.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
                alt="3D printing workshop"
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container-page py-16 md:py-20">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Why Choose Us</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                We combine cutting-edge technology with traditional craftsmanship to deliver exceptional results.
              </p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8">
            {teamHighlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="container-page py-16 md:py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">What We Believe</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Our core values guide everything we do, from design to delivery.
            </p>
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="container-page pb-16 md:pb-20">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-primary/80 p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white/10,transparent_50%)]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  Ready to Get Started?
                </h3>
                <p className="mt-2 text-primary-foreground/80 max-w-md">
                  Browse our collection of 3D printed products or explore our courses to start your maker journey.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  variant="secondary"
                  className="rounded-xl gap-2"
                >
                  <Link to="/shop">
                    Shop Products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                  className="rounded-xl bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>
    </div>
  );
}
