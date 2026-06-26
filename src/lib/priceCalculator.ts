export const CALCULATOR_CLEANING_TYPES = [
  { value: "redovno", label: "Redovno čišćenje" },
  { value: "jednokratno", label: "Jednokratno čišćenje" },
  { value: "generalno", label: "Generalno čišćenje" },
  { value: "kuca", label: "Čišćenje kuće" },
  { value: "prozori", label: "Samo pranje prozora" },
  { value: "selidba", label: "Čišćenje nakon selidbe" },
] as const;

export const CALCULATOR_PROPERTY_TYPES = [
  { value: "stan", label: "Stan" },
  { value: "kuca", label: "Kuća" },
] as const;

export const CALCULATOR_ROOM_OPTIONS = [
  { value: "1", label: "1 soba" },
  { value: "2", label: "2 sobe" },
  { value: "3", label: "3 sobe" },
  { value: "4", label: "4 sobe" },
  { value: "5", label: "5 ili više" },
] as const;

export const CALCULATOR_BATHROOM_OPTIONS = [
  { value: "1", label: "1 kupaonica / WC" },
  { value: "2", label: "2" },
  { value: "3", label: "3 ili više" },
] as const;

export const CALCULATOR_CONDITION_OPTIONS = [
  {
    value: "obicno",
    label: "Uobičajeno čisto",
    hint: "Redovno održavan, bez većih naslaga",
  },
  {
    value: "prljavo",
    label: "Prilično prljavo",
    hint: "Primjetna prašina, kuhinja ili kupaonica trebaju više pažnje",
  },
  {
    value: "jako",
    label: "Jako zapušteno",
    hint: "Dugo nije čišćeno, nakon radova ili prije useljenja",
  },
] as const;

export const CALCULATOR_WINDOW_OPTIONS = [
  { value: "ne", label: "Ne trebaju prozori" },
  { value: "unutra-malo", label: "Pranje unutra — do 6 prozora" },
  { value: "unutra-vise", label: "Pranje unutra — 7 ili više" },
  { value: "unutra-vani", label: "Unutra i vani" },
  { value: "samo-vani", label: "Samo vani" },
] as const;

export type CleaningType = (typeof CALCULATOR_CLEANING_TYPES)[number]["value"];
export type PropertyType = (typeof CALCULATOR_PROPERTY_TYPES)[number]["value"];
export type Condition = (typeof CALCULATOR_CONDITION_OPTIONS)[number]["value"];
export type WindowOption = (typeof CALCULATOR_WINDOW_OPTIONS)[number]["value"];

export type CalculatorInput = {
  cleaningType: CleaningType;
  propertyType: PropertyType;
  sqm: number;
  rooms: number;
  bathrooms: number;
  condition: Condition;
  hasPets: boolean;
  heavyKitchen: boolean;
  hasBalcony: boolean;
  oven: boolean;
  fridge: boolean;
  cabinets: boolean;
  windows: WindowOption;
};

export type PriceEstimate = {
  min: number;
  max: number;
  hoursMin: number;
  hoursMax: number;
  summary: string[];
};

export const DEFAULT_CALCULATOR_INPUT: CalculatorInput = {
  cleaningType: "jednokratno",
  propertyType: "stan",
  sqm: 65,
  rooms: 3,
  bathrooms: 1,
  condition: "obicno",
  hasPets: false,
  heavyKitchen: false,
  hasBalcony: false,
  oven: false,
  fridge: false,
  cabinets: false,
  windows: "ne",
};

const RATES = {
  redovno: { hourly: 16, minHours: 3 },
  jednokratno: { hourly: 18, minHours: 3 },
  generalno: { hourly: 22, perSqm: 2.8, minHours: 4 },
  kuca: { hourly: 22, perSqm: 2.85, minHours: 4 },
  prozori: { hourly: 18, minHours: 2 },
  selidba: { hourly: 22, perSqm: 2.9, minHours: 4 },
} as const;

function roundToFive(value: number) {
  return Math.round(value / 5) * 5;
}

function baseHoursFromSqm(sqm: number) {
  if (sqm <= 40) return 3;
  if (sqm <= 55) return 3.5;
  if (sqm <= 70) return 4;
  if (sqm <= 85) return 4.5;
  if (sqm <= 100) return 5;
  if (sqm <= 120) return 5.5;
  if (sqm <= 150) return 6.5;
  return 6.5 + (sqm - 150) / 30;
}

function windowHours(option: WindowOption, cleaningType: CleaningType) {
  if (cleaningType === "prozori") {
    const map: Record<WindowOption, number> = {
      ne: 2.5,
      "unutra-malo": 2.5,
      "unutra-vise": 4,
      "unutra-vani": 5.5,
      "samo-vani": 3.5,
    };
    return map[option];
  }

  const map: Record<WindowOption, number> = {
    ne: 0,
    "unutra-malo": 1,
    "unutra-vise": 2,
    "unutra-vani": 3.5,
    "samo-vani": 2.5,
  };
  return map[option];
}

function typeMultiplier(cleaningType: CleaningType) {
  const map: Record<CleaningType, number> = {
    redovno: 1,
    jednokratno: 1.05,
    generalno: 1.45,
    kuca: 1.3,
    prozori: 1,
    selidba: 1.35,
  };
  return map[cleaningType];
}

function conditionMultiplier(condition: Condition) {
  const map: Record<Condition, number> = {
    obicno: 1,
    prljavo: 1.18,
    jako: 1.38,
  };
  return map[condition];
}

function estimateHours(input: CalculatorInput) {
  if (input.cleaningType === "prozori") {
    return Math.max(windowHours(input.windows, "prozori"), RATES.prozori.minHours);
  }

  let hours = baseHoursFromSqm(input.sqm);

  if (input.rooms > 3) {
    hours += (input.rooms - 3) * 0.35;
  }

  if (input.bathrooms > 1) {
    hours += (input.bathrooms - 1) * 0.55;
  }

  hours *= typeMultiplier(input.cleaningType);
  hours *= conditionMultiplier(input.condition);

  if (input.propertyType === "kuca") {
    hours *= 1.1;
  }

  if (input.hasPets) hours += 0.4;
  if (input.heavyKitchen) hours += 0.35;
  if (input.hasBalcony) hours += 0.65;
  if (input.oven) hours += 0.5;
  if (input.fridge) hours += 0.5;
  if (input.cabinets) hours += 1.25;
  hours += windowHours(input.windows, input.cleaningType);

  return hours;
}

function usesSqmPricing(cleaningType: CleaningType) {
  return cleaningType === "generalno" || cleaningType === "kuca" || cleaningType === "selidba";
}

export function calculatePrice(input: CalculatorInput): PriceEstimate {
  const rate = RATES[input.cleaningType];
  const centerHours = estimateHours(input);
  const hoursMin = Math.max(centerHours * 0.9, rate.minHours);
  const hoursMax = Math.max(centerHours * 1.12, rate.minHours * 1.15);

  let priceMin: number;
  let priceMax: number;

  if (usesSqmPricing(input.cleaningType) && "perSqm" in rate) {
    const hourlyMin = hoursMin * rate.hourly;
    const hourlyMax = hoursMax * rate.hourly;
    const sqmMin = input.sqm * rate.perSqm;
    const sqmMax = input.sqm * rate.perSqm * 1.08;
    priceMin = (hourlyMin + sqmMin) / 2;
    priceMax = (hourlyMax + sqmMax) / 2;
  } else {
    priceMin = hoursMin * rate.hourly;
    priceMax = hoursMax * rate.hourly;
  }

  priceMin = roundToFive(priceMin * 0.95);
  priceMax = roundToFive(priceMax * 1.05);

  if (priceMax <= priceMin) {
    priceMax = priceMin + 15;
  }

  if (priceMax - priceMin < 15) {
    priceMax = priceMin + 15;
  }

  const cleaningLabel =
    CALCULATOR_CLEANING_TYPES.find((item) => item.value === input.cleaningType)?.label ??
    input.cleaningType;

  const summary = [
    cleaningLabel,
    `${input.sqm} m², ${input.rooms} sobe, ${input.bathrooms} kupaonica`,
    CALCULATOR_CONDITION_OPTIONS.find((item) => item.value === input.condition)?.label ?? "",
  ].filter(Boolean);

  return {
    min: priceMin,
    max: priceMax,
    hoursMin: Math.round(hoursMin * 10) / 10,
    hoursMax: Math.round(hoursMax * 10) / 10,
    summary,
  };
}

function getCleaningLabel(input: CalculatorInput) {
  return (
    CALCULATOR_CLEANING_TYPES.find((item) => item.value === input.cleaningType)?.label ??
    input.cleaningType
  );
}

function getPropertyLabel(input: CalculatorInput) {
  return (
    CALCULATOR_PROPERTY_TYPES.find((item) => item.value === input.propertyType)?.label ??
    input.propertyType
  );
}

function getConditionLabel(input: CalculatorInput) {
  return (
    CALCULATOR_CONDITION_OPTIONS.find((item) => item.value === input.condition)?.label ??
    input.condition
  );
}

function getWindowLabel(input: CalculatorInput) {
  return (
    CALCULATOR_WINDOW_OPTIONS.find((item) => item.value === input.windows)?.label ??
    input.windows
  );
}

function getExtras(input: CalculatorInput) {
  return [
    input.hasPets ? "kućni ljubimci" : null,
    input.heavyKitchen ? "intenzivnije korištenje kuhinje" : null,
    input.hasBalcony ? "balkon/terasa" : null,
    input.oven ? "pećnica" : null,
    input.fridge ? "hladnjak" : null,
    input.cabinets ? "ormari iznutra" : null,
  ].filter(Boolean);
}

function mapCleaningTypeToFormValue(cleaningType: CleaningType) {
  const map: Record<CleaningType, string> = {
    redovno: "Redovno čišćenje",
    jednokratno: "Jednokratno čišćenje",
    generalno: "Generalno čišćenje",
    kuca: "Čišćenje kuće",
    prozori: "Pranje prozora",
    selidba: "Čišćenje nakon selidbe",
  };
  return map[cleaningType];
}

export function buildCalculatorPrefill(input: CalculatorInput, estimate: PriceEstimate) {
  const lines = [
    "Procjena iz kalkulatora na stranici:",
    `Okvirna cijena: ${estimate.min}–${estimate.max} €`,
    `Procijenjeno vrijeme: ${estimate.hoursMin}–${estimate.hoursMax} h`,
    "",
    ...estimate.summary.map((line) => `• ${line}`),
  ];

  if (input.cleaningType === "prozori") {
    lines.push("", `Prozori: ${getWindowLabel(input)}`);
  } else {
    lines.push(
      "",
      `Stanje: ${getConditionLabel(input)}`,
      `Prozori: ${getWindowLabel(input)}`,
    );

    const extras = getExtras(input);
    if (extras.length > 0) {
      lines.push(`Dodatno: ${extras.join(", ")}`);
    }
  }

  lines.push("", "Molim potvrdu cijene i okvirnog termina.");

  return {
    kvadratura: input.cleaningType === "prozori" ? "" : `${input.sqm} m²`,
    vrsta: mapCleaningTypeToFormValue(input.cleaningType),
    poruka: lines.join("\n"),
  };
}

export function buildCalculatorWhatsAppMessage(
  input: CalculatorInput,
  estimate: PriceEstimate,
) {
  const cleaningLabel = getCleaningLabel(input);
  const windowLabel = getWindowLabel(input);

  const lines = [
    "Pozdrav, zanima me čišćenje. Prošao/la sam kalkulator na stranici.",
    "",
    `Vrsta: ${cleaningLabel}`,
  ];

  if (input.cleaningType === "prozori") {
    lines.push(`Prozori: ${windowLabel}`);
  } else {
    const extras = getExtras(input);

    lines.push(
      `Prostor: ${getPropertyLabel(input)}`,
      `Kvadratura: ${input.sqm} m²`,
      `Sobe: ${input.rooms}`,
      `Kupaonice: ${input.bathrooms}`,
      `Stanje: ${getConditionLabel(input)}`,
      `Prozori: ${windowLabel}`,
    );

    if (extras.length > 0) {
      lines.push(`Dodatno: ${extras.join(", ")}`);
    }
  }

  lines.push(
    "",
    `Okvirna cijena iz kalkulatora: ${estimate.min}–${estimate.max} €`,
    `Procijenjeno vrijeme: ${estimate.hoursMin}–${estimate.hoursMax} h`,
    "",
    "Možete li potvrditi cijenu i termin?",
  );

  return lines.join("\n");
}
