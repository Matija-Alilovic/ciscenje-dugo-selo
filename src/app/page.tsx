import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCards from '@/components/ServiceCards';
import Steps from '@/components/Steps';
import AboutSection from '@/components/AboutSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import LocalAreaSection from '@/components/LocalAreaSection';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import ServicePillars from '@/components/ServicePillars';
import { INTRO_TEXT } from '@/lib/constants';
import { getHomePageSchemas } from '@/lib/schema';
import { HOME_METADATA } from '@/lib/seo';
import dynamic from 'next/dynamic';

const PriceCalculator = dynamic(() => import('@/components/PriceCalculator'), {
  loading: () => (
    <div
      className="card-modern h-64 animate-pulse bg-gray-100/80 sm:h-80"
      aria-hidden="true"
    />
  ),
});

export const metadata = HOME_METADATA;

export default function HomePage() {
  return (
    <>
      <JsonLd data={getHomePageSchemas()} />
      <Header />
      <main>
        <Hero
          title="Održavanje kuće i okućnice"
          subtitle="Čišćenje i održavanje dvorišta po dogovorenom rasporedu"
          highlightCalculator
        />
        <Section title="Ukratko">
          <Reveal>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-xl md:text-2xl">
              {INTRO_TEXT}
            </p>
          </Reveal>
        </Section>
        <Section id="usluge" title="Usluge koje nudimo" subtitle="">
          <ServicePillars />
        </Section>
        <Section
          title="Područje rada"
          subtitle="Dugo Selo, Sesvete, Vrbovec, Rugvica, Božjakovina i Brckovljani."
        >
          <LocalAreaSection />
        </Section>
        <Section
          title="Kalkulator cijene"
          subtitle="Nekoliko pitanja — okvirna cijena održavanja."
          className="section-alt"
        >
          <div id="kalkulator">
            <PriceCalculator />
          </div>
        </Section>
        <Section
          title="Naše usluge"
          subtitle="Sve što nudimo u okviru redovitog održavanja."
        >
          <ServiceCards />
        </Section>
        <Section title="Kako surađujemo" className="section-alt">
          <Steps />
        </Section>
        <Section
          title="Prije i poslije"
          subtitle="Fotografije s naših poslova."
        >
          <BeforeAfterSection />
        </Section>
        <Section
          title="Recenzije na Googleu"
          subtitle="Što klijenti pišu o nama."
          className="section-alt"
        >
          <GoogleReviewsSection />
        </Section>
        <Section id="o-nama" title="O nama">
          <AboutSection />
        </Section>

        <Section id="faq" title="Česta pitanja" className="section-surface">
          <FAQ />
        </Section>
        <Section
          id="kontakt"
          title="Kontakt"
          subtitle="Javite se putem forme, WhatsAppa ili telefona."
          className="section-surface"
        >
          <ContactSection />
        </Section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
