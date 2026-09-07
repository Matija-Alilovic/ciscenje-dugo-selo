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
        "group block w-full max-w-full rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 via-surface to-accent-50 p-4 transition-colors hover:border-brand-400 hover:from-brand-100 sm:max-w-3xl sm:rounded-xl sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-xl"
          aria-hidden="true"
        >
          €
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold leading-snug text-brand-800 sm:text-xl">
            {CALCULATOR_HINT.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-lg">
            {CALCULATOR_HINT.body}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-800 sm:mt-3 sm:text-lg">
            {CALCULATOR_HINT.cta}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </CalculatorLink>
  );
}
