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

export function scrollToCalculator() {
  document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function openCalculatorWithType(type: string) {
  saveCalculatorCleaningType(type);
  scrollToCalculator();
}
