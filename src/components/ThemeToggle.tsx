"use client";

import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "theme-toggle relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 shadow-sm",
        "border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100",
        "dark:border-brand-400 dark:bg-brand-800/80 dark:text-brand-100 dark:shadow-black/20 dark:hover:bg-brand-700/80",
        className,
      )}
      aria-label={isDark ? "Uključi svijetlu temu" : "Uključi tamnu temu"}
      title={isDark ? "Svijetla tema" : "Tamna tema"}
    >
      <span className="sr-only">
        {mounted ? (isDark ? "Svijetla tema" : "Tamna tema") : "Promjena teme"}
      </span>

      {!mounted ? (
        <span className="h-5 w-5 rounded-full bg-brand-200 dark:bg-brand-500" aria-hidden="true" />
      ) : isDark ? (
        <svg
          className="theme-toggle-icon h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.25}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="theme-toggle-icon h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.25}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
