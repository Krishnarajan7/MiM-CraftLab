import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
          <h1 className="text-2xl font-semibold text-foreground">Message Sent!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-foreground">Get in <span className="font-brand text-primary">Touch</span></h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Have a question or need help? We're here to assist you.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Info Cards */}
        <ScrollReveal delay={0.1}>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-card border border-border rounded-lg p-5 text-center">
              <Mail className="h-5 w-5 text-primary mx-auto mb-3" />
              <p className="font-medium text-foreground text-sm">Email Us</p>
              <p className="text-muted-foreground text-sm mt-1">hello@mimcraftlab.com</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5 text-center">
              <MessageSquare className="h-5 w-5 text-primary mx-auto mb-3" />
              <p className="font-medium text-foreground text-sm">Live Chat</p>
              <p className="text-muted-foreground text-sm mt-1">Mon-Fri, 9am-5pm</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5 text-center">
              <Clock className="h-5 w-5 text-primary mx-auto mb-3" />
              <p className="font-medium text-foreground text-sm">Response Time</p>
              <p className="text-muted-foreground text-sm mt-1">Within 24 hours</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal delay={0.2}>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="course">Course Support</option>
                  <option value="custom">Custom Order</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full">
                Send Message
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
