import { COMPANY } from "./constants";
import {
  type EmployeeChecklistMeta,
  formatChecklistDateTime,
  getActiveSections,
  getChecklistProgress,
  getJobTypeLabel,
} from "./employeeChecklist";

export type ChecklistReportInput = {
  meta: EmployeeChecklistMeta;
  checked: Record<string, boolean>;
  finishedAt: string;
};

function statusMark(done: boolean) {
  return done ? "[x]" : "[ ]";
}

export function buildChecklistWhatsAppReport({
  meta,
  checked,
  finishedAt,
}: ChecklistReportInput) {
  const progress = getChecklistProgress(meta.jobType, checked);
  const sections = getActiveSections(meta.jobType);

  const lines = [
    "IZVJESTAJ PROVJERE CISCENJA",
    COMPANY.name,
    "",
    `Zaposlenik: ${meta.employeeName.trim()}`,
    `Lokacija: ${meta.clientLocation.trim()}`,
    `Vrsta: ${getJobTypeLabel(meta.jobType)}`,
    `Pocetak: ${formatChecklistDateTime(meta.startedAt)}`,
    `Zavrsetak: ${formatChecklistDateTime(finishedAt)}`,
    `Obavezno: ${progress.requiredDone}/${progress.requiredTotal} (${progress.requiredPercent}%)`,
    "",
  ];

  for (const section of sections) {
    lines.push(section.title.toUpperCase());
    for (const item of section.items) {
      lines.push(`${statusMark(Boolean(checked[item.id]))} ${item.label}`);
    }
    lines.push("");
  }

  if (meta.note.trim()) {
    lines.push(`Napomena: ${meta.note.trim()}`, "");
  }

  lines.push(
    progress.isComplete
      ? "STATUS: SVI OBAVEZNI CHECKOVI PROSLI."
      : "STATUS: NEPOTPUNO — nisu oznaceni svi obavezni checkovi.",
    "",
    "Fotografije PRIJE i POSLIJE u privitku (2 fotke).",
  );

  return lines.join("\n");
}
