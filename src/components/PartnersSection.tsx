import Image from "next/image";
import { PARTNERS } from "@/lib/constants";
import Reveal from "./Reveal";

export default function PartnersSection() {
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
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-900">
                {partner.name}
              </h3>
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
