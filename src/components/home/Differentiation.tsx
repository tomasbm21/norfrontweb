import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    phase: "01",
    title: "Discovery",
    duration: "Week 1",
    description: "Map workflows, quantify manual effort, define success criteria and a build plan with your team.",
  },
  {
    phase: "02",
    title: "Build",
    duration: "Weeks 2–3",
    description: "Engineer the system around your existing tools and data. Iterative demos, evaluation harness for accuracy and safety.",
  },
  {
    phase: "03",
    title: "Deploy",
    duration: "Week 4",
    description: "Production deployment with monitoring, access controls, team training, and full documentation. You own the system.",
  },
  {
    phase: "04",
    title: "Optimize",
    duration: "Ongoing",
    description: "Performance tuning, drift detection, and feature additions based on production data. Optional retainer.",
  },
];

export function Differentiation() {
  const setCardRef = useStaggeredScrollAnimation(steps.length, 0.1);

  return (
    <section className="py-16 sm:py-28 lg:py-36 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
                  How We Work
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-white mb-4">
                Discovery to production in 4 weeks
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Fixed scope. Defined deliverables. No open-ended consulting engagements. The system is yours when we're done.
              </p>
              <Link
                to="/services"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group font-medium"
              >
                Full methodology
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.phase}
                ref={setCardRef(index)}
                className="group bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-6 sm:p-8 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-mono font-semibold text-white/70">{step.phase}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-base font-medium tracking-tight text-white">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-0.5">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {step.description}
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
