import { TESTIMONIALS } from "@/lib/constants";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((item, index) => (
        <Reveal key={item.name} delay={index * 80}>
          <figure className="card-modern flex h-full flex-col p-5 sm:p-6">
            <blockquote className="flex-1 text-base leading-relaxed text-gray-700">
              &bdquo;{item.quote}&ldquo;
            </blockquote>
            <figcaption className="mt-4 border-t border-gray-200 pt-4">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="mt-0.5 text-sm text-gray-500">
                {item.location} · {item.service}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
