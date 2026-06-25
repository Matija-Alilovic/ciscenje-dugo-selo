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
      subtitle="Kad stan treba temeljito očistiti, s više posla nego kod redovnog održavanja."
      intro={[
        "Generalno čišćenje je za situacije kad treba ozbiljnije ući u posao, npr. nakon renovacije, prije useljenja ili kad je dugo bilo zanemareno.",
        "Detaljno čistimo kuhinju i kupaonicu, skidamo kamenac, brišemo lajsne, vrata, paučinu i ostale površine. Prozore, pećnicu i hladnjak radimo po dogovoru.",
      ]}
      sections={[
        {
          title: "Što uključuje generalno čišćenje",
          content: <Checklist items={DEEP_CLEANING} />,
        },
        {
          title: "Koliko košta generalno čišćenje stana u Dugom Selu",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Od 22 €/h ili od 2,80 €/m², ovisno o veličini i stanju stana.
              Pošaljite podatke o kvadraturi i kratki opis, javit ćemo okvirnu
              cijenu prije dolaska.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
    />
  );
}
