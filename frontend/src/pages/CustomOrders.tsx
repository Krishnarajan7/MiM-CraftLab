import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Palette, Package, Upload, CheckCircle } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const processSteps = [
  {
    icon: MessageSquare,
    title: "1. Share Your Idea",
    description: "Tell us about your vision. Describe what you want to create, share reference images, or upload sketches.",
  },
  {
    icon: Palette,
    title: "2. We Design",
    description: "Our team creates a custom 3D model based on your requirements. We'll share previews for your approval.",
  },
  {
    icon: Package,
    title: "3. Print & Ship",
    description: "Once approved, we 3D print your design with premium materials and ship it directly to you.",
  },
];

export default function CustomOrders() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container-page py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Request Received!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for your custom order inquiry. We'll review your project details 
            and get back to you within 1-2 business days with a quote and next steps.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 md:py-12">
      {/* Header */}
      <ScrollReveal>
        <div className="max-w-2xl mb-12">
          <h1 className="text-foreground">Custom <span className="font-brand text-primary">Orders</span></h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Have a unique idea? We specialize in bringing custom designs to life 
            with high-quality 3D printing.
          </p>
        </div>
      </ScrollReveal>

      {/* Process Steps */}
      <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-16">
        {processSteps.map((step) => (
          <StaggerItem key={step.title}>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Form Section */}
      <ScrollReveal>
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Start Your Custom Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type *
                </label>
                <select
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a type</option>
                  <option value="gift">Custom Gift</option>
                  <option value="home">Home Decor</option>
                  <option value="desk">Desk Accessory</option>
                  <option value="prototype">Product Prototype</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Describe Your Project *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your idea, dimensions, colors, and any reference images you can describe..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select range</option>
                    <option value="under50">Under £50</option>
                    <option value="50-100">£50 - £100</option>
                    <option value="100-250">£100 - £250</option>
                    <option value="250+">£250+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select timeline</option>
                    <option value="rush">Rush (1 week)</option>
                    <option value="standard">Standard (2-3 weeks)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">
                  Upload reference images
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 10MB each
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Choose Files
                </Button>
              </div>

              <Button type="submit" size="lg" className="w-full rounded-full">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
