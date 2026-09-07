import { LandingPage } from "@/components/LandingPage";
import { HOUSE_WORK_CHECKLIST } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.odrzavanjeKuce;

export default function OdrzavanjeKucePage() {
  return (
    <LandingPage
      title="Održavanje kuće Dugo Selo"
      pagePath="/odrzavanje-kuce-dugo-selo"
      subtitle="Sitni poslovi uz redovito čišćenje. Osnovna usluga je isti dan svaki tjedan."
      intro={[
        "Naša osnovna usluga je redovito čišćenje i redovita košnja. Sitne popravke radimo po dogovoru uz redoviti dolazak — ne kao zaseban jednokratni posao.",
        "Nismo građevinska firma. Ako trebate montažu police, zamjenu slavine ili bojanje jedne sobe uz redovito održavanje, recite što treba.",
      ]}
      sections={[
        {
          title: "Što možemo uz redoviti dolazak",
          content: (
            <ul className="max-w-3xl space-y-3 text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Montaža polica i sitnog namještaja
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Popravak vrata, kvaka i šarki
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Zamjena slavine i slični sitni zahvati
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Bojanje jedne sobe ili zida
              </li>
            </ul>
          ),
        },
        {
          title: "Kako se dogovara cijena",
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Montaža police obično je 30–50 €, zamjena slavine 45–75 €,
              sastavljanje IKEA ormara 40–85 €, a bojanje jedne sobe 120–190 €.
              Ako je posao veći nego što ste opisali, javimo prije početka rada.
            </p>
          ),
        },
      ]}
      checklistTitle="Što možemo napraviti oko kuće"
      checklistItems={HOUSE_WORK_CHECKLIST}
      calculatorCategory="radovi"
    />
  );
}
