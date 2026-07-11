"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LetterHoverText from "@/components/LetterHoverText";
import Reveal from "@/components/Reveal";
import {
  CLEANING_JOB_TYPES,
  EMPLOYEE_CHECKLIST_STORAGE_KEY,
  type CleaningJobType,
  type EmployeeChecklistState,
  getChecklistProgress,
  getDefaultChecklistMeta,
  getMissingRequiredItems,
} from "@/lib/employeeChecklist";
import { buildChecklistWhatsAppReport } from "@/lib/employeeChecklistReport";
import {
  jobPhotosComplete,
  revokeJobPhotos,
  shareChecklistOnWhatsApp,
  type JobPhotos,
} from "@/lib/employeeChecklistShare";
import { getEmployeeChecklistPin } from "@/lib/site";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import { EmployeeSection } from "./EmployeeSection";
import { ProgressRing, SectionIcon } from "./EmployeeChecklistUi";
import EmployeeSubmitBar from "./EmployeeSubmitBar";
import EmployeeJobPhotos from "./EmployeeJobPhotos";

function loadDraft(): EmployeeChecklistState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(EMPLOYEE_CHECKLIST_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EmployeeChecklistState;
  } catch {
    return null;
  }
}

function saveDraft(state: EmployeeChecklistState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EMPLOYEE_CHECKLIST_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pin.trim() === getEmployeeChecklistPin()) {
      sessionStorage.setItem("employee-checklist-unlocked", "1");
      onUnlock();
      return;
    }
    setError("Pogrešan PIN. Pitaj voditelja.");
  };

  return (
    <section className="mesh-bg">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-md">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Interni alat · zaposlenici
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
              <LetterHoverText text="Provjera rada" delayStepMs={28} />
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Unesi PIN koji ti je dao voditelj — checklista je samo za tim.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="card-modern mt-8 p-6 sm:p-7">
              <form onSubmit={submit} className="space-y-4">
                <label className="block">
                  <span className="form-label">PIN pristup</span>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={pin}
                    onChange={(event) => {
                      setPin(event.target.value);
                      setError("");
                    }}
                    className="form-field mt-1 text-center text-2xl tracking-[0.35em]"
                    placeholder="••••"
                  />
                </label>
                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn-primary w-full py-3.5 text-base">
                  Otvori checklistu
                </button>
              </form>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-center text-sm text-gray-500">
              <Link href="/" className="font-medium text-brand-700 hover:text-brand-800">
                ← Natrag na stranicu
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function EmployeeChecklistApp() {
  const requiredPin = getEmployeeChecklistPin();
  const [unlocked, setUnlocked] = useState(!requiredPin);
  const [meta, setMeta] = useState(getDefaultChecklistMeta);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [photos, setPhotos] = useState<JobPhotos>({ before: null, after: null });

  useEffect(() => {
    if (requiredPin && sessionStorage.getItem("employee-checklist-unlocked") === "1") {
      setUnlocked(true);
    }
  }, [requiredPin]);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setMeta(draft.meta);
      setChecked(draft.checked);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    saveDraft({ meta, checked });
  }, [meta, checked, unlocked]);

  useEffect(() => {
    return () => {
      revokeJobPhotos(photos);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup blob URLs on unmount
  }, []);

  useEffect(() => {
    document.body.classList.add("floating-cta-visible");
    document.documentElement.classList.add("floating-cta-visible");
    return () => {
      document.body.classList.remove("floating-cta-visible");
      document.documentElement.classList.remove("floating-cta-visible");
    };
  }, []);

  const progress = useMemo(
    () => getChecklistProgress(meta.jobType, checked),
    [meta.jobType, checked],
  );

  const missing = useMemo(
    () => getMissingRequiredItems(meta.jobType, checked),
    [meta.jobType, checked],
  );

  const toggleItem = useCallback((id: string, value: boolean) => {
    setChecked((current) => ({ ...current, [id]: value }));
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !(current[sectionId] ?? true),
    }));
  };

  const markSectionDone = (sectionId: string) => {
    const section = progress.sections.find((item) => item.id === sectionId);
    if (!section) return;
    setChecked((current) => {
      const next = { ...current };
      for (const item of section.items) next[item.id] = true;
      return next;
    });
  };

  const resetChecklist = () => {
    if (!confirm("Obrisati trenutnu checklistu i krenuti ispočetka?")) return;
    revokeJobPhotos(photos);
    setMeta(getDefaultChecklistMeta());
    setChecked({});
    setOpenSections({});
    setPhotos({ before: null, after: null });
    localStorage.removeItem(EMPLOYEE_CHECKLIST_STORAGE_KEY);
  };

  const submitReport = async () => {
    if (!meta.employeeName.trim() || !meta.clientLocation.trim()) {
      showToast({ message: "Upiši ime i lokaciju prije slanja." });
      return;
    }

    if (!progress.isComplete) {
      showToast({
        message: `Nisu označeni svi obavezni checkovi (${progress.requiredDone}/${progress.requiredTotal}).`,
      });
      return;
    }

    if (!jobPhotosComplete(photos)) {
      showToast({ message: "Dodaj fotografiju prije i poslije čišćenja." });
      return;
    }

    setSubmitting(true);
    const finishedAt = new Date().toISOString();

    try {
      const reportInput = { meta, checked, finishedAt };
      const message = buildChecklistWhatsAppReport(reportInput);
      const result = await shareChecklistOnWhatsApp(message, photos);

      if (result === "fallback") {
        showToast({
          message:
            "WhatsApp otvoren s tekstom. Ručno priloži fotke prije i poslije s ove stranice.",
        });
        return;
      }

      showToast({ message: "Izvještaj poslan — provjeri WhatsApp poruku." });

      revokeJobPhotos(photos);
      setMeta(getDefaultChecklistMeta());
      setChecked({});
      setOpenSections({});
      setPhotos({ before: null, after: null });
      localStorage.removeItem(EMPLOYEE_CHECKLIST_STORAGE_KEY);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        showToast({ message: "Slanje otkazano." });
      } else {
        showToast({ message: "Greška pri slanju. Pokušaj ponovo." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />;
  }

  const metaComplete = Boolean(meta.employeeName.trim() && meta.clientLocation.trim());
  const photosComplete = jobPhotosComplete(photos);
  const readyToSend = progress.isComplete && metaComplete && photosComplete;

  return (
    <>
      <section id="hero" className="mesh-bg">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Interni alat · zaposlenici
          </p>
          <h1 className="mt-2 max-w-3xl font-heading text-[1.75rem] font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
            <LetterHoverText text="Provjera prije odlaska" delayStepMs={24} />
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Označi sve što si očistio/la prije kraja smjene. Obavezne stavke, fotke prije/poslije
            i WhatsApp izvještaj voditelju.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            {[
              `Obavezno ${progress.requiredDone}/${progress.requiredTotal}`,
              progress.isComplete ? "Spremno za slanje" : `Još ${missing.length} stavki`,
              photosComplete ? "2 fotke spremne" : "Fotke prije + poslije",
              "WhatsApp voditelju",
            ].map((item) => (
              <li
                key={item}
                className="rounded-md border border-gray-300 bg-surface px-3 py-1.5 text-sm font-medium text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>

          <Reveal delay={60}>
            <div className="card-modern mt-8 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
              <ProgressRing percent={progress.requiredPercent} size={80} stroke={7} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600">Napredak smjene</p>
                <p className="mt-1 text-2xl font-bold text-brand-700">
                  {progress.requiredPercent}% obavezno
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-brand-600 transition-all duration-300"
                    style={{ width: `${progress.requiredPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {progress.sections.map((section) => {
              const done = section.items.every((item) => checked[item.id]);
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setOpenSections((current) => ({ ...current, [section.id]: true }));
                    document.getElementById(`check-${section.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={cn(
                    "shrink-0 rounded-md border border-gray-300 bg-surface px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-200 hover:text-brand-700",
                    done && "border-brand-200 bg-brand-50 text-brand-800",
                  )}
                >
                  {section.title.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <EmployeeSection
        title="Podaci o poslu"
        subtitle="Ime, lokacija i vrsta čišćenja — obavezno prije slanja izvještaja."
        className="section-alt"
      >
        <Reveal>
          <div className="card-modern p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="form-label">Ime i prezime *</span>
                <input
                  value={meta.employeeName}
                  onChange={(event) =>
                    setMeta((current) => ({ ...current, employeeName: event.target.value }))
                  }
                  className="form-field mt-1"
                  placeholder="npr. Ana Horvat"
                />
              </label>
              <label className="block">
                <span className="form-label">Vrsta čišćenja *</span>
                <select
                  value={meta.jobType}
                  onChange={(event) => {
                    const jobType = event.target.value as CleaningJobType;
                    setMeta((current) => ({ ...current, jobType }));
                  }}
                  className="form-field mt-1"
                >
                  {CLEANING_JOB_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="form-label">Lokacija / adresa klijenta *</span>
                <input
                  value={meta.clientLocation}
                  onChange={(event) =>
                    setMeta((current) => ({ ...current, clientLocation: event.target.value }))
                  }
                  className="form-field mt-1"
                  placeholder="npr. Ulica X 12, Dugo Selo"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="form-label">Napomena (opcionalno)</span>
                <textarea
                  value={meta.note}
                  onChange={(event) =>
                    setMeta((current) => ({ ...current, note: event.target.value }))
                  }
                  rows={2}
                  className="form-field mt-1 resize-none"
                  placeholder="npr. klijent tražio dodatno brisanje balkona"
                />
              </label>
            </div>
            {!metaComplete && (
              <p className="mt-4 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
                Upiši ime i lokaciju prije slanja izvještaja.
              </p>
            )}
          </div>
        </Reveal>
      </EmployeeSection>

      <EmployeeSection
        id="checklista"
        title="Checklista čišćenja"
        subtitle="Prođi sve prostorije. Obavezne stavke označene su oznakom ispod."
        className="section-surface"
      >
        <div className="space-y-5">
          {progress.sections.map((section, sectionIndex) => {
            const sectionDone = section.items.filter((item) => checked[item.id]).length;
            const allDone = sectionDone === section.items.length;
            const isOpen = openSections[section.id] ?? true;

            return (
              <Reveal key={section.id} delay={sectionIndex * 60}>
                <section
                  id={`check-${section.id}`}
                  className={cn(
                    "card-modern scroll-mt-36 overflow-hidden",
                    allDone && "border-brand-200",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-start gap-4 border-b border-gray-200 bg-brand-50/50 p-5 text-left transition-colors hover:bg-brand-50/80 sm:p-6"
                  >
                    <span
                      className={cn(
                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-bold",
                        allDone ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700",
                      )}
                    >
                      {allDone ? <CheckIcon /> : <SectionIcon name={section.icon} className="h-5 w-5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-xl font-semibold text-gray-900">{section.title}</span>
                        <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-semibold text-brand-800">
                          {sectionDone}/{section.items.length}
                        </span>
                      </span>
                      {section.hint && (
                        <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                          {section.hint}
                        </span>
                      )}
                    </span>
                    <svg
                      className={cn(
                        "mt-2 h-5 w-5 shrink-0 text-gray-400 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="space-y-2 p-4 sm:p-5">
                      {!allDone && (
                        <button
                          type="button"
                          onClick={() => markSectionDone(section.id)}
                          className="btn-outline mb-2 w-full py-2.5 text-sm"
                        >
                          Označi cijelu sekciju kao gotovu
                        </button>
                      )}
                      {section.items.map((item) => {
                        const isChecked = Boolean(checked[item.id]);
                        return (
                          <label
                            key={item.id}
                            className={cn("employee-check-item", isChecked && "is-done")}
                          >
                            <span className="employee-check-box">
                              {isChecked && <CheckIcon />}
                            </span>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(event) => toggleItem(item.id, event.target.checked)}
                              className="sr-only"
                            />
                            <span className="min-w-0 flex-1 pt-0.5 text-base leading-snug text-gray-800">
                              {item.label}
                              {item.required && (
                                <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
                                  · obavezno
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </section>
              </Reveal>
            );
          })}
        </div>

        {missing.length > 0 && (
          <Reveal delay={120}>
            <div className="mt-8 rounded-lg border border-brand-200 bg-brand-50 px-4 py-4 sm:px-5">
              <p className="font-semibold text-brand-900">Još treba označiti</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-brand-800">
                {missing.slice(0, 4).map((item) => (
                  <li key={`${item.sectionTitle}-${item.label}`}>
                    <span className="font-medium">{item.sectionTitle}:</span> {item.label}
                  </li>
                ))}
                {missing.length > 4 && (
                  <li className="font-medium">… i još {missing.length - 4} stavki</li>
                )}
              </ul>
            </div>
          </Reveal>
        )}
      </EmployeeSection>

      <EmployeeSection
        id="fotografije"
        title="Fotografije prije i poslije"
        subtitle="Obavezno dvije fotke — isti kut prije i nakon čišćenja. Šalju se voditelju na WhatsApp."
        className="section-alt"
      >
        <Reveal>
          <EmployeeJobPhotos photos={photos} onChange={setPhotos} />
          {!photosComplete && (
            <p className="mt-4 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
              Dodaj obje fotografije prije slanja izvještaja.
            </p>
          )}
        </Reveal>
      </EmployeeSection>

      <div
        className="h-[calc(5.5rem+env(safe-area-inset-bottom,0px))]"
        aria-hidden="true"
      />

      <EmployeeSubmitBar>
        <button
          type="button"
          onClick={submitReport}
          disabled={submitting || !readyToSend}
          className="btn-primary flex-1 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          {submitting
            ? "Otvaranje WhatsAppa…"
            : readyToSend
              ? "Pošalji na WhatsApp (2 fotke)"
              : "Dovrši checklistu i fotke"}
        </button>
        <button
          type="button"
          onClick={resetChecklist}
          className="btn-muted flex-1 px-4 py-3 text-sm sm:max-w-[11rem] sm:flex-none sm:text-base"
        >
          Nova smjena
        </button>
      </EmployeeSubmitBar>
    </>
  );
}
