import Link from "next/link";
import { LandingPage } from "@/components/LandingPage";
import Checklist from "@/components/Checklist";
import { YARD_CHECKLIST } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.dvoriste;

export default function OdrzavanjeDvoristaPage() {
  return (
    <LandingPage
      title="Održavanje dvorišta i okućnice Dugo Selo"
      pagePath="/odrzavanje-dvorista-dugo-selo"
      subtitle="Redovita košnja, živica, lišće i terasa u Dugom Selu i Sesvetama. Dogovaramo ritam i držimo ga kroz sezonu."
      intro={[
        "Održavanje dvorišta i okućnice kod nas znači redovitu brigu o travnjaku, živici, gredicama i vanjskim površinama. Dolazimo u Dugo Selo i Sesvete — isti ritam dok traje sezona.",
        "Ne nudimo jednokratno uređenje jednom godišnje. Ako želite urednu okućnicu bez ponovnog dogovaranja svaki put, tu smo.",
      ]}
      sections={[
        {
          title: "Što uključuje održavanje okućnice",
          content: <Checklist items={[...YARD_CHECKLIST]} />,
        },
        {
          title: "Košnja trave i ostale usluge",
          content: (
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 sm:text-xl">
              <p>
                Osnovica je{" "}
                <Link
                  href="/kosnja-trave-dugo-selo"
                  className="font-medium text-brand-700 underline underline-offset-2"
                >
                  redovita košnja trave
                </Link>
                . Uz to dogovaramo orezivanje živice, skupljanje lišća, gredice i{" "}
                <Link
                  href="/pranje-terase-dugo-selo"
                  className="font-medium text-brand-700 underline underline-offset-2"
                >
                  pranje terase
                </Link>{" "}
                po potrebi.
              </p>
              <p>
                Većina klijenata s kućom spaja čišćenje unutra i okućnicu u istom
                tjednu — jedan dogovor, uredan dom i dvorište.
              </p>
            </div>
          ),
        },
        {
          title: "Cijena održavanja dvorišta",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Košnja je 0,15–0,30 €/m², najmanje 35 € po dolasku. Tipično dvorište
              često izađe 50–80 €. Živica, lišće ili pranje terase dodaju se
              prema poslu. Za točnu ponudu pošaljite okvirnu veličinu ili slike —
              ili koristite kalkulator na stranici.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
      calculatorCategory="dvoriste"
    />
  );
}
