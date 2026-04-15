import { useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import CardSwap, { Card } from "@/components/CardSwap";

const companies = [
  {
    name: "Pulsara",
    vertical: "Customer Operations",
    status: "EN Live",
    description: "Complaint intelligence, ticket triage, and automated routing. Deployed for Vision Group (600+ stores). 94.2% classification accuracy, 87% less manual triage.",
  },
  {
    name: "Audera",
    vertical: "Finance & Accounting",
    status: "Designed",
    description: "AP/AR automation, payment processing, and reconciliation. ACH payment automation proven with Carriage Services ($21K/year labor savings, 50 hrs/month recovered).",
  },
  {
    name: "Propera",
    vertical: "Professional Services",
    status: "EN + DE Live",
    description: "Workflow automation for consulting, legal, and accounting firms. Contractor tracking, timesheet management, and proposal generation. Live in English and German.",
  },
  {
    name: "Covera",
    vertical: "Insurance",
    status: "Designed",
    description: "Claims triage, fraud detection, and underwriting automation. Policy management and compliance workflows.",
  },
  {
    name: "Legara",
    vertical: "Legal",
    status: "Designed",
    description: "Contract analysis, clause extraction, and document review. Regulatory monitoring and KYC/AML compliance automation.",
  },
  {
    name: "Tradara",
    vertical: "Logistics & Supply Chain",
    status: "Designed",
    description: "Supply chain intelligence, demand forecasting, and trade documentation automation.",
  },
  {
    name: "Onvara",
    vertical: "HR / People Operations",
    status: "Designed",
    description: "Hiring automation, employee lifecycle management, and workforce planning.",
  },
  {
    name: "Medivex",
    vertical: "Healthcare",
    status: "Designed",
    description: "Clinical workflow automation, patient intake, medical coding, and billing dispute resolution.",
  },
  {
    name: "Leasara",
    vertical: "Real Estate",
    status: "Designed",
    description: "Property management automation, lease analysis, and tenant operations.",
  },
];

// Subtle ambient aurora background — dark theme matching
function AmbientAurora({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      t += 0.004;

      ctx.clearRect(0, 0, w, h);

      // Deep dark background
      ctx.fillStyle = "rgba(5, 5, 10, 1)";
      ctx.fillRect(0, 0, w, h);

      // Very subtle gray-blue glow zones
      const glow = (
        cx: number,
        cy: number,
        r: number,
        col: string,
        alpha: number
      ) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, col.replace(")", `, ${alpha})`).replace("rgb", "rgba"));
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      };

      // Slow-moving ambient glows
      const cx1 = w * (0.3 + Math.sin(t * 0.3) * 0.15);
      const cy1 = h * (0.4 + Math.cos(t * 0.25) * 0.12);
      glow(cx1, cy1, w * 0.7, "rgb(40, 42, 60)", 0.18);

      const cx2 = w * (0.7 + Math.cos(t * 0.25) * 0.12);
      const cy2 = h * (0.6 + Math.sin(t * 0.3) * 0.1);
      glow(cx2, cy2, w * 0.6, "rgb(30, 35, 55)", 0.14);

      const cx3 = w * 0.5;
      const cy3 = h * (0.35 + Math.sin(t * 0.2) * 0.08);
      glow(cx3, cy3, w * 0.5, "rgb(50, 48, 65)", 0.1);

      // Subtle horizontal bands
      const drawBand = (by: number, amp: number, col: string, alpha: number) => {
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 2) {
          const nx = x / w;
          let y = by;
          for (let wv = 0; wv < 3; wv++) {
            y += Math.sin(nx * (1.5 + wv * 0.7) * Math.PI * 2 + t * (0.5 + wv * 0.12)) * amp * (1 - wv * 0.2);
          }
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, by - amp * 2, 0, by + amp * 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, col.replace(")", `, ${alpha})`).replace("rgb", "rgba"));
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 40;
        ctx.lineCap = "round";
        ctx.stroke();
      };

      drawBand(h * 0.4, 30, "rgb(45, 48, 65)", 0.12);
      drawBand(h * 0.55, 25, "rgb(35, 40, 60)", 0.09);
      drawBand(h * 0.65, 20, "rgb(55, 52, 70)", 0.07);

      // Floating ghost orbs
      const orbX = w * (0.2 + Math.sin(t * 0.15) * 0.08);
      const orbY = h * (0.6 + Math.cos(t * 0.2) * 0.1);
      glow(orbX, orbY, w * 0.3, "rgb(60, 58, 80)", 0.08);

      const orb2X = w * (0.8 + Math.cos(t * 0.18) * 0.06);
      const orb2Y = h * (0.3 + Math.sin(t * 0.22) * 0.08);
      glow(orb2X, orb2Y, w * 0.25, "rgb(40, 45, 65)", 0.07);

      // Vignette
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(0, 0, 0, 0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}

export default function Partners() {
  return (
    <Layout>
      <section className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        {/* Ambient aurora background */}
        <AmbientAurora />

        {/* Floating ghost geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ghost circles */}
          <div
            className="absolute rounded-full"
            style={{
              width: 320,
              height: 320,
              top: "8%",
              left: "-6%",
              border: "1px solid rgba(100, 105, 140, 0.12)",
              animation: "float-slow 18s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 180,
              height: 180,
              top: "55%",
              right: "-3%",
              border: "1px solid rgba(90, 95, 130, 0.1)",
              animation: "float-slow 14s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 90,
              height: 90,
              bottom: "15%",
              left: "8%",
              border: "1px solid rgba(110, 115, 150, 0.09)",
              animation: "float-slow 22s ease-in-out infinite",
            }}
          />
          {/* Ghost lines */}
          <div
            className="absolute h-px"
            style={{
              width: 240,
              top: "35%",
              right: "12%",
              background: "linear-gradient(90deg, transparent, rgba(100,105,140,0.12), transparent)",
              animation: "float-slow 16s ease-in-out infinite",
              transform: "rotate(-20deg)",
            }}
          />
          <div
            className="absolute h-px"
            style={{
              width: 180,
              bottom: "30%",
              left: "5%",
              background: "linear-gradient(90deg, transparent, rgba(90,95,130,0.1), transparent)",
              animation: "float-slow 20s ease-in-out infinite reverse",
              transform: "rotate(15deg)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
            {/* Left column - static info */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-foreground/20" />
                  <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                    Portfolio
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-foreground">
                  9 Brands. 9 Verticals.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Each Norfront brand targets a specific enterprise workflow bottleneck. Shared engineering and deployment infrastructure across brands means each new vertical launches faster than the last.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  Pulsara and Propera are live. Audera has a proven reference engagement. The remaining brands are designed, branded, and ready for first deployments.
                </p>
                <div className="pt-8 border-t border-foreground/10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-2xl font-semibold text-foreground block mb-1">2</span>
                      <span className="text-sm text-muted-foreground">Brands Live</span>
                    </div>
                    <div>
                      <span className="text-2xl font-semibold text-foreground block mb-1">7</span>
                      <span className="text-sm text-muted-foreground">Designed & Ready</span>
                    </div>
                    <div>
                      <span className="text-2xl font-semibold text-foreground block mb-1">4 weeks</span>
                      <span className="text-sm text-muted-foreground">Deployment Cycle</span>
                    </div>
                    <div>
                      <span className="text-2xl font-semibold text-foreground block mb-1">9</span>
                      <span className="text-sm text-muted-foreground">Vertical Brands</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - CardSwap component */}
            <div className="lg:col-span-7">
              <div className="relative h-[600px] lg:h-[700px]">
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={true}
                >
                  {companies.map((company) => (
                    <Card key={company.name}>
                      <div className="p-8 flex flex-col gap-4 h-full justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-semibold text-white">
                              {company.name}
                            </h3>
                            <span className={`text-[10px] font-mono tracking-[0.12em] uppercase px-2 py-0.5 ${
                              company.status.includes("Live") || company.status === "In Production"
                                ? "text-[#7ec8e3]/80 border border-[#7ec8e3]/20 bg-[#7ec8e3]/5"
                                : "text-white/40 border border-white/10 bg-white/[0.03]"
                            }`}>
                              {company.status}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono tracking-[0.08em] text-white/40 block mb-3">{company.vertical}</span>
                          <p className="text-base text-white/70 leading-relaxed">
                            {company.description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                          <span className="text-xs font-mono tracking-widest uppercase text-white/40">
                            Norfront Group
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Float keyframes injected via style tag */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(1deg); }
          66% { transform: translateY(-7px) rotate(-0.5deg); }
        }
      `}</style>
    </Layout>
  );
}
