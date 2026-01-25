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
    videoUrl: "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_30fps.mp4",
  },
  {
    id: "2",
    title: "Advanced Modeling Techniques",
    description: "Learn professional 3D modeling workflows for complex custom designs.",
    duration: "8 hours",
    level: "Advanced" as const,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    price: 89.99,
    videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-hd_1280_720_25fps.mp4",
  },
  {
    id: "3",
    title: "Material Mastery",
    description: "Understand different filaments and materials to achieve perfect results.",
    duration: "3 hours",
    level: "Intermediate" as const,
    image: "https://images.unsplash.com/photo-1563520240344-52b067aa5f84?w=600&h=400&fit=crop",
    price: 39.99,
    videoUrl: "https://videos.pexels.com/video-files/6804116/6804116-hd_1920_1080_25fps.mp4",
  },
];

export function FeaturedCourses() {
  return (
    <section className="w-full bg-gradient-to-b from-muted/40 via-muted/20 to-background">
      <div className="section-spacing">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                  <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Learn From Experts
                </span>
                <h2 className="text-foreground mt-2 text-xl sm:text-2xl md:text-3xl">
                  Master 3D <span className="font-brand text-primary">Printing</span>
                </h2>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground max-w-md">
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

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6" staggerDelay={0.15}>
            {featuredCourses.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard {...course} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3} className="mt-8 sm:mt-10 text-center sm:hidden">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/courses">
                View all courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}