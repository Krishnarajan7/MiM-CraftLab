import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Phone,
  ArrowRight,
  Send,
  Sparkles,
  ShoppingBag,
  FileText,
  Wrench,
  BookOpen
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { AccordionComponent } from "@/components/ui/faq-accordion";
import { RatingInteraction } from "@/components/ui/emoji-rating";
import { useSimpleToast } from "@/components/ui/simple-toast";
import { motion } from "framer-motion";
import { useToast } from "../hooks/use-toast";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message anytime",
    value: "hello@mimcraftlab.com",
    href: "mailto:hello@mimcraftlab.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri, 9am-5pm GMT",
    value: "+44 7XXX XXX XXX",
    href: "tel:+447XXXXXXXXX",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Quick responses during hours",
    value: "Start a conversation",
    href: "#",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Based in the United Kingdom",
    value: "London, UK",
    href: "#",
  },
];

const quickLinks = [
  {
    icon: ShoppingBag,
    title: "Track Your Order",
    description: "Check the status of your recent orders",
    href: "/shop",
  },
  {
    icon: Wrench,
    title: "Custom Orders",
    description: "Request a bespoke 3D printed item",
    href: "/custom-orders",
  },
  {
    icon: FileText,
    title: "Returns Policy",
    description: "Learn about our returns process",
    href: "/shop",
  },
  {
    icon: BookOpen,
    title: "Course Support",
    description: "Get help with your enrolled courses",
    href: "/courses",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const { showToast } = useSimpleToast();

const handleRatingComplete = (rating:number) => {
    const messages = [
      "We're sorry to hear that. We'll work to improve!",
      "Thanks for your feedback. We'll do better!",
      "Thanks for rating us!",
      "Great! Thanks for the positive feedback!",
      "Awesome! We're thrilled you love it! 🎉"
    ];
    showToast(messages[rating - 1], rating >= 4 ? "success" : rating >= 3 ? "info" : "warning");
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    orderNumber: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Send className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground">Message Received</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Thank you for contacting us. Our team will review your message and respond within 24 hours.
            </p>
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Ticket: #MCL{Date.now().toString().slice(-6)}
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setIsSubmitted(false)}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              UK-Based Customer Support
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Get in
              <span className="block font-brand text-primary mt-1">Touch</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Have a question or need assistance? Our dedicated team is here to help. 
              We typically respond within 24 hours.
            </p>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">24hr</p>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">9-5</p>
                <p className="text-xs text-muted-foreground">GMT Hours</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-xs text-muted-foreground">Support Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <section className="container-page py-12 md:py-16">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {contactMethods.map((method) => (
            <StaggerItem key={method.title}>
              <a
                href={method.href}
                className="block bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <method.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{method.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                <p className="text-sm font-medium text-primary mt-2">{method.value}</p>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
      
      {/* Rate Experience Section */}
        <Card className="bg-transparent content-section mb-12 border-none shadow-none ring-none">
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-4">
             <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground/60">
  <span>
    How was your <span className="font-brand text-primary">Experience</span>?
  </span>
</p>

              <RatingInteraction onRatingComplete={handleRatingComplete} />
              <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </CardContent>
        </Card>
      {/* Main Content: Form + Quick Links */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container-page py-16 md:py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - Takes 3 columns */}
            <ScrollReveal className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="James Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="james@example.co.uk"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject <span className="text-destructive">*</span>
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Enquiry</option>
                        <option value="order">Order Support</option>
                        <option value="product">Product Question</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="custom">Custom Orders</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Order Number <span className="text-muted-foreground font-normal">(if applicable)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="MCL-XXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Please provide as much detail as possible so we can assist you effectively..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full sm:w-auto text-base py-6 px-10">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      By submitting, you agree to our Privacy Policy. We'll never share your information.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>

            {/* Sidebar: Response Time + Quick Links + Live Chat */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Response Times</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">General Enquiries</span>
                      <span className="text-sm font-medium text-foreground">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Order Support</span>
                      <span className="text-sm font-medium text-foreground">Within 12 hours</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Custom Orders</span>
                      <span className="text-sm font-medium text-foreground">Within 48 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Live Chat</span>
                      <span className="text-sm font-medium text-primary">Instant</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Quick Links - Replaces FAQ in sidebar */}
              <ScrollReveal delay={0.2}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                          <link.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Prefer to Chat?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available Monday to Friday, 9am – 5pm GMT for live chat assistance.
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Live Chat
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width FAQ Section - Moved to bottom */}
      <section className="container-page py-16 md:py-20">
        <ScrollReveal>
          <AccordionComponent />
        </ScrollReveal>
      </section>
    </div>
  );
}
