import Image from "next/image";

type BeforeAfterCardProps = {
  title: string;
  src: string;
  caption?: string;
};

export default function BeforeAfterCard({ title, src, caption }: BeforeAfterCardProps) {
  return (
    <figure className="h-full">
      <figcaption className="mb-3 text-base font-semibold text-gray-900">{title}</figcaption>

      <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
        <Image
          src={src}
          alt={`${title} — usporedba prije i poslije čišćenja`}
          width={1600}
          height={900}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-3 sm:top-4 sm:px-4">
          <span className="rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Prije
          </span>
          <span className="rounded-md bg-brand-600/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Poslije
          </span>
        </div>
      </div>

      {caption && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-500">{caption}</p>
      )}
    </figure>
  );
}
