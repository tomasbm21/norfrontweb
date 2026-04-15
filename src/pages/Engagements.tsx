import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Database } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { useScrollAnimation, useStaggeredScrollAnimation, useElementAnimation } from "@/hooks/useScrollAnimation";
import geminiLogo from "@/assets/Gemini.png";
import jsLogo from "@/assets/javascipt.png";
import salesforceLogo from "@/assets/salesforce.png";
import sqlLogo from "@/assets/sql (1).png";

const scope = [
  {
    number: "01",
    title: "Intake Pipeline",
    detail: "Ticket + complaint intake and categorization pipeline with automated routing based on issue type, severity, and location.",
  },
  {
    number: "02",
    title: "Intelligence Dashboard",
    detail: "Centralized dashboard with filtering, trend analysis, and resolution metrics across all retail locations.",
  },
  {
    number: "03",
    title: "Escalation Engine",
    detail: "Automated reporting and escalation workflows that flag unresolved issues and notify stakeholders in real time.",
  },
];

const outcomes = [
  { metric: "87%", label: "Reduction in manual triage time per ticket" },
  { metric: "94.2%", label: "Automated classification accuracy across 26 categories" },
  { metric: "92%", label: "First-touch routing accuracy to correct department" },
];

const performanceStats = [
  { metric: "Sub-200ms", label: "Classification speed per complaint" },
  { metric: "10,000+", label: "Complaints processed with zero manual compilation" },
  { metric: "Real-time", label: "Dashboards replacing weekly manual reports" },
];

const roiStats = [
  { metric: "10×", label: "ROI multiple on implementation cost" },
  { metric: "€364K", label: "Projected annual labor savings" },
];

/** Matches investor deck: Gemini · Oracle DB · SQL · JavaScript · Salesforce */
const techLogos = [
  { name: "Gemini", kind: "img" as const, src: geminiLogo },
  { name: "Oracle DB", kind: "icon" as const, Icon: Database },
  { name: "SQL", kind: "img" as const, src: sqlLogo },
  { name: "JavaScript", kind: "img" as const, src: jsLogo },
  { name: "Salesforce", kind: "img" as const, src: salesforceLogo },
];

export default function Engagements() {
  const heroLabelRef = useElementAnimation(0);
  const heroTitleRef = useElementAnimation(0.1);
  const heroDescRef = useElementAnimation(0.2);
  const contextRef = useScrollAnimation({ staggerDelay: 0.1 });
  const oldSystemRef = useScrollAnimation({ staggerDelay: 0.1 });
  const newSystemRef = useScrollAnimation({ staggerDelay: 0.1 });
  const embedRef = useElementAnimation(0.15);
  const setScopeRef = useStaggeredScrollAnimation(scope.length, 0.12);
  const setOutcomeRef = useStaggeredScrollAnimation(outcomes.length, 0.1);
  const setPerfRef = useStaggeredScrollAnimation(performanceStats.length, 0.1);
  const setRoiRef = useStaggeredScrollAnimation(roiStats.length, 0.1);
  const ctaRef = useScrollAnimation({ staggerDelay: 0.1 });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-6 sm:pt-36 sm:pb-10 lg:pt-44 lg:pb-12 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-foreground/20" />
              <span ref={heroLabelRef as React.RefObject<HTMLSpanElement>} className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                Flagship Engagement
              </span>
            </div>
            <h1 ref={heroTitleRef as React.RefObject<HTMLHeadingElement>} className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.08] mb-5 sm:mb-6">
              Case Studies
            </h1>
          </div>
        </div>
      </section>

      {/* Project Header */}
      <section className="pb-8 sm:pb-12 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 ref={heroDescRef as React.RefObject<HTMLHeadingElement>} className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-[-0.01em]">
                Pulsara × Vision Group
              </h2>
              <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground/60 border border-border/40 px-2.5 py-1">
                Customer Operations
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-mono tracking-[0.08em] text-muted-foreground/40">Milan, Italy</span>
              <span className="text-muted-foreground/20">·</span>
              <span className="text-[11px] font-mono tracking-[0.08em] text-muted-foreground/40">600+ stores</span>
            </div>
            <div className="h-px bg-border/40 mb-8" />
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Pulsara (a Norfront Group company) deployed an AI-driven Complaint Intelligence System for Vision Group, Italy's largest optical retail network. The system processes thousands of daily complaints across 26 categories, automatically routing issues to the right teams and delivering real-time operational visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Strip */}
      <section className="py-16 sm:py-20 relative z-10 border-t border-border/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-6 h-px bg-foreground/15" />
            <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
              Powered By Norfront Technology Stack
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="py-4 overflow-hidden">
            <div className="flex animate-scroll-x">
              {[0, 1].map((setIndex) => (
                <div key={setIndex} className="flex items-center gap-20 shrink-0 pr-20">
                  {techLogos.map((logo, i) => (
                    <div
                      key={`${setIndex}-${i}`}
                      className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-default"
                      title={logo.name}
                    >
                      {logo.kind === "img" ? (
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="w-auto object-contain h-20"
                        />
                      ) : (
                        <div className="h-20 w-20 flex items-center justify-center rounded-lg border border-border/40 bg-muted/20">
                          <logo.Icon className="h-10 w-10 text-muted-foreground" strokeWidth={1.25} aria-hidden />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Old System vs New System */}
      <section className="pb-16 sm:pb-20 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/30">
              {/* Old System */}
              <div ref={oldSystemRef as React.RefObject<HTMLDivElement>} className="bg-background p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-foreground/15" />
                  <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                    Before
                  </span>
                </div>
                <h3 className="text-base font-medium tracking-tight mb-4">Manual Process</h3>
                <p className="text-sm text-muted-foreground/70 leading-[1.8]">
                  Complaints were manually intaken through Salesforce and responded to by service representatives in Italy or abroad with no structured categorization, priority scoring, or routing logic.
                </p>
              </div>

              {/* New System */}
              <div ref={newSystemRef as React.RefObject<HTMLDivElement>} className="bg-background p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-foreground/15" />
                  <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                    After
                  </span>
                </div>
                <h3 className="text-base font-medium tracking-tight mb-4">Automated Intelligence</h3>
                <p className="text-sm text-muted-foreground/70 leading-[1.8] mb-4">
                  Complaints arrive and are instantly classified across 26 categories using a weighted keyword engine (94.2% accuracy). Each ticket is scored for urgency (1–5) and auto-routed to the correct department.
                </p>
                <p className="text-sm text-muted-foreground/70 leading-[1.8]">
                  AI semantic analysis via RAG pipeline handles edge cases and enriches classification for ambiguous complaints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Process Flow */}
      <section className="pb-16 sm:pb-20 lg:pb-28 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Explore Our Interactive Process Flow
              </span>
            </div>
            <div
              ref={embedRef as React.RefObject<HTMLDivElement>}
              className="relative border border-border/50 bg-card/30 overflow-hidden"
            >
              <div className="h-px bg-gradient-to-r from-foreground/10 via-foreground/5 to-transparent" />
              <iframe
                className="w-full"
                style={{ border: "none", height: "min(560px, 60vw)" }}
                src="https://embed.figma.com/board/nmcwJLyN04a0cnaRgRhnfe/Vision-Group-%E2%80%93-Complaint-Intelligence-Workflow?node-id=0-1&embed-host=share"
                allowFullScreen
              />
            </div>
            <p className="text-[11px] text-muted-foreground/30 mt-3">
              Scroll and zoom to explore the full complaint intelligence workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Scope of Work */}
      <section className="py-16 sm:py-20 lg:py-28 relative z-10 border-t border-border/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Scope of Work
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border/30">
              {scope.map((item, i) => (
                <div
                  key={i}
                  ref={setScopeRef(i)}
                  className="bg-background p-6 sm:p-8"
                >
                  <span className="text-[10px] font-mono text-muted-foreground/40 block mb-3">
                    {item.number}
                  </span>
                  <h3 className="text-base font-medium tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-16 sm:py-20 lg:py-28 relative z-10 border-t border-border/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Results & Impact
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-16">
              {outcomes.map((item, i) => (
                <div key={i} ref={setOutcomeRef(i)}>
                  <span className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] block mb-2">
                    {item.metric}
                  </span>
                  <span className="text-sm text-muted-foreground/60 leading-relaxed">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Performance stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-16">
              {performanceStats.map((item, i) => (
                <div key={i} ref={setPerfRef(i)}>
                  <span className="text-xl sm:text-2xl font-medium tracking-[-0.02em] block mb-2">
                    {item.metric}
                  </span>
                  <span className="text-sm text-muted-foreground/60 leading-relaxed">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Economics
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-2xl">
              {roiStats.map((item, i) => (
                <div key={i} ref={setRoiRef(i)}>
                  <span className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] block mb-2">
                    {item.metric}
                  </span>
                  <span className="text-sm text-muted-foreground/60 leading-relaxed">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scalability Note */}
      <section ref={contextRef as React.RefObject<HTMLElement>} className="py-16 sm:py-20 relative z-10 border-t border-border/30">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-foreground/15" />
              <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted-foreground/50">
                Built to Scale
              </span>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-[1.8] mb-4">
              This Pulsara deployment demonstrates Norfront's approach: department-level AI systems that replace manual processes with automated intelligence. The classification engine, RAG pipeline, and orchestration patterns used here form the shared infrastructure for future vertical deployments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} className="py-16 sm:py-24 lg:py-32 relative z-10 bg-foreground">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-4 text-background">
              Have a similar workflow bottleneck?
            </h2>
            <p className="text-sm text-background/50 mb-8 max-w-lg">
              We'll scope a discovery engagement and show you what a 4-week deployment looks like for your operation.
            </p>
            <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="hsl(var(--background))" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15} className="w-full sm:w-auto">
              <Link to="/contact" className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-foreground w-full">
                Discuss Your Requirements
                <ArrowRight size={18} />
              </Link>
            </BorderGlow>
          </div>
        </div>
      </section>
    </Layout>
  );
}
