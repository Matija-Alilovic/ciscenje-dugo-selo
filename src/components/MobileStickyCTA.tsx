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
  const stack = cn("flex w-full max-w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3", className);
  const btn = "w-full max-w-full min-w-0 box-border sm:w-auto";

  if (leadWithCalculator) {
    return (
      <div className={stack}>
        <CalculatorLink href={calculatorHref} className={cn("btn-primary", btn)}>
          Izračunaj cijenu
        </CalculatorLink>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => notifyWhatsAppOpen(whatsappHref)}
          className={cn("btn-outline", btn)}
        >
          Javi se na WhatsApp
        </a>
        <a href={getPhoneHref()} className={cn("btn-muted", btn)}>
          Nazovi
        </a>
      </div>
    );
  }

  return (
    <div className={stack}>
      <a href={getPhoneHref()} className={cn("btn-primary", btn)}>
        Nazovi
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => notifyWhatsAppOpen(whatsappHref)}
        className={cn("btn-outline", btn)}
      >
        Javi se na WhatsApp
      </a>
      <Link href="/#kontakt" className={cn("btn-muted", btn)}>
        Zatraži ponudu
      </Link>
    </div>
  );
}

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [calculatorInView, setCalculatorInView] = useState(false);
  const whatsappHref = getWhatsAppHref();
  const showBar = visible && !calculatorInView;

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
    const calculator = document.getElementById("kalkulator");
    if (!calculator) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCalculatorInView(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "-64px 0px -48px 0px" },
    );

    observer.observe(calculator);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("floating-cta-visible", showBar);
    document.documentElement.classList.toggle("floating-cta-visible", showBar);
    return () => {
      document.body.classList.remove("floating-cta-visible");
      document.documentElement.classList.remove("floating-cta-visible");
    };
  }, [showBar]);

  return (
    <div
      id="mobile-sticky-cta"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 max-w-[100vw] overflow-x-hidden bg-surface px-4 pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] transition-[transform,opacity] duration-200 ease-out dark:shadow-[0_-8px_32px_rgba(0,0,0,0.45)]",
        showBar
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!showBar}
    >
      <div className="mx-auto flex w-full max-w-3xl gap-1.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:gap-2 md:gap-3 md:pb-5 md:pt-1">
        <CalculatorLink
          href="/#kalkulator"
          className="btn-primary sticky-cta-btn"
        >
          <span className="md:hidden">Cijena</span>
          <span className="hidden md:inline">Izračunaj cijenu</span>
        </CalculatorLink>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => notifyWhatsAppOpen(whatsappHref)}
          className="btn-outline sticky-cta-btn"
        >
          <span className="md:hidden">WhatsApp</span>
          <span className="hidden md:inline">Javi se na WhatsApp</span>
        </a>
        <a href={getPhoneHref()} className="btn-muted sticky-cta-btn">
          Nazovi
        </a>
      </div>
    </div>
  );
}
