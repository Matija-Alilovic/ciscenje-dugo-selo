import { LandingPage } from "@/components/LandingPage";
import { LAWN_CHECKLIST } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.kosnja;

export default function KosnjaTravePage() {
  return (
    <LandingPage
      title="Redovita košnja trave Dugo Selo"
      pagePath="/kosnja-trave-dugo-selo"
      subtitle="Od ožujka do studenoga, otprilike svaka dva tjedna. Dogovaramo ritam i držimo ga."
      intro={[
        "Nudimo redovitu košnju trave u Dugom Selu i okolici. Dolazimo dok trava raste — zimi pauziramo, a u proljeće nastavljamo dogovoreni ritam.",
        "Ne radimo jednokratnu košnju jednom godišnje. Ako želite uredan travnjak cijelu sezonu, javite se.",
      ]}
      sections={[
        {
          title: "Kako naručiti redovitu košnju",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Cijena ovisi o veličini i stanju površine. Košnja je 0,15–0,30
              €/m², od 35 €. Pošaljite nam upit — dogovorimo ritam i okvirnu
              cijenu prije prvog dolaska.
            </p>
          ),
        },
        {
          title: "Gdje kosimo",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Dolazimo u Dugo Selo i Sesvete.
            </p>
          ),
        },
      ]}
      checklistTitle="Što je uključeno uz košnju"
      checklistItems={LAWN_CHECKLIST}
      calculatorCategory="dvoriste"
    />
  );
}
