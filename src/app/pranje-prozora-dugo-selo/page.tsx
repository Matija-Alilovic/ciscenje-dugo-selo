import { LandingPage } from "@/components/LandingPage";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.prozori;

export default function PranjeProzoraPage() {
  return (
    <LandingPage
      title="Pranje prozora Dugo Selo"
      pagePath="/pranje-prozora-dugo-selo"
      subtitle="Po dogovoru uz redovito čišćenje. Nije samostalna jednokratna usluga."
      intro={[
        "Pranje prozora radimo po dogovoru uz redovito čišćenje, ne kao zaseban jednokratni posao jednom godišnje.",
        "Recite koliko prozora ima i treba li i vanjska strana. Vanjsko pranje ovisi o pristupu — to dogovorimo prije dolaska.",
      ]}
      sections={[
        {
          title: "Što radimo",
          content: (
            <ul className="max-w-3xl space-y-3 text-xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Peremo unutrašnju stranu stakla
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Vanjska strana po dogovoru, ovisno o pristupu
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Brišemo okvire i klupice
              </li>
            </ul>
          ),
        },
        {
          title: "Cijena",
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Do šest prozora unutra: 30–45 €. Unutra i vani: 65–90 €. Ako ste
              malo dalje, pošaljite ulicu — potvrdit ćemo možemo li doći i kada.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
      showPricing={false}
    />
  );
}
