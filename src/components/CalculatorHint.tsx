"use client";

import CalculatorLink from "./CalculatorLink";
import { CALCULATOR_HINT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CalculatorHintProps = {
  href?: string;
  className?: string;
};

export default function CalculatorHint({
  href = "#kalkulator",
  className,
}: CalculatorHintProps) {
  return (
    <CalculatorLink
      href={href}
      className={cn(
        "group block rounded-lg border border-brand-200 bg-brand-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-100/80 sm:p-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white"
          aria-hidden="true"
        >
          €
        </span>
        <div className="min-w-0">
          <p className="text-base font-semibold text-brand-800 sm:text-lg">
            {CALCULATOR_HINT.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">
            {CALCULATOR_HINT.body}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-800 sm:text-base">
            {CALCULATOR_HINT.cta}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </CalculatorLink>
  );
}
