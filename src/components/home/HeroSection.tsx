import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GradientText from "@/components/GradientText";
import BorderGlow from "@/components/BorderGlow";
import heroVideo from "@/assets/Home page.mp4";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const onLoaded = () => {
      // iOS requires a play/pause cycle before currentTime can be set
      video.play().then(() => {
        video.pause();
        video.currentTime = 0;
        setVideoReady(true);
      }).catch(() => {
        video.currentTime = 0;
        setVideoReady(true);
      });
    };

    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) onLoaded();

    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Map entire page scroll to video duration
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

        if (video.duration && isFinite(video.duration)) {
          video.currentTime = progress * video.duration;
        }

        // Fade text out over first 300px of scroll
        if (textRef.current) {
          const textProgress = Math.min(window.scrollY / 300, 1);
          textRef.current.style.opacity = String(1 - textProgress);
          textRef.current.style.transform = `translateY(${-textProgress * 60}px)`;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoReady]);

  return (
    <>
      {/* Fixed video background — covers entire page, always visible */}
      <div className="fixed inset-0 z-0" style={{ backgroundColor: 'hsl(215, 25%, 12%)' }}>
        <video
          ref={videoRef}
          src={heroVideo}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero content — sits on top of fixed video, scrolls away naturally */}
      <section className="relative z-10 h-screen flex items-center">
        <div
          ref={textRef}
          className="container mx-auto px-5 sm:px-6 lg:px-8"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[1.65rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-medium leading-[1.12] tracking-[-0.02em] mb-4 sm:mb-8 animate-fade-in-delay-1 text-center md:text-left text-white">
                We build AI companies that run{" "}
                <span className="font-['Playfair_Display'] italic font-normal">
                  <GradientText colors={['#7ec8e3', '#a8d8ea', '#c9e4f0']} animationSpeed={6}>
                    enterprise operations.
                  </GradientText>
                </span>
              </h1>

              <p className="text-sm md:text-base text-white/50 leading-[1.6] max-w-sm md:max-w-lg mb-8 md:mb-12 animate-fade-in-delay-2 text-center md:text-left mx-auto md:mx-0">
                A holding company with 9 brands. Each one targets a specific enterprise workflow — customer ops, finance, legal, logistics — and deploys a production system in 4 weeks.
              </p>

              {/* Mobile buttons */}
              <div className="flex md:hidden flex-col items-center gap-3 animate-fade-in-delay-3 px-4">
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
            <div className="hidden lg:block lg:col-span-5" />
          </div>
        </div>
      </section>
    </>
  );
}
