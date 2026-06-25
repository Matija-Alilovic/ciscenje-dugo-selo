import Link from "next/link";
import { getPhoneHref, getWhatsAppHref } from "@/lib/utils";

export function CTAButtons({
  className = "",
  leadWithCalculator = false,
  calculatorHref = "#kalkulator",
}: {
  className?: string;
  leadWithCalculator?: boolean;
  calculatorHref?: string;
}) {
  if (leadWithCalculator) {
    return (
      <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
        <Link href={calculatorHref} className="btn-primary w-full sm:w-auto">
          Izračunaj cijenu
        </Link>
        <a
          href={getWhatsAppHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline w-full sm:w-auto"
        >
          Javi se na WhatsApp
        </a>
        <a href={getPhoneHref()} className="btn-muted w-full sm:w-auto">
          Nazovi
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <a href={getPhoneHref()} className="btn-primary w-full sm:w-auto">
        Nazovi
      </a>
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline w-full sm:w-auto"
      >
        Javi se na WhatsApp
      </a>
      <Link href="/#kontakt" className="btn-muted w-full sm:w-auto">
        Zatraži ponudu
      </Link>
    </div>
  );
}

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-300 bg-surface px-3 pt-3 shadow-sm transition-colors duration-300 md:hidden dark:border-gray-600 dark:shadow-black/30">
      <div className="mx-auto flex max-w-lg gap-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
        <a href={getPhoneHref()} className="btn-primary flex-1 px-3 py-3 text-center text-sm sm:text-base">
          Nazovi
        </a>
        <a
          href={getWhatsAppHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1 px-3 py-3 text-center text-sm sm:text-base"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
