import { useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const allCourses = [
  {
    id: "1",
    title: "3D Printing Fundamentals",
    description: "Master the basics of 3D printing from setup to your first successful print. Perfect for complete beginners.",
    duration: "4 hours",
    level: "Beginner" as const,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    price: 49.99,
  },
  {
    id: "2",
    title: "Advanced Modeling Techniques",
    description: "Learn professional 3D modeling workflows for complex custom designs using industry-standard tools.",
    duration: "8 hours",
    level: "Advanced" as const,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    price: 89.99,
  },
  {
    id: "3",
    title: "Material Mastery",
    description: "Understand different filaments and materials to achieve perfect results for any project.",
    duration: "3 hours",
    level: "Intermediate" as const,
    image: "https://images.unsplash.com/photo-1563520240344-52b067aa5f84?w=600&h=400&fit=crop",
    price: 39.99,
  },
  {
    id: "4",
    title: "Designing for 3D Printing",
    description: "Learn the principles of designing models specifically optimized for 3D printing success.",
    duration: "5 hours",
    level: "Beginner" as const,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
    price: 59.99,
  },
  {
    id: "5",
    title: "Troubleshooting & Maintenance",
    description: "Diagnose common printing issues and keep your printer running smoothly for years to come.",
    duration: "4 hours",
    level: "Intermediate" as const,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    price: 44.99,
  },
  {
    id: "6",
    title: "Professional Finishing Techniques",
    description: "Transform your prints with sanding, painting, and post-processing techniques for professional results.",
    duration: "6 hours",
    level: "Advanced" as const,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
    price: 74.99,
  },
];

export default function Courses() {
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const filteredCourses = allCourses.filter((course) => {
    if (selectedLevel === "All Levels") return true;
    return course.level === selectedLevel;
  });

  return (
    <div className="container-page py-8 md:py-12">
      {/* Page Header */}
      <div className="max-w-2xl mb-10">
        <h1 className="text-foreground">Learn 3D <span className="font-brand text-primary">Printing</span></h1>
        <p className="mt-3 text-lg text-muted-foreground">
          From beginner basics to advanced techniques, our expert-led courses will help you 
          master the art of 3D printing at your own pace.
        </p>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-border">
        {levels.map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedLevel(level)}
            className="font-medium"
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-6">
        {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} available
      </p>

      {/* Courses Grid */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <StaggerItem key={course.id}>
            <CourseCard {...course} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium text-foreground">No courses found</p>
          <p className="mt-2 text-muted-foreground">
            Try selecting a different skill level.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedLevel("All Levels")}
          >
            Show all courses
          </Button>
        </div>
      )}
    </div>
  );
}
