import { LandingPage } from "@/components/LandingPage";
import Checklist from "@/components/Checklist";
import { DEEP_CLEANING } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.generalno;

export default function GeneralnoCiscenjePage() {
  return (
    <LandingPage
      title="Generalno čišćenje stana Dugo Selo"
      pagePath="/generalno-ciscenje-stana-dugo-selo"
      subtitle="Nudimo samo iznimno. Naša osnovna usluga je redovito tjedno čišćenje."
      intro={[
        "Generalno čišćenje nije naša osnovna usluga. Fokusiramo se na redovito čišćenje — isti dan svaki tjedan ili svaka dva tjedna.",
        "Jednokratni temeljiti dolazak rješavamo samo iznimno, ako stignemo uz redovite klijente. Ako želite dugoročnu suradnju, bolje je dogovoriti redoviti ritam.",
      ]}
      sections={[
        {
          title: "Što uključuje generalno čišćenje (ako se dogovorimo)",
          content: <Checklist items={DEEP_CLEANING} />,
        },
        {
          title: "Što preporučujemo umjesto toga",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Redovito čišćenje po 13 €/h, tjedno ili svaka dva tjedna. Tako
              stan ostaje uredan cijelu godinu, bez jednokratnog posla jednom
              godišnje. Pogledajte{" "}
              <a
                href="/ciscenje-stanova-dugo-selo"
                className="font-medium text-brand-700 underline underline-offset-2"
              >
                redovito čišćenje stanova
              </a>
              .
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
    />
  );
}
