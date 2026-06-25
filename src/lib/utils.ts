import { SITE } from "./constants";

export function getPhoneHref() {
  return `tel:${SITE.phone}`;
}

export function getWhatsAppHref(message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        "Pozdrav, zanima me čišćenje u Dugom Selu. Bio bih prvi put kod vas — imate li popust na prvi dolazak?",
      );
  return `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${text}`;
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

export function openWhatsApp(message: string) {
  window.open(getWhatsAppHref(message), "_blank", "noopener,noreferrer");
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
