export const CLEANING_JOB_TYPES = [
  { value: "redovno", label: "Redovno čišćenje" },
  { value: "jednokratno", label: "Jednokratno čišćenje" },
  { value: "generalno", label: "Generalno čišćenje" },
  { value: "prozori", label: "Pranje prozora" },
  { value: "selidba", label: "Čišćenje nakon selidbe" },
] as const;

export type CleaningJobType = (typeof CLEANING_JOB_TYPES)[number]["value"];

export type ChecklistItemDef = {
  id: string;
  label: string;
  required: boolean;
  /** Prikazuje se samo za odabrane vrste posla. Prazno = uvijek. */
  jobTypes?: CleaningJobType[];
};

export type ChecklistSectionDef = {
  id: string;
  title: string;
  hint?: string;
  icon: string;
  items: ChecklistItemDef[];
  jobTypes?: CleaningJobType[];
};

export const EMPLOYEE_CHECKLIST_SECTIONS: ChecklistSectionDef[] = [
  {
    id: "start",
    title: "Početak smjene",
    icon: "clipboard",
    hint: "Prije ulaska u rad — provjeri dogovor i opremu.",
    items: [
      {
        id: "start-brief",
        label: "Provjerio/la sam što je dogovoreno s klijentom / u uputama",
        required: true,
      },
      {
        id: "start-supplies",
        label: "Imam sva sredstva, krpe i opremu za posao",
        required: true,
      },
      {
        id: "start-safety",
        label: "Prostor je siguran za rad (bez prepreka, strujni uređaji u redu)",
        required: true,
      },
    ],
  },
  {
    id: "living",
    title: "Dnevni boravak i hodnik",
    icon: "sofa",
    items: [
      { id: "living-dust", label: "Obrisan dust / površine (police, stolovi, TV)", required: true },
      { id: "living-vacuum", label: "Usisano ( tepisi, rugovi, ispod stolica po mogućnosti )", required: true },
      { id: "living-floor", label: "Oprani / o brisani podovi", required: true },
      { id: "living-trash", label: "Odliveno smeće iz prostorije", required: true },
      { id: "hallway", label: "Hodnik / ulaz — pod i vidljive površine", required: true },
    ],
  },
  {
    id: "bedrooms",
    title: "Spavaće sobe",
    icon: "bed",
    items: [
      { id: "bed-dust", label: "Obrisan dust na noćnim ormarićima, ormarima, prozorima", required: true },
      { id: "bed-vacuum", label: "Usisano (pod i ispod kreveta po mogućnosti)", required: true },
      { id: "bed-floor", label: "Oprani / o brisani podovi", required: true },
      { id: "bed-mirror", label: "Ogledala i staklene površine obrisane (ako ih ima)", required: false },
    ],
  },
  {
    id: "kitchen",
    title: "Kuhinja",
    icon: "kitchen",
    items: [
      { id: "kitchen-counter", label: "Radne ploče i vanjski dio elemenata očišćeni", required: true },
      { id: "kitchen-sink", label: "Sudoper, slavina i okolica očišćeni", required: true },
      { id: "kitchen-stove", label: "Ploča za kuhanje / štednjak očišćen (vanjski dio)", required: true },
      { id: "kitchen-appliances", label: "Vanjski dio uređaja ( hladnjak, mikrovalna ) obrisan", required: true },
      { id: "kitchen-floor", label: "Pod u kuhinji opran / o brisan", required: true },
      { id: "kitchen-trash", label: "Smeće odneseno / zamijenjena vrećica", required: true },
      {
        id: "kitchen-deep",
        label: "Detaljnije kuhinja ( unutrašnjost elemenata, pločice iznad ) — generalno",
        required: true,
        jobTypes: ["generalno", "selidba"],
      },
      {
        id: "kitchen-oven",
        label: "Pećnica očišćena ( ako je dogovoreno )",
        required: false,
        jobTypes: ["generalno", "selidba"],
      },
    ],
  },
  {
    id: "bathroom",
    title: "Kupaonica i WC",
    icon: "bath",
    items: [
      { id: "bath-toilet", label: "WC školjka, sjedalo i okolica dezinficirani", required: true },
      { id: "bath-sink", label: "Umivaonik, slavina i ogledalo očišćeni", required: true },
      { id: "bath-shower", label: "Tuš / kada / kade očišćeni ( vanjski dio i staklo )", required: true },
      { id: "bath-floor", label: "Pod u kupaonici opran / o brisan", required: true },
      { id: "bath-trash", label: "Smeće odneseno", required: true },
      {
        id: "bath-limescale",
        label: "Kamenac uklonjen gdje je bilo potrebno — generalno",
        required: true,
        jobTypes: ["generalno", "selidba"],
      },
    ],
  },
  {
    id: "windows",
    title: "Prozori",
    icon: "window",
    jobTypes: ["prozori", "generalno", "selidba"],
    items: [
      {
        id: "windows-done",
        label: "Prozori očišćeni prema dogovoru ( unutra / vani )",
        required: true,
        jobTypes: ["prozori"],
      },
      {
        id: "windows-general",
        label: "Prozori očišćeni ako su bili u dogovoru",
        required: false,
        jobTypes: ["generalno", "selidba"],
      },
    ],
  },
  {
    id: "deep",
    title: "Generalno / detalji",
    icon: "sparkle",
    jobTypes: ["generalno", "selidba"],
    hint: "Samo za generalno čišćenje ili nakon selidbe.",
    items: [
      { id: "deep-skirting", label: "Lajsne obrisane", required: true },
      { id: "deep-doors", label: "Vrata, kvake i prekidači obrisani", required: true },
      { id: "deep-cobwebs", label: "Paučina uklonjena ( kutovi, strop )", required: true },
      { id: "deep-tiles", label: "Pločice i fugiranje očišćeni gdje je potrebno", required: true },
    ],
  },
  {
    id: "finish",
    title: "Završna provjera prije odlaska",
    icon: "check",
    hint: "Sve mora biti označeno prije slanja izvještaja.",
    items: [
      { id: "finish-walkthrough", label: "Prošao/la sam kroz sve prostorije — ništa nije preskočeno", required: true },
      { id: "finish-smell", label: "Prostor miriše čisto, nema ostataka sredstava na podu", required: true },
      { id: "finish-equipment", label: "Oprema i krpe spakirane, nema ostavljenih stvari", required: true },
      { id: "finish-windows-doors", label: "Prozori zatvoreni, vrata i ključ prema uputama", required: true },
      { id: "finish-client", label: "Klijent obaviješten / prisutan za pregled ( ako je bio dogovor )", required: false },
    ],
  },
];

export type EmployeeChecklistMeta = {
  employeeName: string;
  clientLocation: string;
  jobType: CleaningJobType;
  startedAt: string;
  note: string;
};

export type EmployeeChecklistState = {
  meta: EmployeeChecklistMeta;
  checked: Record<string, boolean>;
};

export const EMPLOYEE_CHECKLIST_STORAGE_KEY = "ciscenje-dugo-selo-employee-checklist-v1";

export function getDefaultChecklistMeta(): EmployeeChecklistMeta {
  return {
    employeeName: "",
    clientLocation: "",
    jobType: "redovno",
    startedAt: new Date().toISOString(),
    note: "",
  };
}

export function itemAppliesToJob(item: ChecklistItemDef, jobType: CleaningJobType) {
  if (!item.jobTypes || item.jobTypes.length === 0) return true;
  return item.jobTypes.includes(jobType);
}

export function sectionAppliesToJob(section: ChecklistSectionDef, jobType: CleaningJobType) {
  if (!section.jobTypes || section.jobTypes.length === 0) return true;
  return section.jobTypes.includes(jobType);
}

export function getActiveSections(jobType: CleaningJobType) {
  return EMPLOYEE_CHECKLIST_SECTIONS.filter((section) => {
    if (!sectionAppliesToJob(section, jobType)) return false;
    return section.items.some((item) => itemAppliesToJob(item, jobType));
  }).map((section) => ({
    ...section,
    items: section.items.filter((item) => itemAppliesToJob(item, jobType)),
  }));
}

export function getChecklistProgress(
  jobType: CleaningJobType,
  checked: Record<string, boolean>,
) {
  const sections = getActiveSections(jobType);
  let total = 0;
  let done = 0;
  let requiredTotal = 0;
  let requiredDone = 0;

  for (const section of sections) {
    for (const item of section.items) {
      total += 1;
      if (checked[item.id]) done += 1;
      if (item.required) {
        requiredTotal += 1;
        if (checked[item.id]) requiredDone += 1;
      }
    }
  }

  return {
    sections,
    total,
    done,
    requiredTotal,
    requiredDone,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    requiredPercent:
      requiredTotal === 0 ? 0 : Math.round((requiredDone / requiredTotal) * 100),
    isComplete: requiredTotal > 0 && requiredDone === requiredTotal,
  };
}

export function getMissingRequiredItems(
  jobType: CleaningJobType,
  checked: Record<string, boolean>,
) {
  const missing: { sectionTitle: string; label: string }[] = [];

  for (const section of getActiveSections(jobType)) {
    for (const item of section.items) {
      if (item.required && !checked[item.id]) {
        missing.push({ sectionTitle: section.title, label: item.label });
      }
    }
  }

  return missing;
}

export function getJobTypeLabel(jobType: CleaningJobType) {
  return CLEANING_JOB_TYPES.find((item) => item.value === jobType)?.label ?? jobType;
}

export function formatChecklistDateTime(iso: string) {
  return new Intl.DateTimeFormat("hr-HR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}
