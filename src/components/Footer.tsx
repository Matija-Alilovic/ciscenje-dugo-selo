import Link from "next/link";
import { COMPANY, FOOTER_LINKS, SERVICE_PAGES, SITE } from "@/lib/constants";
import { getPhoneHref } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/80 bg-surface/85 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 py-12 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-heading text-xl font-bold text-gray-900">{SITE.name}</p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-gray-600">
              Profesionalno čišćenje stanova i kuća u Dugom Selu, Sesvetama, Vrbovcu, Rugvici i
              okolici.
            </p>
            <a
              href={getPhoneHref()}
              className="mt-4 inline-block text-base font-semibold text-brand-700 hover:text-brand-800"
            >
              {SITE.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Usluge čišćenja">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Usluge
            </p>
            <ul className="space-y-2">
              {SERVICE_PAGES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer navigacija">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Navigacija
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Podaci o obrtu
            </p>
            <address className="not-italic text-base leading-relaxed text-gray-600">
              <span className="block font-medium text-gray-800">{COMPANY.legalName}</span>
              <span className="mt-1 block">{COMPANY.type}</span>
              <span className="mt-1 block">{COMPANY.address}</span>
              <span className="block">{COMPANY.city}</span>
              <span className="mt-1 block">OIB: {COMPANY.oib}</span>
              <span className="block">MBO: {COMPANY.mbo}</span>
            </address>
          </div>
        </div>
        <p className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {COMPANY.legalName}. Sva prava pridržana.
        </p>
      </div>
    </footer>
  );
}
