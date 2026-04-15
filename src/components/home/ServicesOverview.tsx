import { Link } from "react-router-dom";
import { ArrowRight, Layers, Globe, Repeat, Shield } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const modelPillars = [
  {
    icon: Layers,
    title: "One Brand Per Vertical",
    description: "Each subsidiary focuses on a single enterprise workflow — learning the buyer's language, compliance requirements, and integration landscape for that domain.",
  },
  {
    icon: Repeat,
    title: "Shared Infrastructure",
    description: "Central engineering, orchestration patterns, and deployment playbooks. Every new brand launches faster and cheaper than the last.",
  },
  {
    icon: Globe,
    title: "Local-Market Deployment",
    description: "Local teams, local language, local compliance. Enterprise buyers in Germany, Italy, or Mexico get a system built for their context — not a translated template.",
  },
  {
    icon: Shield,
    title: "Client Ownership",
    description: "The client owns the deployed system, data, and infrastructure. We build it, hand it over, and provide ongoing support through an optional retainer.",
  },
];

export function ServicesOverview() {
  const setCardRef = useStaggeredScrollAnimation(modelPillars.length, 0.1);

  return (
    <section className="py-16 sm:py-28 lg:py-36 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
                The Model
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-white mb-4">
              How the holding company works
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-lg">
              Norfront operates as a holding company with nine subsidiary brands. Each one focuses on a single enterprise workflow. Central engineering and shared infrastructure mean every new vertical launches faster and costs less than the last.
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex items-end">
            <Link
              to="/model"
              className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group font-medium"
            >
              Our model
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {modelPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              ref={setCardRef(index)}
              className="group bg-white/[0.05] backdrop-blur-sm p-7 sm:p-10 transition-colors duration-300 hover:bg-white/[0.1] border border-white/[0.06]"
            >
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center shrink-0">
                  <pillar.icon size={18} strokeWidth={1.5} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2 tracking-tight text-white group-hover:text-white transition-colors">{pillar.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
