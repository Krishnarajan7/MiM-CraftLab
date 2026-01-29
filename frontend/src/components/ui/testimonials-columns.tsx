"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${index}-${i}`}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-foreground/90 text-sm leading-relaxed">
                  {text}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {name}
                    </p>
                    <p className="text-muted-foreground text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
