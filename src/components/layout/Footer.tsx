import norfrontLogo from "@/assets/Untitled design (7).png";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <img src={norfrontLogo} alt="Norfront Group" className="h-16 sm:h-20 w-auto mb-5" />
          <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-sm">
            Department-level AI implementations for the enterprise.
          </p>
          <a href="mailto:tomas.madero@norfront.group" className="mt-4 text-sm text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
            tomas.madero@norfront.group
          </a>
          <a href="/Norfront_General_Proposal.pdf" download className="mt-3 text-sm text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
            Download Brochure
          </a>
          <div className="mt-8 pt-6 border-t border-border/20 w-full max-w-xs">
            <p className="text-xs text-muted-foreground/30">
              © {new Date().getFullYear()} Norfront Group. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
