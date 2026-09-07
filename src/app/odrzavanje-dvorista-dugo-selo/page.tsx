import { LandingPage } from "@/components/LandingPage";
import Checklist from "@/components/Checklist";
import { YARD_CHECKLIST } from "@/lib/constants";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.dvoriste;

export default function OdrzavanjeDvoristaPage() {
  return (
    <LandingPage
      title="Redovito održavanje okućnice Dugo Selo"
      pagePath="/odrzavanje-dvorista-dugo-selo"
      subtitle="Travnjak, živica, gredice i sezonski poslovi. Dogovaramo ritam i držimo ga — ne jednom godišnje."
      intro={[
        "Održavanje okućnice kod nas znači redovitu brigu o travnjaku, živici, gredicama i dvorištu. Dogovaramo ritam i dolazimo dok traje sezona.",
        "Ne nudimo jednokratno uređenje jednom godišnje. Ako želite urednu okućnicu bez ponovnog dogovaranja svaki put — tu smo.",
      ]}
      sections={[
        {
          title: "Što radimo u okućnici",
          content: <Checklist items={[...YARD_CHECKLIST]} />,
        },
        {
          title: "Cijena",
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Košnja je 0,15–0,30 €/m², najmanje 35 € po dolasku. Ostale stavke
              (živica, gredice, pranje, snijeg…) dogovaramo prema poslu. Za
              točnu ponudu pošaljite okvirnu veličinu ili slike.
            </p>
          ),
        },
      ]}
      showBasicChecklist={false}
      calculatorCategory="dvoriste"
    />
  );
}
