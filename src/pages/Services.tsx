import { Layout } from "@/components/layout/Layout";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import BorderGlow from "@/components/BorderGlow";
import { useState, useEffect } from "react";
import { Aurora } from "@/components/Aurora";
import { useScrollAnimation, useStaggeredScrollAnimation, useElementAnimation } from "@/hooks/useScrollAnimation";

const timelineSteps = [
  {
    phase: "01",
    label: "Discovery",
    duration: "Week 1",
    headline: "Map processes, quantify manual effort, define roadmap.",
    description:
      "We align with your team — online or in person — to map existing workflows, quantify manual effort, and define a prioritized roadmap with clear success criteria.",
    activities: [
      "Stakeholder interviews + workflow mapping",
      "Data feasibility assessment",
      "KPI definition + ROI modeling",
      "Security and compliance requirements review",
    ],
    outcome: "Prioritized roadmap with documented assumptions, KPIs, and a build plan.",
  },
  {
    phase: "02",
    label: "Build",
    duration: "Weeks 2–3",
    headline: "Code and engineer architecture around your operations.",
    description:
      "We develop in iterations with regular demos, building the system architecture directly around your existing tools and data infrastructure.",
    activities: [
      "Architecture design + component specification",
      "RAG/agent/workflow implementation",
      "Integration with existing platforms (CRM, ERP, etc.)",
      "Evaluation harness (quality, accuracy, safety)",
    ],
    outcome: "Working system with evaluation results, documentation, and deployment readiness.",
  },
  {
    phase: "03",
    label: "Deploy",
    duration: "Week 4",
    headline: "Deploy with monitoring, logging, and team enablement.",
    description:
      "We connect systems end-to-end, implement monitoring and access controls, and deploy into your production environment with full operational safeguards.",
    activities: [
      "Production deployment + stabilization",
      "Monitoring (cost, latency, traces, drift)",
      "Team training sessions + operational walkthroughs",
      "Architecture and workflow documentation",
    ],
    outcome: "Live system with full operational visibility, monitoring, and trained team.",
  },
  {
    phase: "04",
    label: "Optimize",
    duration: "Ongoing",
    headline: "Optimize, maintain, and update based on production data.",
    description:
      "We continuously optimize system performance based on production data, industry developments, and evolving business needs — available as an ongoing retainer.",
    activities: [
      "Performance monitoring + drift detection",
      "Model updates based on production feedback",
      "Feature additions + workflow refinements",
      "KPI tracking and performance reviews",
    ],
    outcome: "Continuously improving system with measurable ROI tracking.\nOptional ongoing support and optimization available.",
  },
];

const enterpriseReadyItems = [
  { label: "Security & Access Controls", detail: "RBAC/SSO, audit logs, least-privilege access" },
  { label: "Governance & Compliance", detail: "Policy controls, approval workflows, risk review" },
  { label: "Reliability", detail: "Monitoring, SLOs, incident playbooks" },
  { label: "Integration", detail: "Salesforce, ServiceNow, ERP, data platforms" },
];

export default function Services() {
  const heroLabelRef = useElementAnimation(0);
  const heroTitleRef = useElementAnimation(0.1);
  const heroDescRef = useElementAnimation(0.2);
  const setEnterpriseRef = useStaggeredScrollAnimation(enterpriseReadyItems.length, 0.08);
  const setTimelineRef = useStaggeredScrollAnimation(timelineSteps.length, 0.12);
  const ctaRef = useScrollAnimation({ staggerDelay: 0.1 });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Aurora Background */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 70%)",
        }}
      >
        <Aurora scrollY={scrollY} intensity="subtle" variant="sunset" />
        <div className="absolute inset-0 bg-background/90 dark:bg-background/85" />
      </div>

      {/* Hero */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-foreground/20" />
              <span ref={heroLabelRef as React.RefObject<HTMLSpanElement>} className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                How We Work
              </span>
            </div>
            <h1 ref={heroTitleRef as React.RefObject<HTMLHeadingElement>} className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.08] mb-5 sm:mb-6">
              From discovery to production in 4 weeks
            </h1>
            <p ref={heroDescRef as React.RefObject<HTMLParagraphElement>} className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Fixed-scope engagements with defined deliverables, timelines, and operational visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise-ready strip */}
      <section className="pb-10 sm:pb-16 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-foreground/20" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
              Designed for Enterprise Requirements
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-border/30">
            {enterpriseReadyItems.map((item, index) => (
              <div key={item.label} ref={setEnterpriseRef(index)} className="bg-background p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle2 size={14} className="text-foreground/60 shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-[22px]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="h-px w-full bg-border/40" />
      </div>

      {/* Timeline */}
      <section className="py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border/50" />

            <div className="space-y-20 sm:space-y-28">
              {timelineSteps.map((step, index) => (
                <div key={step.phase} ref={setTimelineRef(index)} className="relative pl-14 sm:pl-18">
                  {/* Node */}
                  <div className="absolute left-0 sm:left-1.5 top-1 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-foreground flex items-center justify-center">
                      <span className="text-xs font-mono font-semibold text-background">
                        {step.phase}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {step.label}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground/50 border border-border/40 px-2 py-0.5">
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4">
                      {step.headline}
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="p-5 border-l-2 border-border/50 bg-muted/10">
                        <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-muted-foreground/50 block mb-3">
                          Key Activities
                        </span>
                        <ul className="space-y-2">
                          {step.activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-muted-foreground/40 mt-0.5 text-xs">—</span>
                              <span className="text-foreground/70 text-sm">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 border-l-2 border-foreground/20 bg-foreground/[0.02]">
                        <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-foreground/40 block mb-3">
                          Outcome
                        </span>
                        <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
                          {step.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < timelineSteps.length - 1 && (
                    <div className="absolute left-[15px] sm:left-[23px] -bottom-10 sm:-bottom-14 w-1.5 h-1.5 rounded-full bg-border/50" />
                  )}
                </div>
              ))}
            </div>

            <div className="absolute left-[13px] sm:left-[21px] -bottom-2 w-2.5 h-2.5 bg-foreground" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef as React.RefObject<HTMLElement>} className="py-16 sm:py-24 lg:py-32 relative z-10 bg-foreground">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-4 text-background">
              Ready to discuss your requirements?
            </h2>
            <p className="text-sm text-background/50 mb-8 max-w-lg">
              Connect with our team to scope a discovery engagement tailored to your operational needs.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="hsl(var(--background))" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15} className="w-full sm:w-auto">
                <Link to="/contact" className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-foreground w-full">
                  Talk to Our Team
                  <ArrowRight size={18} />
                </Link>
              </BorderGlow>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
