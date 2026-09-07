import { LandingPage } from "@/components/LandingPage";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.selidbe;

export default function CiscenjeNakonSelidbePage() {
  return (
    <LandingPage
      title="Čišćenje nakon selidbe Dugo Selo"
      pagePath="/ciscenje-nakon-selidbe-dugo-selo"
      subtitle="Nudimo samo iznimno. Naša osnovica je redovito čišćenje tjedno ili svaka dva tjedna."
      intro={[
        "Čišćenje nakon selidbe nije naša osnovna usluga. Fokusiramo se na redovito održavanje — isti dan svaki tjedan.",
        "Ako se uselite i želite da netko dolazi redovito nakon toga, tu smo. Jednokratni dolazak zbog selidbe rješavamo samo iznimno.",
      ]}
      sections={[
        {
          title: "Što preporučujemo",
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Dogovorite redovito čišćenje odmah nakon useljenja. Tako ne
              trebate jednokratni posao svake godine. Pogledajte{" "}
              <a
                href="/ciscenje-stanova-dugo-selo"
                className="font-medium text-brand-700 underline underline-offset-2"
              >
                redovito čišćenje stanova
              </a>{" "}
              ili{" "}
              <a
                href="/ciscenje-kuca-dugo-selo"
                className="font-medium text-brand-700 underline underline-offset-2"
              >
                redovito čišćenje kuća
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
