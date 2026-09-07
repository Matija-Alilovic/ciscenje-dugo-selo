import { LandingPage } from "@/components/LandingPage";
import { TERRACE_CHECKLIST } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.terasa;

export default function PranjeTerasePage() {
  return (
    <LandingPage
      title="Pranje terase Dugo Selo"
      pagePath="/pranje-terase-dugo-selo"
      subtitle="Po dogovoru uz redovito održavanje okućnice. Fokus nam je redovita košnja kroz sezonu."
      intro={[
        "Pranje terase nije naša osnovna usluga. Osnovica je redovita košnja i orezivanje živice kroz sezonu.",
        "Ako imate visokotlačni perač, možemo oprati terasu uz redoviti dolazak za košnju. Recite unaprijed što imate.",
      ]}
      sections={[
        {
          title: "Što peremo (po dogovoru)",
          content: (
            <ul className="max-w-3xl space-y-3 text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Terasu i vanjske pločice
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Betonske staze i prilaz
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Stepenice po dogovoru
              </li>
            </ul>
          ),
        },
        {
          title: "Cijena pranja terase",
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Visokotlačno pranje je 2–3 €/m², od 40 €. Za redovitu košnju
              pogledajte{" "}
              <a
                href="/kosnja-trave-dugo-selo"
                className="font-medium text-brand-700 underline underline-offset-2"
              >
                redovitu košnju trave
              </a>
              .
            </p>
          ),
        },
      ]}
      checklistTitle="Što je uključeno u pranje terase"
      checklistItems={TERRACE_CHECKLIST}
      calculatorCategory="dvoriste"
      calculatorYard={{ terrace: true }}
    />
  );
}
