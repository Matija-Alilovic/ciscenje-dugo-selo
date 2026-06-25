export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "ciscenje-dugo-selo-theme";

const THEME_FADE_MS = 280;

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function overlayThemeTransition(theme: Theme, apply: () => void) {
  const overlay = document.createElement("div");
  overlay.className = "theme-fade-overlay";
  overlay.style.background = theme === "dark" ? "#121614" : "#faf8f4";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
  });

  window.setTimeout(() => {
    apply();
    requestAnimationFrame(() => {
      overlay.classList.remove("is-visible");
      window.setTimeout(() => overlay.remove(), THEME_FADE_MS);
    });
  }, THEME_FADE_MS);
}

export function transitionTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    applyTheme(theme);
    return;
  }

  const apply = () => applyTheme(theme);

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(apply);
    return;
  }

  overlayThemeTransition(theme, apply);
}
