import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  {
    value: "94.2%",
    label: "Automated Classification Accuracy",
    detail: "Across 26 categories in production",
  },
  {
    value: "87%",
    label: "Reduction in Manual Triage Time",
    detail: "Per ticket, measured in production",
  },
  {
    value: "€364K",
    label: "Estimated Annual Savings",
    detail: "For a single department deployment",
  },
  {
    value: "92%",
    label: "First-Touch Routing Accuracy",
    detail: "Tickets routed to the correct team automatically",
  },
];

export function ProvenOutcomes() {
  const setCardRef = useStaggeredScrollAnimation(stats.length, 0.1);

  return (
    <section className="py-16 sm:py-28 lg:py-32 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Left-aligned label */}
        <div className="flex items-center gap-4 mb-14 sm:mb-20">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
            Verified Production Metrics
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 max-w-6xl">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={setCardRef(index)}
              className={`${index < stats.length - 1 ? 'md:border-r md:border-white/15' : ''} ${index > 0 ? 'md:pl-10' : ''} ${index < stats.length - 1 ? 'md:pr-10' : ''}`}
            >
              <div className="text-3xl sm:text-4xl lg:text-[3rem] font-semibold tracking-[-0.03em] mb-3 text-white">
                {stat.value}
              </div>
              <p className={`text-sm font-medium mb-1 ${stat.value === '€364K' ? 'text-white font-semibold' : 'text-white/80'}`}>
                {stat.label}
              </p>
              <p className={`text-xs leading-relaxed ${stat.value === '€364K' ? 'text-white/70 font-medium' : 'text-white/50'}`}>
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
