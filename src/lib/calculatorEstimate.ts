import type { PriceEstimate } from "./priceCalculator";

export const CALCULATOR_ESTIMATE_EVENT = "ciscenje-calculator-estimate";

export type CalculatorEstimateDetail = {
  estimate: PriceEstimate;
  priceProgress: number;
};

export function broadcastCalculatorEstimate(estimate: PriceEstimate, priceProgress: number) {
  if (typeof window === "undefined") return;

  const detail: CalculatorEstimateDetail = { estimate, priceProgress };
  window.dispatchEvent(new CustomEvent(CALCULATOR_ESTIMATE_EVENT, { detail }));
}
