import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Leaf, BookOpen } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const values = [
  {
    icon: Palette,
    title: "Design Matters",
    description: "Every product we create is thoughtfully designed to be both beautiful and functional.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We use eco-friendly PLA materials and minimize waste in our production process.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description: "We believe in empowering others to learn and create through accessible education.",
  },
];

export default function About() {
  return (
    <div className="container-page py-12 md:py-16">
      {/* Hero */}
      <ScrollReveal>
        <div className="max-w-3xl">
          <h1 className="text-foreground">About MimCraft <span className="font-brand text-primary">Lab</span></h1>
          <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
            We're a small team of makers, designers, and 3D printing enthusiasts 
            dedicated to creating beautiful, functional objects for everyday life.
          </p>
        </div>
      </ScrollReveal>

      {/* Story Section */}
      <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div>
            <h2 className="text-foreground">Our Story</h2>
            <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
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
          <div className="aspect-video bg-muted rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
              alt="3D printing workshop"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Values Section */}
      <div className="mt-20">
        <ScrollReveal>
          <h2 className="text-foreground text-center mb-12">What We Believe</h2>
        </ScrollReveal>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
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
      </div>

      {/* CTA Section */}
      <ScrollReveal>
        <div className="mt-20 bg-card border border-border rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-foreground">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Browse our collection of 3D printed products or explore our courses 
            to start your own maker journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/shop">
                Shop Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
