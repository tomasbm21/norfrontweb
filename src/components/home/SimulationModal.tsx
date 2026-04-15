import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import type { Simulation } from "./SimulationData";

interface SimulationModalProps {
  simulation: Simulation;
  onClose: () => void;
}

export function SimulationModal({ simulation, onClose }: SimulationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const step = simulation.steps[currentStep];
  const totalSteps = simulation.steps.length;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const goTo = (index: number) => {
    if (animating || index === currentStep) return;
    setDirection(index > currentStep ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(index);
      setAnimating(false);
    }, 220);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — centered, large */}
      <div className="relative m-auto w-full max-w-5xl max-h-[90vh] flex flex-col lg:flex-row bg-[#0d1117] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

        {/* ── LEFT SIDEBAR ── */}
        <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
          {/* Title block */}
          <div className="px-6 py-6 border-b border-white/10">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-2">
              Simulation
            </p>
            <h2 className="text-base font-semibold text-white leading-snug">
              {simulation.title}
            </h2>
          </div>

          {/* Step list */}
          <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto hidden lg:block">
            {simulation.steps.map((s, i) => {
              const isDone = i < currentStep;
              const isActive = i === currentStep;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-full text-left px-3 py-3 flex items-start gap-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.08]'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Step indicator */}
                  <div className={`w-5 h-5 shrink-0 flex items-center justify-center mt-px border text-[10px] font-mono transition-all ${
                    isDone
                      ? 'border-[#7ec8e3]/50 text-[#7ec8e3]/70 bg-[#7ec8e3]/10'
                      : isActive
                      ? 'border-[#7ec8e3] text-[#0d1117] bg-[#7ec8e3]'
                      : 'border-white/15 text-white/25'
                  }`}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span className={`text-sm leading-snug transition-colors ${
                    isActive ? 'text-white font-medium' : isDone ? 'text-white/50' : 'text-white/30'
                  }`}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress bar at bottom of sidebar */}
          <div className="px-6 py-5 border-t border-white/10 hidden lg:block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-white/30 font-mono">Progress</span>
              <span className="text-[11px] text-white/40 font-mono">{currentStep + 1}/{totalSteps}</span>
            </div>
            <div className="h-px bg-white/10 w-full">
              <div
                className="h-px bg-[#7ec8e3] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 shrink-0">
            {/* Mobile progress dots */}
            <div className="flex items-center gap-2 lg:hidden">
              {simulation.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 ${
                    i === currentStep
                      ? 'w-5 h-1.5 bg-[#7ec8e3]'
                      : i < currentStep
                      ? 'w-1.5 h-1.5 rounded-full bg-[#7ec8e3]/40'
                      : 'w-1.5 h-1.5 rounded-full bg-white/15'
                  }`}
                />
              ))}
            </div>
            <div className="hidden lg:block" />

            <button
              onClick={onClose}
              className="p-1.5 text-white/30 hover:text-white transition-colors ml-auto"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Step content — animated */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 sm:py-10">
            <div
              key={currentStep}
              style={{
                animation: animating
                  ? `fadeSlide${direction === 'forward' ? 'Out' : 'OutBack'} 220ms ease forwards`
                  : `fadeSlideIn 280ms ease forwards`,
              }}
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#7ec8e3]/60">
                  Step {currentStep + 1}
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4 leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base text-white/55 leading-relaxed mb-10 max-w-xl">
                {step.description}
              </p>

              {/* Result / output block */}
              <div className="bg-white/[0.04] border border-white/[0.08] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7ec8e3]" />
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#7ec8e3]/60">
                    Output
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-mono">
                  {step.result}
                </p>
              </div>

              {/* Last step CTA */}
              {isLastStep && (
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/40 mb-6">
                    This is the kind of system we build. Want one tailored to your operation?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 px-7 py-3 bg-white text-[#0d1117] text-sm font-semibold hover:bg-white/90 transition-colors"
                    >
                      Book a Call
                      <ArrowRight size={15} />
                    </Link>
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 px-7 py-3 border border-white/20 text-white text-sm font-medium hover:bg-white/[0.06] transition-colors"
                    >
                      Request a Build Plan
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer nav */}
          <div className="shrink-0 flex items-center justify-between px-6 sm:px-10 py-4 border-t border-white/10">
            <button
              onClick={() => goTo(currentStep - 1)}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            {!isLastStep ? (
              <button
                onClick={() => goTo(currentStep + 1)}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-[#0d1117] bg-white hover:bg-white/90 transition-colors"
              >
                Next
                <ArrowRight size={14} />
              </button>
            ) : (
              <span className="text-xs text-white/20 font-mono">Complete</span>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes fadeSlideOutBack {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
