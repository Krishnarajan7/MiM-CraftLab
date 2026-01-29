import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-columns";
import { motion } from "motion/react";

const testimonials: Testimonial[] = [
  {
    text: "The custom 3D printed phone stand I ordered was absolutely perfect. Great quality and the personalization made it truly special!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
  },
  {
    text: "Ordered desk organizers for our entire office. The attention to detail and quick delivery exceeded our expectations.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Chen",
    role: "Office Manager",
  },
  {
    text: "The custom keychains for my wedding were a hit! Guests loved the personalized touch. Highly recommend MimCraft Lab!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Rodriguez",
    role: "Happy Bride",
  },
  {
    text: "Amazing quality on the architectural models. Perfect for my client presentations. Will definitely order again!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Park",
    role: "Architect",
  },
  {
    text: "The night light for my daughter's room is beautiful! She absolutely loves it. Thank you for the wonderful craftsmanship.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Lisa Thompson",
    role: "Happy Parent",
  },
  {
    text: "Fast shipping, great communication, and the product quality is outstanding. My custom figurine looks exactly as designed!",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Amanda White",
    role: "Collector",
  },
  {
    text: "The geometric plant pots are stunning! They add such a modern touch to my home office decor.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "James Wilson",
    role: "Interior Designer",
  },
  {
    text: "Ordered custom business card holders as corporate gifts. Professional quality and everyone loved them!",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Rachel Kim",
    role: "Marketing Director",
  },
  {
    text: "The cable management box is both functional and stylish. Exactly what I needed for my gaming setup!",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Alex Martinez",
    role: "Gamer & Streamer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What our<span className="font-brand text-primary"> Customers </span>&nbsp;say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            See what our happy customers have to say about their 3D printed creations.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px]">
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={15}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={17}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
