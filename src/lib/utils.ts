import { getPhoneNumber, getWhatsAppNumber } from "./site";

export function getPhoneHref() {
  return `tel:${getPhoneNumber().replace(/\s/g, "")}`;
}

export function getWhatsAppHref(message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        "Pozdrav, zanima me čišćenje u Dugom Selu. Bio bih prvi put kod vas — imate li popust na prvi dolazak?",
      );
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
}

export function openWhatsApp(message: string) {
  const url = getWhatsAppHref(message);

  if (typeof window === "undefined") return;

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

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
