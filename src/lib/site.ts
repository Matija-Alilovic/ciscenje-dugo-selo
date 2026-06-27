import { SITE } from "./constants";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  // Production deploys must use the canonical domain — not the ephemeral *.vercel.app URL.
  if (process.env.VERCEL_ENV === "production") return SITE.url;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return SITE.url;
}

export function getGoogleBusinessUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim() || undefined;
}

export function getGoogleReviewUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || undefined;
}

export function getPhoneNumber(): string {
  return process.env.NEXT_PUBLIC_PHONE ?? SITE.phone;
}

export function getWhatsAppNumber(): string {
  return (process.env.NEXT_PUBLIC_WHATSAPP ?? SITE.whatsapp).replace(/\D/g, "");
}
