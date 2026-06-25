"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CALCULATOR_BATHROOM_OPTIONS,
  CALCULATOR_CLEANING_TYPES,
  CALCULATOR_CONDITION_OPTIONS,
  CALCULATOR_PROPERTY_TYPES,
  CALCULATOR_ROOM_OPTIONS,
  CALCULATOR_WINDOW_OPTIONS,
  DEFAULT_CALCULATOR_INPUT,
  type CalculatorInput,
  type CleaningType,
  buildCalculatorPrefill,
  buildCalculatorWhatsAppMessage,
  calculatePrice,
} from "@/lib/priceCalculator";
import {
  CALCULATOR_TYPE_EVENT,
  clearCalculatorCleaningType,
  readCalculatorCleaningType,
  saveCalculatorPrefill,
  scrollToContact,
} from "@/lib/calculatorPrefill";
import { cn, openWhatsApp } from "@/lib/utils";

const FULL_STEPS = [
  "Vrsta čišćenja",
  "Veličina prostora",
  "Stanje prostora",
  "Dodatne usluge",
  "Okvirna cijena",
] as const;

const WINDOW_STEPS = ["Vrsta čišćenja", "Prozori", "Okvirna cijena"] as const;

const inputClassName =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-1">
      <label htmlFor={htmlFor} className="block text-base font-medium text-gray-700">
        {children}
      </label>
      {hint && <p className="mt-0.5 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-4 py-3.5 text-left text-base transition-colors min-h-11",
        selected
          ? "border-brand-600 bg-brand-50 text-brand-800"
          : "border-gray-300 bg-surface text-gray-700 hover:border-brand-200 hover:bg-brand-50/50",
      )}
    >
      {children}
    </button>
  );
}

export default function PriceCalculator() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_CALCULATOR_INPUT);

  const isWindowsOnly = input.cleaningType === "prozori";
  const steps = isWindowsOnly ? WINDOW_STEPS : FULL_STEPS;
  const estimate = useMemo(() => calculatePrice(input), [input]);
  const isLastStep = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    function applyCleaningType(type: string) {
      const valid = CALCULATOR_CLEANING_TYPES.some((option) => option.value === type);
      if (!valid) return;

      setInput((current) => ({
        ...current,
        cleaningType: type as CleaningType,
        windows: type === "prozori" ? "unutra-malo" : current.windows,
      }));
      setStep(0);
      clearCalculatorCleaningType();
    }

    const stored = readCalculatorCleaningType();
    if (stored) applyCleaningType(stored);

    function onTypePrefill(event: Event) {
      applyCleaningType((event as CustomEvent<string>).detail);
    }

    window.addEventListener(CALCULATOR_TYPE_EVENT, onTypePrefill);
    return () => window.removeEventListener(CALCULATOR_TYPE_EVENT, onTypePrefill);
  }, []);

  function updateInput(patch: Partial<CalculatorInput>) {
    setInput((current) => {
      const next = { ...current, ...patch };
      if (patch.cleaningType && patch.cleaningType !== current.cleaningType) {
        setStep(0);
        if (patch.cleaningType === "prozori") {
          next.windows = "unutra-malo";
        }
      }
      return next;
    });
  }

  function goNext() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleWhatsApp() {
    openWhatsApp(buildCalculatorWhatsAppMessage(input, estimate));
  }

  function handleContactForm() {
    saveCalculatorPrefill(buildCalculatorPrefill(input, estimate));
    scrollToContact();
  }

  function renderStep() {
    if (step === 0) {
      return (
        <div className="space-y-5">
          <FieldLabel hint="Od toga ovisi cijena po satu i koliko detaljno čistimo.">
            Koja vam treba usluga?
          </FieldLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {CALCULATOR_CLEANING_TYPES.map((option) => (
              <ChoiceButton
                key={option.value}
                selected={input.cleaningType === option.value}
                onClick={() => updateInput({ cleaningType: option.value })}
              >
                {option.label}
              </ChoiceButton>
            ))}
          </div>

          {!isWindowsOnly && (
            <>
              <FieldLabel hint="Kuće obično traže malo više vremena od stana iste kvadrature.">
                Stan ili kuća?
              </FieldLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {CALCULATOR_PROPERTY_TYPES.map((option) => (
                  <ChoiceButton
                    key={option.value}
                    selected={input.propertyType === option.value}
                    onClick={() => updateInput({ propertyType: option.value })}
                  >
                    {option.label}
                  </ChoiceButton>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    if (isWindowsOnly) {
      if (step === 1) {
        return (
          <div className="space-y-5">
            <FieldLabel hint="Procjena ovisi o broju prozora i jesu li unutra, vani ili oboje.">
              Koji prozori trebaju pranje?
            </FieldLabel>
            <div className="grid gap-3">
              {CALCULATOR_WINDOW_OPTIONS.filter((option) => option.value !== "ne").map(
                (option) => (
                  <ChoiceButton
                    key={option.value}
                    selected={input.windows === option.value}
                    onClick={() => updateInput({ windows: option.value })}
                  >
                    {option.label}
                  </ChoiceButton>
                ),
              )}
            </div>
          </div>
        );
      }

      return renderResult();
    }

    if (step === 1) {
      return (
        <div className="space-y-5">
          <div>
            <FieldLabel htmlFor="sqm" hint="Ako ne znate točno, upišite okvirno.">
              Kvadratura (m²)
            </FieldLabel>
            <input
              id="sqm"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min={20}
              max={400}
              placeholder="npr. 65"
              value={input.sqm > 0 ? input.sqm : ""}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                updateInput({ sqm: digits === "" ? 0 : Number(digits) });
              }}
              className={inputClassName}
            />
          </div>

          <div>
            <FieldLabel>Broj soba (bez kuhinje i hodnika)</FieldLabel>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {CALCULATOR_ROOM_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={input.rooms === Number(option.value)}
                  onClick={() => updateInput({ rooms: Number(option.value) })}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>

          <div>
            <FieldLabel>Broj kupaonica i WC-a</FieldLabel>
            <div className="grid gap-2 sm:grid-cols-3">
              {CALCULATOR_BATHROOM_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={input.bathrooms === Number(option.value)}
                  onClick={() => updateInput({ bathrooms: Number(option.value) })}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-5">
          <FieldLabel hint="Što je prostor zapušteniji, to više vremena treba.">
            Kako biste opisali stanje prostora?
          </FieldLabel>
          <div className="grid gap-3">
            {CALCULATOR_CONDITION_OPTIONS.map((option) => (
              <ChoiceButton
                key={option.value}
                selected={input.condition === option.value}
                onClick={() => updateInput({ condition: option.value })}
              >
                <span className="block font-medium">{option.label}</span>
                <span className="mt-1 block text-sm text-gray-600">{option.hint}</span>
              </ChoiceButton>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              selected={input.hasPets}
              onClick={() => updateInput({ hasPets: !input.hasPets })}
            >
              Imate kućne ljubimce (dlaka, više usisavanja)
            </ChoiceButton>
            <ChoiceButton
              selected={input.heavyKitchen}
              onClick={() => updateInput({ heavyKitchen: !input.heavyKitchen })}
            >
              Kuhinja se često koristi / ima više masnoće
            </ChoiceButton>
          </div>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-5">
          <div>
            <FieldLabel>Pranje prozora</FieldLabel>
            <div className="grid gap-3">
              {CALCULATOR_WINDOW_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={input.windows === option.value}
                  onClick={() => updateInput({ windows: option.value })}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>

          <div>
            <FieldLabel>Dodatno čišćenje (uračunato u procjenu)</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceButton
                selected={input.oven}
                onClick={() => updateInput({ oven: !input.oven })}
              >
                Pećnica iznutra
              </ChoiceButton>
              <ChoiceButton
                selected={input.fridge}
                onClick={() => updateInput({ fridge: !input.fridge })}
              >
                Hladnjak iznutra
              </ChoiceButton>
              <ChoiceButton
                selected={input.cabinets}
                onClick={() => updateInput({ cabinets: !input.cabinets })}
              >
                Ormari iznutra
              </ChoiceButton>
              <ChoiceButton
                selected={input.hasBalcony}
                onClick={() => updateInput({ hasBalcony: !input.hasBalcony })}
              >
                Balkon ili terasa
              </ChoiceButton>
            </div>
          </div>
        </div>
      );
    }

    return renderResult();
  }

  function renderResult() {
    return (
      <div className="space-y-5">
        {!isWindowsOnly && (
          <div>
            <FieldLabel>Prvi put kod nas?</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceButton
                selected={input.firstVisit}
                onClick={() => updateInput({ firstVisit: true })}
              >
                Da — uračunaj 20 % popusta na prvi dolazak
              </ChoiceButton>
              <ChoiceButton
                selected={!input.firstVisit}
                onClick={() => updateInput({ firstVisit: false })}
              >
                Ne ili nije primjenjivo
              </ChoiceButton>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Okvirna cijena
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {estimate.min}–{estimate.max} €
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Okvirno vrijeme: {estimate.hoursMin}–{estimate.hoursMax} h
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            {estimate.summary.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </div>

        <p className="rounded-lg border border-gray-200 bg-surface px-4 py-3 text-sm leading-relaxed text-gray-600">
          Ovo je orientacijska procjena — konačna cijena ovisi o detaljima koje vidimo na
          licu mjesta. Pošaljite upit i potvrdit ćemo cijenu prije dolaska.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={handleWhatsApp} className="btn-primary w-full sm:w-auto">
            Pošalji procjenu na WhatsApp
          </button>
          <button type="button" onClick={handleContactForm} className="btn-outline w-full sm:w-auto">
            Nastavi u kontakt formi
          </button>
        </div>
      </div>
    );
  }

  const canGoNext =
    !isLastStep &&
    !(
      (step === 1 && !isWindowsOnly && (input.sqm < 20 || input.sqm > 400)) ||
      (step === 1 && isWindowsOnly && input.windows === "ne")
    );

  return (
    <div className="card-modern overflow-hidden">
      <div className="border-b border-gray-200 bg-brand-50 px-4 py-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Kalkulator cijene
        </p>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Odgovorite na nekoliko pitanja — dobit ćete okvirnu cijenu u rasponu.
        </p>
        <p className="mt-3 text-sm font-semibold text-brand-800 sm:hidden">
          Korak {step + 1} od {steps.length}: {steps[step]}
        </p>
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Korak ${step + 1} od ${steps.length}`}
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
          {steps.map((label, index) => (
            <span
              key={label}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm font-medium",
                index === step
                  ? "bg-brand-600 text-white"
                  : index < step
                    ? "bg-brand-100 text-brand-800"
                    : "bg-surface text-gray-500",
              )}
            >
              {index + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        {renderStep()}

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:flex-wrap">
          {canGoNext && (
            <button type="button" onClick={goNext} className="btn-primary order-2 w-full sm:order-1 sm:w-auto">
              Dalje
            </button>
          )}
          {step > 0 && (
            <button type="button" onClick={goBack} className="btn-muted order-1 w-full sm:order-2 sm:w-auto">
              Natrag
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
