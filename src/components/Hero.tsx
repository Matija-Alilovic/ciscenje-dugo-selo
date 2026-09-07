import { CTAButtons } from "./MobileStickyCTA";
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
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="hero-fade hero-delay-1 group w-full min-w-0 max-w-4xl text-4xl font-bold leading-tight text-balance text-gray-900 sm:text-5xl lg:text-6xl">
          <LetterHoverText text={title} delayStepMs={32} />
        </h1>
        <p className="hero-fade hero-delay-2 mt-5 max-w-3xl text-xl leading-relaxed text-gray-600 sm:mt-6 sm:text-2xl md:text-[1.65rem]">
          {subtitle}
        </p>
        <ul className="hero-fade hero-delay-2 mt-5 flex flex-wrap gap-2 sm:gap-3">
          {HERO_STATS.map((item) => (
            <li
              key={item}
              className="rounded-full border border-brand-200 bg-brand-50/80 px-4 py-2 text-base font-medium text-brand-800"
            >
              {item}
            </li>
          ))}
        </ul>

        {highlightCalculator && (
          <CalculatorHint className="hero-fade hero-delay-3 mt-6 sm:mt-8" />
        )}
        <CTAButtons
          className={`hero-fade ${highlightCalculator ? "hero-delay-4" : "hero-delay-3"} mt-6 sm:mt-8`}
          leadWithCalculator={highlightCalculator}
        />
      </div>
    </section>
  );
}
