"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import CalculatorLink from "./CalculatorLink";

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
        <CalculatorLink href={calculatorHref} className="btn-primary w-full sm:w-auto">
          Izračunaj cijenu
        </CalculatorLink>
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
  const [visible, setVisible] = useState(false);
  const whatsappHref = getWhatsAppHref();

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      const onScroll = () => setVisible(window.scrollY > 320);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("floating-cta-visible", visible);
    document.documentElement.classList.toggle("floating-cta-visible", visible);
    return () => {
      document.body.classList.remove("floating-cta-visible");
      document.documentElement.classList.remove("floating-cta-visible");
    };
  }, [visible]);

  return (
    <div
      id="mobile-sticky-cta"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 bg-surface/95 px-3 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-[transform,opacity] duration-300 ease-out dark:shadow-[0_-8px_32px_rgba(0,0,0,0.45)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-3xl gap-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:gap-3 md:pb-5 md:pt-1">
        <CalculatorLink
          href="/#kalkulator"
          className="btn-primary flex-1 px-2 py-3 text-center text-sm md:px-4 md:text-base"
        >
          <span className="md:hidden">Cijena</span>
          <span className="hidden md:inline">Izračunaj cijenu</span>
        </CalculatorLink>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => notifyWhatsAppOpen(whatsappHref)}
          className="btn-outline flex-1 px-2 py-3 text-center text-sm md:px-4 md:text-base"
        >
          <span className="md:hidden">WhatsApp</span>
          <span className="hidden md:inline">Javi se na WhatsApp</span>
        </a>
        <a
          href={getPhoneHref()}
          className="btn-muted flex-1 px-2 py-3 text-center text-sm md:px-4 md:text-base"
        >
          Nazovi
        </a>
      </div>
    </div>
  );
}
