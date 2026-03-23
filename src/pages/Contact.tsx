import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Aurora } from "@/components/Aurora";
import { useElementAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Contact() {
  const { toast } = useToast();
  const titleRef = useElementAnimation(0);
  const subtitleRef = useElementAnimation(0.1);
  const formRef = useScrollAnimation({ staggerDelay: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    problem: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xzzavgqp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast({ title: "Message received", description: "We'll be in touch soon." });
        setFormData({ name: "", email: "", company: "", problem: "" });
      } else {
        toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 80%)' }}>
        <Aurora scrollY={scrollY} variant="cosmic" />
        <div className="absolute inset-0 bg-background/65 dark:bg-background/55 backdrop-blur-xl" />
      </div>

      {/* Two-column layout */}
      <section className="relative z-10 min-h-screen flex items-center px-5 py-24 sm:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl">
            {/* Left column - context */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-foreground/20" />
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                  Contact
                </span>
              </div>
              <h1 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.1] mb-4">
                Get in touch
              </h1>
              <p ref={subtitleRef as React.RefObject<HTMLParagraphElement>} className="text-sm text-muted-foreground leading-relaxed mb-6">
                Tell us about your challenge and we'll respond within 1–2 business days.
              </p>
              <p className="text-sm text-muted-foreground/60">
                Or email us directly at{" "}
                <a href="mailto:tomas.madero@norfront.group" className="text-foreground/80 hover:text-foreground underline underline-offset-2 transition-colors">
                  tomas.madero@norfront.group
                </a>
              </p>
            </div>

            {/* Right column - form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div ref={formRef as React.RefObject<HTMLDivElement>}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium tracking-wide">Name</Label>
                    <Input
                      id="name" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Your name" required
                      className="bg-card/50 border-border/50 rounded-none h-11 text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium tracking-wide">Email</Label>
                    <Input
                      id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                      placeholder="you@company.com" required
                      className="bg-card/50 border-border/50 rounded-none h-11 text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-xs font-medium tracking-wide">Company</Label>
                    <Input
                      id="company" name="company" value={formData.company} onChange={handleChange}
                      placeholder="Your company name"
                      className="bg-card/50 border-border/50 rounded-none h-11 text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="problem" className="text-xs font-medium tracking-wide">Message</Label>
                    <Textarea
                      id="problem" name="problem" value={formData.problem} onChange={handleChange}
                      placeholder="What problem are you trying to solve?" rows={5} required
                      className="bg-card/50 border-border/50 resize-none rounded-none text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-none h-11 text-sm bg-foreground text-background hover:bg-foreground/90">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight size={16} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}