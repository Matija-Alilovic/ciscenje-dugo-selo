"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { getPhoneHref } from "@/lib/utils";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LetterHoverText from "./LetterHoverText";

 const SCROLL_THRESHOLD = 8;
const TOP_REVEAL_OFFSET = 64;

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(64);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);

        if (menuOpen || y < TOP_REVEAL_OFFSET) {
          setHeaderVisible(true);
        } else if (y > lastScrollY.current + SCROLL_THRESHOLD) {
          setHeaderVisible(false);
        } else if (y < lastScrollY.current - SCROLL_THRESHOLD) {
          setHeaderVisible(true);
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.split("#")[1]).filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visibleSections = new Map<string, boolean>();

    const updateActiveSection = () => {
      if (window.scrollY < 120) {
        setActiveSection("");
        return;
      }

      const visibleIds = sectionIds.filter((id) => visibleSections.get(id));

      if (visibleIds.length === 0) {
        setActiveSection("");
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let bestId = visibleIds[0];
      let bestDistance = Infinity;

      for (const id of visibleIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      setActiveSection(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.isIntersecting);
        });
        updateActiveSection();
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0 },
    );

    const onScroll = () => updateActiveSection();

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 bg-surface/95 backdrop-blur-md transition-[transform,box-shadow] duration-300 ease-out dark:border-gray-300/50 dark:bg-gray-100/98",
          scrolled && "shadow-sm dark:shadow-black/40",
          !headerVisible && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <Link href="/" className="group min-w-0 flex-1">
            <span className="block font-heading text-base font-bold leading-tight text-gray-900 dark:text-gray-900 sm:text-xl">
              <LetterHoverText text={SITE.serviceHeadline} />
            </span>
            <span className="hidden min-[380px]:block truncate text-xs text-gray-500 transition-colors group-hover:text-brand-600 dark:text-gray-500 dark:group-hover:text-brand-400 sm:text-sm">
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
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-50/20 dark:text-brand-400"
                        : "text-gray-600 hover:bg-brand-50 hover:text-brand-700 dark:text-gray-500 dark:hover:bg-brand-50/10 dark:hover:text-brand-300",
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
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 md:hidden dark:border-gray-400 dark:text-gray-700 dark:hover:bg-gray-200/10"
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
            "relative z-40 border-t border-gray-200/80 bg-surface md:hidden dark:border-gray-300/50 dark:bg-gray-100",
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
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-50/20 dark:text-brand-400"
                        : "text-gray-700 hover:bg-brand-50 hover:text-brand-700 dark:text-gray-500 dark:hover:bg-brand-50/10 dark:hover:text-brand-300",
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

      <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
}
