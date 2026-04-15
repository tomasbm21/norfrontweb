import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const highlights = [
  {
    label: "In Production",
    brand: "Pulsara",
    client: "Vision Group — Milan, Italy",
    headline: "Complaint intelligence for 600+ optical retail stores",
    body: "AI-powered classification across 26 categories, urgency scoring, and automated routing — replacing manual triage across Italy's largest optical retail network. The system processes 10,000+ complaints with zero manual compilation.",
    metrics: [
      { value: "10×", label: "ROI multiple" },
      { value: "87%", label: "Less manual triage" },
      { value: "€364K", label: "Projected annual savings" },
    ],
    cta: { text: "Full case study", href: "/case-studies" },
    accent: true,
  },
  {
    label: "In Pipeline — Germany",
    brand: "Norfront DACH",
    client: "German Pharmaceutical Distributor",
    headline: "Mileage verification and reimbursement automation",
    body: "200+ field trainers, 2,000+ pharmacies, and only ~5% of mileage claims currently verified by phone. Norfront is designing an end-to-end control system — from offline audit scripts to automated validation against Google Maps distances, with a phased path to full n8n + DATEV payment integration.",
    metrics: [
      { value: "200+", label: "Field trainers" },
      { value: "~5%", label: "Claims verified today" },
      { value: "5 paths", label: "Proposed solutions" },
    ],
    cta: { text: "View portfolio", href: "/partners" },
    accent: false,
  },
];

export function PipelineHighlight() {
  const setRef = useStaggeredScrollAnimation(highlights.length, 0.15);

  return (
    <section className="py-16 sm:py-28 lg:py-36 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-4 mb-14 sm:mb-20">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
            Active Engagements
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
          {highlights.map((item, index) => (
            <div
              key={item.brand}
              ref={setRef(index)}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-7 sm:p-10 transition-colors duration-300 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-[10px] font-mono tracking-[0.12em] uppercase px-2.5 py-1 ${
                  item.accent
                    ? "text-[#7ec8e3]/80 border border-[#7ec8e3]/20 bg-[#7ec8e3]/5"
                    : "text-amber-400/70 border border-amber-400/20 bg-amber-400/5"
                }`}>
                  {item.label}
                </span>
                <span className="text-[11px] font-mono text-white/30">{item.brand}</span>
              </div>

              <p className="text-xs text-white/40 mb-2">{item.client}</p>

              <h3 className="text-lg sm:text-xl font-medium text-white mb-3 leading-snug">
                {item.headline}
              </h3>

              <p className="text-sm text-white/50 leading-relaxed mb-8">
                {item.body}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/[0.08]">
                {item.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-xl sm:text-2xl font-semibold text-white block mb-0.5">
                      {m.value}
                    </span>
                    <span className="text-[11px] text-white/40 leading-tight block">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to={item.cta.href}
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group font-medium"
              >
                {item.cta.text}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
