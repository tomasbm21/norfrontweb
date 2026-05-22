'use client';

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GradientText from "@/components/GradientText";
import BorderGlow from "@/components/BorderGlow";
import LightPillar from "@/components/LightPillar";

export function HeroSection() {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#7ec8e3"
            intensity={1.0}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={3.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={0}
            interactive={false}
            mixBlendMode="normal"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <section className="relative z-10 h-screen flex items-center justify-center">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-[1.65rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-medium leading-[1.12] tracking-[-0.02em] mb-4 sm:mb-8 animate-fade-in-delay-1 text-white">
              We build AI companies that run{" "}
              <span className="font-['Playfair_Display'] italic font-normal">
                <GradientText colors={['#7ec8e3', '#a8d8ea', '#c9e4f0']} animationSpeed={6}>
                  enterprise operations.
                </GradientText>
              </span>
            </h1>

            <p className="text-sm md:text-base text-white/50 leading-[1.6] max-w-sm md:max-w-lg mb-8 md:mb-12 animate-fade-in-delay-2">
              A holding company with 9 brands. Each one targets a specific enterprise workflow — customer ops, finance, legal, logistics — and deploys a production system in 4 weeks.
            </p>

            {/* Mobile buttons */}
            <div className="flex md:hidden flex-col items-center gap-3 animate-fade-in-delay-3 px-4 w-full">
              <BorderGlow borderRadius={8} glowRadius={20} glowColor="200 60 85" backgroundColor="rgba(255,255,255,0.95)" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15} className="w-full max-w-[85%]">
                <Link to="/contact" className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#1a2332] w-full rounded-lg">
                  Talk to Us
                  <ArrowRight size={16} />
                </Link>
              </BorderGlow>
              <BorderGlow borderRadius={8} glowRadius={20} glowColor="200 60 85" backgroundColor="hsl(215, 25%, 12%)" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.08} className="w-full max-w-[85%]">
                <Link to="/case-studies" className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white w-full rounded-lg">
                  See It In Action
                </Link>
              </BorderGlow>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex gap-4 animate-fade-in-delay-3">
              <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="rgba(255,255,255,0.95)" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.15}>
                <Link to="/contact" className="flex items-center gap-2 px-8 py-3 text-sm font-medium text-[#1a2332]">
                  Talk to Us
                  <ArrowRight size={18} />
                </Link>
              </BorderGlow>
              <BorderGlow borderRadius={0} glowRadius={24} glowColor="200 60 85" backgroundColor="hsl(215, 25%, 12%)" colors={['#7ec8e3','#a8d8ea','#c9e4f0']} fillOpacity={0.08}>
                <Link to="/case-studies" className="flex items-center px-8 py-3 text-sm font-medium text-white">
                  See It In Action
                </Link>
              </BorderGlow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
