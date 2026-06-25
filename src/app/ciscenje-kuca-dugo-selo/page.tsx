import { LandingPage } from "@/components/LandingPage";
import Checklist from "@/components/Checklist";
import { BASIC_CLEANING } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.kuce;

export default function CiscenjeKucaPage() {
  return (
    <LandingPage
      title="Čišćenje kuća Dugo Selo"
      pagePath="/ciscenje-kuca-dugo-selo"
      subtitle="Čistimo kuće i veće prostore u Dugom Selu i okolici."
      intro={[
        "Kuće obično imaju više soba i kupaonica nego stanovi, pa svaki posao dogovorimo posebno, prema veličini, stanju i onome što vam je bitno.",
        "Može biti redovno održavanje, jednokratni dolazak ili generalno čišćenje cijele kuće. Prije dolaska pregledamo što je prioritet i koliko će trajati.",
      ]}
      sections={[
        {
          title: "Vrste čišćenja kuća",
          content: (
            <ul className="max-w-2xl space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Redovno, dolazimo jednom tjedno ili na dva tjedna
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Jednokratno, npr. prije gostiju, nakon radova ili sezone
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Generalno, temeljit rad u cijeloj kući
              </li>
            </ul>
          ),
        },
        {
          title: "Što je uključeno u osnovno čišćenje kuće",
          content: <Checklist items={BASIC_CLEANING} />,
        },
        {
          title: "Cijena čišćenja kuće u Dugom Selu",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Ovisi o veličini kuće, broju soba i kupaonica te stanju prostora.
              Pošaljite upit s osnovnim podacima i javit ćemo okvirnu ponudu prije
              dolaska.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
    />
  );
}
