"use client";

import {
  RECURRING_BASE_RATE,
  RECURRING_PACKAGES,
  RECURRING_PACKAGES_NOTE,
} from "@/lib/constants";
import {
  buildRecurringPackageWhatsAppMessage,
  cn,
  getRecurringPackageMonthlyEstimate,
  getRecurringPackageVisitMin,
  openWhatsApp,
} from "@/lib/utils";
import Reveal from "./Reveal";

type RecurringPackagesProps = {
  variant?: "hero" | "full";
  id?: string;
  className?: string;
};

function PackageCard({
  pkg,
  variant,
  index,
}: {
  pkg: (typeof RECURRING_PACKAGES)[number];
  variant: "hero" | "full";
  index: number;
}) {
  const visitMin = getRecurringPackageVisitMin(pkg);
  const monthlyEstimate = getRecurringPackageMonthlyEstimate(pkg);
  const isHighlighted = pkg.badge === "Najbolja vrijednost";
  const isHero = variant === "hero";

  const card = (
    <article
      className={cn(
        "card-modern relative flex h-full flex-col",
        isHero ? "p-4 sm:p-5" : "p-6",
        isHighlighted
          ? "border-brand-400 ring-2 ring-brand-200"
          : "border-brand-200",
      )}
    >
      {pkg.badge && (
        <span
          className={cn(
            "absolute rounded-full bg-brand-600 font-semibold uppercase tracking-wide text-white",
            isHero
              ? "right-3 top-3 px-2 py-0.5 text-[10px] sm:text-xs"
              : "right-4 top-4 px-3 py-1 text-xs",
          )}
        >
          {pkg.badge}
        </span>
      )}

      <p
        className={cn(
          "font-semibold uppercase tracking-wide text-brand-700",
          isHero ? "text-xs" : "text-sm",
        )}
      >
        {pkg.frequencyLabel}
      </p>
      <h3
        className={cn(
          "mt-1 font-semibold text-gray-900",
          isHero ? "text-xl sm:text-2xl" : "mt-2 text-2xl",
        )}
      >
        {pkg.title}
      </h3>

      {!isHero && (
        <>
          <p className="mt-1 text-base font-medium text-gray-800">{pkg.tagline}</p>
          <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">
            {pkg.description}
          </p>
        </>
      )}

      {isHero && (
        <p className="mt-1 text-sm leading-snug text-gray-600">{pkg.tagline}</p>
      )}

      <div
        className={cn(
          "rounded-lg border border-brand-100 bg-brand-50/70",
          isHero ? "mt-3 p-3 sm:mt-4 sm:p-4" : "mt-6 p-4",
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className={cn("font-bold text-brand-700", isHero ? "text-2xl" : "text-3xl")}>
            {pkg.hourlyRate} €/h
          </p>
          <p className="text-sm text-gray-500 line-through">
            {RECURRING_BASE_RATE.hourly} €/h
          </p>
          <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800">
            −{pkg.discountPercent}%
          </span>
        </div>
        <p className="mt-1.5 text-sm text-gray-600">
          od {visitMin} € po dolasku · min. {pkg.minHours} h
        </p>
        <p className="mt-1 text-sm font-medium text-brand-800">
          ~{monthlyEstimate} €/mj ({pkg.visitsPerMonth}×)
        </p>
      </div>

      {!isHero && (
        <ul className="mt-5 space-y-2 text-sm text-gray-700">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => openWhatsApp(buildRecurringPackageWhatsAppMessage(pkg))}
        className={cn("btn-primary w-full", isHero ? "mt-3 sm:mt-4" : "mt-6")}
      >
        {isHero ? `Naruči ${pkg.title}` : `Pitaj za paket ${pkg.title}`}
      </button>
    </article>
  );

  if (isHero) {
    return card;
  }

  return (
    <Reveal delay={index * 80}>
      {card}
    </Reveal>
  );
}

export default function RecurringPackages({
  variant = "full",
  id,
  className,
}: RecurringPackagesProps) {
  const isHero = variant === "hero";

  return (
    <div id={id} className={className}>
      {isHero && (
        <div className="mb-3 sm:mb-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Paketi s popustom
          </p>
          <h2 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
            Redovno čišćenje svaki tjedan — jeftinije nego po satu
          </h2>
        </div>
      )}

      <div className={cn("grid gap-3 sm:gap-4", isHero ? "sm:grid-cols-2" : "gap-5 lg:grid-cols-2")}>
        {RECURRING_PACKAGES.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} variant={variant} index={index} />
        ))}
      </div>

      <p
        className={cn(
          "rounded-lg border border-gray-200 bg-surface leading-relaxed text-gray-600",
          isHero
            ? "mt-3 px-3 py-2.5 text-xs sm:mt-4 sm:text-sm"
            : "mt-5 px-4 py-3 text-sm sm:text-base",
        )}
      >
        {RECURRING_PACKAGES_NOTE}
      </p>
    </div>
  );
}
