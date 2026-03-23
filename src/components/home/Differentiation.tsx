import { Zap, Brain, Users, BarChart3 } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const pillars = [
  {
    icon: Zap,
    title: "Eliminate Manual Work",
    description: "Automate triage, data entry, and reporting so your teams focus on what matters.",
  },
  {
    icon: Brain,
    title: "Predict Problems Before Impact",
    description: "Use AI to surface issues before they affect your bottom line.",
  },
  {
    icon: Users,
    title: "Redeploy Skilled Staff",
    description: "Move high-value employees from repetitive tasks to higher-impact work.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Intelligence",
    description: "Replace manual reporting with analysis that surfaces problems automatically.",
  },
];

export function Differentiation() {
  const setCardRef = useStaggeredScrollAnimation(pillars.length, 0.1);

  return (
    <section className="py-16 sm:py-28 lg:py-36 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left column - sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
                  Our Priorities
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-white">
                Built for Enterprise Complexity
              </h2>
              <blockquote className="mt-6 border-l-2 border-white/20 pl-4">
                <p className="text-base sm:text-lg font-medium text-white/70 leading-snug italic">
                  "AI innovations rarely reach enterprise operations."
                </p>
                <p className="text-sm text-white/40 leading-relaxed mt-3">
                  We change that — building the track for agentic AI and automation in your day-to-day.
                </p>
              </blockquote>
            </div>
          </div>

          {/* Right column - cards stacked */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-4">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                ref={setCardRef(index)}
                className="group bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-6 sm:p-8 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-white/15 flex items-center justify-center shrink-0">
                    <pillar.icon size={18} strokeWidth={1.5} className="text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-1.5 tracking-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
