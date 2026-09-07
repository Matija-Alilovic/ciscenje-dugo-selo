export const CALCULATOR_CATEGORIES = [
  {
    value: "ciscenje",
    label: "Čišćenje",
    hint: "Redovito čišćenje stana ili kuće",
  },
  {
    value: "dvoriste",
    label: "Održavanje okućnice",
    hint: "Redovita košnja travnja, flanjanje živice i održavanje travnjaka",
  },
  {
    value: "radovi",
    label: "Sitni popravci / bojanje",
    hint: "Uz redoviti dolazak, po dogovoru",
  },
] as const;

export type CalculatorCategory =
  (typeof CALCULATOR_CATEGORIES)[number]["value"];

export const YARD_SIZE_OPTIONS = [
  { value: "do-200", label: "Do 200 m²", hint: "Manje dvorište uz kuću", min: 35, max: 55 },
  { value: "200-400", label: "200–400 m²", hint: "Tipično dvorište u naselju", min: 50, max: 80 },
  { value: "400-800", label: "400–800 m²", hint: "Veći travnjak", min: 75, max: 125 },
  { value: "800+", label: "Više od 800 m²", hint: "Velika parcela", min: 110, max: 180 },
] as const;

export type YardSize = (typeof YARD_SIZE_OPTIONS)[number]["value"];

export const YARD_WORK_OPTIONS = [
  { value: "popravci", label: "Sitni popravci" },
  { value: "bojanje", label: "Bojanje zidova" },
  { value: "oboje", label: "Popravci i bojanje" },
] as const;

export type YardWorkType = (typeof YARD_WORK_OPTIONS)[number]["value"];

export const WORK_JOB_OPTIONS = [
  {
    value: "police",
    label: "Montaža polica",
    hint: "1–3 police, bez većeg bušenja betona",
    min: 30,
    max: 50,
  },
  {
    value: "slavina",
    label: "Zamjena slavine",
    hint: "Sitni zahvat, bez većih cijevi",
    min: 45,
    max: 75,
  },
  {
    value: "namjestaj",
    label: "Sastavljanje namještaja",
    hint: "Ormar, komoda ili krevet iz kutije",
    min: 40,
    max: 85,
  },
  {
    value: "ostalo",
    label: "Drugi sitni popravak",
    hint: "Opišite točno što treba",
    min: 30,
    max: 55,
  },
] as const;

export type WorkJob = (typeof WORK_JOB_OPTIONS)[number]["value"];

export const PAINT_ROOM_OPTIONS = [
  { value: "1", label: "1 soba ili veći zid", hint: "Npr. dječja soba ili hodnik", min: 120, max: 190 },
  { value: "2", label: "2 sobe", hint: "Dvije prostorije, strop po dogovoru", min: 220, max: 350 },
  { value: "3", label: "3 ili više soba", hint: "Više prostorija ili cijeli kat", min: 330, max: 520 },
] as const;

export type PaintRooms = (typeof PAINT_ROOM_OPTIONS)[number]["value"];

export type WorksCalculatorInput = {
  workType: YardWorkType;
  jobs: WorkJob[];
  paintRooms: PaintRooms;
  paintPrep: boolean;
  description: string;
};

export const DEFAULT_WORKS_INPUT: WorksCalculatorInput = {
  workType: "popravci",
  jobs: ["police"],
  paintRooms: "1",
  paintPrep: false,
  description: "",
};

export type YardCalculatorInput = {
  size: YardSize;
  hedge: boolean;
  leaves: boolean;
  terrace: boolean;
};

export const DEFAULT_YARD_INPUT: YardCalculatorInput = {
  size: "200-400",
  hedge: false,
  leaves: false,
  terrace: false,
};

const YARD_BASE: Record<YardSize, { min: number; max: number }> = {
  "do-200": { min: 35, max: 55 },
  "200-400": { min: 50, max: 80 },
  "400-800": { min: 75, max: 125 },
  "800+": { min: 110, max: 180 },
};

export const YARD_EXTRAS = {
  hedge: { min: 30, max: 65, label: "šišanje živice" },
  leaves: { min: 25, max: 45, label: "lišće / plijevljenje" },
  terrace: { min: 40, max: 85, label: "pranje terase" },
} as const;

export type YardPriceEstimate = {
  min: number;
  max: number;
  summary: string[];
};

function roundToFive(value: number) {
  return Math.round(value / 5) * 5;
}

export function calculateYardPrice(input: YardCalculatorInput): YardPriceEstimate {
  const base = YARD_BASE[input.size];
  let min = base.min;
  let max = base.max;
  const extras: string[] = [];

  if (input.hedge) {
    min += YARD_EXTRAS.hedge.min;
    max += YARD_EXTRAS.hedge.max;
    extras.push(YARD_EXTRAS.hedge.label);
  }
  if (input.leaves) {
    min += YARD_EXTRAS.leaves.min;
    max += YARD_EXTRAS.leaves.max;
    extras.push(YARD_EXTRAS.leaves.label);
  }
  if (input.terrace) {
    min += YARD_EXTRAS.terrace.min;
    max += YARD_EXTRAS.terrace.max;
    extras.push(YARD_EXTRAS.terrace.label);
  }

  const sizeLabel =
    YARD_SIZE_OPTIONS.find((item) => item.value === input.size)?.label ??
    input.size;

  const summary = [
    "Košnja i osnovno održavanje travnjaka",
    `Veličina: ${sizeLabel}`,
    extras.length > 0 ? `Dodatno: ${extras.join(", ")}` : "",
  ].filter(Boolean);

  return {
    min: roundToFive(min),
    max: roundToFive(max),
    summary,
  };
}

export function formatYardPriceRange(estimate: YardPriceEstimate) {
  return `${estimate.min}–${estimate.max} €`;
}

export function buildYardWhatsAppMessage(
  input: YardCalculatorInput,
  estimate: YardPriceEstimate,
) {
  const sizeLabel =
    YARD_SIZE_OPTIONS.find((item) => item.value === input.size)?.label ??
    input.size;

  const lines = [
    "Pozdrav, zanima me održavanje dvorišta. Prošao/la sam kalkulator na stranici.",
    "",
    "Vrsta: Održavanje dvorišta / košnja",
    `Veličina travnjaka: ${sizeLabel}`,
  ];

  const extras = [
    input.hedge ? "šišanje živice" : null,
    input.leaves ? "lišće / plijevljenje" : null,
    input.terrace ? "pranje terase" : null,
  ].filter(Boolean);

  if (extras.length > 0) {
    lines.push(`Dodatno: ${extras.join(", ")}`);
  }

  lines.push(
    "",
    `Okvirna cijena iz kalkulatora: ${estimate.min}–${estimate.max} €`,
    "",
    "Možete li potvrditi cijenu i termin?",
  );

  return lines.join("\n");
}

export const PAINT_PREP = { min: 40, max: 80, label: "priprema zidova (glet, rupice)" };

function includesPaint(workType: YardWorkType) {
  return workType === "bojanje" || workType === "oboje";
}

function includesRepairs(workType: YardWorkType) {
  return workType === "popravci" || workType === "oboje";
}

export function calculateWorksPrice(input: WorksCalculatorInput): YardPriceEstimate {
  let min = 0;
  let max = 0;
  const summary: string[] = [];

  const workLabel =
    YARD_WORK_OPTIONS.find((item) => item.value === input.workType)?.label ??
    input.workType;
  summary.push(workLabel);

  if (includesRepairs(input.workType)) {
    const selected = WORK_JOB_OPTIONS.filter((job) => input.jobs.includes(job.value));
    if (selected.length === 0) {
      min += 30;
      max += 55;
      summary.push("Sitni popravak (nije odabrano što točno)");
    } else {
      for (const job of selected) {
        min += job.min;
        max += job.max;
      }
      summary.push(`Popravci: ${selected.map((job) => job.label).join(", ")}`);
    }
  }

  if (includesPaint(input.workType)) {
    const rooms =
      PAINT_ROOM_OPTIONS.find((item) => item.value === input.paintRooms) ??
      PAINT_ROOM_OPTIONS[0];
    min += rooms.min;
    max += rooms.max;
    summary.push(`Bojanje: ${rooms.label}`);

    if (input.paintPrep) {
      min += PAINT_PREP.min;
      max += PAINT_PREP.max;
      summary.push(PAINT_PREP.label);
    }
  }

  if (input.description.trim()) {
    summary.push(`Napomena: ${input.description.trim()}`);
  }

  return {
    min: roundToFive(Math.max(min, 20)),
    max: roundToFive(Math.max(max, min + 15)),
    summary,
  };
}

export function formatWorksPriceRange(estimate: YardPriceEstimate) {
  return `${estimate.min}–${estimate.max} €`;
}

export function buildWorksWhatsAppMessage(
  input: WorksCalculatorInput,
  estimate: YardPriceEstimate,
) {
  const workLabel =
    YARD_WORK_OPTIONS.find((item) => item.value === input.workType)?.label ??
    input.workType;

  const lines = [
    "Pozdrav, zanima me održavanje kuće. Prošao/la sam kalkulator na stranici.",
    "",
    `Vrsta: ${workLabel}`,
  ];

  if (includesRepairs(input.workType)) {
    const jobs = WORK_JOB_OPTIONS.filter((job) => input.jobs.includes(job.value)).map(
      (job) => job.label,
    );
    lines.push(`Popravci: ${jobs.length > 0 ? jobs.join(", ") : "nije odabrano"}`);
  }

  if (includesPaint(input.workType)) {
    const rooms =
      PAINT_ROOM_OPTIONS.find((item) => item.value === input.paintRooms)?.label ??
      input.paintRooms;
    lines.push(`Bojanje: ${rooms}`);
    if (input.paintPrep) {
      lines.push("Priprema zidova: da");
    }
  }

  if (input.description.trim()) {
    lines.push(`Opis: ${input.description.trim()}`);
  }

  lines.push(
    "",
    `Okvirna cijena iz kalkulatora: ${estimate.min}–${estimate.max} €`,
    "",
    "Možete li potvrditi cijenu i termin?",
  );

  return lines.join("\n");
}

export function worksSelectionIsReady(input: WorksCalculatorInput) {
  if (includesRepairs(input.workType) && input.jobs.length === 0) {
    return false;
  }
  return true;
}

export function isCalculatorCategory(value: string): value is CalculatorCategory {
  return CALCULATOR_CATEGORIES.some((item) => item.value === value);
}

export function resolveCalculatorPrefill(type: string): {
  category: CalculatorCategory;
  cleaningType?: string;
} {
  if (isCalculatorCategory(type)) {
    return { category: type };
  }

  if (type === "kosnja" || type === "terasa") {
    return { category: "dvoriste" };
  }

  if (type === "bojanje" || type === "popravci") {
    return { category: "radovi" };
  }

  if (type === "tjedno" || type === "dvotjedno") {
    return { category: "ciscenje", cleaningType: type };
  }

  // Legacy prefill values → redovito tjedno
  return { category: "ciscenje", cleaningType: "tjedno" };
}

export type CombinedPriceEstimate = {
  min: number;
  max: number;
  summary: string[];
};

export function combinePriceEstimates(
  parts: {
    label: string;
    estimate: { min: number; max: number; summary: string[] };
  }[],
): CombinedPriceEstimate {
  if (parts.length === 0) {
    return { min: 0, max: 0, summary: [] };
  }

  let min = 0;
  let max = 0;
  const summary: string[] = [];

  for (const part of parts) {
    min += part.estimate.min;
    max += part.estimate.max;
    summary.push(
      `${part.label}: ${part.estimate.min}–${part.estimate.max} €`,
    );
    for (const line of part.estimate.summary) {
      summary.push(`  ${line}`);
    }
  }

  if (parts.length > 1) {
    summary.push(`Ukupno: ${min}–${max} €`);
  }

  return { min, max, summary };
}

export function formatCombinedPriceRange(estimate: CombinedPriceEstimate) {
  if (estimate.min === 0 && estimate.max === 0) {
    return "Odaberite uslugu";
  }
  return `${estimate.min}–${estimate.max} €`;
}

export function buildCombinedWhatsAppMessage(
  categoryLabels: string[],
  estimate: CombinedPriceEstimate,
) {
  const lines = [
    "Pozdrav, zanima me održavanje. Prošao/la sam kalkulator na stranici.",
    "",
    `Usluge: ${categoryLabels.join(", ")}`,
    "",
    ...estimate.summary.map((line) =>
      line.startsWith("  ") ? `•${line}` : `• ${line}`,
    ),
    "",
    `Okvirna cijena ukupno: ${estimate.min}–${estimate.max} €`,
    "",
    "Možete li potvrditi cijenu i termin?",
  ];

  return lines.join("\n");
}

export function toggleCalculatorCategory(
  categories: CalculatorCategory[],
  value: CalculatorCategory,
): CalculatorCategory[] {
  return categories.includes(value)
    ? categories.filter((item) => item !== value)
    : [...categories, value];
}

/** Stabilan redoslijed: čišćenje → okućnica → radovi. */
export function sortCalculatorCategories(
  categories: CalculatorCategory[],
): CalculatorCategory[] {
  const order: CalculatorCategory[] = ["ciscenje", "dvoriste", "radovi"];
  return order.filter((item) => categories.includes(item));
}
