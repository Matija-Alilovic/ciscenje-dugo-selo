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
] as const;

export default function ServiceCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((service, index) => (
        <Reveal key={service.title} delay={index * 80}>
          <Link
            href={service.href}
            className="card-modern group flex h-full flex-col p-6 transition-colors hover:border-brand-300"
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-100 text-brand-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={SERVICE_ICONS[index % SERVICE_ICONS.length]} />
              </svg>
            </span>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand-700">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">
              {service.description}
            </p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
