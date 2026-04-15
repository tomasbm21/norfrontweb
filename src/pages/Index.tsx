import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { ProvenOutcomes } from "@/components/home/ProvenOutcomes";
import { PipelineHighlight } from "@/components/home/PipelineHighlight";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Differentiation } from "@/components/home/Differentiation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PreviewSimulations } from "@/components/home/PreviewSimulations";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProvenOutcomes />
      <PipelineHighlight />
      <ServicesOverview />
      <PreviewSimulations />
      <Differentiation />
      <IntegrationsSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
