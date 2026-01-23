import { Link } from "react-router-dom";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const featuredCourses = [
  {
    id: "1",
    title: "3D Printing Fundamentals",
    description: "Master the basics of 3D printing from setup to your first successful print.",
    duration: "4 hours",
    level: "Beginner" as const,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    price: 49.99,
  },
  {
    id: "2",
    title: "Advanced Modeling Techniques",
    description: "Learn professional 3D modeling workflows for complex custom designs.",
    duration: "8 hours",
    level: "Advanced" as const,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    price: 89.99,
  },
  {
    id: "3",
    title: "Material Mastery",
    description: "Understand different filaments and materials to achieve perfect results.",
    duration: "3 hours",
    level: "Intermediate" as const,
    image: "https://images.unsplash.com/photo-1563520240344-52b067aa5f84?w=600&h=400&fit=crop",
    price: 39.99,
  },
];

export function FeaturedCourses() {
  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-page">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" />
                Learn From Experts
              </span>
              <h2 className="text-foreground mt-2">
                Master 3D <span className="font-brand text-primary">Printing</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md">
                Expert-led courses for all skill levels, from beginner to advanced
              </p>
            </div>
            <motion.div whileHover={{ x: 5 }}>
              <Button asChild variant="ghost" className="hidden sm:inline-flex group">
                <Link to="/courses">
                  View all courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {featuredCourses.map((course) => (
            <StaggerItem key={course.id}>
              <CourseCard {...course} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3} className="mt-10 text-center sm:hidden">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/courses">
              View all courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
