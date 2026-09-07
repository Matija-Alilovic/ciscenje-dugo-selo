import type { Metadata } from "next";
import { SITE } from "./constants";
import { getSiteUrl } from "./site";

export const SEO_KEYWORDS = [
  "redovito održavanje Dugo Selo",
  "redovito čišćenje Dugo Selo",
  "održavanje Dugo Selo",
  "održavanje kuće Dugo Selo",
  "održavanje dvorišta Dugo Selo",
  "održavanje okućnice Dugo Selo",
  "redovita košnja trave Dugo Selo",
  "košnja trave Dugo Selo",
  "košnja travnjaka Dugo Selo",
  "održavanje travnjaka Dugo Selo",
  "šišanje živice Dugo Selo",
  "orezivanje živice Dugo Selo",
  "čišćenje stanova Dugo Selo",
  "čišćenje kuća Dugo Selo",
  "čišćenje stanova i kuća Dugo Selo",
  "čišćenje Dugo Selo",
  "čišćenje Dugo Selo i Sesvete",
  "redovito čišćenje stanova Dugo Selo",
  "čišćenje stanova Sesvete",
  "košnja trave Sesvete",
  "održavanje dvorišta Sesvete",
  "usluga čišćenja Dugo Selo",
] as const;

/** Keywords focused on yard / lawn — use on yard landing pages. */
export const YARD_SEO_KEYWORDS = [
  "održavanje dvorišta Dugo Selo",
  "održavanje okućnice Dugo Selo",
  "redovito održavanje dvorišta Dugo Selo",
  "redovito održavanje okućnice Dugo Selo",
  "košnja trave Dugo Selo",
  "redovita košnja trave Dugo Selo",
  "košnja travnjaka Dugo Selo",
  "održavanje travnjaka Dugo Selo",
  "košnja trave cijena Dugo Selo",
  "šišanje živice Dugo Selo",
  "orezivanje živice Dugo Selo",
  "grabljanje lišća Dugo Selo",
  "pranje terase Dugo Selo",
  "košnja trave Sesvete",
  "održavanje dvorišta Sesvete",
  "održavanje okućnice Sesvete",
  ...SEO_KEYWORDS,
] as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: string;
};

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  if (path === "/" || path === "") {
    return base;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [...SEO_KEYWORDS],
  absoluteTitle,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ?? `${title} | ${SITE.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: path === "/" ? "/" : path,
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const HOME_METADATA = createPageMetadata({
  absoluteTitle:
    "Čišćenje i održavanje okućnice Dugo Selo | Održavanje Dugo Selo",
  title: "Čišćenje i održavanje okućnice Dugo Selo",
  description:
    "Redovito čišćenje i redovita košnja / održavanje dvorišta u Dugom Selu i Sesvetama. Isti dan tjedno ili svaka 2 tjedna — cijena prije početka suradnje.",
  path: "/",
  keywords: [
    "čišćenje Dugo Selo",
    "održavanje okućnice Dugo Selo",
    "održavanje dvorišta Dugo Selo",
    "košnja trave Dugo Selo",
    ...SEO_KEYWORDS,
  ],
});

export function createAreaPageMetadata({
  name,
  slug,
  tagline,
}: {
  name: string;
  slug: string;
  tagline: string;
}) {
  const path = `/ciscenje-${slug}`;
  return createPageMetadata({
    title: `Redovito čišćenje stanova ${name}`,
    absoluteTitle: `Redovito čišćenje stanova i kuća ${name} | ${SITE.name}`,
    description: `${tagline}. Redovito čišćenje i, po dogovoru, održavanje okućnice. Dolazimo iz Dugog Sela — besplatna procjena u kalkulatoru.`,
    path,
    keywords: [
      `redovito čišćenje stanova ${name}`,
      `čišćenje stanova ${name}`,
      `čišćenje kuća ${name}`,
      `održavanje okućnice ${name}`,
      `košnja trave ${name}`,
      `usluga čišćenja ${name}`,
      ...SEO_KEYWORDS,
    ],
  });
}

export const PAGE_SEO = {
  stanovi: createPageMetadata({
    title: "Redovito čišćenje stanova Dugo Selo",
    description:
      "Redovito čišćenje stanova u Dugom Selu i okolici. Dolazimo isti dan svaki tjedan ili svaka dva tjedna. Cijena poznata prije početka suradnje.",
    path: "/ciscenje-stanova-dugo-selo",
    keywords: [
      "redovito čišćenje stanova Dugo Selo",
      "čišćenje stanova Dugo Selo",
      "čišćenje stana Dugo Selo cijena",
      ...SEO_KEYWORDS,
    ],
  }),
  generalno: createPageMetadata({
    title: "Generalno čišćenje stana Dugo Selo",
    description:
      "Generalno čišćenje nudimo samo iznimno. Naša osnovna usluga je redovito tjedno čišćenje u Dugom Selu i okolici.",
    path: "/generalno-ciscenje-stana-dugo-selo",
    keywords: [
      "generalno čišćenje stana Dugo Selo",
      "redovito čišćenje stanova Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  kuce: createPageMetadata({
    title: "Redovito čišćenje kuća Dugo Selo",
    description:
      "Redovito čišćenje kuća u Dugom Selu i okolici. Isti dan svaki tjedan ili svaka dva tjedna. Cijena prema veličini kuće.",
    path: "/ciscenje-kuca-dugo-selo",
    keywords: [
      "redovito čišćenje kuća Dugo Selo",
      "čišćenje kuća Dugo Selo",
      "čišćenje kuće Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  prozori: createPageMetadata({
    title: "Pranje prozora Dugo Selo",
    description:
      "Pranje prozora po dogovoru uz redovito čišćenje u Dugom Selu. Nije samostalna jednokratna usluga — fokus nam je redovito održavanje.",
    path: "/pranje-prozora-dugo-selo",
    keywords: [
      "pranje prozora Dugo Selo",
      "čišćenje prozora Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  selidbe: createPageMetadata({
    title: "Čišćenje nakon selidbe Dugo Selo",
    description:
      "Čišćenje nakon selidbe nudimo samo iznimno. Naša osnovica je redovito čišćenje tjedno ili svaka dva tjedna u Dugom Selu.",
    path: "/ciscenje-nakon-selidbe-dugo-selo",
    keywords: [
      "čišćenje nakon selidbe Dugo Selo",
      "redovito čišćenje stanova Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  odrzavanjeKuce: createPageMetadata({
    title: "Održavanje kuće Dugo Selo",
    description:
      "Sitni poslovi oko kuće uz redovito čišćenje u Dugom Selu. Osnovna usluga je redovito održavanje — isti dan svaki tjedan.",
    path: "/odrzavanje-kuce-dugo-selo",
    keywords: [
      "održavanje kuće Dugo Selo",
      "redovito održavanje Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  dvoriste: createPageMetadata({
    title: "Održavanje dvorišta Dugo Selo",
    absoluteTitle:
      "Održavanje dvorišta i okućnice Dugo Selo | Košnja trave",
    description:
      "Redovito održavanje dvorišta i okućnice u Dugom Selu i Sesvetama: košnja trave, živica, lišće i terasa. Dogovaramo ritam kroz sezonu — ne jednokratno.",
    path: "/odrzavanje-dvorista-dugo-selo",
    keywords: [...YARD_SEO_KEYWORDS],
  }),
  kosnja: createPageMetadata({
    title: "Košnja trave Dugo Selo",
    absoluteTitle: "Košnja trave Dugo Selo | Redovita košnja travnjaka",
    description:
      "Redovita košnja trave u Dugom Selu i Sesvetama od ožujka do studenoga. Otprilike svaka 2 tjedna — od 35 € po dolasku. Dogovorimo ritam i cijenu unaprijed.",
    path: "/kosnja-trave-dugo-selo",
    keywords: [
      "košnja trave Dugo Selo",
      "redovita košnja trave Dugo Selo",
      "košnja travnjaka Dugo Selo",
      "košnja trave Sesvete",
      "košnja trave cijena Dugo Selo",
      ...YARD_SEO_KEYWORDS,
    ],
  }),
  terasa: createPageMetadata({
    title: "Pranje terase Dugo Selo",
    absoluteTitle: "Pranje terase Dugo Selo | Uz održavanje okućnice",
    description:
      "Pranje terase i opločnika u Dugom Selu uz redovito održavanje okućnice. Osnovica je redovita košnja trave kroz sezonu.",
    path: "/pranje-terase-dugo-selo",
    keywords: [
      "pranje terase Dugo Selo",
      "pranje opločnika Dugo Selo",
      ...YARD_SEO_KEYWORDS,
    ],
  }),
} as const;
