import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function FinalCTA() {
  const sectionRef = useScrollAnimation({ staggerDelay: 0 });

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-32 lg:py-40 relative overflow-hidden bg-white/[0.08] backdrop-blur-md z-10"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-4xl lg:text-[3rem] font-medium tracking-[-0.02em] leading-[1.1] mb-5 text-white">
              Tell us which workflow is breaking.
            </h2>
            <p className="text-base text-white/60 mb-10 max-w-lg leading-relaxed">
              We'll scope a discovery engagement, map the manual effort, and show you what a 4-week deployment looks like for your operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="rgba(255,255,255,0.12)" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15}>
                <Link to="/contact" className="flex items-center gap-2 px-10 py-3 text-sm font-medium text-white">
                  Talk to Us
                  <ArrowRight size={18} />
                </Link>
              </BorderGlow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}