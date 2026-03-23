import { Layout } from "@/components/layout/Layout";
import { ArrowRight, CheckCircle } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const reasons = [
  "Enterprise AI implementation is a $200B+ market — and growing.",
  "European enterprises remain underserved by credible AI implementation partners.",
  "Our systems consistently deliver 10x+ ROI for clients.",
  "Lean team with production-grade deployments already live across multiple verticals.",
];

export default function Partners() {
  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground/30" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                Partners & Investors
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4 text-foreground">
              Partner With Us
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Norfront is backed by operators, not just investors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Why Norfront */}
            <div>
              <h2 className="text-xl font-medium text-foreground mb-8">
                Why Norfront
              </h2>
              <div className="space-y-5">
                {reasons.map((reason) => (
                  <div key={reason} className="flex gap-3 items-start">
                    <CheckCircle
                      size={16}
                      className="text-accent mt-1 shrink-0"
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Get in Touch */}
            <div>
              <h2 className="text-xl font-medium text-foreground mb-8">
                Get in Touch
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Interested partners and investors can reach out directly. We
                prefer concise introductions and a clear thesis on why we'd work
                well together.
              </p>
              <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="hsl(var(--foreground))" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15}>
                <a href="mailto:tomas.madero@norfront.group?subject=Partnership Inquiry" className="flex items-center gap-2 px-8 py-3 text-sm font-medium text-background">
                  Reach Out
                  <ArrowRight size={18} />
                </a>
              </BorderGlow>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
