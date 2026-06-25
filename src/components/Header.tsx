"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { getPhoneHref } from "@/lib/utils";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LetterHoverText from "./LetterHoverText";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.split("#")[1]).filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-gray-200/60 bg-surface/88 backdrop-blur-md transition-colors duration-300 dark:border-gray-600/40",
        scrolled && "shadow-sm dark:shadow-black/40",
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link href="/" className="group min-w-0 flex-1">
          <span className="block font-heading text-base font-bold leading-tight text-gray-900 sm:text-xl">
            <LetterHoverText text={SITE.serviceHeadline} />
          </span>
          <span className="hidden min-[380px]:block truncate text-xs text-gray-500 transition-colors group-hover:text-brand-600 dark:text-gray-600 sm:text-sm">
            {SITE.name} · {SITE.tagline}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Glavna navigacija">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.split("#")[1] ?? "";
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200",
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-50/15 dark:text-brand-400"
                      : "text-gray-600 hover:bg-brand-50 hover:text-brand-700 dark:text-gray-800 dark:hover:bg-brand-50/10 dark:hover:text-brand-400",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <a href={getPhoneHref()} className="btn-primary ml-2 px-4 py-2.5 text-base">
              Nazovi
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 md:hidden dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-200/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <ThemeToggle />
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-gray-900/40 md:hidden"
          aria-label="Zatvori izbornik"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        className={cn(
          "relative z-40 border-t border-gray-200/80 bg-surface md:hidden dark:border-gray-600/40",
          menuOpen ? "block" : "hidden",
        )}
        aria-label="Mobilna navigacija"
      >
        <ul className="max-h-[min(24rem,calc(100dvh-5.5rem))] space-y-1 overflow-y-auto px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.split("#")[1] ?? "";
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "block min-h-11 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-50/15 dark:text-brand-400"
                      : "text-gray-700 hover:bg-brand-50 hover:text-brand-700 dark:text-gray-800 dark:hover:bg-brand-50/10 dark:hover:text-brand-400",
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={getPhoneHref()}
              className="btn-primary mt-1 block w-full px-3 py-3 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Nazovi
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
