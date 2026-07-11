import {
  RECURRING_BASE_RATE,
  RECURRING_PACKAGES,
} from "./constants";
import { getPhoneNumber, getWhatsAppNumber } from "./site";
import { showToast } from "./toast";

type RecurringPackage = (typeof RECURRING_PACKAGES)[number];

export function getRecurringPackageVisitMin(pkg: RecurringPackage) {
  return pkg.hourlyRate * pkg.minHours;
}

export function getRecurringPackageMonthlyEstimate(pkg: RecurringPackage) {
  return getRecurringPackageVisitMin(pkg) * pkg.visitsPerMonth;
}

export function buildRecurringPackageWhatsAppMessage(pkg: RecurringPackage) {
  const visitMin = getRecurringPackageVisitMin(pkg);
  const monthlyEstimate = getRecurringPackageMonthlyEstimate(pkg);

  return [
    "Pozdrav, zanima me paket redovnog čišćenja.",
    "",
    `Paket: ${pkg.title} (${pkg.frequencyLabel})`,
    `Satnica: ${pkg.hourlyRate} €/h (popust ${pkg.discountPercent}%, standardno ${RECURRING_BASE_RATE.hourly} €/h)`,
    `Okvirno: od ${visitMin} € po dolasku · ~${monthlyEstimate} €/mj (najmanje ${pkg.minHours} h po dolasku)`,
    "",
    "Molim okvirnu cijenu za moj prostor i prvi slobodan termin.",
  ].join("\n");
}

export function getPhoneHref() {
  return `tel:${getPhoneNumber().replace(/\s/g, "")}`;
}

export function getWhatsAppHref(message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        "Pozdrav, zanima me čišćenje u Dugom Selu. Možete li mi poslati okvirnu cijenu i termin?",
      );
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
}

export function openWhatsApp(message: string) {
  const url = getWhatsAppHref(message);

  if (typeof window === "undefined") return;

  showToast({
    message: "Otvara se WhatsApp…",
    href: url,
    hrefLabel: "Ako se ne otvori, klikni ovdje",
  });

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function buildWhatsAppInquiryMessage(data: {
  ime: string;
  mobitel: string;
  lokacija: string;
  kvadratura: string;
  vrsta: string;
  poruka: string;
}) {
  const lines = [
    "Pozdrav, javljam se zbog čišćenja.",
    "",
    `Ime: ${data.ime}`,
    `Mobitel: ${data.mobitel}`,
    `Lokacija: ${data.lokacija}`,
  ];

  if (data.kvadratura.trim()) {
    lines.push(`Kvadratura: ${data.kvadratura.trim()}`);
  }

  lines.push(`Vrsta čišćenja: ${data.vrsta}`);

  if (data.poruka.trim()) {
    lines.push("", `Poruka: ${data.poruka.trim()}`);
  }

  return lines.join("\n");
}

export function buildBookingWhatsAppMessage(data: {
  ime: string;
  mobitel: string;
  podrucje: string;
  adresa: string;
  datum: string;
  termin: string;
  vrsta: string;
  napomena: string;
  procjenaCijena?: string;
  procjenaDetalji?: string[];
}) {
  const lines = [
    "Pozdrav, želim zatražiti termin čišćenja.",
    "",
    `Ime: ${data.ime}`,
    `Mobitel: ${data.mobitel}`,
    `Područje: ${data.podrucje}`,
    `Adresa / mjesto: ${data.adresa}`,
    `Željeni datum: ${data.datum}`,
    `Željeno vrijeme: ${data.termin}`,
  ];

  if (data.vrsta.trim()) {
    lines.push(`Vrsta čišćenja: ${data.vrsta}`);
  }

  if (data.procjenaCijena) {
    lines.push("", "Procjena iz kalkulatora:", `Okvirna cijena: ${data.procjenaCijena}`);
    if (data.procjenaDetalji?.length) {
      lines.push(...data.procjenaDetalji.map((line) => `• ${line}`));
    }
  }

  if (data.napomena.trim()) {
    lines.push("", `Napomena: ${data.napomena.trim()}`);
  }

  lines.push("", "Molim potvrdu termina. Hvala!");

  return lines.join("\n");
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
