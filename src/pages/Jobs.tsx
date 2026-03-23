import { Layout } from "@/components/layout/Layout";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const roles = [
  {
    title: "Business Development Representative",
    type: "Contract",
    location: "Remote — Europe",
    description:
      "Source and qualify enterprise leads across Southern Europe. Commission-based with base.",
  },
  {
    title: "Head of Sales",
    type: "Contract",
    location: "Remote — Europe",
    description:
      "Lead our enterprise sales pipeline end-to-end. Ideal for senior sales professionals who want equity upside in a high-growth AI company.",
  },
  {
    title: "Sales Representative",
    type: "Contract",
    location: "Remote — US",
    description:
      "Drive new business in the US market, focusing on mid-market and enterprise accounts.",
  },
  {
    title: "Technical Advisor",
    type: "Advisory",
    location: "Remote",
    description:
      "Advise on AI architecture, automation, and enterprise integration strategy. Part-time commitment.",
  },
];

export default function Jobs() {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormData((prev) => ({ ...prev, role: roleTitle }));
    // Scroll to form
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mdawrvqo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: "Application sent", description: "We'll review your application and be in touch." });
        setFormData({ name: "", email: "", role: "", message: "" });
        setSelectedRole(null);
      } else {
        toast({ title: "Something went wrong", description: "Please try again or email us directly at tomas.madero@norfront.group.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again or email us directly at tomas.madero@norfront.group.", variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground/30" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                Careers
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4 text-foreground">
              Join Norfront
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              We're building the AI infrastructure layer for enterprise
              operations. Join us.
            </p>
          </div>

          {/* Roles */}
          <div className="space-y-px bg-border/30 mb-20">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-background p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 group hover:bg-muted/30 transition-colors duration-300"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {role.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {role.location}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none border-foreground/20 hover:bg-foreground/5 shrink-0"
                  onClick={() => handleApply(role.title)}
                >
                  Apply
                  <ArrowRight size={14} />
                </Button>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div id="apply-form" className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground/30" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                Apply
              </span>
            </div>
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-foreground">
              Send your application
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {selectedRole
                ? `Applying for: ${selectedRole}`
                : "Select a role above, or tell us which position interests you."}
            </p>

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
                  placeholder="you@email.com" required
                  className="bg-card/50 border-border/50 rounded-none h-11 text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-medium tracking-wide">Role</Label>
                <Input
                  id="role" name="role" value={formData.role} onChange={handleChange}
                  placeholder="Which role are you interested in?"
                  className="bg-card/50 border-border/50 rounded-none h-11 text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-medium tracking-wide">Why you're a fit</Label>
                <Textarea
                  id="message" name="message" value={formData.message} onChange={handleChange}
                  placeholder="Brief intro — relevant experience, what excites you about Norfront" rows={5} required
                  className="bg-card/50 border-border/50 resize-none rounded-none text-sm placeholder:text-muted-foreground/30 focus:border-foreground/30"
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-none h-11 text-sm bg-foreground text-background hover:bg-foreground/90">
                {isSubmitting ? "Sending..." : "Submit Application"}
                <ArrowRight size={16} />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
