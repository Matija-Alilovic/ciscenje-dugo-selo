import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { getAllAreaSlugs, getAreaPage, getAreaPagePath } from "@/lib/areaPages";
import { createAreaPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ grad: string }>;
};

export function generateStaticParams() {
  return getAllAreaSlugs().map((grad) => ({ grad }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grad } = await params;
  const area = getAreaPage(grad);
  if (!area) return {};

  return createAreaPageMetadata({
    name: area.name,
    slug: area.slug,
    tagline: area.tagline,
  });
}

export default async function AreaCleaningPage({ params }: PageProps) {
  const { grad } = await params;
  const area = getAreaPage(grad);
  if (!area) notFound();

  const pagePath = getAreaPagePath(area.slug);
  const title = `Čišćenje stanova ${area.name}`;

  return (
    <LandingPage
      title={title}
      pagePath={pagePath}
      subtitle={area.tagline}
      intro={[
        area.intro,
        `Dolazimo u ${area.nameLocative} za redovno čišćenje (od 16 €/h), jednokratne dolazke (od 18 €/h) i generalno čišćenje (od 22 €/h ili 2,80 €/m²). Cijenu dogovorimo prije dolaska — bez iznenađenja.`,
        `Bazirani smo u Dugom Selu i ${area.name} su u našem redovnom području rada. Za brzu procjenu koristite kalkulator cijene ili nas kontaktirajte na WhatsApp.`,
      ]}
      sections={[
        {
          title: `Redovno čišćenje u ${area.nameLocative}`,
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Dolazimo jednom tjedno ili na dva tjedna, čistimo prašinu, podove,
              kuhinju, kupaonicu i WC. Za stalne klijente držimo fiksni termin.
            </p>
          ),
        },
        {
          title: `Generalno čišćenje u ${area.nameLocative}`,
          content: (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
              Temeljito čistimo cijeli stan ili kuću — kuhinju, kupaonicu,
              kamenac, lajsne i paučinu. Idealno prije useljenja, nakon
              renovacije ili kad je dugo bilo zanemareno.
            </p>
          ),
        },
      ]}
    />
  );
}
