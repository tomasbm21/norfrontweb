import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { simulations } from "./SimulationData";
import { SimulationModal } from "./SimulationModal";
import type { Simulation } from "./SimulationData";

interface PreviewSimulationsProps {
  overlay?: boolean;
}

export function PreviewSimulations({ overlay = false }: PreviewSimulationsProps) {
  const setCardRef = useStaggeredScrollAnimation(simulations.length, 0.1);
  const [activeSimulation, setActiveSimulation] = useState<Simulation | null>(null);

  return (
    <>
      <section className={overlay ? "py-16 sm:py-20 lg:py-24 relative z-10" : "py-16 sm:py-28 lg:py-36 relative z-10"}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
          {/* Left-aligned header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 sm:mb-20">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-3 block text-white/40">
                System Walkthroughs
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-white">
                How the systems work
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-7 flex items-end">
              <p className="text-sm leading-relaxed text-white/50">
                Step-by-step walkthroughs of the AI systems we build. Production systems are labeled; reference architectures show the pattern.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {simulations.map((sim, index) => (
              <div
                key={sim.id}
                ref={setCardRef(index)}
                className="group relative"
              >
                <div className="relative p-6 sm:p-7 transition-all duration-300 bg-white/[0.07] backdrop-blur-md border border-white/[0.12] hover:bg-white/[0.1] hover:border-white/20">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-8 h-px bg-white/20" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-white/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-[9px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 ${
                      index % 2 === 0
                        ? 'text-[#7ec8e3]/80 border border-[#7ec8e3]/20 bg-[#7ec8e3]/5'
                        : 'text-white/40 border border-white/10 bg-white/[0.03]'
                    }`}>
                      {index % 2 === 0 ? 'Production System' : 'Reference Architecture'}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium mb-2 tracking-tight text-white">{sim.title}</h3>
                  <p className="text-sm leading-relaxed mb-5 text-white/50">{sim.description}</p>

                  <ul className="space-y-2 mb-6">
                    {sim.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-[13px] text-white/45">
                        <div className="w-1 h-1 rounded-full mt-[7px] shrink-0 bg-white/25" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={() => setActiveSimulation(sim)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer text-white hover:text-white/70"
                    >
                      Explore <ArrowRight size={14} />
                    </button>

                    <span className="flex items-center gap-1 text-[11px] font-mono text-white/25">
                      <Clock size={10} /> 2–3 min
                    </span>
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
    </>
  );
}