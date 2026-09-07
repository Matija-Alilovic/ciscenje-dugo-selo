import Link from "next/link";
import { LandingPage } from "@/components/LandingPage";
import { LAWN_CHECKLIST } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.kosnja;

export default function KosnjaTravePage() {
  return (
    <LandingPage
      title="Košnja trave Dugo Selo"
      pagePath="/kosnja-trave-dugo-selo"
      subtitle="Redovita košnja travnjaka u Dugom Selu i Sesvetama — od ožujka do studenoga, otprilike svaka 2 tjedna."
      intro={[
        "Nudimo redovitu košnju trave u Dugom Selu i Sesvetama. Dolazimo dok trava raste — zimi pauziramo, a u proljeće nastavljamo dogovoreni ritam.",
        "Ne radimo jednokratnu košnju jednom godišnje. Ako želite uredan travnjak cijelu sezonu, javite se za ritam i okvirnu cijenu.",
      ]}
      sections={[
        {
          title: "Cijena košnje trave",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Košnja trave je 0,15–0,30 €/m², od 35 € po dolasku. Cijena ovisi o
              veličini i stanju površine. Pošaljite upit ili koristite kalkulator
              — potvrdimo ritam i cijenu prije prvog dolaska.
            </p>
          ),
        },
        {
          title: "Gdje kosimo",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Redovito kosimo u Dugom Selu i Sesvetama. Pošaljite adresu —
              potvrdimo možemo li doći i koji dan u tjednu.
            </p>
          ),
        },
        {
          title: "Više od same košnje",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Treba vam i živica, lišće ili terasa? Pogledajte{" "}
              <Link
                href="/odrzavanje-dvorista-dugo-selo"
                className="font-medium text-brand-700 underline underline-offset-2"
              >
                održavanje dvorišta i okućnice
              </Link>
              . Često to spajamo s redovitim čišćenjem kuće u istom tjednu.
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
