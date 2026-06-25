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
    <section id={id} className={`scroll-mt-20 py-12 sm:scroll-mt-24 sm:py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-8 max-w-2xl sm:mb-10">
            <div className="mb-3 h-0.5 w-12 bg-brand-600" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
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
