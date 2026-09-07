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
        "group block max-w-3xl rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 via-surface to-accent-50 p-5 transition-colors hover:border-brand-400 hover:from-brand-100 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-xl font-bold text-white"
          aria-hidden="true"
        >
          €
        </span>
        <div className="min-w-0">
          <p className="text-lg font-semibold text-brand-800 sm:text-xl">
            {CALCULATOR_HINT.title}
          </p>
          <p className="mt-1.5 text-base leading-relaxed text-gray-600 sm:text-lg">
            {CALCULATOR_HINT.body}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-base font-semibold text-brand-700 group-hover:text-brand-800 sm:text-lg">
            {CALCULATOR_HINT.cta}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </CalculatorLink>
  );
}
