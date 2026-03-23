import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { ProvenOutcomes } from "@/components/home/ProvenOutcomes";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Differentiation } from "@/components/home/Differentiation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PreviewSimulations } from "@/components/home/PreviewSimulations";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PreviewSimulations />
      <IntegrationsSection />
      <ProvenOutcomes />
      <ServicesOverview />
      <Differentiation />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
