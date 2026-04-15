import { SiGoogle, SiSlack, SiHubspot, SiNotion } from "react-icons/si";
import { FileText, Database, Mail, Server, Workflow, Shield, BarChart3, Cloud } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const integrationsRow1 = [
  { name: "Salesforce", icon: Cloud },
  { name: "ServiceNow", icon: Server },
  { name: "Slack", icon: SiSlack },
  { name: "Google Workspace", icon: SiGoogle },
  { name: "HubSpot", icon: SiHubspot },
  { name: "Outlook / O365", icon: Mail },
  { name: "PostgreSQL", icon: Database },
  { name: "n8n", icon: Workflow },
  { name: "Notion", icon: SiNotion },
  { name: "ERP Systems", icon: BarChart3 },
  { name: "Supabase", icon: Database },
  { name: "SSO / RBAC", icon: Shield },
  { name: "Custom APIs", icon: FileText },
];

const allIntegrations = [...integrationsRow1];

const IconRow = ({ integrations, reverse = false }: { integrations: typeof integrationsRow1; reverse?: boolean }) => (
  <div className={`flex ${reverse ? 'animate-scroll-x-reverse' : 'animate-scroll-x'}`}>
    {[0, 1].map((setIndex) => (
      <div key={setIndex} className="flex gap-10 md:gap-14 shrink-0 pr-10 md:pr-14">
        {integrations.map((integration, index) => (
          <div
            key={`${setIndex}-${index}`}
            className="flex flex-col items-center justify-center gap-2 w-14 h-14 md:w-16 md:h-16 text-white/35 hover:text-white/70 transition-all duration-300 cursor-default"
            title={integration.name}
          >
            <integration.icon className="w-7 h-7 md:w-8 md:h-8" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export function IntegrationsSection() {
  const sectionRef = useScrollAnimation({ staggerDelay: 0.05 });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 relative z-10">
      <div className="container mx-auto px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-4 mb-0">
          <div className="w-8 h-px bg-white/20" />
          <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40">
            Enterprise Integrations
          </h2>
        </div>
      </div>
      
      {/* Desktop */}
      <div className="hidden md:block relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="py-6 px-4 overflow-hidden">
          <IconRow integrations={allIntegrations} />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative -mx-6 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="py-4 overflow-hidden space-y-6">
          <div className="overflow-hidden"><IconRow integrations={allIntegrations} /></div>
        </div>
      </div>
    </section>
  );
}