import { LandingPage } from "@/components/LandingPage";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.prozori;

export default function PranjeProzoraPage() {
  return (
    <LandingPage
      title="Pranje prozora Dugo Selo"
      pagePath="/pranje-prozora-dugo-selo"
      subtitle="Peremo prozore u Dugom Selu i okolici, unutra, vani ili oboje."
      intro={[
        "Čisti prozori puno mijenjaju kako prostor izgleda. Možemo doći samo zbog prozora ili to uklopiti uz generalno čišćenje.",
        "Cijena ovisi o broju prozora, katnosti i tome treba li prati samo unutrašnju ili i vanjsku stranu. Javite koliko prozora imate i gdje ste, pa dogovorimo cijenu.",
      ]}
      sections={[
        {
          title: "Što radimo",
          content: (
            <ul className="max-w-2xl space-y-3 text-lg text-gray-700">
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
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                Može i uz generalno čišćenje
              </li>
            </ul>
          ),
        },
        {
          title: "Gdje peremo prozore",
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Radimo u Dugom Selu, Božjakovini, Rugvici, Brckovljani, Sesvetama,
              Vrbovcu i okolici.               Za lokacije malo dalje od Dugog Sela javite se i potvrdit ćemo
              možemo li doći.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
      showPricing={false}
    />
  );
}
