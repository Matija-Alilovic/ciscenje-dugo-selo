import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import MobileStickyCTA, { CTAButtons } from "@/components/MobileStickyCTA";
import CalculatorHint from "@/components/CalculatorHint";
import Section from "@/components/Section";
import PricingTable from "@/components/PricingTable";
import PriceCalculator from "@/components/PriceCalculator";
import Checklist from "@/components/Checklist";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import JsonLd from "@/components/JsonLd";
import { AREA_LINKS, BASIC_CLEANING, SERVICE_PAGES } from "@/lib/constants";
import { getLandingPageSchemas } from "@/lib/schema";

type LandingPageProps = {
  title: string;
  subtitle: string;
  pagePath: string;
  intro: string[];
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
  showPricing?: boolean;
  showBasicChecklist?: boolean;
  showFaq?: boolean;
  showContact?: boolean;
};

export function LandingPage({
  title,
  subtitle,
  pagePath,
  intro,
  sections,
  showPricing = true,
  showBasicChecklist = true,
  showFaq = true,
  showContact = true,
}: LandingPageProps) {
  return (
    <>
      <JsonLd
        data={getLandingPageSchemas({
          title,
          subtitle,
          path: pagePath,
        })}
      />
      <Header />
      <main>
        <section className="mesh-bg py-12 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { label: "Početna", href: "/" },
                { label: title },
              ]}
            />
            <h1 className="hero-fade hero-delay-1 max-w-3xl text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>
            <p className="hero-fade hero-delay-2 mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 sm:mt-5 sm:text-xl">
              {subtitle}
            </p>
            {showPricing && (
              <CalculatorHint className="hero-fade hero-delay-3 mt-6 sm:mt-8" />
            )}
            <CTAButtons
              className="hero-fade hero-delay-3 mt-6 sm:mt-8"
              leadWithCalculator={showPricing}
            />
          </div>
        </section>

        <Section title="O usluzi">
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-gray-700">
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {sections.map((section, index) => (
          <Section
            key={section.title}
            title={section.title}
            className={index % 2 === 1 ? "section-alt" : ""}
          >
            {section.content}
          </Section>
        ))}

        {showBasicChecklist && (
          <Section title="Što je uključeno u osnovno čišćenje">
            <Checklist items={BASIC_CLEANING} />
          </Section>
        )}

        {showPricing && (
          <>
            <Section
              id="kalkulator"
              title="Kalkulator cijene"
              subtitle="Odgovorite na pitanja i dobit ćete okvirnu cijenu prije kontakta."
            >
              <PriceCalculator />
            </Section>
            <Section id="cjenik" title="Cjenik" className="section-alt">
              <PricingTable />
            </Section>
          </>
        )}

        {showFaq && (
          <Section id="faq" title="Česta pitanja">
            <FAQ />
          </Section>
        )}

        {showContact && (
          <Section id="kontakt" title="Kontakt" className="section-alt">
            <ContactSection />
          </Section>
        )}

        <Section title="Ostale usluge">
          <div className="flex flex-wrap gap-3">
            {SERVICE_PAGES.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-base text-gray-700 hover:border-brand-300 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-base text-gray-700 hover:border-brand-300 hover:text-brand-700"
            >
              Početna
            </Link>
          </div>
        </Section>

        <Section title="Područje rada" className="section-alt">
          <div className="flex flex-wrap gap-3">
            {AREA_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-base text-gray-700 hover:border-brand-300 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}

export type { LandingPageProps };
