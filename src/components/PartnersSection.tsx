import Link from "next/link";
import Image from "next/image";
import { PARTNERS } from "@/lib/constants";
import Reveal from "./Reveal";

export default function PartnersSection() {
  const perkPartners = PARTNERS.items.filter((partner) => partner.clientDiscount);

  return (
    <div className="space-y-8">
      <Reveal>
        <p className="max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-700 sm:text-lg">
          {PARTNERS.intro}
        </p>
      </Reveal>

      <Reveal delay={40}>
        <article className="card-modern overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] min-h-[220px] bg-gray-100 lg:aspect-auto lg:min-h-[320px]">
              <Image
                src={PARTNERS.store.image}
                alt={PARTNERS.store.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute left-4 top-4 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm sm:text-sm">
                {PARTNERS.store.badge}
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-900 sm:text-3xl">
                {PARTNERS.store.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-700 sm:text-lg">
                {PARTNERS.store.description}
              </p>

              <address className="mt-5 space-y-1 not-italic text-sm text-gray-700 dark:text-gray-800 sm:text-base">
                <span className="block font-medium text-gray-900 dark:text-gray-900">
                  {PARTNERS.store.address}
                </span>
                <span className="block">{PARTNERS.store.city}</span>
                <span className="block text-gray-500 dark:text-gray-600">
                  {PARTNERS.store.hours}
                </span>
              </address>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={PARTNERS.store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  {PARTNERS.store.cta}
                </a>
                <a
                  href={PARTNERS.store.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center"
                >
                  {PARTNERS.store.mapsLabel}
                </a>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal delay={60}>
        <div className="card-modern border-brand-200 bg-brand-50 p-6 dark:border-brand-200 dark:bg-brand-50/50 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 dark:text-brand-400">
                <span className="rounded-md bg-brand-600 px-2 py-0.5 text-white">Bonus</span>
                {PARTNERS.clientPerk.title}
              </p>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-800 sm:text-lg">
                {PARTNERS.clientPerk.description}
              </p>

              <ul className="space-y-3">
                {perkPartners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex items-start gap-3 rounded-lg border border-brand-100 bg-surface p-3 dark:border-gray-300"
                  >
                    <div className="flex h-10 w-24 shrink-0 items-center justify-center rounded border border-gray-200 bg-white px-2">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={96}
                        height={28}
                        className="h-6 w-auto max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-900 sm:text-base">
                        <span className="text-brand-700 dark:text-brand-400">
                          −{partner.clientDiscount}
                        </span>{" "}
                        {partner.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-700">
                        {partner.clientPerk}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full shrink-0 rounded-lg border border-brand-100 bg-surface p-4 dark:border-gray-300 lg:max-w-xs">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-900">
                Kako iskoristiti
              </p>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-700">
                <li>1. Dogovorite i obavite čišćenje kod nas.</li>
                <li>2. {PARTNERS.clientPerk.delivery}</li>
                <li>3. Unesite kod pri online kupnji kod suradnika.</li>
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-600">
                {PARTNERS.clientPerk.eligibility} {PARTNERS.clientPerk.validity}
              </p>
              <Link href="/#kontakt" className="btn-primary mt-4 w-full text-center">
                Zatraži termin
              </Link>
            </div>
          </div>

          <p className="mt-5 border-t border-brand-100 pt-4 text-xs leading-relaxed text-gray-500 dark:border-brand-200 dark:text-gray-600 sm:text-sm">
            {PARTNERS.clientPerk.note}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.items.map((partner, index) => (
          <Reveal key={partner.name} delay={index * 70}>
            <article className="card-modern flex h-full flex-col p-5 sm:p-6">
              <div className="mb-5 flex h-20 items-center justify-center rounded-md border border-gray-200 bg-white px-4">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={180}
                  height={48}
                  className="h-10 w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900">
                  {partner.name}
                </h3>
                {partner.clientDiscount && (
                  <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800 dark:bg-brand-100 dark:text-brand-400">
                    −{partner.clientDiscount} za klijente
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-400">
                {partner.role}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-700 sm:text-base">
                {partner.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
