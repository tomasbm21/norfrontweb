import { Layout } from "@/components/layout/Layout";
import { useElementAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p ref={dateRef as React.RefObject<HTMLParagraphElement>} className="text-sm text-muted-foreground mb-14">
              Last updated: January 2026
            </p>

            <div ref={contentRef as React.RefObject<HTMLDivElement>} className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-10">
                <section>
                  <h2 className="text-lg font-medium mb-3">Information We Collect</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    We collect information you provide directly to us, such as when you fill out a 
                    contact form, request a consultation, or communicate with us via email. This 
                    information may include your name, email address, company name, and any other 
                    information you choose to provide.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">How We Use Your Information</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8] mb-3">
                    We use the information we collect to:
                  </p>
                  <ul className="list-none space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-muted-foreground/30">—</span> Respond to your inquiries and provide requested services</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground/30">—</span> Send you information about our services that may be of interest</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground/30">—</span> Improve our website and services</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground/30">—</span> Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Information Sharing</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    We do not sell, trade, or otherwise transfer your personal information to 
                    third parties without your consent, except as necessary to provide our services 
                    or as required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Data Security</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    We implement appropriate technical and organizational measures to protect your 
                    personal information against unauthorized access, alteration, disclosure, or 
                    destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Cookies</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    Our website may use cookies to enhance your browsing experience. You can 
                    instruct your browser to refuse all cookies or to indicate when a cookie is 
                    being sent.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Your Rights</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    You have the right to access, correct, or delete your personal information. 
                    To exercise these rights, please contact us at privacy@norfront.com.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium mb-3">Contact Us</h2>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    If you have any questions about this Privacy Policy, please contact us at 
                    privacy@norfront.com.
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