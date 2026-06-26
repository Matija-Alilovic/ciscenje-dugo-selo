export const CALCULATOR_PREFILL_KEY = "ciscenje-dugo-selo-calculator-prefill";

export type CalculatorPrefill = {
  kvadratura: string;
  vrsta: string;
  poruka: string;
};

export const CALCULATOR_PREFILL_EVENT = "ciscenje-calculator-prefill";

export function saveCalculatorPrefill(data: CalculatorPrefill) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CALCULATOR_PREFILL_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(CALCULATOR_PREFILL_EVENT, { detail: data }));
}

export function readCalculatorPrefill(): CalculatorPrefill | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(CALCULATOR_PREFILL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculatorPrefill;
  } catch {
    return null;
  }
}

export function clearCalculatorPrefill() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CALCULATOR_PREFILL_KEY);
}

export function scrollToContact() {
  document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const CALCULATOR_TYPE_KEY = "ciscenje-dugo-selo-calculator-type";
export const CALCULATOR_TYPE_EVENT = "ciscenje-calculator-type";

export function saveCalculatorCleaningType(type: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CALCULATOR_TYPE_KEY, type);
  window.dispatchEvent(new CustomEvent(CALCULATOR_TYPE_EVENT, { detail: type }));
}

export function readCalculatorCleaningType(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CALCULATOR_TYPE_KEY);
}

export function clearCalculatorCleaningType() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CALCULATOR_TYPE_KEY);
}

function getScrollChrome() {
  const header = document.querySelector("header");
  const headerHeight = header?.offsetHeight ?? 72;
  const stickyCta = document.getElementById("mobile-sticky-cta");
  const footerHeight = stickyCta?.offsetHeight ?? 88;

  return { headerHeight, footerHeight };
}

export function scrollToCalculator() {
  const calculator = document.getElementById("kalkulator");
  if (!calculator) return;

  function runScroll() {
    const { headerHeight, footerHeight } = getScrollChrome();
    const rect = calculator.getBoundingClientRect();
    const elementTop = window.scrollY + rect.top;
    const elementHeight = calculator.offsetHeight;
    const viewport = window.innerHeight;
    const availableHeight = viewport - headerHeight - footerHeight;

    let targetTop: number;

    if (elementHeight <= availableHeight) {
      targetTop = elementTop - headerHeight - (availableHeight - elementHeight) / 2;
    } else {
      targetTop = elementTop - headerHeight - 16;
    }

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }

  runScroll();
  requestAnimationFrame(() => requestAnimationFrame(runScroll));
}

export function openCalculatorWithType(type: string) {
  saveCalculatorCleaningType(type);
  scrollToCalculator();
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    window.history.pushState(null, "", "#kalkulator");
  }
}
