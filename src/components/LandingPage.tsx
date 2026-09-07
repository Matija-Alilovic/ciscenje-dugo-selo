import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import MobileStickyCTA, { CTAButtons } from '@/components/MobileStickyCTA';
import CalculatorHint from '@/components/CalculatorHint';
import Section from '@/components/Section';
import PriceCalculator from '@/components/PriceCalculator';
import Checklist from '@/components/Checklist';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import {
  AREA_LINKS,
  ALL_SERVICES_CHECKLIST,
  SERVICE_PAGES,
} from '@/lib/constants';
import { getLandingPageSchemas } from '@/lib/schema';
import type {
  CalculatorCategory,
  YardCalculatorInput,
} from '@/lib/yardCalculator';

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
  checklistTitle?: string;
  checklistItems?: readonly string[];
  calculatorCategory?: CalculatorCategory;
  calculatorYard?: Partial<YardCalculatorInput>;
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
  checklistTitle = 'Usluge koje obavljamo',
  checklistItems = ALL_SERVICES_CHECKLIST,
  calculatorCategory,
  calculatorYard,
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
        <section className="mesh-bg py-14 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[{ label: 'Početna', href: '/' }, { label: title }]}
            />
            <h1 className="hero-fade hero-delay-1 max-w-4xl text-3xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="hero-fade hero-delay-2 mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-2xl">
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
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 sm:space-y-5 sm:text-xl">
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {sections.map((section, index) => (
          <Section
            key={section.title}
            title={section.title}
            className={index % 2 === 1 ? 'section-alt' : ''}
          >
            {section.content}
          </Section>
        ))}

        {showBasicChecklist && (
          <Section title={checklistTitle}>
            <Checklist items={[...checklistItems]} />
          </Section>
        )}

        {showPricing && (
          <Section
            id="kalkulator"
            title="Kalkulator cijene"
            subtitle="Odgovorite na nekoliko pitanja i dobit ćete okvirnu cijenu održavanja kuće i okućnice."
          >
            <PriceCalculator
              initialCategory={calculatorCategory}
              initialYard={calculatorYard}
            />
          </Section>
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
                className="rounded-lg border border-gray-200 px-5 py-3 text-lg text-gray-700 hover:border-brand-300 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-lg border border-gray-200 px-5 py-3 text-lg text-gray-700 hover:border-brand-300 hover:text-brand-700"
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
                className="rounded-lg border border-gray-200 px-5 py-3 text-lg text-gray-700 hover:border-brand-300 hover:text-brand-700"
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
