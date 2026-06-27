"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    function onScroll() {
      setVisible(window.scrollY > 640);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!hero) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(hero);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed z-40 flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-surface text-gray-800 shadow-md",
        ctaVisible
          ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] left-4 md:left-auto md:right-6"
          : "bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-4 md:left-auto md:right-6",
        "hover:border-brand-300 hover:text-brand-700",
        "dark:border-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-brand-400 dark:hover:text-brand-600",
      )}
      aria-label="Natrag na vrh"
      title="Natrag na vrh"
    >
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
