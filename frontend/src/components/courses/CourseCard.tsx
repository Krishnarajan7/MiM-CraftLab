import { Link } from "react-router-dom";
import { Clock, Play, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  price: number;
  students?: number;
  rating?: number;
}

export function CourseCard({
  id,
  title,
  description,
  duration,
  level,
  image,
  price,
  students = Math.floor(Math.random() * 500) + 100,
  rating = 4.5 + Math.random() * 0.5,
}: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-green-500/10 text-green-600",
    Intermediate: "bg-blue-500/10 text-blue-600",
    Advanced: "bg-primary/10 text-primary",
  };

  return (
    <Link
      to={`/courses/${id}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/15 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
            <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
          </div>
        </div>

        {/* Level badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${levelColors[level]}`}>
          {level}
        </span>
      </div>

      <div className="p-5">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {students} students
          </span>
        </div>

        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-foreground">
              £{price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">One-time purchase</p>
          </div>
          <Button size="sm" className="rounded-full px-4 h-8 text-xs" onClick={(e) => e.preventDefault()}>
            Enroll Now
          </Button>
        </div>
      </div>
    </Link>
  );
}
