import type { Metadata } from "next";
import { SITE } from "./constants";
import { getSiteUrl } from "./site";

export const SEO_KEYWORDS = [
  "čišćenje stanova Dugo Selo",
  "čišćenje kuća Dugo Selo",
  "generalno čišćenje stana Dugo Selo",
  "čišćenje stanova i kuća Dugo Selo",
  "pranje prozora Dugo Selo",
  "čišćenje Dugo Selo",
  "čišćenje Dugo Selo i okolica",
  "redovno čišćenje stanova Dugo Selo",
  "jednokratno čišćenje Dugo Selo",
  "čišćenje nakon selidbe Dugo Selo",
  "čišćenje stanova Sesvete",
  "čišćenje stanova Vrbovec",
  "čišćenje stanova Rugvica",
  "usluga čišćenja Dugo Selo",
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
  absoluteTitle: "Čišćenje stanova i kuća Dugo Selo",
  title: "Čišćenje stanova i kuća Dugo Selo",
  description:
    "Čišćenje stanova i kuća u Dugom Selu i okolici. Redovno, jednokratno i generalno čišćenje, pranje prozora. Cijena po dogovoru, od 16 €/h. 20 % popusta na prvi dolazak.",
  path: "/",
});

export const PAGE_SEO = {
  stanovi: createPageMetadata({
    title: "Čišćenje stanova Dugo Selo",
    description:
      "Redovno i jednokratno čišćenje stanova u Dugom Selu i okolici. Dolazimo jednom tjedno ili na dva tjedna. Od 16 €/h, dogovor cijene prije dolaska.",
    path: "/ciscenje-stanova-dugo-selo",
    keywords: [
      "čišćenje stanova Dugo Selo",
      "redovno čišćenje stanova Dugo Selo",
      "jednokratno čišćenje stana Dugo Selo",
      "čišćenje stana Dugo Selo cijena",
      ...SEO_KEYWORDS,
    ],
  }),
  generalno: createPageMetadata({
    title: "Generalno čišćenje stana Dugo Selo",
    description:
      "Generalno čišćenje stana u Dugom Selu i okolici. Kuhinja, kupaonica, kamenac, lajsne i podovi. Od 22 €/h ili 2,80 €/m². Besplatna procjena.",
    path: "/generalno-ciscenje-stana-dugo-selo",
    keywords: [
      "generalno čišćenje stana Dugo Selo",
      "temeljito čišćenje stana Dugo Selo",
      "čišćenje stana prije useljenja Dugo Selo",
      "čišćenje nakon renovacije Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  kuce: createPageMetadata({
    title: "Čišćenje kuća Dugo Selo",
    description:
      "Čišćenje kuća u Dugom Selu i okolici. Redovno, jednokratno ili generalno čišćenje većih prostora. Cijena prema veličini i stanju kuće.",
    path: "/ciscenje-kuca-dugo-selo",
    keywords: [
      "čišćenje kuća Dugo Selo",
      "čišćenje kuće Dugo Selo",
      "čišćenje obiteljske kuće Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
  prozori: createPageMetadata({
    title: "Pranje prozora Dugo Selo",
    description:
      "Pranje prozora u Dugom Selu i okolici. Unutra, vani ili oboje. Može zasebno ili uz čišćenje stana. Cijena po dogovoru.",
    path: "/pranje-prozora-dugo-selo",
    keywords: [
      "pranje prozora Dugo Selo",
      "čišćenje prozora Dugo Selo",
      "pranje prozora unutra i vani Dugo Selo",
      ...SEO_KEYWORDS,
    ],
  }),
} as const;
