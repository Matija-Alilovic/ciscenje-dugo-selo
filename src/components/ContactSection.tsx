import { SITE } from "@/lib/constants";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Reveal>
        <div className="space-y-6">
          {[
            { label: "Telefon", href: getPhoneHref(), text: SITE.phoneDisplay },
            {
              label: "WhatsApp",
              href: getWhatsAppHref(),
              text: "Piši na WhatsApp",
              external: true,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="card-modern p-4 transition-all duration-300 hover:border-brand-200"
            >
              <h3 className="text-base font-semibold uppercase tracking-wide text-gray-500">
                {item.label}
              </h3>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="mt-1 block text-xl font-medium text-brand-700 transition-colors hover:text-brand-800"
              >
                {item.text}
              </a>
            </div>
          ))}
          <div className="card-modern p-4">
            <h3 className="text-base font-semibold uppercase tracking-wide text-gray-500">
              Područje rada
            </h3>
            <p className="mt-1 text-lg text-gray-700">{SITE.area}</p>
          </div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="card-modern p-6">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
