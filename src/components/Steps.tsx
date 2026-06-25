import { STEPS } from "@/lib/constants";
import Reveal from "./Reveal";

export default function Steps() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {STEPS.map((step, index) => (
        <Reveal key={step.step} delay={index * 100}>
          <div className="card-modern relative h-full p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
              {step.step}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-gray-600">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
