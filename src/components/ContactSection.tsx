"use client";

import { COMPANY, GOOGLE_BUSINESS, SITE } from "@/lib/constants";
import { getGoogleReviewUrl } from "@/lib/site";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import ContactForm from "./ContactForm";
import GoogleMapEmbed from "./GoogleMapEmbed";
import Reveal from "./Reveal";

function notifyWhatsAppOpen(href: string) {
  showToast({
    message: "Otvara se WhatsApp…",
    href,
    hrefLabel: "Ako se ne otvori, klikni ovdje",
  });
}

export default function ContactSection() {
  const whatsappHref = getWhatsAppHref();
  const reviewUrl = getGoogleReviewUrl();

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Reveal>
        <div className="space-y-6">
          <div className="card-modern p-4 transition-all duration-300 hover:border-brand-200">
            <h3 className="text-base font-semibold uppercase tracking-wide text-gray-500">
              Telefon
            </h3>
            <a
              href={getPhoneHref()}
              className="mt-1 block text-xl font-medium text-brand-700 transition-colors hover:text-brand-800"
            >
              {SITE.phoneDisplay}
            </a>
          </div>

          <div className="card-modern p-4 transition-all duration-300 hover:border-brand-200">
            <h3 className="text-base font-semibold uppercase tracking-wide text-gray-500">
              WhatsApp
            </h3>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => notifyWhatsAppOpen(whatsappHref)}
              className="mt-1 block text-xl font-medium text-brand-700 transition-colors hover:text-brand-800"
            >
              Piši na WhatsApp
            </a>
          </div>

          <div className="card-modern p-4">
            <h3 className="text-base font-semibold uppercase tracking-wide text-gray-500">
              Adresa
            </h3>
            <p className="mt-1 text-base leading-relaxed text-gray-700">
              {COMPANY.address}
              <br />
              {COMPANY.city}
            </p>
            <a
              href={GOOGLE_BUSINESS.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-base font-medium text-brand-700 hover:text-brand-800"
            >
              {GOOGLE_BUSINESS.mapsLabel}
            </a>
            {reviewUrl && (
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-base font-medium text-brand-700 hover:text-brand-800"
              >
                Ocijenite nas na Googleu
              </a>
            )}
          </div>

          <div className="card-modern p-4">
            <h3 className="text-base font-semibold uppercase tracking-wide text-gray-500">
              Područje rada
            </h3>
            <p className="mt-1 text-base leading-relaxed text-gray-700 sm:text-lg">{SITE.area}</p>
          </div>

          <GoogleMapEmbed />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="card-modern p-4 sm:p-6">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
