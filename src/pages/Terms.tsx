import { Layout } from "@/components/layout/Layout";
import { useElementAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Terms() {
  const labelRef = useElementAnimation(0);
  const titleRef = useElementAnimation(0.1);
  const dateRef = useElementAnimation(0.15);
  const contentRef = useScrollAnimation({ staggerDelay: 0.2 });

  return (
    <Layout>
      <section className="pt-28 pb-16 sm:pt-36 lg:pt-44 lg:pb-24 relative z-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-foreground/20" />
              <span ref={labelRef as React.RefObject<HTMLSpanElement>} className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60">
                Legal
              </span>
            </div>
            <h1 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] mb-6">
              Terms of Service
            </h1>
            <p ref={dateRef as React.RefObject<HTMLParagraphElement>} className="text-sm text-muted-foreground mb-14">
              Last updated: January 2026
            </p>

            <div ref={contentRef as React.RefObject<HTMLDivElement>} className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-10">
                <section>
                  <h2 className="text-lg font-medium mb-3">Agreement to Terms</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    By accessing or using our website and services, you agree to be bound by these 
                    Terms of Service. If you do not agree to these terms, please do not use our 
                    services.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Services</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    Norfront Group provides AI advisory and implementation services. The specific terms, 
                    deliverables, and pricing for each engagement are defined in separate project 
                    agreements or statements of work.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Intellectual Property</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    Unless otherwise specified in a project agreement, clients retain ownership of 
                    their data and any custom systems built specifically for them. Norfront Group retains 
                    ownership of its proprietary methodologies, frameworks, and pre-existing 
                    intellectual property.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Confidentiality</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    We maintain strict confidentiality regarding client information and project 
                    details. Case studies and testimonials are only published with explicit client 
                    consent.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Limitation of Liability</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    To the maximum extent permitted by law, Norfront Group shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages arising out 
                    of or related to your use of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Governing Law</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    These Terms of Service are governed by and construed in accordance with 
                    applicable laws. Any disputes arising from these terms shall be resolved 
                    through binding arbitration.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Changes to Terms</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    We reserve the right to modify these Terms of Service at any time. We will 
                    notify users of any material changes by updating the "Last updated" date at 
                    the top of this page.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Contact</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    For questions about these Terms of Service, please contact us at legal@norfront.com.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}