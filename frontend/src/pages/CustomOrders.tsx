import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Palette, 
  Package, 
  Upload, 
  CheckCircle, 
  Shield, 
  Clock, 
  Award,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const processSteps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Share Your Vision",
    description: "Describe your idea, share reference images, or upload sketches. Our team will review and provide initial feedback within 24 hours.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Design & Approval",
    description: "Our designers create a bespoke 3D model tailored to your requirements. You'll receive digital previews for approval before production.",
  },
  {
    icon: Package,
    step: "03",
    title: "Print & Deliver",
    description: "Once approved, we manufacture your design using premium materials and ship directly to your door with tracked delivery.",
  },
];

const guarantees = [
  { icon: Shield, label: "Quality Guaranteed" },
  { icon: Clock, label: "Fast Turnaround" },
  { icon: Award, label: "UK-Based Support" },
];

const projectExamples = [
  "Bespoke architectural models",
  "Personalised gifts & keepsakes",
  "Product prototypes",
  "Custom desk accessories",
  "Unique home décor pieces",
  "Corporate branded items",
];

export default function CustomOrders() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground">Request Received</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Thank you for your enquiry. Our team will review your project details 
              and contact you within 1-2 working days with a detailed quote.
            </p>
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Reference: #MCL{Date.now().toString().slice(-6)}
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background border-b border-border">
        <div className="container-page py-12 md:py-20">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Bespoke 3D Printing Services
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Bring Your Ideas to Life
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                From concept to creation, our expert team transforms your unique vision 
                into high-quality 3D printed products, crafted with precision in the UK.
              </p>
              
              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                {guarantees.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="container-page py-16 md:py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              A straightforward process designed to bring your custom project to life with ease.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 md:gap-12">
          {processSteps.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
                
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/20">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Main Content: Form + Examples */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container-page py-16 md:py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form - Takes 3 columns */}
            <ScrollReveal className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground">Request a Quote</h2>
                  <p className="mt-2 text-muted-foreground">
                    Complete the form below and we'll provide a detailed quotation within 48 hours.
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
                        Project Type <span className="text-destructive">*</span>
                      </label>
                      <select
                        required
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select a category</option>
                        <option value="gift">Personalised Gift</option>
                        <option value="home">Home Décor</option>
                        <option value="desk">Desk Accessory</option>
                        <option value="prototype">Product Prototype</option>
                        <option value="architectural">Architectural Model</option>
                        <option value="corporate">Corporate/Branded</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Please describe your project in detail, including dimensions, colours, materials, and any specific requirements..."
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select budget</option>
                        <option value="under50">Under £50</option>
                        <option value="50-100">£50 – £100</option>
                        <option value="100-250">£100 – £250</option>
                        <option value="250-500">£250 – £500</option>
                        <option value="500+">£500+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select timeline</option>
                        <option value="rush">Express (5-7 days)</option>
                        <option value="standard">Standard (2-3 weeks)</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium text-foreground">
                      Upload Reference Files
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Drag & drop or click to browse • PNG, JPG, PDF up to 10MB
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Choose Files
                    </Button>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full text-base py-6">
                      Submit Enquiry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By submitting, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>

            {/* Sidebar - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    What We Create
                  </h3>
                  <ul className="space-y-3">
                    {projectExamples.map((example) => (
                      <li key={example} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our team is available Monday to Friday, 9am – 5pm GMT.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <a href="mailto:custom@mimcraftlab.com" className="text-primary hover:underline">
                        custom@mimcraftlab.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">Phone:</span>
                      <a href="tel:+447XXXXXXXXX" className="text-foreground hover:text-primary">
                        +44 7XXX XXX XXX
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-foreground">
                      JT
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground italic">
                        "Exceptional quality and service. The team brought my architectural model to life exactly as I envisioned. Highly recommend for any bespoke project."
                      </p>
                      <p className="mt-3 text-sm font-medium text-foreground">James Thompson</p>
                      <p className="text-xs text-muted-foreground">London, UK</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
