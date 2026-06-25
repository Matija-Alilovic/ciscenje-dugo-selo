import Link from "next/link";
import { FIRST_VISIT_OFFER } from "@/lib/constants";
import Reveal from "./Reveal";

type FirstVisitOfferProps = {
  variant?: "banner" | "card";
};

export default function FirstVisitOffer({ variant = "card" }: FirstVisitOfferProps) {
  if (variant === "banner") {
    return (
      <div className="hero-fade hero-delay-3 flex w-full max-w-2xl items-start gap-4 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 dark:border-brand-200 dark:bg-brand-50/50 sm:items-center sm:gap-5">
        <span className="shrink-0 rounded-md bg-brand-600 px-2.5 py-1 text-sm font-bold text-white">
          −{FIRST_VISIT_OFFER.discount}
        </span>
        <p className="text-sm leading-snug text-gray-700 dark:text-gray-800 sm:text-base">
          <span className="font-semibold text-gray-800 dark:text-gray-900">
            {FIRST_VISIT_OFFER.title}.
          </span>{" "}
          {FIRST_VISIT_OFFER.shortText}
        </p>
      </div>
    );
  }

  return (
    <Reveal>
      <div className="card-modern border-brand-200 bg-brand-50 p-6 dark:border-brand-200 dark:bg-brand-50/50 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 dark:text-brand-400">
              <span className="rounded-md bg-brand-600 px-2 py-0.5 text-white">
                −{FIRST_VISIT_OFFER.discount}
              </span>
              {FIRST_VISIT_OFFER.title}
            </p>
            <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-800 sm:text-lg">
              {FIRST_VISIT_OFFER.description}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-700">
              {FIRST_VISIT_OFFER.note}
            </p>
          </div>
          <Link href="/#kontakt" className="btn-primary w-full shrink-0 text-center sm:w-auto">
            Dogovori termin
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
