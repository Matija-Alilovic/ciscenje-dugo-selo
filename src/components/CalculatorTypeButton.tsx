"use client";

import { openCalculatorWithType } from "@/lib/calculatorPrefill";

type CalculatorTypeButtonProps = {
  type: string;
};

export default function CalculatorTypeButton({ type }: CalculatorTypeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openCalculatorWithType(type)}
      className="btn-outline mt-4 w-full"
    >
      Izračunaj cijenu za ovo
    </button>
  );
}
