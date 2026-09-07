import Link from "next/link";
import { SERVICE_PILLARS } from "@/lib/constants";
import CalculatorTypeButton from "./CalculatorTypeButton";
import Reveal from "./Reveal";

const PILLAR_ICONS = [
  "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  "M12 3c2 2 6 3 9 3 0 7-3 12-9 15-6-3-9-8-9-15 3 0 7-1 9-3z",
  "M4 6h16M4 10h16M8 14h.01M8 18h.01M12 14h8M12 18h8",
] as const;

const PILLAR_TONES = [
  "bg-brand-600",
  "bg-accent-600",
  "bg-brand-700",
  "bg-accent-500",
] as const;

export default function ServicePillars() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {SERVICE_PILLARS.map((pillar, index) => (
        <Reveal key={pillar.title} delay={index * 80}>
          <article className="card-modern flex h-full flex-col overflow-hidden p-6">
            <span
              className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white ${PILLAR_TONES[index]}`}
              aria-hidden="true"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d={PILLAR_ICONS[index]} />
              </svg>
            </span>
            <Link
              href={pillar.href}
              className="flex flex-1 flex-col transition-colors hover:text-brand-700"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                {pillar.title}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                {pillar.tagline}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">
                {pillar.description}
              </p>
            </Link>
            <CalculatorTypeButton type={pillar.calculatorType} />
          </article>
        </Reveal>
      ))}
    </div>
  );
}
