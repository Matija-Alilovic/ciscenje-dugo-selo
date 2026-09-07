import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import Reveal from "./Reveal";

const SERVICE_ICONS = [
  "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "M4 6h16M4 10h16M4 14h16M4 18h16",
  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  "M12 3v18m0-18c2 2 6 3 9 3 0 7-3 12-9 15-6-3-9-8-9-15 3 0 7-1 9-3z",
  "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  "M4 6h16M4 10h16M8 14h.01M8 18h.01M12 14h8M12 18h8",
] as const;

export default function ServiceCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {SERVICES.map((service, index) => (
        <Reveal key={service.title} delay={index * 80}>
          <Link
            href={service.href}
            className="card-modern group flex h-full flex-col p-4 transition-colors hover:border-brand-300 sm:p-6"
          >
            <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand-100 text-brand-700 sm:mb-4 sm:h-11 sm:w-11">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={SERVICE_ICONS[index % SERVICE_ICONS.length]} />
              </svg>
            </span>
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-700 sm:text-xl">
              {service.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 sm:mt-3 sm:text-base">
              {service.description}
            </p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
