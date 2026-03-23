import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Aurora } from "@/components/Aurora";
import { useStaggeredScrollAnimation, useElementAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { simulations } from "@/components/home/SimulationData";
import { SimulationModal } from "@/components/home/SimulationModal";
import type { Simulation } from "@/components/home/SimulationData";

export default function CaseStudies() {
  const heroLabelRef = useElementAnimation(0);
  const heroTitleRef = useElementAnimation(0.1);
  const heroDescRef = useElementAnimation(0.2);
  const setCardRef = useStaggeredScrollAnimation(simulations.length, 0.12);
  const [scrollY, setScrollY] = useState(0);
  const [activeSimulation, setActiveSimulation] = useState<Simulation | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 70%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 70%)' }}>
        <Aurora scrollY={scrollY} variant="cosmic" intensity="subtle" />
        <div className="absolute inset-0 bg-background/85 dark:bg-background/80 backdrop-blur-xl" />
      </div>

      {/* Hero */}
      <section className="pt-28 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-14 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-foreground/20" />
              <span ref={heroLabelRef as React.RefObject<HTMLSpanElement>} className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                Simulations
              </span>
            </div>
            <h1 ref={heroTitleRef as React.RefObject<HTMLHeadingElement>} className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.08] mb-5">
              Explore Our Systems
            </h1>
            <p ref={heroDescRef as React.RefObject<HTMLParagraphElement>} className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Walk through the systems we've designed and deployed. Each simulation shows how a real implementation works, step by step.
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            {simulations.map((sim, index) => (
                <div
                  key={sim.id}
                  ref={setCardRef(index)}
                  onClick={() => setActiveSimulation(sim)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white/[0.07] backdrop-blur-md border border-white/[0.12] p-7 sm:p-10 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20">
                    <div className="flex items-start gap-5 sm:gap-7 mb-6">
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-xl font-medium tracking-tight mb-1">{sim.title}</h3>
                            <span className={`text-[10px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 ${
                              index % 2 === 0
                                ? 'text-[#7ec8e3]/80 border border-[#7ec8e3]/20 bg-[#7ec8e3]/5'
                                : 'text-muted-foreground/50 border border-border/40'
                            }`}>
                              {index % 2 === 0 ? 'Live Deployment' : 'Reference Architecture'}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-4">{sim.description}</p>

                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                          {sim.bullets.map((bullet) => (
                            <span key={bullet} className="text-xs text-muted-foreground/50 flex items-center gap-1.5">
                              <div className="w-1 h-1 rounded-full bg-foreground/20 shrink-0" />
                              {bullet}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Full-width Explore button */}
                    <div className="border-t border-border/40 pt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-2">
                          Explore
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-xs text-muted-foreground/30 font-mono">{sim.steps.length} steps</span>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {activeSimulation && (
        <SimulationModal simulation={activeSimulation} onClose={() => setActiveSimulation(null)} />
      )}
    </Layout>
  );
}
