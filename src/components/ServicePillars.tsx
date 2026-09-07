import Link from "next/link";
import { SERVICE_PILLARS } from "@/lib/constants";
import CalculatorTypeButton from "./CalculatorTypeButton";
import Reveal from "./Reveal";

const PILLAR_ICONS = [
  "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  "M12 3c2 2 6 3 9 3 0 7-3 12-9 15-6-3-9-8-9-15 3 0 7-1 9-3z",
] as const;

const PILLAR_TONES = ["bg-brand-600", "bg-accent-600"] as const;

export default function ServicePillars() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
      {SERVICE_PILLARS.map((pillar, index) => (
        <Reveal key={pillar.title} delay={index * 80}>
          <article className="card-modern flex h-full flex-col overflow-hidden p-4 sm:p-6">
            <span
              className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white sm:mb-4 sm:h-11 sm:w-11 ${PILLAR_TONES[index]}`}
              aria-hidden="true"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d={PILLAR_ICONS[index]} />
              </svg>
            </span>
            <Link
              href={pillar.href}
              className="flex flex-1 flex-col transition-colors hover:text-brand-700"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 sm:text-sm">
                {pillar.title}
              </p>
              <h3 className="mt-1.5 text-base font-semibold text-gray-900 sm:mt-2 sm:text-xl">
                {pillar.tagline}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 sm:mt-3 sm:text-base">
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
