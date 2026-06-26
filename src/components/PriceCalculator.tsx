"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  formatPriceRange,
} from "@/lib/priceCalculator";
import {
  CALCULATOR_TYPE_EVENT,
  clearCalculatorCleaningType,
  readCalculatorCleaningType,
  saveCalculatorPrefill,
  scrollToContact,
} from "@/lib/calculatorPrefill";
import { cn, getPhoneHref, openWhatsApp } from "@/lib/utils";
import { CALCULATOR_DURATION_HINT } from "@/lib/constants";
import { playUiSound, areUiSoundsMuted, setUiSoundsMuted, unlockUiSounds } from "@/lib/uiSounds";

const FULL_STEPS = [
  "Vrsta čišćenja",
  "Veličina prostora",
  "Stanje prostora",
  "Dodatne usluge",
  "Okvirna cijena",
] as const;

const WINDOW_STEPS = ["Vrsta čišćenja", "Prozori", "Okvirna cijena"] as const;

const FULL_STEP_HINTS = [
  "Odaberite uslugu — procjena traje oko minute.",
  "Super početak! Još malo o prostoru.",
  "Odlično napredujete.",
  "Zadnji korak prije procjene!",
] as const;

const WINDOW_STEP_HINTS = [
  "Odaberite uslugu — procjena traje oko minute.",
  "Koliko prozora treba oprati?",
] as const;

function remainingStepsLabel(count: number) {
  if (count === 1) return "Još 1 korak";
  return `Još ${count} koraka`;
}

const inputClassName = "form-field";

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
      <label htmlFor={htmlFor} className="form-label">
        {children}
      </label>
      {hint && <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-600">{hint}</p>}
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
  function handleClick() {
    playUiSound(selected ? "tap" : "select");
    onClick();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
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
  const [pricePulse, setPricePulse] = useState(false);
  const [soundsMuted, setSoundsMuted] = useState(false);
  const prevPriceKey = useRef("");
  const cardRef = useRef<HTMLDivElement>(null);

  const isWindowsOnly = input.cleaningType === "prozori";
  const steps = isWindowsOnly ? WINDOW_STEPS : FULL_STEPS;
  const estimate = useMemo(() => calculatePrice(input), [input]);
  const priceLabel = formatPriceRange(estimate);
  const isLastStep = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;
  const stepHints = isWindowsOnly ? WINDOW_STEP_HINTS : FULL_STEP_HINTS;
  const stepHint = stepHints[Math.min(step, stepHints.length - 1)];
  const stepsRemaining = steps.length - step - 1;

  const prevStep = useRef(step);

  useEffect(() => {
    setSoundsMuted(areUiSoundsMuted());
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onPointerDown = () => unlockUiSounds();
    card.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => card.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    if (isLastStep && prevStep.current !== step) {
      playUiSound("success");
    }
    prevStep.current = step;
  }, [isLastStep, step]);

  useEffect(() => {
    const priceKey = `${estimate.min}-${estimate.max}`;
    if (priceKey !== prevPriceKey.current) {
      prevPriceKey.current = priceKey;
      setPricePulse(true);
      const timer = window.setTimeout(() => setPricePulse(false), 450);
      return () => window.clearTimeout(timer);
    }
  }, [estimate.min, estimate.max]);

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
    const nextStep = Math.min(step + 1, steps.length - 1);
    if (nextStep < steps.length - 1) {
      playUiSound("step");
    }
    setStep(nextStep);
  }

  function goBack() {
    playUiSound("back");
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleWhatsApp() {
    playUiSound("action");
    openWhatsApp(buildCalculatorWhatsAppMessage(input, estimate));
  }

  function handleContactForm() {
    playUiSound("action");
    saveCalculatorPrefill(buildCalculatorPrefill(input, estimate));
    scrollToContact();
  }

  function toggleSounds() {
    const nextMuted = !soundsMuted;
    setSoundsMuted(nextMuted);
    setUiSoundsMuted(nextMuted);

    if (!nextMuted) {
      unlockUiSounds();
      playUiSound("tap");
    }
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
        <div className="flex items-start gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-400/30 dark:bg-brand-50/10">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white"
            aria-hidden="true"
          >
            ✓
          </span>
          <div>
            <p className="font-semibold text-brand-800 dark:text-brand-300">Procjena spremna!</p>
            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-500">
              Pošaljite je na WhatsApp ili nas nazovite — dogovorimo detalje bez obveze.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Okvirna cijena
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {estimate.min}–{estimate.max} €
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            {estimate.summary.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </div>

        <p className="rounded-lg border border-gray-200 bg-surface px-4 py-3 text-sm leading-relaxed text-gray-600">
          Ovo je orientacijska procjena — konačna cijena ovisi o detaljima koje vidimo na
          licu mjesta. Potvrdit ćemo cijenu prije dolaska, bez iznenađenja.
        </p>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-800">Što dalje?</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn-primary btn-cta-hint w-full sm:w-auto"
            >
              Pošalji procjenu na WhatsApp
            </button>
            <button type="button" onClick={handleContactForm} className="btn-outline w-full sm:w-auto">
              Nastavi u kontakt formi
            </button>
            <a href={getPhoneHref()} className="btn-muted w-full text-center sm:w-auto">
              Nazovi
            </a>
          </div>
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
    <div ref={cardRef} className="card-modern overflow-hidden">
      <div className="border-b border-gray-200 bg-brand-50 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Kalkulator cijene
          </p>
          <button
            type="button"
            onClick={toggleSounds}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-200 bg-surface text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-400/30 dark:hover:bg-brand-50/10"
            aria-label={soundsMuted ? "Uključi zvukove" : "Isključi zvukove"}
            aria-pressed={!soundsMuted}
            title={soundsMuted ? "Uključi zvukove" : "Isključi zvukove"}
          >
            {soundsMuted ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.08M18.36 5.64a9 9 0 010 12.72" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Odgovorite na nekoliko pitanja — dobit ćete okvirnu cijenu u rasponu.{" "}
          <span className="font-medium text-brand-700">{CALCULATOR_DURATION_HINT}</span>
        </p>
        {!isLastStep && (
          <p className="mt-2 text-sm font-medium text-brand-700 dark:text-brand-400">{stepHint}</p>
        )}
        <p className="mt-3 text-sm font-semibold text-brand-800 sm:hidden dark:text-brand-300">
          Korak {step + 1} od {steps.length}: {steps[step]}
          {stepsRemaining > 0 && (
            <span className="ml-1 font-normal text-brand-600 dark:text-brand-400">
              · {remainingStepsLabel(stepsRemaining)}
            </span>
          )}
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

        <div className="mt-4 rounded-lg border border-brand-200/80 bg-surface px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 sm:text-sm">
              Okvirno sada
            </p>
            <p
              className={cn(
                "text-lg font-bold tabular-nums text-gray-900 transition-transform duration-300 sm:text-xl dark:text-gray-900",
                pricePulse && "scale-105 text-brand-700",
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {priceLabel}
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-600">
            Cijena se ažurira dok birate opcije — što više detalja, točnija procjena.
          </p>
        </div>
        <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
          {steps.map((label, index) => (
            <span
              key={label}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm font-medium transition-colors duration-300",
                index === step
                  ? "bg-brand-600 text-white"
                  : index < step
                    ? "bg-brand-100 text-brand-800 dark:bg-brand-50/20 dark:text-brand-300"
                    : "bg-surface text-gray-500",
              )}
            >
              {index + 1}. {label}
            </span>
          ))}
          {!isLastStep && stepsRemaining > 0 && (
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              {remainingStepsLabel(stepsRemaining)}
            </span>
          )}
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
