import { CTAButtons } from "./MobileStickyCTA";
import FirstVisitOffer from "./FirstVisitOffer";
import CalculatorHint from "./CalculatorHint";
import LetterHoverText from "./LetterHoverText";
import { HERO_STATS } from "@/lib/constants";

type HeroProps = {
  title: string;
  subtitle: string;
  highlightCalculator?: boolean;
};

export default function Hero({
  title,
  subtitle,
  highlightCalculator = false,
}: HeroProps) {
  return (
    <section id="hero" className="mesh-bg">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <h1 className="hero-fade hero-delay-1 group w-full min-w-0 max-w-3xl text-[1.75rem] font-bold leading-tight text-balance text-gray-900 sm:text-3xl md:text-5xl lg:text-[3.25rem]">
          <LetterHoverText text={title} delayStepMs={32} />
        </h1>
        <p className="hero-fade hero-delay-2 mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-5 sm:text-xl md:text-2xl">
          {subtitle}
        </p>
        <ul className="hero-fade hero-delay-2 mt-5 flex flex-wrap gap-2 sm:gap-3">
          {HERO_STATS.map((item) => (
            <li
              key={item}
              className="rounded-md border border-gray-300 bg-surface px-3 py-1.5 text-sm font-medium text-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="hero-fade hero-delay-3 mt-8 sm:mt-10">
          <FirstVisitOffer variant="banner" />
        </div>
        {highlightCalculator && (
          <CalculatorHint className="hero-fade hero-delay-4 mt-6 sm:mt-8" />
        )}
        <CTAButtons
          className="hero-fade hero-delay-4 mt-6 sm:mt-8"
          leadWithCalculator={highlightCalculator}
        />
        <div className="hero-fade hero-delay-4 mt-6 grid gap-2 sm:mt-8 sm:flex sm:flex-wrap">
          {[
            { label: "Redovno", price: "od 16 €/h" },
            { label: "Jednokratno", price: "od 18 €/h" },
            { label: "Generalno", price: "od 22 €/h" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-md border border-gray-300 bg-surface px-3 py-2.5 text-base sm:inline-flex sm:justify-start"
            >
              <span className="font-medium text-gray-800">{item.label}</span>
              <span className="shrink-0 text-brand-700">{item.price}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
