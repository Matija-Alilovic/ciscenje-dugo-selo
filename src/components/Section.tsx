import Reveal from "./Reveal";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-16 py-8 sm:scroll-mt-24 sm:py-16 md:py-20 ${className}`}>
      <div className="page-pad mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-5 max-w-3xl sm:mb-10">
            <div className="mb-2 h-0.5 w-10 bg-brand-600 sm:mb-3 sm:w-12" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:mt-3 sm:text-lg md:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
