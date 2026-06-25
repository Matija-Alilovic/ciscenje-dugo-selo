import { LandingPage } from "@/components/LandingPage";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.stanovi;

export default function CiscenjeStanovaPage() {
  return (
    <LandingPage
      title="Čišćenje stanova Dugo Selo"
      pagePath="/ciscenje-stanova-dugo-selo"
      subtitle="Redovno i jednokratno čišćenje stanova u Dugom Selu i okolici. Dogovorimo termin i cijenu prije dolaska."
      intro={[
        "Čistimo stanove za ljude koji ne žele gubiti vrijeme na održavanje. Treba vam redovni termin ili jedan dolazak prije gostiju? Javite se i dogovorimo što i kad.",
        "Radimo u Dugom Selu, Božjakovini, Rugvici, Brckovljani, Sesvetama, Vrbovcu i okolici. Prije prvog dolaska pregledamo veličinu stana, prioritete i okvirnu cijenu.",
      ]}
      sections={[
        {
          title: "Redovno čišćenje stanova",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Za stalne klijente držimo fiksni termin, dolazimo jednom tjedno ili
              na dva tjedna. Svaki put čistimo prašinu, podove, kupaonicu, kuhinju
              i sve što smo dogovorili. Od 16 €/h, najmanje 3 sata po dolasku.
            </p>
          ),
        },
        {
          title: "Jednokratno čišćenje stanova",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Kad treba brzo srediti stan, npr. prije gostiju, nakon radova ili
              kad jednostavno nemate vremena, dolazimo u dogovoreni termin. Od 18
              €/h, najmanje 3 sata po dolasku.
            </p>
          ),
        },
      ]}
    />
  );
}
