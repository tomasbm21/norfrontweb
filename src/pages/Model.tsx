import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Globe, Repeat, Shield, TrendingUp, Users } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { useState, useEffect } from "react";
import { Aurora } from "@/components/Aurora";
import { useScrollAnimation, useStaggeredScrollAnimation, useElementAnimation } from "@/hooks/useScrollAnimation";

const advantages = [
  {
    icon: Layers,
    title: "One Brand Per Vertical",
    description: "Each subsidiary focuses on a single enterprise workflow domain — learning the buyer's language, compliance environment, and integration requirements deeply. One product, one problem, one market at a time.",
  },
  {
    icon: Repeat,
    title: "Shared Engineering, Compounding Returns",
    description: "Classification engines, RAG pipelines, orchestration patterns, and deployment playbooks are shared across brands. Every new vertical leverages everything built before — reducing cost and time-to-production with each launch.",
  },
  {
    icon: Globe,
    title: "Local Language, Local Teams",
    description: "Enterprise buyers in Italy, Germany, or Latin America need systems that handle their language, regulations, and business culture. We deploy local teams who speak the language and understand the market — not translated templates from a single headquarters.",
  },
  {
    icon: Shield,
    title: "Client Ownership, Not Vendor Lock-in",
    description: "The deployed system, data, and infrastructure belong to the client. We build it, hand it over, and offer ongoing optimization. No recurring SaaS trap. No platform dependency.",
  },
  {
    icon: TrendingUp,
    title: "Automated Distribution at Launch",
    description: "Each brand enters the market with automated industry content on LinkedIn — building authority, credibility, and inbound pipeline before the first outbound call. GTM multiplier, not core product.",
  },
  {
    icon: Users,
    title: "Repeatable Launch Playbook",
    description: "Brand identity, positioning, website, content engine, and pipeline development follow a tested sequence. We've built the process to launch a new vertical brand in weeks, not months.",
  },
];

export default function Model() {
  const heroLabelRef = useElementAnimation(0);
  const heroTitleRef = useElementAnimation(0.1);
  const heroDescRef = useElementAnimation(0.2);
  const setAdvRef = useStaggeredScrollAnimation(advantages.length, 0.1);
  const statusRef = useScrollAnimation({ staggerDelay: 0.1 });
  const ctaRef = useScrollAnimation({ staggerDelay: 0.1 });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 70%)",
        }}
      >
        <Aurora scrollY={scrollY} intensity="subtle" variant="emerald" />
        <div className="absolute inset-0 bg-background/85 dark:bg-background/80 backdrop-blur-xl" />
      </div>

      {/* Hero */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-foreground/20" />
              <span ref={heroLabelRef as React.RefObject<HTMLSpanElement>} className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                Our Model
              </span>
            </div>
            <h1 ref={heroTitleRef as React.RefObject<HTMLHeadingElement>} className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.08] mb-5 sm:mb-6">
              How Norfront Group operates
            </h1>
            <p ref={heroDescRef as React.RefObject<HTMLParagraphElement>} className="text-base text-muted-foreground leading-relaxed max-w-xl">
              Norfront Group builds and operates specialized AI companies for enterprise workflows. Each brand targets one operational bottleneck. Shared infrastructure and central engineering mean every new vertical launches faster and cheaper than the last.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="pb-16 sm:pb-20 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/30">
              <div className="bg-background p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-foreground/15" />
                  <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                    The Problem
                  </span>
                </div>
                <h3 className="text-base font-medium tracking-tight mb-4">The enterprise AI implementation gap</h3>
                <p className="text-sm text-muted-foreground/70 leading-[1.8]">
                  76% of enterprises have adopted AI, but only 1% report real operational returns. Most implementations are horizontal — the same generic approach applied across every industry and workflow. The result: systems that need months of customization and don't account for local compliance, language, or integration requirements.
                </p>
              </div>

              <div className="bg-background p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-foreground/15" />
                  <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                    Our Answer
                  </span>
                </div>
                <h3 className="text-base font-medium tracking-tight mb-4">Specialized brands, shared infrastructure</h3>
                <p className="text-sm text-muted-foreground/70 leading-[1.8]">
                  Each Norfront brand understands one workflow domain deeply — the buyer persona, the compliance landscape, the integration requirements. Behind the brand, shared engineering makes every deployment faster. The client gets vertical expertise with the backing of a holding company's infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 sm:py-24 lg:py-32 relative z-10 border-t border-border/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Why This Structure
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
              {advantages.map((adv, i) => (
                <div
                  key={adv.title}
                  ref={setAdvRef(i)}
                  className="bg-background p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-foreground/15 flex items-center justify-center shrink-0">
                      <adv.icon size={16} strokeWidth={1.5} className="text-foreground/50" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium tracking-tight mb-2">{adv.title}</h3>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed">{adv.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section ref={statusRef as React.RefObject<HTMLElement>} className="py-16 sm:py-20 relative z-10 border-t border-border/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Where We Are Today
              </span>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-[1.8]">
              <p>
                <strong className="text-foreground">Pulsara</strong> (customer operations) is in production — deployed for Vision Group, Italy's largest optical retailer. 600+ stores, 94.2% classification accuracy, 87% reduction in manual triage time, 10,000+ complaints processed.
              </p>
              <p>
                <strong className="text-foreground">Audera</strong> (finance) has a reference engagement — Carriage Services in the US, where ACH payment automation recovers 50 hours/month and approximately $21K/year in labor costs.
              </p>
              <p>
                <strong className="text-foreground">Propera</strong> (professional services) is live in English and German. <strong className="text-foreground">Audera</strong> (finance) has a reference engagement in the US. The remaining six brands — Covera, Legara, Tradara, Onvara, Medivex, and Leasara — are designed, branded, and positioned for first client deployments.
              </p>
              <p>
                Shared infrastructure is built. Each new vertical benefits from what has already shipped in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} className="py-16 sm:py-24 lg:py-32 relative z-10 bg-foreground">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-4 text-background">
              Interested in the model?
            </h2>
            <p className="text-sm text-background/50 mb-8 max-w-lg">
              Whether you're an enterprise buyer, investor, or potential partner — we're happy to walk you through the structure.
            </p>
            <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="hsl(var(--background))" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15} className="w-full sm:w-auto">
              <Link to="/contact" className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-foreground w-full">
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </BorderGlow>
          </div>
        </div>
      </section>
    </Layout>
  );
}
