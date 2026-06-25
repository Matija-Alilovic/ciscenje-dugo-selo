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
