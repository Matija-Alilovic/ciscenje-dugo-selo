import { LandingPage } from "@/components/LandingPage";
import Checklist from "@/components/Checklist";
import { BASIC_CLEANING } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.kuce;

export default function CiscenjeKucaPage() {
  return (
    <LandingPage
      title="Redovito čišćenje kuća Dugo Selo"
      pagePath="/ciscenje-kuca-dugo-selo"
      subtitle="Isti dan svaki tjedan. Više soba i kupaonica — cijenu dogovaramo prema kući."
      intro={[
        "Čistimo kuće u Dugom Selu i okolici kao redovito održavanje. Ne nudimo jednokratne poslove jednom godišnje — dolazimo tjedno ili svaka dva tjedna.",
        "Kuća obično ima više hodnika i kupaonica. Dogovorimo dan u tjednu i držimo ga. Ako treba i redovita košnja, recite odmah — može isti tjedan.",
      ]}
      sections={[
        {
          title: "Što uključuje redovito čišćenje",
          content: <Checklist items={[...BASIC_CLEANING]} />,
        },
        {
          title: "Cijena redovitog čišćenja kuće",
          content: (
            <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-xl">
              Redovito čišćenje je 13 €/h. Cijena ovisi o veličini i stanju
              kuće. Za točnu ponudu pošaljite kvadraturu ili slike — odgovaramo
              u kratkom roku.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
    />
  );
}
