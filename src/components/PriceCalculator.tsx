'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  calculatePrice,
} from '@/lib/priceCalculator';
import {
  CALCULATOR_CATEGORIES,
  DEFAULT_WORKS_INPUT,
  DEFAULT_YARD_INPUT,
  PAINT_PREP,
  PAINT_ROOM_OPTIONS,
  WORK_JOB_OPTIONS,
  YARD_EXTRAS,
  YARD_SIZE_OPTIONS,
  YARD_WORK_OPTIONS,
  type CalculatorCategory,
  type WorkJob,
  type WorksCalculatorInput,
  type YardCalculatorInput,
  buildCombinedWhatsAppMessage,
  calculateWorksPrice,
  calculateYardPrice,
  combinePriceEstimates,
  formatCombinedPriceRange,
  resolveCalculatorPrefill,
  sortCalculatorCategories,
  toggleCalculatorCategory,
  worksSelectionIsReady,
} from '@/lib/yardCalculator';
import {
  CALCULATOR_TYPE_EVENT,
  clearCalculatorCleaningType,
  readCalculatorCleaningType,
} from '@/lib/calculatorPrefill';
import { cn, getPhoneHref, openWhatsApp } from '@/lib/utils';
import { CALCULATOR_DURATION_HINT } from '@/lib/constants';
import {
  playUiSound,
  areUiSoundsMuted,
  setUiSoundsMuted,
  unlockUiSounds,
} from '@/lib/uiSounds';

const FULL_CLEANING_LABELS = [
  'Ritam dolaska',
  'Veličina prostora',
  'Stanje prostora',
  'Dodatne usluge',
] as const;

const YARD_LABELS = ['Veličina dvorišta', 'Dodatne usluge'] as const;

const WORK_LABELS = ['Vrsta posla', 'Što točno treba'] as const;

const PICK_HINT =
  'Možete odabrati više usluga odjednom — npr. čišćenje i okućnica.';

const FULL_STEP_HINTS = [
  'Samo redovito — jednom tjedno ili svaka 2 tjedna.',
  'Kvadratura i kakav je prostor.',
  'Još par detalja, pa raspon.',
  'Dodatne usluge po želji — pa okvirna cijena.',
] as const;

const YARD_STEP_HINTS = [
  'Koliko je otprilike travnjak?',
  'Dodajte živicu, lišće ili pranje terase.',
] as const;

const WORK_STEP_HINTS = [
  'Odaberite popravke, bojanje ili oboje.',
  'Označite što točno treba — cijena se zbraja.',
] as const;

const CATEGORY_SHORT_LABEL: Record<CalculatorCategory, string> = {
  ciscenje: 'Čišćenje',
  dvoriste: 'Okućnica',
  radovi: 'Radovi',
};

type FlowSection = 'pick' | 'ciscenje' | 'dvoriste' | 'radovi' | 'result';

type FlowStep = {
  id: string;
  label: string;
  section: FlowSection;
  localIndex: number;
  hint: string;
};

type PriceCalculatorProps = {
  initialCategory?: CalculatorCategory;
  initialYard?: Partial<YardCalculatorInput>;
};

function toggleWorkJob(jobs: WorkJob[], value: WorkJob) {
  return jobs.includes(value)
    ? jobs.filter((job) => job !== value)
    : [...jobs, value];
}

function remainingStepsLabel(count: number) {
  if (count === 1) return 'Još 1 korak';
  return `Još ${count} koraka`;
}

function prefixStepLabel(
  category: CalculatorCategory,
  label: string,
  multi: boolean,
) {
  if (!multi) return label;
  return `${CATEGORY_SHORT_LABEL[category]}: ${label}`;
}

function buildFlowSteps(
  categories: CalculatorCategory[],
  includePick: boolean,
): FlowStep[] {
  const sorted = sortCalculatorCategories(categories);
  const multi = sorted.length > 1;
  const steps: FlowStep[] = [];

  if (includePick) {
    steps.push({
      id: 'pick',
      label: 'Usluga',
      section: 'pick',
      localIndex: 0,
      hint: PICK_HINT,
    });
  }

  for (const category of sorted) {
    if (category === 'ciscenje') {
      FULL_CLEANING_LABELS.forEach((label, localIndex) => {
        steps.push({
          id: `ciscenje-${localIndex}`,
          label: prefixStepLabel(category, label, multi),
          section: 'ciscenje',
          localIndex,
          hint: FULL_STEP_HINTS[
            Math.min(localIndex, FULL_STEP_HINTS.length - 1)
          ],
        });
      });
    }

    if (category === 'dvoriste') {
      YARD_LABELS.forEach((label, localIndex) => {
        steps.push({
          id: `dvoriste-${localIndex}`,
          label: prefixStepLabel(category, label, multi),
          section: 'dvoriste',
          localIndex,
          hint: YARD_STEP_HINTS[
            Math.min(localIndex, YARD_STEP_HINTS.length - 1)
          ],
        });
      });
    }

    if (category === 'radovi') {
      WORK_LABELS.forEach((label, localIndex) => {
        steps.push({
          id: `radovi-${localIndex}`,
          label: prefixStepLabel(category, label, multi),
          section: 'radovi',
          localIndex,
          hint: WORK_STEP_HINTS[
            Math.min(localIndex, WORK_STEP_HINTS.length - 1)
          ],
        });
      });
    }
  }

  steps.push({
    id: 'result',
    label: 'Okvirna cijena',
    section: 'result',
    localIndex: 0,
    hint: 'Raspon. Ako paše, javite se na WhatsApp.',
  });

  return steps;
}

function categoryLabel(value: CalculatorCategory) {
  return (
    CALCULATOR_CATEGORIES.find((option) => option.value === value)?.label ??
    CATEGORY_SHORT_LABEL[value]
  );
}

const inputClassName = 'form-field';

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
      {hint && (
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-600">
          {hint}
        </p>
      )}
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
    playUiSound(selected ? 'tap' : 'select');
    onClick();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'rounded-lg border px-4 py-3.5 text-left text-base transition-colors min-h-11',
        selected
          ? 'border-brand-600 bg-brand-50 text-brand-800 shadow-sm ring-1 ring-brand-600/15'
          : 'border-gray-300 bg-surface text-gray-700 hover:border-brand-300 hover:bg-brand-50/50',
      )}
    >
      {children}
    </button>
  );
}

export default function PriceCalculator({
  initialCategory,
  initialYard,
}: PriceCalculatorProps) {
  const [categories, setCategories] = useState<CalculatorCategory[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [includePick, setIncludePick] = useState(!initialCategory);
  const [yardInput, setYardInput] = useState<YardCalculatorInput>({
    ...DEFAULT_YARD_INPUT,
    ...initialYard,
  });
  const [worksInput, setWorksInput] =
    useState<WorksCalculatorInput>(DEFAULT_WORKS_INPUT);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_CALCULATOR_INPUT);
  const [pricePulse, setPricePulse] = useState(false);
  const [soundsMuted, setSoundsMuted] = useState(false);
  const prevPriceKey = useRef('');
  const cardRef = useRef<HTMLDivElement>(null);

  const flowSteps = useMemo(
    () => buildFlowSteps(categories, includePick),
    [categories, includePick],
  );
  const currentStep = flowSteps[Math.min(step, flowSteps.length - 1)];
  const estimate = useMemo(() => calculatePrice(input), [input]);
  const yardEstimate = useMemo(
    () => calculateYardPrice(yardInput),
    [yardInput],
  );
  const worksEstimate = useMemo(
    () => calculateWorksPrice(worksInput),
    [worksInput],
  );
  const combinedEstimate = useMemo(() => {
    const sorted = sortCalculatorCategories(categories);
    const parts: {
      label: string;
      estimate: { min: number; max: number; summary: string[] };
    }[] = [];

    for (const category of sorted) {
      if (category === 'ciscenje') {
        parts.push({ label: categoryLabel(category), estimate });
      }
      if (category === 'dvoriste') {
        parts.push({ label: categoryLabel(category), estimate: yardEstimate });
      }
      if (category === 'radovi') {
        parts.push({ label: categoryLabel(category), estimate: worksEstimate });
      }
    }

    return combinePriceEstimates(parts);
  }, [categories, estimate, yardEstimate, worksEstimate]);
  const priceLabel = formatCombinedPriceRange(combinedEstimate);
  const isLastStep = currentStep?.section === 'result';
  const progress = ((step + 1) / flowSteps.length) * 100;
  const stepHint = currentStep?.hint ?? '';
  const stepsRemaining = flowSteps.length - step - 1;

  const prevStep = useRef(step);

  useEffect(() => {
    setSoundsMuted(areUiSoundsMuted());
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onPointerDown = () => unlockUiSounds();
    card.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => card.removeEventListener('pointerdown', onPointerDown);
  }, []);

  useEffect(() => {
    if (isLastStep && prevStep.current !== step) {
      playUiSound('success');
    }
    prevStep.current = step;
  }, [isLastStep, step]);

  useEffect(() => {
    const priceKey = `${combinedEstimate.min}-${combinedEstimate.max}-${combinedEstimate.summary.join('|')}`;
    if (priceKey !== prevPriceKey.current) {
      prevPriceKey.current = priceKey;
      setPricePulse(true);
      const timer = window.setTimeout(() => setPricePulse(false), 450);
      return () => window.clearTimeout(timer);
    }
  }, [combinedEstimate.min, combinedEstimate.max, combinedEstimate.summary]);

  useEffect(() => {
    if (step > flowSteps.length - 1) {
      setStep(Math.max(flowSteps.length - 1, 0));
    }
  }, [flowSteps.length, step]);

  useEffect(() => {
    function applyCleaningType(type: string) {
      const resolved = resolveCalculatorPrefill(type);

      if (resolved.category === 'ciscenje' && resolved.cleaningType) {
        const valid = CALCULATOR_CLEANING_TYPES.some(
          (option) => option.value === resolved.cleaningType,
        );
        if (valid) {
          setInput((current) => ({
            ...current,
            cleaningType: resolved.cleaningType as CleaningType,
          }));
        }
      }

      if (type === 'terasa') {
        setYardInput((current) => ({ ...current, terrace: true }));
      }

      if (type === 'bojanje') {
        setWorksInput((current) => ({ ...current, workType: 'bojanje' }));
      }

      if (type === 'popravci') {
        setWorksInput((current) => ({ ...current, workType: 'popravci' }));
      }

      setIncludePick(false);
      setCategories([resolved.category]);
      setStep(0);
      clearCalculatorCleaningType();
    }

    const stored = readCalculatorCleaningType();
    if (stored) applyCleaningType(stored);

    function onTypePrefill(event: Event) {
      applyCleaningType((event as CustomEvent<string>).detail);
    }

    window.addEventListener(CALCULATOR_TYPE_EVENT, onTypePrefill);
    return () =>
      window.removeEventListener(CALCULATOR_TYPE_EVENT, onTypePrefill);
  }, []);

  function updateInput(patch: Partial<CalculatorInput>) {
    setInput((current) => ({ ...current, ...patch }));
  }

  function goNext() {
    const nextStep = Math.min(step + 1, flowSteps.length - 1);
    if (nextStep < flowSteps.length - 1) {
      playUiSound('step');
    }
    setStep(nextStep);
  }

  function goBack() {
    playUiSound('back');
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleWhatsApp() {
    playUiSound('action');
    const labels = sortCalculatorCategories(categories).map(categoryLabel);
    openWhatsApp(buildCombinedWhatsAppMessage(labels, combinedEstimate));
  }

  function toggleCategory(value: CalculatorCategory) {
    const alreadySelected = categories.includes(value);
    playUiSound(alreadySelected ? 'tap' : 'select');
    setCategories((current) =>
      sortCalculatorCategories(toggleCalculatorCategory(current, value)),
    );
  }

  function toggleSounds() {
    const nextMuted = !soundsMuted;
    setSoundsMuted(nextMuted);
    setUiSoundsMuted(nextMuted);

    if (!nextMuted) {
      unlockUiSounds();
      playUiSound('tap');
    }
  }

  function renderYardStep(localIndex: number) {
    if (localIndex === 0) {
      return (
        <div className="space-y-5">
          <FieldLabel hint="Ako ne znate točno, odaberite najbliže.">
            Kolika je površina travnjaka?
          </FieldLabel>
          <div className="grid gap-3">
            {YARD_SIZE_OPTIONS.map((option) => (
              <ChoiceButton
                key={option.value}
                selected={yardInput.size === option.value}
                onClick={() =>
                  setYardInput((current) => ({
                    ...current,
                    size: option.value,
                  }))
                }
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-medium">{option.label}</span>
                    <span className="mt-1 block text-sm text-gray-600">
                      {option.hint}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-brand-700">
                    {option.min}–{option.max} €
                  </span>
                </span>
              </ChoiceButton>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <FieldLabel hint="Osnovna košnja je već uključena. Ovo se dodaje na procjenu.">
          Trebate li još nešto u dvorištu?
        </FieldLabel>
        <div className="grid gap-3">
          <ChoiceButton
            selected={yardInput.hedge}
            onClick={() =>
              setYardInput((current) => ({
                ...current,
                hedge: !current.hedge,
              }))
            }
          >
            <span className="flex items-center justify-between gap-3">
              Šišanje živice
              <span className="text-sm font-semibold text-brand-700">
                +{YARD_EXTRAS.hedge.min}–{YARD_EXTRAS.hedge.max} €
              </span>
            </span>
          </ChoiceButton>
          <ChoiceButton
            selected={yardInput.leaves}
            onClick={() =>
              setYardInput((current) => ({
                ...current,
                leaves: !current.leaves,
              }))
            }
          >
            <span className="flex items-center justify-between gap-3">
              Grabljanje lišća / plijevljenje
              <span className="text-sm font-semibold text-brand-700">
                +{YARD_EXTRAS.leaves.min}–{YARD_EXTRAS.leaves.max} €
              </span>
            </span>
          </ChoiceButton>
          <ChoiceButton
            selected={yardInput.terrace}
            onClick={() =>
              setYardInput((current) => ({
                ...current,
                terrace: !current.terrace,
              }))
            }
          >
            <span className="flex items-center justify-between gap-3">
              Pranje terase ili betona
              <span className="text-sm font-semibold text-brand-700">
                +{YARD_EXTRAS.terrace.min}–{YARD_EXTRAS.terrace.max} €
              </span>
            </span>
          </ChoiceButton>
        </div>
      </div>
    );
  }

  function renderWorksStep(localIndex: number) {
    if (localIndex === 0) {
      return (
        <div className="space-y-5">
          <FieldLabel hint="Svaka opcija ima svoju okvirnu cijenu — u sljedećem koraku birate što točno.">
            Što treba napraviti?
          </FieldLabel>
          <div className="grid gap-3">
            {YARD_WORK_OPTIONS.map((option) => (
              <ChoiceButton
                key={option.value}
                selected={worksInput.workType === option.value}
                onClick={() =>
                  setWorksInput((current) => ({
                    ...current,
                    workType: option.value,
                  }))
                }
              >
                {option.label}
              </ChoiceButton>
            ))}
          </div>
        </div>
      );
    }

    const showRepairs =
      worksInput.workType === 'popravci' || worksInput.workType === 'oboje';
    const showPaint =
      worksInput.workType === 'bojanje' || worksInput.workType === 'oboje';

    return (
      <div className="space-y-5">
        {showRepairs && (
          <div>
            <FieldLabel hint="Možete odabrati više stavki — cijene se zbrajaju.">
              Koji sitni popravci?
            </FieldLabel>
            <div className="grid gap-3">
              {WORK_JOB_OPTIONS.map((job) => {
                const selected = worksInput.jobs.includes(job.value);
                return (
                  <ChoiceButton
                    key={job.value}
                    selected={selected}
                    onClick={() =>
                      setWorksInput((current) => ({
                        ...current,
                        jobs: toggleWorkJob(current.jobs, job.value),
                      }))
                    }
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block font-medium">{job.label}</span>
                        <span className="mt-1 block text-sm text-gray-600">
                          {job.hint}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-brand-700">
                        {job.min}–{job.max} €
                      </span>
                    </span>
                  </ChoiceButton>
                );
              })}
            </div>
          </div>
        )}

        {showPaint && (
          <div>
            <FieldLabel hint="Bojanje je po sobi — strop i radijatori po dogovoru.">
              Koliko soba treba ofarbati?
            </FieldLabel>
            <div className="grid gap-3">
              {PAINT_ROOM_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.value}
                  selected={worksInput.paintRooms === option.value}
                  onClick={() =>
                    setWorksInput((current) => ({
                      ...current,
                      paintRooms: option.value,
                    }))
                  }
                >
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block font-medium">{option.label}</span>
                      <span className="mt-1 block text-sm text-gray-600">
                        {option.hint}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-brand-700">
                      {option.min}–{option.max} €
                    </span>
                  </span>
                </ChoiceButton>
              ))}
            </div>
            <div className="mt-3">
              <ChoiceButton
                selected={worksInput.paintPrep}
                onClick={() =>
                  setWorksInput((current) => ({
                    ...current,
                    paintPrep: !current.paintPrep,
                  }))
                }
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-medium">Priprema zidova</span>
                    <span className="mt-1 block text-sm text-gray-600">
                      Gletanje rupica, brisanje prašine prije boje
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-brand-700">
                    +{PAINT_PREP.min}–{PAINT_PREP.max} €
                  </span>
                </span>
              </ChoiceButton>
            </div>
          </div>
        )}

        <div>
          <FieldLabel htmlFor="work-description">
            Napomena (nije obavezno)
          </FieldLabel>
          <textarea
            id="work-description"
            rows={3}
            value={worksInput.description}
            onChange={(event) =>
              setWorksInput((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder="npr. slavina u kuhinji, boja već kupljena..."
            className={inputClassName}
          />
        </div>
      </div>
    );
  }

  function renderCleaningStep(localIndex: number) {
    if (localIndex === 0) {
      return (
        <div className="space-y-5">
          <FieldLabel hint="Samo redovito — jednom tjedno ili svaka 2 tjedna.">
            Koliko često trebate dolazak?
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
        </div>
      );
    }

    if (localIndex === 1) {
      return (
        <div className="space-y-5">
          <div>
            <FieldLabel
              htmlFor="sqm"
              hint="Ako ne znate točno, upišite okvirno."
            >
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
              value={input.sqm > 0 ? input.sqm : ''}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                updateInput({ sqm: digits === '' ? 0 : Number(digits) });
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
                  onClick={() =>
                    updateInput({ bathrooms: Number(option.value) })
                  }
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (localIndex === 2) {
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
                <span className="mt-1 block text-sm text-gray-600">
                  {option.hint}
                </span>
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

  function renderPickStep() {
    return (
      <div className="space-y-5">
        <FieldLabel hint={PICK_HINT}>Što vam treba?</FieldLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {CALCULATOR_CATEGORIES.map((option) => {
            const selected = categories.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleCategory(option.value)}
                className={cn(
                  'calc-category-card group text-left',
                  selected && 'is-selected',
                )}
              >
                <span
                  className={cn(
                    'mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white',
                    option.value === 'ciscenje' && 'bg-brand-600',
                    option.value === 'dvoriste' && 'bg-brand-700',
                    option.value === 'radovi' && 'bg-accent-600',
                  )}
                  aria-hidden="true"
                >
                  {option.value === 'ciscenje' && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  )}
                  {option.value === 'dvoriste' && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2 2 6 3 9 3 0 7-3 12-9 15-6-3-9-8-9-15 3 0 7-1 9-3z"
                      />
                    </svg>
                  )}
                  {option.value === 'radovi' && (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={cn(
                    'block text-lg font-semibold',
                    selected
                      ? 'text-brand-800'
                      : 'text-gray-900 group-hover:text-brand-800',
                  )}
                >
                  {option.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                  {option.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderResult() {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-accent-200 bg-gradient-to-br from-brand-50 to-accent-50 p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Okvirna cijena
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {combinedEstimate.min}–{combinedEstimate.max} €
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            {combinedEstimate.summary.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="btn-primary w-full sm:w-auto"
          >
            Javite se na WhatsApp
          </button>
          <a
            href={getPhoneHref()}
            className="btn-muted w-full text-center sm:w-auto"
          >
            Nazovi
          </a>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          Otvara WhatsApp s ovim rasponom. Napišite kad vam paše — potvrdimo
          cijenu prije dolaska.
        </p>
      </div>
    );
  }

  function renderStep() {
    if (!currentStep || currentStep.section === 'pick') {
      return renderPickStep();
    }

    if (currentStep.section === 'dvoriste') {
      return renderYardStep(currentStep.localIndex);
    }

    if (currentStep.section === 'radovi') {
      return renderWorksStep(currentStep.localIndex);
    }

    if (currentStep.section === 'ciscenje') {
      return renderCleaningStep(currentStep.localIndex);
    }

    return renderResult();
  }

  const canGoNext =
    !isLastStep &&
    !(
      (currentStep?.section === 'pick' && categories.length < 1) ||
      (currentStep?.section === 'ciscenje' &&
        currentStep.localIndex === 1 &&
        (input.sqm < 20 || input.sqm > 400)) ||
      (currentStep?.section === 'radovi' &&
        currentStep.localIndex === 1 &&
        !worksSelectionIsReady(worksInput))
    );

  return (
    <div ref={cardRef} className="card-modern overflow-hidden">
      <div className="calc-header px-4 py-5 text-[#fffdf8] sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#f4d4b0]">
            Kalkulator cijene
          </p>
          <button
            type="button"
            onClick={toggleSounds}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label={soundsMuted ? 'Uključi zvukove' : 'Isključi zvukove'}
            aria-pressed={!soundsMuted}
            title={soundsMuted ? 'Uključi zvukove' : 'Isključi zvukove'}
          >
            {soundsMuted ? (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5L6 9H3v6h3l5 4V5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9l4 4m0-4l-4 4"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5L6 9H3v6h3l5 4V5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.54 8.46a5 5 0 010 7.08M18.36 5.64a9 9 0 010 12.72"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-1 text-sm text-white/90 sm:text-base">
          Odgovorite na nekoliko pitanja i dobit ćete okvirnu cijenu održavanja
          kuće i okućnice.
          <span className="font-medium text-[#f4d4b0]">
            {CALCULATOR_DURATION_HINT}
          </span>
        </p>
        {!isLastStep && (
          <p className="mt-2 text-sm font-medium text-white/90">{stepHint}</p>
        )}
        <p className="mt-3 text-sm font-semibold text-white sm:hidden">
          Korak {step + 1} od {flowSteps.length}: {currentStep?.label}
          {stepsRemaining > 0 && (
            <span className="ml-1 font-normal text-white/70">
              · {remainingStepsLabel(stepsRemaining)}
            </span>
          )}
        </p>
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={flowSteps.length}
          aria-label={`Korak ${step + 1} od ${flowSteps.length}`}
        >
          <div
            className="h-full rounded-full bg-accent-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 rounded-xl border border-white/20 bg-white/10 px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-sm">
              Okvirno sada
            </p>
            <p
              className={cn(
                'text-lg font-bold tabular-nums text-white transition-transform duration-300 sm:text-xl',
                pricePulse && 'scale-105 text-[#f4d4b0]',
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {priceLabel}
            </p>
          </div>
          <p className="mt-2 text-xs text-white/80">
            Cijena se ažurira dok birate opcije — što više detalja, točnija
            procjena.
          </p>
        </div>
        <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
          {flowSteps.map((flowStep, index) => (
            <span
              key={flowStep.id}
              className={cn(
                'rounded-md px-2.5 py-1 text-sm font-medium transition-colors duration-300',
                index === step
                  ? 'bg-accent-500 text-white'
                  : index < step
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white/60',
              )}
            >
              {index + 1}. {flowStep.label}
            </span>
          ))}
          {!isLastStep && stepsRemaining > 0 && (
            <span className="text-sm font-medium text-[#f4d4b0]">
              {remainingStepsLabel(stepsRemaining)}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        {renderStep()}

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:flex-wrap">
          {canGoNext && (
            <button
              type="button"
              onClick={goNext}
              className="btn-primary order-2 w-full sm:order-1 sm:w-auto"
            >
              Dalje
            </button>
          )}
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="btn-muted order-1 w-full sm:order-2 sm:w-auto"
            >
              Natrag
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
