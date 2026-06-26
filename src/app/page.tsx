import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceTypes from '@/components/ServiceTypes';
import ServiceCards from '@/components/ServiceCards';
import ServiceComparisonTable from '@/components/ServiceComparisonTable';
import PricingTable from '@/components/PricingTable';
import PriceCalculator from '@/components/PriceCalculator';
import Steps from '@/components/Steps';
import AboutSection from '@/components/AboutSection';
import PartnersSection from '@/components/PartnersSection';
import WhyUs from '@/components/WhyUs';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import JsonLd from '@/components/JsonLd';
import { INTRO_TEXT } from '@/lib/constants';
import { getHomePageSchemas } from '@/lib/schema';
import { HOME_METADATA } from '@/lib/seo';

export const metadata = HOME_METADATA;

export default function HomePage() {
  return (
    <>
      <JsonLd data={getHomePageSchemas()} />
      <Header />
      <main>
        <Hero
          title="Čišćenje stanova Dugo Selo"
          subtitle="Čistimo stanove i kuće u Dugom Selu i okolici — redovno održavanje, jednokratni dolazak ili temeljito čišćenje."
          highlightCalculator
        />
        <Section title="O usluzi">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              {INTRO_TEXT}
            </p>
          </Reveal>
        </Section>
        <Section
          id="kalkulator"
          title="Kalkulator cijene"
          subtitle="Odgovorite na pitanja o prostoru i usluzi — dobit ćete okvirnu cijenu prije nego nas kontaktirate."
          className="section-alt"
        >
          <PriceCalculator />
        </Section>
        <Section
          id="vrste-ciscenja"
          title="Koja vam treba usluga?"
          subtitle="Tri vrste čišćenja razlikuju se po tome koliko često dolazimo i koliko detaljno čistimo."
        >
          <ServiceTypes />
        </Section>
        <Section
          title="Usporedba usluga"
          subtitle="Brzi pregled što je uključeno u redovno, jednokratno i generalno čišćenje."
          className="section-alt"
        >
          <ServiceComparisonTable />
        </Section>
        <Section
          id="usluge"
          title="Sve usluge"
          subtitle="Osim stanova, čistimo i kuće, peremo prozore i dolazimo nakon selidbe."
        >
          <ServiceCards />
        </Section>
        <Section id="cjenik" title="Cjenik" className="section-surface">
          <PricingTable />
        </Section>
        <Section title="Kako radimo" className="section-alt">
          <Steps />
        </Section>
        <Section id="o-nama" title="O nama" subtitle="">
          <AboutSection />
        </Section>
        <Section
          id="suradnici"
          title="Naši suradnici"
          subtitle=""
          className="section-alt"
        >
          <PartnersSection />
        </Section>
        <Section title="Zašto odabrati nas">
          <WhyUs />
        </Section>
        <Section id="faq" title="Česta pitanja" className="section-surface">
          <FAQ />
        </Section>
        <Section
          id="kontakt"
          title="Kontakt"
          subtitle="Niste prošli kalkulator? Ispunite formu — ili nam se javite izravno."
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
