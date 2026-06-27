import { LandingPage } from "@/components/LandingPage";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.selidbe;

export default function CiscenjeNakonSelidbePage() {
  return (
    <LandingPage
      title="Čišćenje nakon selidbe Dugo Selo"
      pagePath="/ciscenje-nakon-selidbe-dugo-selo"
      subtitle="Čistimo stan ili kuću nakon selidbe u Dugom Selu i okolici — prije useljenja ili nakon iseljenja."
      intro={[
        "Selidba je gotova, a prostor još nije spreman? Dolazimo nakon iseljenja ili prije useljenja, kako dogovorimo.",
        "Čistimo prašinu, podove, kuhinju, kupaonicu, WC i ostale površine. Za temeljitiji posao nakon radova ili renovacije preporučujemo generalno čišćenje.",
        "Radimo u Dugom Selu, Sesvetama, Vrbovcu, Rugvici i okolici. Pošaljite kvadraturu i kratki opis — javit ćemo okvirnu cijenu prije dolaska.",
      ]}
      sections={[
        {
          title: "Čišćenje prije useljenja",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Prije nego uđete u novi stan ili kuću, možemo očistiti cijeli
              prostor — od podova do kupaonice. Idealno nakon renovacije ili kad
              prethodni stanar nije ostavio prostor urednim.
            </p>
          ),
        },
        {
          title: "Čišćenje nakon iseljenja",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Nakon što iseljite namještaj i stvari, dolazimo i čistimo prazan
              prostor. Pomaže kod predaje stana ili kuće novom vlasniku ili
              najmoprimcu.
            </p>
          ),
        },
      ]}
    />
  );
}
