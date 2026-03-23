import { Link } from "react-router-dom";
import { ArrowRight, Workflow, Bot, BarChart3, Inbox, BookOpen } from "lucide-react";
import { useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Intake, routing, execution, and reporting — automated end to end via your existing tools, incl. Slack, Google Drive, Office, or CRMs.",
  },
  {
    icon: Bot,
    title: "Agentic AI",
    description: "Secure, in-house AI agents that automate processes and deliver measurable savings across departments.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Dashboards",
    description: "Weekly insights, trend flags, and exception alerts, with zero manual compilation.",
  },
  {
    icon: Inbox,
    title: "Intake & Routing",
    description: "Complaints, invoices, and requests captured, categorized, prioritized, and assigned automatically.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Retrieval",
    description: "Internal search and knowledge base built for secure AI and employee access.",
  },
];

export function ServicesOverview() {
  const setCardRef = useStaggeredScrollAnimation(services.length, 0.1);

  return (
    <section className="py-16 sm:py-28 lg:py-36 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Asymmetric header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
                Our Architecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.1] text-white">
              Department-level AI implementations
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex items-end">
            <Link
              to="/services"
              className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group font-medium"
            >
              How we work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={setCardRef(index)}
              className="group bg-white/[0.05] backdrop-blur-sm p-7 sm:p-10 transition-colors duration-300 hover:bg-white/[0.1] border border-white/[0.06]"
            >
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center shrink-0">
                  <service.icon size={18} strokeWidth={1.5} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2 tracking-tight text-white group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
