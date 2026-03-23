import { SiGoogle, SiTwilio, SiStripe, SiAirtable, SiSlack, SiGmail, SiCalendly, SiSquare, SiHubspot, SiNotion, SiMeta, SiShopify, SiDiscord, SiQuickbooks, SiAsana, SiTrello, SiZapier, SiMailchimp, SiYelp, SiClickup } from "react-icons/si";
import { FileText, Zap, MessageSquare, Users, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const integrationsRow1 = [
  { name: "Google Calendar", icon: SiGoogle },
  { name: "Twilio", icon: SiTwilio },
  { name: "Stripe", icon: SiStripe },
  { name: "Airtable", icon: SiAirtable },
  { name: "Slack", icon: SiSlack },
  { name: "Gmail", icon: SiGmail },
  { name: "Outlook", icon: Mail },
  { name: "Mindbody", icon: Users },
  { name: "Calendly", icon: SiCalendly },
  { name: "Square", icon: SiSquare },
  { name: "HubSpot", icon: SiHubspot },
  { name: "Notion", icon: SiNotion },
  { name: "Meta Ads", icon: SiMeta },
];

const integrationsRow2 = [
  { name: "Shopify", icon: SiShopify },
  { name: "Discord", icon: SiDiscord },
  { name: "QuickBooks", icon: SiQuickbooks },
  { name: "Jotform", icon: FileText },
  { name: "Klaviyo", icon: MessageSquare },
  { name: "Drip", icon: Zap },
  { name: "Asana", icon: SiAsana },
  { name: "Trello", icon: SiTrello },
  { name: "Zapier", icon: SiZapier },
  { name: "Mailchimp", icon: SiMailchimp },
  { name: "Yelp", icon: SiYelp },
  { name: "Google Reviews", icon: SiGoogle },
  { name: "ClickUp", icon: SiClickup },
];

const allIntegrations = [...integrationsRow1, ...integrationsRow2];

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
            Platform Integrations
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
          <div className="overflow-hidden"><IconRow integrations={integrationsRow1} /></div>
          <div className="overflow-hidden"><IconRow integrations={integrationsRow2} reverse /></div>
        </div>
      </div>
    </section>
  );
}