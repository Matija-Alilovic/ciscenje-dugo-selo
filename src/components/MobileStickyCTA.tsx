"use client";

import Link from "next/link";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils";
import { showToast } from "@/lib/toast";

function notifyWhatsAppOpen(href: string) {
  showToast({
    message: "Otvara se WhatsApp…",
    href,
    hrefLabel: "Ako se ne otvori, klikni ovdje",
  });
}

export function CTAButtons({
  className = "",
  leadWithCalculator = false,
  calculatorHref = "#kalkulator",
}: {
  className?: string;
  leadWithCalculator?: boolean;
  calculatorHref?: string;
}) {
  const whatsappHref = getWhatsAppHref();

  if (leadWithCalculator) {
    return (
      <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
        <Link href={calculatorHref} className="btn-primary w-full sm:w-auto">
          Izračunaj cijenu
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => notifyWhatsAppOpen(whatsappHref)}
          className="btn-outline w-full sm:w-auto"
        >
          Javi se na WhatsApp
        </a>
        <a href={getPhoneHref()} className="btn-muted w-full sm:w-auto">
          Nazovi
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <a href={getPhoneHref()} className="btn-primary w-full sm:w-auto">
        Nazovi
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => notifyWhatsAppOpen(whatsappHref)}
        className="btn-outline w-full sm:w-auto"
      >
        Javi se na WhatsApp
      </a>
      <Link href="/#kontakt" className="btn-muted w-full sm:w-auto">
        Zatraži ponudu
      </Link>
    </div>
  );
}

export default function MobileStickyCTA() {
  const whatsappHref = getWhatsAppHref();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-300 bg-surface px-3 pt-3 shadow-sm transition-colors duration-300 md:hidden dark:border-gray-600 dark:shadow-black/30">
      <div className="mx-auto flex max-w-lg gap-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
        <Link
          href="/#kalkulator"
          className="btn-primary flex-1 px-2 py-3 text-center text-sm sm:text-base"
        >
          Cijena
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => notifyWhatsAppOpen(whatsappHref)}
          className="btn-outline flex-1 px-2 py-3 text-center text-sm sm:text-base"
        >
          WhatsApp
        </a>
        <a
          href={getPhoneHref()}
          className="btn-muted flex-1 px-2 py-3 text-center text-sm sm:text-base"
        >
          Nazovi
        </a>
      </div>
    </div>
  );
}
