import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  {
    value: "94.2%",
    label: "Classification Accuracy",
    detail: "Across 26 complaint categories",
  },
  {
    value: "87%",
    label: "Less Manual Triage",
    detail: "Per ticket, measured in production",
  },
  {
    value: "92%",
    label: "First-Touch Routing",
    detail: "Tickets routed correctly without human intervention",
  },
  {
    value: "<200ms",
    label: "Classification Speed",
    detail: "Per complaint, end-to-end",
  },
];

export function ProvenOutcomes() {
  const setStatRef = useStaggeredScrollAnimation(stats.length, 0.1);

  return (
    <section className="py-16 sm:py-28 lg:py-32 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
                  Production Proof
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-white mb-4">
                Pulsara × Vision Group
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mb-3">
                AI complaint intelligence for Italy's largest optical retailer. 600+ stores, 10,000+ complaints processed, zero manual compilation.
              </p>
              <p className="text-xs text-white/30 leading-relaxed mb-6">
                All metrics from a single production deployment. We do not aggregate or average across engagements.
              </p>
              <Link
                to="/case-studies"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group font-medium"
              >
                Full case study
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={setStatRef(index)}
                  className="bg-white/[0.05] backdrop-blur-sm p-7 sm:p-10 border border-white/[0.06]"
                >
                  <div className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] mb-2 text-white">
                    {stat.value}
                  </div>
                  <p className="text-sm font-medium mb-1 text-white/90">
                    {stat.label}
                  </p>
                  <p className="text-xs leading-relaxed text-white/50">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
