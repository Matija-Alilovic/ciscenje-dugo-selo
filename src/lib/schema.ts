import {
  FAQ_ITEMS,
  COMPANY,
  PRICING,
  SERVICE_TYPES,
  SITE,
} from "./constants";
import { absoluteUrl } from "./seo";

const BUSINESS_ID = `${SITE.url}/#business`;

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HousekeepingService"],
    "@id": BUSINESS_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    description:
      `Profesionalno čišćenje stanova i kuća u Dugom Selu i okolici. Tim od ${COMPANY.employees} zaposlenih. Redovno, jednokratno i generalno čišćenje te pranje prozora.`,
    url: SITE.url,
    telephone: SITE.phone,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address,
      addressLocality: "Dugo Selo",
      postalCode: "10370",
      addressRegion: "Zagrebačka županija",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.6381,
      longitude: 16.2392,
    },
    areaServed: [
      { "@type": "City", name: "Dugo Selo" },
      { "@type": "City", name: "Božjakovina" },
      { "@type": "City", name: "Rugvica" },
      { "@type": "City", name: "Brckovljani" },
      { "@type": "City", name: "Sesvete" },
      { "@type": "City", name: "Vrbovec" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge čišćenja",
      itemListElement: PRICING.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: item.service,
          description: item.note ?? item.service,
          provider: { "@id": BUSINESS_ID },
          areaServed: "Dugo Selo i okolica",
        },
      })),
    },
    knowsAbout: SERVICE_TYPES.map((service) => service.title),
    foundingDate: `${COMPANY.yearFounded}`,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: COMPANY.employees,
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "hr-HR",
    description:
      "Čišćenje stanova i kuća u Dugom Selu i okolici. Cjenik, kalkulator cijene i kontakt na jednom mjestu.",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
};

export function getServiceSchema({ name, description, path }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 45.6381,
        longitude: 16.2392,
      },
      geoRadius: "25000",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
    },
  };
}

export function getLandingPageSchemas({
  title,
  subtitle,
  path,
}: {
  title: string;
  subtitle: string;
  path: string;
}) {
  return [
    getLocalBusinessSchema(),
    getFaqSchema(),
    getBreadcrumbSchema([
      { name: "Početna", path: "/" },
      { name: title, path },
    ]),
    getServiceSchema({ name: title, description: subtitle, path }),
  ];
}

export function getHomePageSchemas() {
  return [getWebSiteSchema(), getLocalBusinessSchema(), getFaqSchema()];
}
