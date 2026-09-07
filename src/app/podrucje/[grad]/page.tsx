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
  const title = `Redovito čišćenje stanova ${area.name}`;

  return (
    <LandingPage
      title={title}
      pagePath={pagePath}
      subtitle={area.tagline}
      intro={[
        area.intro,
        "Cijenu i dan u tjednu dogovaramo prije početka suradnje. Možete koristiti kalkulator ili WhatsApp — što vam je jednostavnije.",
      ]}
      sections={[
        {
          title: `Redovito čišćenje u ${area.nameLocative}`,
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Dolazimo isti dan svaki tjedan ili svaka dva tjedna. Brišemo
              prašinu, peremo podove te čistimo kuhinju i kupaonicu. Ne nudimo
              jednokratne poslove jednom godišnje.
            </p>
          ),
        },
        {
          title: "Redovita košnja uz čišćenje",
          content: (
            <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
              Uz redovito čišćenje možemo dogovoriti i redovitu košnju u istom
              tjednu. Jedan dogovor, isti ritam kroz sezonu.
            </p>
          ),
        },
      ]}
    />
  );
}
