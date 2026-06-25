import Image from "next/image";
import { BEFORE_AFTER_ITEMS } from "@/lib/constants";
import Reveal from "./Reveal";

function BeforeAfterPair({
  title,
  beforeSrc,
  afterSrc,
}: {
  title: string;
  beforeSrc: string;
  afterSrc: string;
}) {
  return (
    <figure>
      <figcaption className="mb-3 text-base font-semibold text-gray-900">
        {title}
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-500">
            Prije
          </span>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
            <Image
              src={beforeSrc}
              alt={`${title} — prije čišćenja`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-700">
            Poslije
          </span>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
            <Image
              src={afterSrc}
              alt={`${title} — poslije čišćenja`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function BeforeAfterSection() {
  return (
    <div className="space-y-10">
      {BEFORE_AFTER_ITEMS.map((item, index) => (
        <Reveal key={item.title} delay={index * 100}>
          <BeforeAfterPair
            title={item.title}
            beforeSrc={item.beforeSrc}
            afterSrc={item.afterSrc}
          />
        </Reveal>
      ))}
    </div>
  );
}
