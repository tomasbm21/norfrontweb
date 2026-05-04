import { Link } from "react-router-dom";
import norfrontLogo from "@/assets/Untitled design (7).png";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <img src={norfrontLogo} alt="Norfront Group" className="h-14 w-auto mb-4" />
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-xs">
              A holding company building specialized AI companies for enterprise operations. One vertical at a time.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/40 block mb-4">Company</span>
            <nav className="flex flex-col gap-2.5">
              <Link to="/model" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">Our Model</Link>
              <Link to="/case-studies" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">Case Studies</Link>
              <Link to="/partners" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">Portfolio</Link>
            </nav>
          </div>

          <div className="md:col-span-2">
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/40 block mb-4">Work With Us</span>
            <nav className="flex flex-col gap-2.5">
              <Link to="/services" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">How We Work</Link>
              <Link to="/jarvis" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">Jarvis (voice)</Link>
              <Link to="/contact" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">Contact</Link>
              <Link to="/jobs" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors">Careers</Link>
            </nav>
          </div>

          <div className="md:col-span-2">
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/40 block mb-4">Contact</span>
            <a href="mailto:tomas.madero@norfront.group" className="text-sm text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors block mb-2">
              tomas.madero@norfront.group
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-muted-foreground/30">
            © {new Date().getFullYear()} Norfront Group. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
